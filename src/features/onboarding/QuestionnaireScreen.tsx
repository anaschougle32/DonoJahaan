import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
  FlatList,
  Platform,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { colors, radii, shadows, spacing, typography } from '../../theme/tokens';
import { InputField } from '../../components/common/InputField';
import { SelectableChip } from '../../components/common/SelectableChip';
import { SelectionCard } from '../../components/common/SelectionCard';
import { PrimaryButton } from '../../components/common/PrimaryButton';
import {
  INDIAN_STATES,
  CITIES,
  StateItem,
  CityItem,
} from '../../data/lookupData';
import { updateCurrentUserProfile } from '../../data/userProfile';
import { syncBasicProfileToSupabase } from '../../services/profileService';

interface QuestionnaireScreenProps {
  onComplete?: () => void;
  onBack?: () => void;
  onExit?: () => void;
}

export const QuestionnaireScreen: React.FC<QuestionnaireScreenProps> = ({
  onComplete,
  onBack,
  onExit,
}) => {
  const insets = useSafeAreaInsets();
  const [currentStep, setCurrentStep] = useState(0);

  // Phase 1: 6 Essential Discoverability Questions
  const [formData, setFormData] = useState({
    // Step 1: Who is this for & Gender
    createdBy: 'myself' as 'myself' | 'daughter' | 'son' | 'sibling',
    gender: 'female' as 'male' | 'female',
    siblingRelation: 'sister' as 'sister' | 'brother',
    lookingFor: 'groom',

    // Step 2: Real Name & Verified Email
    firstName: 'Umra',
    lastName: 'Shakeel',
    email: 'umra.shakeel@example.com',

    // Step 3: Date of Birth & Age
    dobDay: '18',
    dobMonth: '02',
    dobYear: '2000',

    // Step 4: Religion, Sect & Madhhab
    religion: 'Muslim',
    sect: 'Sunni',
    schoolOfThought: 'Hanafi',

    // Step 5: Searchable Location (State & City Lookup IDs)
    stateId: 'state-up',
    stateName: 'Uttar Pradesh',
    cityId: 'city-noida',
    cityName: 'Noida',
    subCommunity: 'Sunni',

    // Step 6: Marital Status & Mother Tongue
    maritalStatus: 'Never Married',
    motherTongue: 'Urdu',
  });

  // Modal State for Searchable Location
  const [stateModalVisible, setStateModalVisible] = useState(false);
  const [stateSearchQuery, setStateSearchQuery] = useState('');

  const [cityModalVisible, setCityModalVisible] = useState(false);
  const [citySearchQuery, setCitySearchQuery] = useState('');

  const totalSteps = 6;
  const progressPercent = Math.round(((currentStep + 1) / totalSteps) * 100);

  const calculateAge = () => {
    const year = parseInt(formData.dobYear, 10);
    if (!isNaN(year) && year > 1940 && year < 2015) {
      return 2026 - year;
    }
    return 26;
  };

  // Filtered States based on search
  const filteredStates = useMemo(() => {
    if (!stateSearchQuery.trim()) return INDIAN_STATES;
    return INDIAN_STATES.filter((s) =>
      s.name.toLowerCase().includes(stateSearchQuery.toLowerCase())
    );
  }, [stateSearchQuery]);

  // Filtered Cities based on selected state and search query
  const filteredCities = useMemo(() => {
    let list = CITIES;
    if (formData.stateId) {
      const stateCities = CITIES.filter((c) => c.stateId === formData.stateId);
      if (stateCities.length > 0) {
        list = stateCities;
      }
    }
    if (!citySearchQuery.trim()) return list;
    return list.filter((c) =>
      c.name.toLowerCase().includes(citySearchQuery.toLowerCase())
    );
  }, [formData.stateId, citySearchQuery]);

  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Phase 1 complete -> Profile is LIVE / ACTIVE -> Milestone Screen
      const fullName = `${formData.firstName} ${formData.lastName}`.trim();
      const locationString =
        formData.cityName && formData.stateName
          ? `${formData.cityName}, ${formData.stateName}`
          : 'Mumbai, Maharashtra';

      const updatedData = {
        name: fullName || 'Umra Shakeel',
        displayName: `${formData.firstName} ${formData.lastName ? formData.lastName[0] + '.' : ''}`,
        gender: formData.gender,
        dob: `${formData.dobYear}-${formData.dobMonth}-${formData.dobDay}`,
        sect: formData.sect,
        schoolOfThought: formData.schoolOfThought,
        city: formData.cityName || 'Mumbai',
        state: formData.stateName || 'Maharashtra',
        location: locationString,
        motherTongue: formData.motherTongue,
      };

      updateCurrentUserProfile(updatedData);

      // Asynchronously persist to Supabase if authenticated / configured
      syncBasicProfileToSupabase(updatedData).catch((err) => {
        console.warn('Background Supabase profile sync notice:', err);
      });

      onComplete?.();
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    } else {
      (onBack || onExit)?.();
    }
  };

  const getNameTitle = () => {
    if (formData.createdBy === 'myself') return 'Your name';
    if (formData.gender === 'female') return 'Her name';
    return 'His name';
  };

  return (
    <View style={[styles.container, { paddingTop: Math.max(insets.top, 14) }]}>
      {/* 1. Header with Progress Indicator & Back Button */}
      <View style={styles.topHeader}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={handlePrev}
          activeOpacity={0.7}
        >
          <Ionicons name="arrow-back" size={22} color="#241B33" />
        </TouchableOpacity>

        <View style={styles.progressTrack}>
          <View style={[styles.progressFill, { width: `${progressPercent}%` }]} />
        </View>

        <View style={styles.stepBadge}>
          <Text style={styles.stepBadgeText}>
            {currentStep + 1} of {totalSteps}
          </Text>
        </View>
      </View>

      {/* Phase 1 Badge Indicator */}
      <View style={styles.phaseIndicatorRow}>
        <View style={styles.phaseDot} />
        <Text style={styles.phaseLabel}>PHASE 1: ESSENTIAL PROFILE SETUP</Text>
      </View>

      {/* 2. Scrollable Question Content (One focused topic per screen) */}
      <ScrollView
        contentContainerStyle={styles.scrollBody}
        showsVerticalScrollIndicator={false}
      >
        {/* ========================================================
            SCREEN 1: Profile Creator & Conditional Gender Flow (Section 6)
        ======================================================== */}
        {currentStep === 0 && (
          <View style={styles.stepBlock}>
            <View style={styles.categoryIconCircle}>
              <Ionicons name="person" size={24} color="#6A3794" />
            </View>

            <Text style={styles.screenHeading}>Who is this profile for?</Text>
            <Text style={styles.screenSubheading}>
              Select who you are creating this matrimonial profile for.
            </Text>

            <View style={styles.selectionGroup}>
              {[
                { id: 'myself', label: 'Myself', desc: 'Looking for my own spouse', icon: 'person' },
                { id: 'daughter', label: 'My Daughter', desc: 'Parent or mother creating profile', icon: 'family-restroom' },
                { id: 'son', label: 'My Son', desc: 'Parent creating proposal profile', icon: 'family-restroom' },
                { id: 'sibling', label: 'My Sibling', desc: 'Brother or sister representing', icon: 'diversity-1' },
              ].map((item) => (
                <SelectionCard
                  key={item.id}
                  title={item.label}
                  description={item.desc}
                  icon={item.icon as any}
                  selected={formData.createdBy === item.id}
                  onPress={() => {
                    if (item.id === 'daughter') {
                      setFormData({
                        ...formData,
                        createdBy: 'daughter',
                        gender: 'female',
                        lookingFor: 'groom',
                      });
                    } else if (item.id === 'son') {
                      setFormData({
                        ...formData,
                        createdBy: 'son',
                        gender: 'male',
                        lookingFor: 'bride',
                      });
                    } else if (item.id === 'sibling') {
                      setFormData({
                        ...formData,
                        createdBy: 'sibling',
                        gender: formData.siblingRelation === 'sister' ? 'female' : 'male',
                        lookingFor: formData.siblingRelation === 'sister' ? 'groom' : 'bride',
                      });
                    } else {
                      setFormData({
                        ...formData,
                        createdBy: 'myself',
                        lookingFor: formData.gender === 'female' ? 'groom' : 'bride',
                      });
                    }
                  }}
                />
              ))}
            </View>

            {/* CONDITIONAL QUESTION: If Myself -> Ask What is your gender? (Male / Female) */}
            {formData.createdBy === 'myself' && (
              <View style={styles.conditionalBlock}>
                <Text style={styles.fieldSectionTitle}>What is your gender?</Text>
                <View style={styles.twoColRow}>
                  <TouchableOpacity
                    style={[
                      styles.genderBox,
                      formData.gender === 'male' && styles.genderBoxActive,
                    ]}
                    onPress={() => setFormData({ ...formData, gender: 'male', lookingFor: 'bride' })}
                    activeOpacity={0.8}
                  >
                    <Ionicons
                      name="man"
                      size={24}
                      color={formData.gender === 'male' ? '#FFFFFF' : '#6A3794'}
                    />
                    <Text
                      style={[
                        styles.genderText,
                        formData.gender === 'male' && styles.genderTextActive,
                      ]}
                    >
                      Male
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[
                      styles.genderBox,
                      formData.gender === 'female' && styles.genderBoxActive,
                    ]}
                    onPress={() => setFormData({ ...formData, gender: 'female', lookingFor: 'groom' })}
                    activeOpacity={0.8}
                  >
                    <Ionicons
                      name="woman"
                      size={24}
                      color={formData.gender === 'female' ? '#FFFFFF' : '#6A3794'}
                    />
                    <Text
                      style={[
                        styles.genderText,
                        formData.gender === 'female' && styles.genderTextActive,
                      ]}
                    >
                      Female
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}

            {/* CONDITIONAL QUESTION: If My Sibling -> Ask sister or brother */}
            {formData.createdBy === 'sibling' && (
              <View style={styles.conditionalBlock}>
                <Text style={styles.fieldSectionTitle}>
                  Is this profile for your sister or brother?
                </Text>
                <View style={styles.twoColRow}>
                  <TouchableOpacity
                    style={[
                      styles.genderBox,
                      formData.siblingRelation === 'sister' && styles.genderBoxActive,
                    ]}
                    onPress={() =>
                      setFormData({
                        ...formData,
                        siblingRelation: 'sister',
                        gender: 'female',
                        lookingFor: 'groom',
                      })
                    }
                    activeOpacity={0.8}
                  >
                    <Ionicons
                      name="woman"
                      size={24}
                      color={formData.siblingRelation === 'sister' ? '#FFFFFF' : '#6A3794'}
                    />
                    <Text
                      style={[
                        styles.genderText,
                        formData.siblingRelation === 'sister' && styles.genderTextActive,
                      ]}
                    >
                      Sister
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[
                      styles.genderBox,
                      formData.siblingRelation === 'brother' && styles.genderBoxActive,
                    ]}
                    onPress={() =>
                      setFormData({
                        ...formData,
                        siblingRelation: 'brother',
                        gender: 'male',
                        lookingFor: 'bride',
                      })
                    }
                    activeOpacity={0.8}
                  >
                    <Ionicons
                      name="man"
                      size={24}
                      color={formData.siblingRelation === 'brother' ? '#FFFFFF' : '#6A3794'}
                    />
                    <Text
                      style={[
                        styles.genderText,
                        formData.siblingRelation === 'brother' && styles.genderTextActive,
                      ]}
                    >
                      Brother
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </View>
        )}

        {/* ========================================================
            SCREEN 2: Basic Identity (Name + Email)
        ======================================================== */}
        {currentStep === 1 && (
          <View style={styles.stepBlock}>
            <View style={styles.categoryIconCircle}>
              <Ionicons name="id-card" size={24} color="#6A3794" />
            </View>

            <Text style={styles.screenHeading}>{getNameTitle()}</Text>
            <Text style={styles.screenSubheading}>
              Real names ensure genuine matrimonial sincerity and verified profiles.
            </Text>

            <InputField
              label="First name"
              value={formData.firstName}
              placeholder="e.g. Umra"
              onChangeText={(text) => setFormData({ ...formData, firstName: text })}
              style={styles.fieldSpacing}
            />

            <InputField
              label="Last name"
              value={formData.lastName}
              placeholder="e.g. Shakeel"
              onChangeText={(text) => setFormData({ ...formData, lastName: text })}
              style={styles.fieldSpacing}
            />

            <InputField
              label="Email address"
              value={formData.email}
              placeholder="e.g. name@domain.com"
              keyboardType="email-address"
              autoCapitalize="none"
              onChangeText={(text) => setFormData({ ...formData, email: text })}
              helperText="For account security & confidential match alerts"
              style={styles.fieldSpacing}
            />
          </View>
        )}

        {/* ========================================================
            SCREEN 3: Date of Birth & Age
        ======================================================== */}
        {currentStep === 2 && (
          <View style={styles.stepBlock}>
            <View style={styles.categoryIconCircle}>
              <Ionicons name="calendar" size={24} color="#6A3794" />
            </View>

            <Text style={styles.screenHeading}>Date of birth</Text>
            <Text style={styles.screenSubheading}>
              Used to calculate accurate age for matrimonial compatibility.
            </Text>

            <View style={styles.dobContainer}>
              <View style={styles.dobColSmall}>
                <InputField
                  label="Day"
                  value={formData.dobDay}
                  placeholder="DD"
                  keyboardType="numeric"
                  maxLength={2}
                  onChangeText={(text) => setFormData({ ...formData, dobDay: text })}
                />
              </View>

              <View style={styles.dobColSmall}>
                <InputField
                  label="Month"
                  value={formData.dobMonth}
                  placeholder="MM"
                  keyboardType="numeric"
                  maxLength={2}
                  onChangeText={(text) => setFormData({ ...formData, dobMonth: text })}
                />
              </View>

              <View style={styles.dobColLarge}>
                <InputField
                  label="Year"
                  value={formData.dobYear}
                  placeholder="YYYY"
                  keyboardType="numeric"
                  maxLength={4}
                  onChangeText={(text) => setFormData({ ...formData, dobYear: text })}
                />
              </View>
            </View>

            {/* Calculated Age Card */}
            <View style={styles.ageBadgeCard}>
              <View style={styles.ageBadgeIconBox}>
                <Ionicons name="gift-outline" size={20} color="#6A3794" />
              </View>
              <View>
                <Text style={styles.ageBadgeTitle}>Calculated Age: {calculateAge()} Years</Text>
                <Text style={styles.ageBadgeSubtitle}>Born in {formData.dobYear || '2000'}</Text>
              </View>
            </View>
          </View>
        )}

        {/* ========================================================
            SCREEN 4: Religion, Sect & Madhhab
        ======================================================== */}
        {currentStep === 3 && (
          <View style={styles.stepBlock}>
            <View style={styles.categoryIconCircle}>
              <MaterialIcons name="auto-awesome" size={24} color="#6A3794" />
            </View>

            <Text style={styles.screenHeading}>Religious community</Text>
            <Text style={styles.screenSubheading}>
              Faith practice and school of jurisprudence guide harmonious matrimonial union.
            </Text>

            <Text style={styles.fieldSectionTitle}>Sect</Text>
            <View style={styles.chipsRow}>
              {['Sunni', 'Shia', 'Other Muslim Tradition'].map((s) => (
                <SelectableChip
                  key={s}
                  label={s}
                  selected={formData.sect === s}
                  onPress={() => setFormData({ ...formData, sect: s })}
                />
              ))}
            </View>

            <Text style={[styles.fieldSectionTitle, { marginTop: 20 }]}>
              School of Jurisprudence (Madhhab)
            </Text>
            <View style={styles.chipsRow}>
              {['Hanafi', 'Shafi`i', 'Maliki', 'Hanbali', 'Ja`fari', 'General Sunni'].map((m) => (
                <SelectableChip
                  key={m}
                  label={m}
                  selected={formData.schoolOfThought === m}
                  onPress={() => setFormData({ ...formData, schoolOfThought: m })}
                />
              ))}
            </View>
          </View>
        )}

        {/* ========================================================
            SCREEN 5: Searchable Location (State & City Lookup)
        ======================================================== */}
        {currentStep === 4 && (
          <View style={styles.stepBlock}>
            <View style={styles.categoryIconCircle}>
              <Ionicons name="location" size={24} color="#6A3794" />
            </View>

            <Text style={styles.screenHeading}>Where do you live?</Text>
            <Text style={styles.screenSubheading}>
              Select your state and city from our verified location directory.
            </Text>

            {/* State Search Selector */}
            <Text style={styles.fieldSectionTitle}>State / Region</Text>
            <TouchableOpacity
              style={styles.searchablePickerBtn}
              onPress={() => setStateModalVisible(true)}
              activeOpacity={0.8}
            >
              <View style={styles.pickerContentRow}>
                <Ionicons name="map-outline" size={20} color="#6A3794" />
                <Text style={styles.pickerValueText}>{formData.stateName}</Text>
              </View>
              <Ionicons name="chevron-forward" size={18} color="#59445F" />
            </TouchableOpacity>

            {/* City Search Selector */}
            <Text style={[styles.fieldSectionTitle, { marginTop: 16 }]}>City / Town</Text>
            <TouchableOpacity
              style={styles.searchablePickerBtn}
              onPress={() => setCityModalVisible(true)}
              activeOpacity={0.8}
            >
              <View style={styles.pickerContentRow}>
                <Ionicons name="business-outline" size={20} color="#6A3794" />
                <Text style={styles.pickerValueText}>{formData.cityName}</Text>
              </View>
              <Ionicons name="chevron-forward" size={18} color="#59445F" />
            </TouchableOpacity>
          </View>
        )}

        {/* ========================================================
            SCREEN 6: Marital Status & Mother Tongue
        ======================================================== */}
        {currentStep === 5 && (
          <View style={styles.stepBlock}>
            <View style={styles.categoryIconCircle}>
              <Ionicons name="heart" size={24} color="#6A3794" />
            </View>

            <Text style={styles.screenHeading}>Marital status & language</Text>
            <Text style={styles.screenSubheading}>
              Essential criteria for suitors reviewing mutual compatibility.
            </Text>

            <Text style={styles.fieldSectionTitle}>Marital Status</Text>
            <View style={styles.chipsRow}>
              {['Never Married', 'Divorced', 'Widowed', 'Awaiting Divorce'].map((status) => (
                <SelectableChip
                  key={status}
                  label={status}
                  selected={formData.maritalStatus === status}
                  onPress={() => setFormData({ ...formData, maritalStatus: status })}
                />
              ))}
            </View>

            <Text style={[styles.fieldSectionTitle, { marginTop: 20 }]}>Mother Tongue</Text>
            <View style={styles.chipsRow}>
              {[
                'Urdu',
                'Hindi',
                'English',
                'Bengali',
                'Gujarati',
                'Tamil',
                'Telugu',
                'Malayalam',
                'Marathi',
                'Kashmiri',
              ].map((lang) => (
                <SelectableChip
                  key={lang}
                  label={lang}
                  selected={formData.motherTongue === lang}
                  onPress={() => setFormData({ ...formData, motherTongue: lang })}
                />
              ))}
            </View>
          </View>
        )}
      </ScrollView>

      {/* 3. Sticky Bottom Action Dock */}
      <View
        style={[
          styles.bottomDock,
          { paddingBottom: Math.max(insets.bottom, 16) },
        ]}
      >
        <PrimaryButton
          title={currentStep === totalSteps - 1 ? 'Save & Make Profile Live 🎉' : 'Save & Continue →'}
          icon="arrow-forward"
          onPress={handleNext}
        />
      </View>

      {/* ========================================================
          MODAL 1: Searchable State Picker
      ======================================================== */}
      <Modal
        visible={stateModalVisible}
        animationType="slide"
        onRequestClose={() => setStateModalVisible(false)}
      >
        <View style={[styles.modalContainer, { paddingTop: Math.max(insets.top, 16) }]}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Select State</Text>
            <TouchableOpacity onPress={() => setStateModalVisible(false)}>
              <Ionicons name="close" size={24} color="#241B33" />
            </TouchableOpacity>
          </View>

          <View style={styles.searchBarRow}>
            <Ionicons name="search" size={18} color="#59445F" />
            <InputField
              value={stateSearchQuery}
              placeholder="Search Indian state..."
              onChangeText={setStateSearchQuery}
              style={{ flex: 1, marginBottom: 0 }}
            />
          </View>

          <FlatList
            data={filteredStates}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => {
              const isSelected = formData.stateId === item.id;
              return (
                <TouchableOpacity
                  style={[styles.modalListItem, isSelected && styles.modalListItemSelected]}
                  onPress={() => {
                    setFormData({
                      ...formData,
                      stateId: item.id,
                      stateName: item.name,
                    });
                    setStateModalVisible(false);
                    setStateSearchQuery('');
                  }}
                >
                  <Text style={[styles.modalListItemText, isSelected && styles.modalListItemTextSelected]}>
                    {item.name}
                  </Text>
                  {isSelected && <Ionicons name="checkmark-circle" size={20} color="#6A3794" />}
                </TouchableOpacity>
              );
            }}
          />
        </View>
      </Modal>

      {/* ========================================================
          MODAL 2: Searchable City Picker
      ======================================================== */}
      <Modal
        visible={cityModalVisible}
        animationType="slide"
        onRequestClose={() => setCityModalVisible(false)}
      >
        <View style={[styles.modalContainer, { paddingTop: Math.max(insets.top, 16) }]}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Select City</Text>
            <TouchableOpacity onPress={() => setCityModalVisible(false)}>
              <Ionicons name="close" size={24} color="#241B33" />
            </TouchableOpacity>
          </View>

          <View style={styles.searchBarRow}>
            <Ionicons name="search" size={18} color="#59445F" />
            <InputField
              value={citySearchQuery}
              placeholder="Search city in state..."
              onChangeText={setCitySearchQuery}
              style={{ flex: 1, marginBottom: 0 }}
            />
          </View>

          <FlatList
            data={filteredCities}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => {
              const isSelected = formData.cityId === item.id;
              return (
                <TouchableOpacity
                  style={[styles.modalListItem, isSelected && styles.modalListItemSelected]}
                  onPress={() => {
                    setFormData({
                      ...formData,
                      cityId: item.id,
                      cityName: item.name,
                    });
                    setCityModalVisible(false);
                    setCitySearchQuery('');
                  }}
                >
                  <Text style={[styles.modalListItemText, isSelected && styles.modalListItemTextSelected]}>
                    {item.name}
                  </Text>
                  {isSelected && <Ionicons name="checkmark-circle" size={20} color="#6A3794" />}
                </TouchableOpacity>
              );
            }}
          />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FDFCFC',
  },
  topHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    gap: 12,
  },
  backButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#F0E6F1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressTrack: {
    flex: 1,
    height: 6,
    backgroundColor: '#DBCADD',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#6A3794',
    borderRadius: 3,
  },
  stepBadge: {
    backgroundColor: '#F0E6F1',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  stepBadgeText: {
    fontFamily: typography.fontFamilies.body,
    fontSize: 12,
    color: '#6A3794',
    fontWeight: '700',
  },
  phaseIndicatorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 6,
    gap: 6,
  },
  phaseDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#6A3794',
  },
  phaseLabel: {
    fontFamily: typography.fontFamilies.body,
    fontSize: 11,
    color: '#6A3794',
    fontWeight: '700',
    letterSpacing: 0.8,
  },
  scrollBody: {
    paddingHorizontal: 20,
    paddingBottom: 40,
    paddingTop: 8,
  },
  stepBlock: {
    marginBottom: 20,
  },
  categoryIconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#F0E6F1',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
  },
  screenHeading: {
    fontFamily: typography.fontFamilies.headline,
    fontSize: 22,
    fontWeight: '700',
    color: '#241B33',
    marginBottom: 6,
  },
  screenSubheading: {
    fontFamily: typography.fontFamilies.body,
    fontSize: 14,
    color: '#59445F',
    lineHeight: 20,
    marginBottom: 20,
  },
  selectionGroup: {
    gap: 10,
    marginBottom: 16,
  },
  conditionalBlock: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#F0E6F1',
  },
  fieldSectionTitle: {
    fontFamily: typography.fontFamilies.heading,
    fontSize: 15,
    fontWeight: '700',
    color: '#241B33',
    marginBottom: 10,
  },
  twoColRow: {
    flexDirection: 'row',
    gap: 12,
  },
  genderBox: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    paddingHorizontal: 12,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: '#DBCADD',
    backgroundColor: '#FFFFFF',
    gap: 8,
  },
  genderBoxActive: {
    borderColor: '#6A3794',
    backgroundColor: '#6A3794',
  },
  genderText: {
    fontFamily: typography.fontFamilies.body,
    fontSize: 14,
    color: '#6A3794',
    fontWeight: '600',
  },
  genderTextActive: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  fieldSpacing: {
    marginBottom: 14,
  },
  dobContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  dobColSmall: {
    flex: 1,
  },
  dobColLarge: {
    flex: 1.5,
  },
  ageBadgeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0E6F1',
    padding: 14,
    borderRadius: 14,
    marginTop: 16,
    gap: 12,
  },
  ageBadgeIconBox: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ageBadgeTitle: {
    fontFamily: typography.fontFamilies.heading,
    fontSize: 14,
    fontWeight: '700',
    color: '#241B33',
  },
  ageBadgeSubtitle: {
    fontFamily: typography.fontFamilies.body,
    fontSize: 12,
    color: '#59445F',
    marginTop: 2,
  },
  chipsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  searchablePickerBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#DBCADD',
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  pickerContentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  pickerValueText: {
    fontFamily: typography.fontFamilies.body,
    fontSize: 15,
    color: '#241B33',
    fontWeight: '500',
  },
  bottomDock: {
    paddingHorizontal: 20,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#F0E6F1',
    backgroundColor: '#FDFCFC',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#FDFCFC',
    paddingHorizontal: 20,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0E6F1',
  },
  modalTitle: {
    fontFamily: typography.fontFamilies.headline,
    fontSize: 18,
    fontWeight: '700',
    color: '#241B33',
  },
  searchBarRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0E6F1',
    borderRadius: 12,
    paddingHorizontal: 12,
    marginVertical: 14,
    gap: 8,
  },
  modalListItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0E6F1',
  },
  modalListItemSelected: {
    backgroundColor: '#F0E6F1',
    borderRadius: 10,
  },
  modalListItemText: {
    fontFamily: typography.fontFamilies.body,
    fontSize: 15,
    color: '#241B33',
  },
  modalListItemTextSelected: {
    fontWeight: '700',
    color: '#6A3794',
  },
});
