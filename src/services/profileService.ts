// ====================================================================
// DONO JAHA (D O N O   J A H A)
// Profile Service Layer (Supabase PostgreSQL Integration)
// ====================================================================

import { supabase, isSupabaseConfigured } from '../lib/supabase/client';
import { MatrimonialProfile } from '../types';
import { mockActiveSuitor, mockCuratedMatches } from '../mocks/matrimonialData';
import { currentUserProfile, UserProfileState, updateCurrentUserProfile } from '../data/userProfile';

export interface SaveProfileResult {
  success: boolean;
  error?: string;
  profileId?: string;
}

/**
 * Loads the current authenticated user's matrimonial profile from Supabase.
 * Falls back seamlessly to the in-memory canonical profile when offline or unauthenticated.
 */
export async function getMyProfile(): Promise<UserProfileState> {
  if (!isSupabaseConfigured) {
    return currentUserProfile;
  }

  try {
    const { data: authData } = await supabase.auth.getUser();
    if (!authData?.user) {
      return currentUserProfile;
    }

    const { data: profileRow, error } = await supabase
      .from('profiles')
      .select(`
        id,
        gender,
        created_by,
        is_verified,
        profile_basic (*),
        profile_physical (*),
        profile_education (*),
        profile_career (*),
        profile_location (*),
        profile_family (*),
        partner_preferences (*),
        photos (*)
      `)
      .eq('account_id', authData.user.id)
      .single();

    if (error || !profileRow) {
      return currentUserProfile;
    }

    const basic = Array.isArray(profileRow.profile_basic) ? profileRow.profile_basic[0] : profileRow.profile_basic;
    const physical = Array.isArray(profileRow.profile_physical) ? profileRow.profile_physical[0] : profileRow.profile_physical;
    const edu = Array.isArray(profileRow.profile_education) ? profileRow.profile_education[0] : profileRow.profile_education;
    const career = Array.isArray(profileRow.profile_career) ? profileRow.profile_career[0] : profileRow.profile_career;
    const loc = Array.isArray(profileRow.profile_location) ? profileRow.profile_location[0] : profileRow.profile_location;
    const family = Array.isArray(profileRow.profile_family) ? profileRow.profile_family[0] : profileRow.profile_family;
    const prefs = Array.isArray(profileRow.partner_preferences) ? profileRow.partner_preferences[0] : profileRow.partner_preferences;
    const photoList = Array.isArray(profileRow.photos) ? profileRow.photos : (profileRow.photos ? [profileRow.photos] : []);
    const primaryPhoto = photoList.find((p: any) => p.is_primary) || photoList[0];

    let formattedHeight = currentUserProfile.height;
    if (physical?.height_cm) {
      const cm = physical.height_cm;
      const ft = Math.floor(cm / 30.48);
      const inch = Math.round((cm % 30.48) / 2.54);
      formattedHeight = `${ft}' ${inch}" (${cm} cm)`;
    }

    let resolvedAvatar = currentUserProfile.avatar;
    if (primaryPhoto?.storage_path_original) {
      if (primaryPhoto.storage_path_original.startsWith('http')) {
        resolvedAvatar = primaryPhoto.storage_path_original;
      } else {
        const { data: pUrl } = supabase.storage
          .from('profile-public')
          .getPublicUrl(primaryPhoto.storage_path_original);
        if (pUrl?.publicUrl) resolvedAvatar = pUrl.publicUrl;
      }
    }

    const profileState: UserProfileState = {
      id: profileRow.id,
      name: basic?.full_name || currentUserProfile.name,
      displayName: basic?.display_name || currentUserProfile.displayName,
      age: basic?.date_of_birth ? calculateAge(basic.date_of_birth) : currentUserProfile.age,
      gender: profileRow.gender || currentUserProfile.gender,
      dob: basic?.date_of_birth || currentUserProfile.dob,
      location: loc ? `${loc.city || ''}, ${loc.state || ''}`.trim() : currentUserProfile.location,
      city: loc?.city || currentUserProfile.city,
      state: loc?.state || currentUserProfile.state,
      country: loc?.country || currentUserProfile.country,
      profession: career?.job_title || currentUserProfile.profession,
      employer: career?.employer || career?.company_name || currentUserProfile.employer,
      education: edu?.highest_qualification || currentUserProfile.education,
      degree: edu?.field_of_study || currentUserProfile.degree,
      height: formattedHeight,
      maritalStatus: basic?.marital_status || currentUserProfile.maritalStatus,
      motherTongue: basic?.mother_tongue || currentUserProfile.motherTongue,
      sect: basic?.sect || currentUserProfile.sect,
      schoolOfThought: basic?.school_of_thought || currentUserProfile.schoolOfThought,
      avatar: resolvedAvatar,
      isVerified: profileRow.is_verified ?? currentUserProfile.isVerified,
      hasPhoto: Boolean(primaryPhoto || currentUserProfile.hasPhoto),
      hasPhysicalDetails: Boolean(physical),
      hasEducationDetails: Boolean(edu),
      hasProfessionDetails: Boolean(career),
      hasVoiceIntro: currentUserProfile.hasVoiceIntro,
      hasFamilyDetails: Boolean(family),
      familyType: family?.family_type,
      familyValues: family?.family_values,
      fatherOccupation: family?.father_occupation,
      motherOccupation: family?.mother_occupation,
      hasPartnerPreferences: Boolean(prefs),
      partnerMinAge: prefs?.min_age,
      partnerMaxAge: prefs?.max_age,
      partnerEducation: prefs?.min_education,
      partnerSect: Array.isArray(prefs?.sects) ? prefs.sects[0] : prefs?.sects,
      hasSelfieVerification: currentUserProfile.hasSelfieVerification,
      bio: basic?.bio || currentUserProfile.bio,
      email: authData.user.email,
      phone: authData.user.phone,
    };

    updateCurrentUserProfile(profileState);
    return profileState;
  } catch (err) {
    console.warn('getMyProfile exception, falling back to local state:', err);
    return currentUserProfile;
  }
}

/**
 * Persists basic demographic questionnaire answers to Supabase.
 */
export async function syncBasicProfileToSupabase(profile: Partial<UserProfileState>): Promise<SaveProfileResult> {
  if (!isSupabaseConfigured) {
    return { success: true };
  }

  try {
    const { data: authData } = await supabase.auth.getUser();
    if (!authData?.user) {
      return { success: true }; // offline or mock mode
    }

    // 1. Ensure user account exists
    await supabase.from('user_accounts').upsert({
      id: authData.user.id,
      full_name: profile.name || 'User',
      email: authData.user.email,
    });

    // 2. Upsert profile
    const { data: profileData, error: profileError } = await supabase
      .from('profiles')
      .upsert({
        account_id: authData.user.id,
        gender: profile.gender || 'male',
        is_discoverable: true,
      })
      .select('id')
      .single();

    if (profileError || !profileData) {
      return { success: false, error: profileError?.message };
    }

    const profileId = profileData.id;

    // 3. Upsert basic details
    await supabase.from('profile_basic').upsert({
      profile_id: profileId,
      full_name: profile.name,
      display_name: profile.displayName || profile.name,
      date_of_birth: profile.dob,
      marital_status: profile.maritalStatus || 'Never Married',
      mother_tongue: profile.motherTongue || 'Urdu',
      sect: profile.sect || 'Sunni',
      school_of_thought: profile.schoolOfThought || 'Hanafi',
      bio: profile.bio,
    });

    // 4. Upsert location
    if (profile.city || profile.state) {
      await supabase.from('profile_location').upsert({
        profile_id: profileId,
        city: profile.city || '',
        state: profile.state || '',
        country: profile.country || 'India',
      });
    }

    return { success: true, profileId };
  } catch (err: any) {
    console.warn('syncBasicProfileToSupabase exception:', err);
    return { success: false, error: err?.message || 'Network exception' };
  }
}

/**
 * Resolves the authenticated user's active matrimonial profile ID.
 */
async function getActiveProfileId(): Promise<string | null> {
  if (!isSupabaseConfigured) return null;
  const { data: authData } = await supabase.auth.getUser();
  if (!authData?.user) return null;

  const { data: profile } = await supabase
    .from('profiles')
    .select('id')
    .eq('account_id', authData.user.id)
    .single();

  if (profile?.id) return profile.id;

  // Auto-provision profile row if not yet created
  const { data: newProfile } = await supabase
    .from('profiles')
    .insert({
      account_id: authData.user.id,
      gender: 'male',
      is_discoverable: true,
    })
    .select('id')
    .single();

  return newProfile?.id || null;
}

/**
 * Persists physical attributes (height, body build, accessibility status) to profile_physical.
 */
export async function syncPhysicalDetailsToSupabase(details: {
  heightCm: number;
  bodyType?: string;
  physicalStatus?: string;
}): Promise<SaveProfileResult> {
  if (!isSupabaseConfigured) return { success: true };

  try {
    const profileId = await getActiveProfileId();
    if (!profileId) return { success: true };

    const { error } = await supabase.from('profile_physical').upsert({
      profile_id: profileId,
      height_cm: details.heightCm,
      body_type: details.bodyType || 'average',
      accessibility_disclosure: details.physicalStatus || 'normal',
    });

    if (error) {
      console.warn('syncPhysicalDetailsToSupabase error:', error.message);
      return { success: false, error: error.message };
    }

    return { success: true, profileId };
  } catch (err: any) {
    console.warn('syncPhysicalDetailsToSupabase exception:', err);
    return { success: false, error: err?.message };
  }
}

/**
 * Persists academic background (highest qualification, degree/field of study, institution) to profile_education.
 */
export async function syncEducationDetailsToSupabase(details: {
  highestQualification: string;
  institution?: string;
  fieldOfStudy: string;
}): Promise<SaveProfileResult> {
  if (!isSupabaseConfigured) return { success: true };

  try {
    const profileId = await getActiveProfileId();
    if (!profileId) return { success: true };

    const { error } = await supabase.from('profile_education').upsert({
      profile_id: profileId,
      highest_qualification: details.highestQualification,
      institution: details.institution || '',
      field_of_study: details.fieldOfStudy || details.highestQualification,
    });

    if (error) {
      console.warn('syncEducationDetailsToSupabase error:', error.message);
      return { success: false, error: error.message };
    }

    return { success: true, profileId };
  } catch (err: any) {
    console.warn('syncEducationDetailsToSupabase exception:', err);
    return { success: false, error: err?.message };
  }
}

/**
 * Persists professional background (job title, employer, income bracket, employment sector) to profile_career.
 */
export async function syncCareerDetailsToSupabase(details: {
  jobTitle: string;
  employer?: string;
  annualIncomeRange?: string;
  employmentSector?: string;
  workCity?: string;
}): Promise<SaveProfileResult> {
  if (!isSupabaseConfigured) return { success: true };

  try {
    const profileId = await getActiveProfileId();
    if (!profileId) return { success: true };

    const { error: careerErr } = await supabase.from('profile_career').upsert({
      profile_id: profileId,
      employment_sector: details.employmentSector || 'Private Sector',
      job_title: details.jobTitle,
      employer: details.employer || '',
      annual_income_range: details.annualIncomeRange || '',
      currency: 'INR',
    });

    if (careerErr) {
      console.warn('syncCareerDetailsToSupabase error:', careerErr.message);
      return { success: false, error: careerErr.message };
    }

    if (details.workCity) {
      await supabase.from('profile_location').upsert({
        profile_id: profileId,
        city: details.workCity,
        state: 'Maharashtra',
        country: 'India',
        residency_status: 'Citizen',
      });
    }

    return { success: true, profileId };
  } catch (err: any) {
    console.warn('syncCareerDetailsToSupabase exception:', err);
    return { success: false, error: err?.message };
  }
}

/**
 * Persists family values, structure, parents' status/occupations, and native place to profile_family.
 */
export async function syncFamilyDetailsToSupabase(details: {
  familyValues?: string;
  familyType: string;
  economicStatus?: string;
  fatherOccupation?: string;
  motherOccupation?: string;
  nativePlace?: string;
}): Promise<SaveProfileResult> {
  if (!isSupabaseConfigured) return { success: true };

  try {
    const profileId = await getActiveProfileId();
    if (!profileId) return { success: true };

    const { error } = await supabase.from('profile_family').upsert({
      profile_id: profileId,
      family_values: details.familyValues || 'Traditional & Deen-centered',
      family_type: details.familyType || 'Nuclear',
      economic_status: details.economicStatus || 'Middle Class',
      father_alive: true,
      father_occupation: details.fatherOccupation || '',
      mother_alive: true,
      mother_occupation: details.motherOccupation || '',
      native_place: details.nativePlace || '',
    });

    if (error) {
      console.warn('syncFamilyDetailsToSupabase error:', error.message);
      return { success: false, error: error.message };
    }

    return { success: true, profileId };
  } catch (err: any) {
    console.warn('syncFamilyDetailsToSupabase exception:', err);
    return { success: false, error: err?.message };
  }
}

/**
 * Persists matrimonial partner expectations (age range, marital statuses, religious traditions) to partner_preferences.
 */
export async function syncPartnerPreferencesToSupabase(prefs: {
  minAge: number;
  maxAge: number;
  maritalStatuses?: string[];
  sects?: string[];
  minEducation?: string;
  minIncomeRange?: string;
  preferredCities?: string[];
}): Promise<SaveProfileResult> {
  if (!isSupabaseConfigured) return { success: true };

  try {
    const profileId = await getActiveProfileId();
    if (!profileId) return { success: true };

    const { error } = await supabase.from('partner_preferences').upsert({
      profile_id: profileId,
      min_age: prefs.minAge,
      max_age: prefs.maxAge,
      marital_statuses:
        prefs.maritalStatuses && prefs.maritalStatuses.length > 0
          ? prefs.maritalStatuses
          : ['never_married'],
      religions: ['Islam'],
      sects: prefs.sects && prefs.sects.length > 0 ? prefs.sects : ['Sunni'],
      min_education: prefs.minEducation || null,
      min_income_range: prefs.minIncomeRange || null,
      preferred_cities: prefs.preferredCities || [],
      preferred_countries: ['India'],
    });

    if (error) {
      console.warn('syncPartnerPreferencesToSupabase error:', error.message);
      return { success: false, error: error.message };
    }

    return { success: true, profileId };
  } catch (err: any) {
    console.warn('syncPartnerPreferencesToSupabase exception:', err);
    return { success: false, error: err?.message };
  }
}

/**
 * Queries discoverable curated matches from Supabase PostgreSQL.
 * Falls back to canonical high-fidelity mock profiles when no database rows are seeded.
 */
export async function getDiscoverableProfiles(options?: {
  gender?: 'male' | 'female';
  sect?: string;
}): Promise<MatrimonialProfile[]> {
  if (!isSupabaseConfigured) {
    return mockCuratedMatches;
  }

  try {
    let query = supabase
      .from('profiles')
      .select(`
        id,
        gender,
        is_verified,
        profile_basic (*),
        profile_physical (*),
        profile_religion (*),
        profile_education (*),
        profile_career (*),
        profile_location (*),
        photos (*)
      `)
      .eq('is_discoverable', true)
      .limit(20);

    if (options?.gender) {
      query = query.eq('gender', options.gender);
    }

    const { data, error } = await query;
    if (error || !data || data.length === 0) {
      // Seeded mock profiles maintain uninterrupted UI preview
      return mockCuratedMatches;
    }

    return data.map((row) => {
      const basic = Array.isArray(row.profile_basic) ? row.profile_basic[0] : row.profile_basic;
      const physical = Array.isArray(row.profile_physical) ? row.profile_physical[0] : row.profile_physical;
      const rel = Array.isArray(row.profile_religion) ? row.profile_religion[0] : row.profile_religion;
      const edu = Array.isArray(row.profile_education) ? row.profile_education[0] : row.profile_education;
      const career = Array.isArray(row.profile_career) ? row.profile_career[0] : row.profile_career;
      const loc = Array.isArray(row.profile_location) ? row.profile_location[0] : row.profile_location;
      const photoList = Array.isArray(row.photos) ? row.photos : (row.photos ? [row.photos] : []);
      const primaryPhoto = photoList.find((p: any) => p.is_primary) || photoList[0];

      const heightCm = physical?.height_cm || 165;
      const heightFt = Math.floor(heightCm / 30.48);
      const heightIn = Math.round((heightCm % 30.48) / 2.54);

      return {
        id: row.id,
        name: basic?.display_name || basic?.full_name || 'Prospect',
        displayName: basic?.display_name || 'Prospect',
        gender: row.gender,
        age: basic?.date_of_birth ? calculateAge(basic.date_of_birth) : 26,
        dob: basic?.date_of_birth || '2000-01-01',
        height: `${heightFt}' ${heightIn}" (${heightCm} cm)`,
        maritalStatus: basic?.marital_status || 'Never Married',
        sect: rel?.sect || 'Sunni',
        schoolOfThought: rel?.school_of_thought || 'Hanafi',
        community: rel?.community || 'Sunni',
        motherTongue: basic?.mother_tongue || 'Urdu',
        location: loc ? `${loc.city}, ${loc.state}` : 'Mumbai, Maharashtra',
        residency: loc?.residency_status || 'Citizen (India)',
        hometown: loc?.hometown_state || 'Origin State',
        education: edu?.highest_qualification || 'Graduate',
        profession: career?.job_title || 'Professional',
        employer: career?.employer || 'Organization',
        income: career?.annual_income_range || '₹10 - ₹15 Lakhs',
        prayer: rel?.prayer_frequency || 'Always (5 times daily)',
        quran: rel?.quran_practice || 'Daily reflection',
        fasting: rel?.fasting_practice || 'Ramadan regularly',
        halal: rel?.halal_dietary_practice || 'Strictly Halal',
        attire: rel?.attire_modesty || 'Modest attire',
        familyValues: 'Traditional & Deen-centered',
        familyType: 'Nuclear',
        economicStatus: 'Middle Class',
        fatherOccupation: 'Retired / Business',
        motherOccupation: 'Homemaker',
        siblings: [],
        relocation: 'Open to discussion',
        livingArrangement: 'Open to discussion',
        careerAfterMarriage: 'Open to discussion',
        bio: basic?.bio || 'Seeking a practicing, family-oriented partner with pure intentions.',
        avatar: primaryPhoto?.storage_path_original || primaryPhoto?.storage_path_blurred || 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=500',
        photoPrivacy: (primaryPhoto?.privacy_status as any) || 'blurred',
        isPhotoBlurred: primaryPhoto?.privacy_status === 'blurred' || !primaryPhoto,
        hasVoiceIntro: false,
        voiceDuration: 0,
        isVerified: row.is_verified ?? false,
        hasWaliChaperone: true,
      };
    });
  } catch (err) {
    console.warn('getDiscoverableProfiles exception:', err);
    return mockCuratedMatches;
  }
}

function calculateAge(dobString: string): number {
  try {
    const birthDate = new Date(dobString);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return Math.max(18, age);
  } catch {
    return 26;
  }
}
