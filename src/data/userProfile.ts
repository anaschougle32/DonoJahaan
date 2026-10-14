// ====================================================================
// DONO JAHA (D O N O   J A H A)
// Centralized Current User Profile & Profile Completion Logic
// Single source of truth for current logged-in user state & metrics
// ====================================================================

import { useState, useEffect, useMemo } from 'react';

export interface UserProfileState {
  id: string;
  name: string;
  displayName: string;
  age: number;
  gender: 'male' | 'female';
  dob: string;
  location: string;
  city: string;
  state: string;
  country: string;
  profession: string;
  employer: string;
  education: string;
  degree: string;
  height: string;
  maritalStatus: string;
  motherTongue: string;
  sect: string;
  schoolOfThought: string;
  avatar: string;
  isVerified: boolean;
  hasPhoto: boolean;
  hasPhysicalDetails: boolean;
  hasEducationDetails: boolean;
  hasProfessionDetails: boolean;
  hasVoiceIntro: boolean;
  voiceDuration?: number;
  voiceUri?: string;
  hasFamilyDetails: boolean;
  familyType?: string;
  familyValues?: string;
  fatherOccupation?: string;
  motherOccupation?: string;
  hasPartnerPreferences: boolean;
  partnerMinAge?: number;
  partnerMaxAge?: number;
  partnerEducation?: string;
  partnerSect?: string;
  hasSelfieVerification: boolean;
  bio: string;
  email?: string;
  phone?: string;
}

export const currentUserProfile: UserProfileState = {
  id: 'user-anas',
  name: 'Anas Khan',
  displayName: 'Anas K., 28',
  age: 28,
  gender: 'male',
  dob: '1998-06-15',
  location: 'Mumbai, Maharashtra',
  city: 'Mumbai',
  state: 'Maharashtra',
  country: 'India',
  profession: 'Software Architect',
  employer: 'Tech Innovations Ltd',
  education: 'B.Tech Computer Science',
  degree: 'Bachelor of Technology',
  height: `5' 11" (180 cm)`,
  maritalStatus: 'Never Married',
  motherTongue: 'Urdu',
  sect: 'Sunni',
  schoolOfThought: 'Hanafi',
  avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
  isVerified: true,
  hasPhoto: true,
  hasPhysicalDetails: true,
  hasEducationDetails: true,
  hasProfessionDetails: true,
  hasVoiceIntro: false,
  hasFamilyDetails: false,
  hasPartnerPreferences: false,
  hasSelfieVerification: false,
  bio: 'Seeking an intentional, practicing Muslimah who values faith, family harmony, and continuous spiritual growth. Cherish calm evenings with books, masjid reflections, and technological innovation.',
};

export interface ProfileCompletionMetrics {
  percentage: number;
  completedCount: number;
  totalCount: number;
  isLive: boolean;
  isComplete: boolean;
  nextStepTitle: string;
  nextStepRoute: string;
  steps: Array<{
    id: string;
    title: string;
    completed: boolean;
    route: string;
    weight: number;
  }>;
}

/**
 * Calculates deterministic profile completion percentage and next action.
 * Centralized Canonical Calculation (Section 39):
 * 1. Basic Info (15%)
 * 2. Physical Details (10%)
 * 3. Education (10%)
 * 4. Profession (10%)
 * 5. Family Details (10%)
 * 6. Partner Preferences (15%)
 * 7. Profile Photos (10%)
 * 8. Voice Introduction (10%)
 * 9. Identity Verification (10%)
 * Total = 100%
 */
export function getProfileCompletionMetrics(
  profile: UserProfileState = currentUserProfile
): ProfileCompletionMetrics {
  const steps = [
    {
      id: 'basic_info',
      title: 'Basic Info & Faith',
      completed: Boolean(profile.name && profile.gender && profile.sect && profile.location),
      route: 'Questionnaire',
      weight: 15,
    },
    {
      id: 'physical_details',
      title: 'Physical & Height Details',
      completed: Boolean(profile.hasPhysicalDetails && profile.height),
      route: 'PhysicalDetails',
      weight: 10,
    },
    {
      id: 'education_details',
      title: 'Education & Qualification',
      completed: Boolean(profile.hasEducationDetails && profile.education),
      route: 'EducationDetails',
      weight: 10,
    },
    {
      id: 'profession_details',
      title: 'Profession & Employment',
      completed: Boolean(profile.hasProfessionDetails && profile.profession),
      route: 'ProfessionDetails',
      weight: 10,
    },
    {
      id: 'family_details',
      title: 'Family Background & Values',
      completed: profile.hasFamilyDetails,
      route: 'FamilyDetails',
      weight: 10,
    },
    {
      id: 'partner_preferences',
      title: 'Partner Preferences',
      completed: profile.hasPartnerPreferences,
      route: 'PartnerPreferences',
      weight: 15,
    },
    {
      id: 'profile_photos',
      title: 'Profile Photos',
      completed: profile.hasPhoto,
      route: 'ProfilePhotos',
      weight: 10,
    },
    {
      id: 'voice_intro',
      title: 'Voice Introduction',
      completed: profile.hasVoiceIntro,
      route: 'VoiceIntro',
      weight: 10,
    },
    {
      id: 'selfie_verification',
      title: 'Selfie Identity Verification',
      completed: profile.hasSelfieVerification,
      route: 'SelfieVerification',
      weight: 10,
    },
  ];

  const totalCount = steps.length;
  const completedCount = steps.filter((s) => s.completed).length;

  let percentage = 0;
  for (const step of steps) {
    if (step.completed) {
      percentage += step.weight;
    }
  }

  const incompleteStep = steps.find((s) => !s.completed);

  return {
    percentage,
    completedCount,
    totalCount,
    isLive: true,
    isComplete: percentage >= 100,
    nextStepTitle: incompleteStep ? incompleteStep.title : 'All sections completed',
    nextStepRoute: incompleteStep ? incompleteStep.route : 'ProfileTab',
    steps,
  };
}

type ProfileListener = (profile: UserProfileState) => void;
const listeners = new Set<ProfileListener>();

/**
 * Subscribe to real-time profile mutations across screens.
 */
export function subscribeToUserProfile(listener: ProfileListener): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

/**
 * Updates current in-memory user profile state and notifies all subscriber components.
 */
export function updateCurrentUserProfile(partial: Partial<UserProfileState>): UserProfileState {
  Object.assign(currentUserProfile, partial);
  const snapshot = { ...currentUserProfile };
  listeners.forEach((listener) => {
    try {
      listener(snapshot);
    } catch (e) {
      console.warn('Error notifying profile listener:', e);
    }
  });
  return snapshot;
}

/**
 * Reactive React hook for accessing current profile and reactive completion metrics.
 */
export function useUserProfile() {
  const [profile, setProfile] = useState<UserProfileState>({ ...currentUserProfile });

  useEffect(() => {
    return subscribeToUserProfile((updated) => {
      setProfile(updated);
    });
  }, []);

  const metrics = useMemo(() => getProfileCompletionMetrics(profile), [profile]);

  return {
    profile,
    metrics,
    updateProfile: updateCurrentUserProfile,
  };
}

