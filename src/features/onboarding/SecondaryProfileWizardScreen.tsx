import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
  FlatList,
  Switch,
  Image,
  Alert,
  Platform,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { colors, radii, shadows, spacing, typography } from '../../theme/tokens';
import { InputField } from '../../components/common/InputField';
import { SelectableChip } from '../../components/common/SelectableChip';
import { PrimaryButton } from '../../components/common/PrimaryButton';
import { VoiceStudio } from '../../components/common/VoiceStudio';
import {
  EDUCATION_LOOKUP,
  EducationItem,
  PROFESSION_CATEGORIES,
  PROFESSIONS_LOOKUP,
  ProfessionItem,
  INCOME_RANGES,
  INDIAN_STATES,
  CITIES,
  MARITAL_STATUSES,
  MOTHER_TONGUES,
} from '../../data/lookupData';

interface SecondaryProfileWizardScreenProps {
  onBack?: () => void;
  onFinish?: () => void;
  onOpenSelfieVerification?: () => void;
  initialBatch?: '2A' | '2B' | '2C';
}

export const SecondaryProfileWizardScreen: React.FC<SecondaryProfileWizardScreenProps> = ({
  onBack,
  onFinish,
  onOpenSelfieVerification,
  initialBatch = '2A',
}) => {
  const insets = useSafeAreaInsets();
  const [currentBatch, setCurrentBatch] = useState<'2A' | '2B' | '2C'>(initialBatch);

  // Form State
  const [profileData, setProfileData] = useState({
    // Phase 2A: Personal & Professional
    heightFeet: 5,
    heightInches: 4,
    maritalStatus: 'Never Married',
    motherTongue: 'Urdu',
    educationId: 'edu-mbbs-md',
    educationName: 'M.B.B.S., MD / MS (Doctor)',
    educationCategory: 'Medicine / Healthcare',
    professionId: 'prof-doctor',
    professionName: 'Doctor / Physician (MBBS, MD)',
    professionCategory: 'Medical & Healthcare',

    // Phase 2B: Family & Preferences
    annualIncomeId: 'inc-10-15',
    annualIncomeLabel: '₹10 - ₹15 Lakhs',
    familyStateId: 'state-up',
    familyStateName: 'Uttar Pradesh',
    familyCityId: 'city-lucknow',
    familyCityName: 'Lucknow',
    liveWithFamily: 'Yes',
    familyFinancialStatus: 'High', // 'Elite' | 'High' | 'Middle' | 'Aspiring'
    familyStructure: 'Nuclear', // 'Nuclear' | 'Joint'
    preferredMinAge: 25,
    preferredMaxAge: 32,
    preferredEducationId: 'open-to-all',
    preferredEducationLabel: 'Open to All Qualifications',
    preferredProfessionId: 'open-to-all',
    preferredProfessionLabel: 'Open to All Professions',
    preferredLocationId: 'state-up',
    preferredLocationLabel: 'Uttar Pradesh & Delhi NCR',

    // Phase 2C: Media & Identity
    profilePhotoUri: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600',
    isHayaPhotoVeiled: true,
    hasVoiceIntro: true,
    voiceDurationSeconds: 42,
    isSelfieVerified: false,
  });

  // Modal States
  const [eduModalVisible, setEduModalVisible] = useState(false);
  const [eduSearchQuery, setEduSearchQuery] = useState('');

  const [profModalVisible, setProfModalVisible] = useState(false);
  const [profSearchQuery, setProfSearchQuery] = useState('');
  const [selectedProfCategory, setSelectedProfCategory] = useState<string | null>(null);

  const [prefEduModalVisible, setPrefEduModalVisible] = useState(false);
  const [prefProfModalVisible, setPrefProfModalVisible] = useState(false);

  // Audio Playback Preview State
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [showVoiceStudio, setShowVoiceStudio] = useState(false);

  // Filtered Education
  const filteredEducation = useMemo(() => {
    if (!eduSearchQuery.trim()) return EDUCATION_LOOKUP;
    const q = eduSearchQuery.toLowerCase();
    return EDUCATION_LOOKUP.filter(
      (e) =>
        e.name.toLowerCase().includes(q) ||
        e.shortName.toLowerCase().includes(q) ||
        e.categoryName.toLowerCase().includes(q)
    );
  }, [eduSearchQuery]);

  // Filtered Professions
  const filteredProfessions = useMemo(() => {
    let list = PROFESSIONS_LOOKUP;
    if (selectedProfCategory) {
      list = list.filter((p) => p.categoryId === selectedProfCategory);
    }
    if (!profSearchQuery.trim()) return list;
    const q = profSearchQuery.toLowerCase();
    return list.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.categoryName.toLowerCase().includes(q)
    );
  }, [selectedProfCategory, profSearchQuery]);

  // Photo Upload Handler (Separate from selfie verification)
  const handlePickProfilePhoto = async () => {
    try {
      const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!permission.granted) {
        Alert.alert('Permission Needed', 'Access to gallery is required to choose a profile photo.');
        return;
      }
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 5],
        quality: 0.85,
      });
      if (!result.canceled && result.assets && result.assets.length > 0) {
        setProfileData({ ...profileData, profilePhotoUri: result.assets[0].uri });
      }
    } catch (err) {
      console.warn('Gallery picker error:', err);
    }
  };

  const handleNextBatch = () => {
    if (currentBatch === '2A') {
      setCurrentBatch('2B');
    } else if (currentBatch === '2B') {
      setCurrentBatch('2C');
    } else {
      // Finished all batches!
      onFinish?.();
    }
  };

  const handlePrevBatch = () => {
    if (currentBatch === '2C') {
      setCurrentBatch('2B');
    } else if (currentBatch === '2B') {
      setCurrentBatch('2A');
    } else {
      onBack?.();
    }
  };

  const getProgressPercentage = () => {
    switch (currentBatch) {
      case '2A':
        return 75;
      case '2B':
        return 90;
      case '2C':
        return 100;
    }
  };

  return (
    <View style={[styles.container, { paddingTop: Math.max(insets.top, 14) }]}>
      {/* 1. Header with Milestone Indicator */}
      <View style={styles.topHeader}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={handlePrevBatch}
          activeOpacity={0.7}
        >
          <Ionicons name="arrow-back" size={22} color="#241B33" />
        </TouchableOpacity>

        <View style={styles.headerTitleCol}>
          <Text style={styles.headerPhaseLabel}>
            {currentBatch === '2A'
              ? 'PHASE 2A: ACADEMIC & PROFESSIONAL'
              : currentBatch === '2B'
              ? 'PHASE 2B: FAMILY & PREFERENCES'
              : 'PHASE 2C: MEDIA & VERIFICATION'}
          </Text>
          <View style={styles.progressRail}>
            <View style={[styles.progressFill, { width: `${getProgressPercentage()}%` }]} />
          </View>
        </View>

        <View style={styles.percentBadge}>
          <Text style={styles.percentBadgeText}>{getProgressPercentage()}%</Text>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollBody}
        showsVerticalScrollIndicator={false}
      >
        {/* ========================================================
            BATCH 2A: Height, Marital Status, Education & Profession
        ======================================================== */}
        {currentBatch === '2A' && (
          <View style={styles.batchContainer}>
            <Text style={styles.batchHeading}>Education & Profession</Text>
            <Text style={styles.batchSub}>
              Structured academic and occupational credentials ensure genuine suitor compatibility.
            </Text>

            {/* Height Stepper */}
            <Text style={styles.fieldSectionTitle}>Height</Text>
            <View style={styles.heightPickerRow}>
              <View style={styles.heightValueBox}>
                <Ionicons name="resize-outline" size={20} color="#6A3794" />
                <Text style={styles.heightValueText}>
                  {profileData.heightFeet}' {profileData.heightInches}" (
                  {Math.round((profileData.heightFeet * 12 + profileData.heightInches) * 2.54)} cm)
                </Text>
              </View>

              <View style={styles.heightButtonsWrap}>
                <TouchableOpacity
                  style={styles.stepperBtn}
                  onPress={() => {
                    let totalInches = profileData.heightFeet * 12 + profileData.heightInches - 1;
                    if (totalInches >= 54) {
                      setProfileData({
                        ...profileData,
                        heightFeet: Math.floor(totalInches / 12),
                        heightInches: totalInches % 12,
                      });
                    }
                  }}
                >
                  <Ionicons name="remove" size={18} color="#241B33" />
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.stepperBtn}
                  onPress={() => {
                    let totalInches = profileData.heightFeet * 12 + profileData.heightInches + 1;
                    if (totalInches <= 84) {
                      setProfileData({
                        ...profileData,
                        heightFeet: Math.floor(totalInches / 12),
                        heightInches: totalInches % 12,
                      });
                    }
                  }}
                >
                  <Ionicons name="add" size={18} color="#241B33" />
                </TouchableOpacity>
              </View>
            </View>

            {/* Structured Education Selector (Requirement 6) */}
            <Text style={styles.fieldSectionTitle}>Highest Education (Structured Data)</Text>
            <TouchableOpacity
              style={styles.searchablePickerBtn}
              onPress={() => setEduModalVisible(true)}
              activeOpacity={0.8}
            >
              <View style={styles.pickerContentRow}>
                <Ionicons name="school" size={20} color="#6A3794" />
                <View style={{ flex: 1 }}>
                  <Text style={styles.pickerValueText}>{profileData.educationName}</Text>
                  <Text style={styles.pickerSubText}>{profileData.educationCategory}</Text>
                </View>
              </View>
              <View style={styles.searchPillBadge}>
                <Ionicons name="search" size={14} color="#6A3794" />
                <Text style={styles.searchPillText}>Select</Text>
              </View>
            </TouchableOpacity>

            {/* Structured Profession Selector (Requirement 7) */}
            <Text style={styles.fieldSectionTitle}>Profession (Structured Data)</Text>
            <TouchableOpacity
              style={styles.searchablePickerBtn}
              onPress={() => setProfModalVisible(true)}
              activeOpacity={0.8}
            >
              <View style={styles.pickerContentRow}>
                <Ionicons name="briefcase" size={20} color="#6A3794" />
                <View style={{ flex: 1 }}>
                  <Text style={styles.pickerValueText}>{profileData.professionName}</Text>
                  <Text style={styles.pickerSubText}>{profileData.professionCategory}</Text>
                </View>
              </View>
              <View style={styles.searchPillBadge}>
                <Ionicons name="search" size={14} color="#6A3794" />
                <Text style={styles.searchPillText}>Select</Text>
              </View>
            </TouchableOpacity>

            {/* Milestone Badge Note */}
            <View style={styles.milestoneBox}>
              <Ionicons name="checkmark-circle" size={20} color="#6A3794" />
              <Text style={styles.milestoneText}>
                Batch 2A answers will bring profile completeness to 75%.
              </Text>
            </View>
          </View>
        )}

        {/* ========================================================
            BATCH 2B: Family Details & Partner Preferences
        ======================================================== */}
        {currentBatch === '2B' && (
          <View style={styles.batchContainer}>
            <Text style={styles.batchHeading}>Family & Partner Preferences</Text>
            <Text style={styles.batchSub}>
              Share household context and specify preferences using the same normalized lookup standards.
            </Text>

            {/* Annual Income (Requirement 8) */}
            <Text style={styles.fieldSectionTitle}>Annual Income</Text>
            <View style={styles.chipsWrap}>
              {INCOME_RANGES.map((inc) => (
                <SelectableChip
                  key={inc.id}
                  label={inc.label}
                  selected={profileData.annualIncomeId === inc.id}
                  onPress={() =>
                    setProfileData({
                      ...profileData,
                      annualIncomeId: inc.id,
                      annualIncomeLabel: inc.label,
                    })
                  }
                />
              ))}
            </View>

            {/* Family Financial Status (Shaadi Style: Elite, High, Middle, Aspiring) */}
            <Text style={styles.fieldSectionTitle}>Family Financial Status</Text>
            <View style={styles.chipsWrap}>
              {['Elite', 'High', 'Middle', 'Aspiring'].map((status) => (
                <SelectableChip
                  key={status}
                  label={status}
                  selected={profileData.familyFinancialStatus === status}
                  onPress={() => setProfileData({ ...profileData, familyFinancialStatus: status })}
                />
              ))}
            </View>

            {/* Family Structure */}
            <Text style={styles.fieldSectionTitle}>Family Structure</Text>
            <View style={styles.chipsWrap}>
              {['Nuclear Family', 'Joint Family'].map((str) => (
                <SelectableChip
                  key={str}
                  label={str}
                  selected={profileData.familyStructure === str.split(' ')[0]}
                  onPress={() =>
                    setProfileData({
                      ...profileData,
                      familyStructure: str.split(' ')[0],
                    })
                  }
                />
              ))}
            </View>

            {/* Live with Family */}
            <Text style={styles.fieldSectionTitle}>Live with Family?</Text>
            <View style={styles.chipsWrap}>
              {['Yes, living with family', 'No, living independently'].map((opt) => {
                const val = opt.startsWith('Yes') ? 'Yes' : 'No';
                return (
                  <SelectableChip
                    key={opt}
                    label={opt}
                    selected={profileData.liveWithFamily === val}
                    onPress={() => setProfileData({ ...profileData, liveWithFamily: val })}
                  />
                );
              })}
            </View>

            {/* Partner Preferences (Exact Same Dataset - Requirement 8) */}
            <Text style={[styles.fieldSectionTitle, { marginTop: 24 }]}>
              Partner Education Preference
            </Text>
            <TouchableOpacity
              style={styles.searchablePickerBtn}
              onPress={() => setPrefEduModalVisible(true)}
              activeOpacity={0.8}
            >
              <View style={styles.pickerContentRow}>
                <Ionicons name="school-outline" size={20} color="#6A3794" />
                <Text style={styles.pickerValueText}>{profileData.preferredEducationLabel}</Text>
              </View>
              <Ionicons name="chevron-forward" size={18} color="#59445F" />
            </TouchableOpacity>

            <Text style={styles.fieldSectionTitle}>Partner Profession Preference</Text>
            <TouchableOpacity
              style={styles.searchablePickerBtn}
              onPress={() => setPrefProfModalVisible(true)}
              activeOpacity={0.8}
            >
              <View style={styles.pickerContentRow}>
                <Ionicons name="briefcase-outline" size={20} color="#6A3794" />
                <Text style={styles.pickerValueText}>{profileData.preferredProfessionLabel}</Text>
              </View>
              <Ionicons name="chevron-forward" size={18} color="#59445F" />
            </TouchableOpacity>

            {/* Milestone Badge Note */}
            <View style={styles.milestoneBox}>
              <Ionicons name="sparkles" size={20} color="#6A3794" />
              <Text style={styles.milestoneText}>
                Batch 2B completes 90% of your matrimonial profile!
              </Text>
            </View>
          </View>
        )}

        {/* ========================================================
            BATCH 2C: Profile Photos, Voice Intro & Selfie Verification
            (Separate storage and guarantees!)
        ======================================================== */}
        {currentBatch === '2C' && (
          <View style={styles.batchContainer}>
            <Text style={styles.batchHeading}>Photos, Voice & Verification</Text>
            <Text style={styles.batchSub}>
              Final step! Personalize your matrimonial proposal with modest media and verified badges.
            </Text>

            {/* 1. Profile Photo Flow (Requirement 4) */}
            <Text style={styles.fieldSectionTitle}>Profile Photo</Text>
            <View style={styles.photoUploadCard}>
              <Image
                source={{ uri: profileData.profilePhotoUri }}
                style={[
                  styles.photoThumbnail,
                  profileData.isHayaPhotoVeiled && Platform.OS === 'web' && ({ filter: 'blur(12px)' } as any),
                ]}
                blurRadius={profileData.isHayaPhotoVeiled ? 12 : 0}
              />
              <View style={styles.photoActionsCol}>
                <TouchableOpacity
                  style={styles.changePhotoBtn}
                  onPress={handlePickProfilePhoto}
                  activeOpacity={0.8}
                >
                  <Ionicons name="image" size={16} color="#FFFFFF" />
                  <Text style={styles.changePhotoBtnText}>Choose Photo</Text>
                </TouchableOpacity>

                <Text style={styles.photoGuidelineText}>
                  Matches suitor feed photo. Can be veiled or clear based on your privacy preference.
                </Text>
              </View>
            </View>

            {/* Haya Privacy Toggle Switch */}
            <View style={styles.privacyToggleCard}>
              <View style={{ flex: 1, paddingRight: 10 }}>
                <View style={styles.privacyTitleRow}>
                  <MaterialIcons name="security" size={18} color="#6A3794" />
                  <Text style={styles.privacyCardTitle}>Haya Modesty Photo Protection</Text>
                </View>
                <Text style={styles.privacyCardDesc}>
                  Your image is veiled with a protective filter. Suitors cannot view your original photo without asking and receiving approval.
                </Text>
              </View>

              <Switch
                value={profileData.isHayaPhotoVeiled}
                onValueChange={(val) => setProfileData({ ...profileData, isHayaPhotoVeiled: val })}
                trackColor={{ false: '#DBCADD', true: '#6A3794' }}
                thumbColor="#FFFFFF"
              />
            </View>

            {/* 2. Voice Introduction (Voice intro immediately below photo) */}
            <Text style={styles.fieldSectionTitle}>Voice Introduction (Sunnah / Tahzeeb)</Text>
            {showVoiceStudio ? (
              <View style={{ marginBottom: 16 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                  <Text style={{ ...typography.labelMd, color: colors.primary, fontWeight: '700' }}>Recording Studio</Text>
                  <TouchableOpacity onPress={() => setShowVoiceStudio(false)}>
                    <Text style={{ ...typography.labelSm, color: colors.textMuted }}>Close Studio</Text>
                  </TouchableOpacity>
                </View>
                <VoiceStudio
                  initialDuration={profileData.voiceDurationSeconds}
                  onRecordingComplete={(duration) => {
                    setProfileData({ ...profileData, hasVoiceIntro: true, voiceDurationSeconds: duration });
                    setShowVoiceStudio(false);
                    Alert.alert('Voice Introduction Saved', 'Your halal voice introduction has been updated.');
                  }}
                />
              </View>
            ) : (
              <View style={styles.voiceCard}>
                <TouchableOpacity
                  style={styles.voicePlayBtn}
                  onPress={() => setIsPlayingAudio(!isPlayingAudio)}
                  activeOpacity={0.8}
                >
                  <Ionicons name={isPlayingAudio ? 'pause' : 'play'} size={20} color="#FFFFFF" />
                </TouchableOpacity>

                <View style={{ flex: 1 }}>
                  <Text style={styles.voicePromptTitle}>
                    {isPlayingAudio ? 'Playing Introduction...' : 'Recorded: "Assalamu Alaikum..."'}
                  </Text>
                  <Text style={styles.voiceDurationLabel}>0:{profileData.voiceDurationSeconds} • Recorded</Text>
                </View>

                <TouchableOpacity
                  style={styles.reRecordBtn}
                  onPress={() => setShowVoiceStudio(true)}
                  accessibilityLabel="Record voice introduction"
                >
                  <Ionicons name="mic" size={18} color="#6A3794" />
                </TouchableOpacity>
              </View>
            )}

            {/* 3. DEDICATED SELFIE VERIFICATION (Requirement 3: CRITICAL SEPARATION!) */}
            <Text style={styles.fieldSectionTitle}>Identity Verification</Text>
            <View style={styles.selfieVerificationCard}>
              <View style={styles.selfieIconCircle}>
                <MaterialIcons name="verified-user" size={28} color="#6A3794" />
              </View>

              <Text style={styles.selfieCardTitle}>Verify your profile</Text>
              <Text style={styles.selfieCardDesc}>
                Take a quick selfie to verify that you're a real person.
              </Text>

              {/* Strict Privacy Callout */}
              <View style={styles.strictPrivacyCallout}>
                <Ionicons name="lock-closed" size={14} color="#6A3794" />
                <Text style={styles.strictPrivacyText}>
                  This selfie is only used for verification and won't be shown on your profile.
                </Text>
              </View>

              <TouchableOpacity
                style={styles.takeSelfieCTA}
                onPress={onOpenSelfieVerification}
                activeOpacity={0.88}
              >
                <Ionicons name="camera" size={18} color="#FFFFFF" />
                <Text style={styles.takeSelfieCTAText}>
                  {profileData.isSelfieVerified ? 'Verification Complete (Retake)' : 'Take Verification Selfie'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </ScrollView>

      {/* 3. Sticky Bottom Action Dock */}
      <View style={[styles.bottomDock, { paddingBottom: Math.max(insets.bottom, 16) }]}>
        <PrimaryButton
          title={
            currentBatch === '2A'
              ? 'Save & Continue to Family Details →'
              : currentBatch === '2B'
              ? 'Save & Continue to Media & Verification →'
              : 'Complete Profile & View Matches 🎉'
          }
          onPress={handleNextBatch}
        />
      </View>

      {/* ========================================================
          SEARCH EDUCATION MODAL (Requirement 6)
      ======================================================== */}
      <Modal
        visible={eduModalVisible}
        animationType="slide"
        transparent
        onRequestClose={() => setEduModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalSheet, { paddingTop: Math.max(insets.top, 16) }]}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Search Education</Text>
              <TouchableOpacity
                onPress={() => setEduModalVisible(false)}
                style={styles.modalCloseBtn}
              >
                <Ionicons name="close" size={22} color="#241B33" />
              </TouchableOpacity>
            </View>

            <View style={styles.searchBarBox}>
              <Ionicons name="search" size={18} color="#59445F" />
              <InputField
                value={eduSearchQuery}
                placeholder="Search education, degree, qualification..."
                onChangeText={setEduSearchQuery}
                style={styles.searchBarInput}
              />
              {eduSearchQuery.length > 0 && (
                <TouchableOpacity onPress={() => setEduSearchQuery('')}>
                  <Ionicons name="close-circle" size={18} color="#59445F" />
                </TouchableOpacity>
              )}
            </View>

            <FlatList
              data={filteredEducation}
              keyExtractor={(item) => item.id}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => {
                const isSelected = profileData.educationId === item.id;
                return (
                  <TouchableOpacity
                    style={[styles.modalListItem, isSelected && styles.modalListItemSelected]}
                    onPress={() => {
                      setProfileData({
                        ...profileData,
                        educationId: item.id,
                        educationName: item.name,
                        educationCategory: item.categoryName,
                      });
                      setEduModalVisible(false);
                      setEduSearchQuery('');
                    }}
                  >
                    <View style={{ flex: 1 }}>
                      <Text style={[styles.modalListItemText, isSelected && styles.modalListItemTextSelected]}>
                        {item.name}
                      </Text>
                      <Text style={styles.modalListItemSub}>{item.categoryName}</Text>
                    </View>
                    {isSelected && <Ionicons name="checkmark-circle" size={20} color="#6A3794" />}
                  </TouchableOpacity>
                );
              }}
            />
          </View>
        </View>
      </Modal>

      {/* ========================================================
          SEARCH PROFESSION MODAL (Requirement 7 - Shaadi Reference Layout)
      ======================================================== */}
      <Modal
        visible={profModalVisible}
        animationType="slide"
        transparent
        onRequestClose={() => setProfModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalSheet, { paddingTop: Math.max(insets.top, 16) }]}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Search Profession</Text>
              <TouchableOpacity
                onPress={() => setProfModalVisible(false)}
                style={styles.modalCloseBtn}
              >
                <Ionicons name="close" size={22} color="#241B33" />
              </TouchableOpacity>
            </View>

            <View style={styles.searchBarBox}>
              <Ionicons name="search" size={18} color="#59445F" />
              <InputField
                value={profSearchQuery}
                placeholder="Search profession, job title..."
                onChangeText={setProfSearchQuery}
                style={styles.searchBarInput}
              />
              {profSearchQuery.length > 0 && (
                <TouchableOpacity onPress={() => setProfSearchQuery('')}>
                  <Ionicons name="close-circle" size={18} color="#59445F" />
                </TouchableOpacity>
              )}
            </View>

            {/* Profession Categories Filter Horizontal Row */}
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.categoryScroll}
            >
              <TouchableOpacity
                style={[styles.catFilterPill, !selectedProfCategory && styles.catFilterPillActive]}
                onPress={() => setSelectedProfCategory(null)}
              >
                <Text style={[styles.catFilterText, !selectedProfCategory && styles.catFilterTextActive]}>
                  All
                </Text>
              </TouchableOpacity>
              {PROFESSION_CATEGORIES.map((cat) => (
                <TouchableOpacity
                  key={cat.id}
                  style={[
                    styles.catFilterPill,
                    selectedProfCategory === cat.id && styles.catFilterPillActive,
                  ]}
                  onPress={() => setSelectedProfCategory(cat.id)}
                >
                  <Text
                    style={[
                      styles.catFilterText,
                      selectedProfCategory === cat.id && styles.catFilterTextActive,
                    ]}
                  >
                    {cat.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            <FlatList
              data={filteredProfessions}
              keyExtractor={(item) => item.id}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => {
                const isSelected = profileData.professionId === item.id;
                return (
                  <TouchableOpacity
                    style={[styles.modalListItem, isSelected && styles.modalListItemSelected]}
                    onPress={() => {
                      setProfileData({
                        ...profileData,
                        professionId: item.id,
                        professionName: item.name,
                        professionCategory: item.categoryName,
                      });
                      setProfModalVisible(false);
                      setProfSearchQuery('');
                    }}
                  >
                    <View style={{ flex: 1 }}>
                      <Text style={[styles.modalListItemText, isSelected && styles.modalListItemTextSelected]}>
                        {item.name}
                      </Text>
                      <Text style={styles.modalListItemSub}>{item.categoryName}</Text>
                    </View>
                    {isSelected && <Ionicons name="checkmark-circle" size={20} color="#6A3794" />}
                  </TouchableOpacity>
                );
              }}
            />
          </View>
        </View>
      </Modal>

      {/* ========================================================
          PARTNER PREFERRED EDUCATION MODAL (Requirement 8)
      ======================================================== */}
      <Modal
        visible={prefEduModalVisible}
        animationType="slide"
        transparent
        onRequestClose={() => setPrefEduModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalSheet, { paddingTop: Math.max(insets.top, 16) }]}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Preferred Education</Text>
              <TouchableOpacity
                onPress={() => setPrefEduModalVisible(false)}
                style={styles.modalCloseBtn}
              >
                <Ionicons name="close" size={22} color="#241B33" />
              </TouchableOpacity>
            </View>

            {/* [ Open to All ] Option */}
            <TouchableOpacity
              style={[
                styles.openToAllBtn,
                profileData.preferredEducationId === 'open-to-all' && styles.openToAllBtnActive,
              ]}
              onPress={() => {
                setProfileData({
                  ...profileData,
                  preferredEducationId: 'open-to-all',
                  preferredEducationLabel: 'Open to All Qualifications',
                });
                setPrefEduModalVisible(false);
              }}
            >
              <Ionicons name="checkmark-done" size={18} color="#6A3794" />
              <Text style={styles.openToAllText}>[ Open to All Qualifications ]</Text>
            </TouchableOpacity>

            <FlatList
              data={EDUCATION_LOOKUP}
              keyExtractor={(item) => item.id}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => {
                const isSelected = profileData.preferredEducationId === item.id;
                return (
                  <TouchableOpacity
                    style={[styles.modalListItem, isSelected && styles.modalListItemSelected]}
                    onPress={() => {
                      setProfileData({
                        ...profileData,
                        preferredEducationId: item.id,
                        preferredEducationLabel: item.name,
                      });
                      setPrefEduModalVisible(false);
                    }}
                  >
                    <View style={{ flex: 1 }}>
                      <Text style={[styles.modalListItemText, isSelected && styles.modalListItemTextSelected]}>
                        {item.name}
                      </Text>
                      <Text style={styles.modalListItemSub}>{item.categoryName}</Text>
                    </View>
                    {isSelected && <Ionicons name="checkmark-circle" size={20} color="#6A3794" />}
                  </TouchableOpacity>
                );
              }}
            />
          </View>
        </View>
      </Modal>

      {/* ========================================================
          PARTNER PREFERRED PROFESSION MODAL (Requirement 8)
      ======================================================== */}
      <Modal
        visible={prefProfModalVisible}
        animationType="slide"
        transparent
        onRequestClose={() => setPrefProfModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalSheet, { paddingTop: Math.max(insets.top, 16) }]}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Preferred Profession</Text>
              <TouchableOpacity
                onPress={() => setPrefProfModalVisible(false)}
                style={styles.modalCloseBtn}
              >
                <Ionicons name="close" size={22} color="#241B33" />
              </TouchableOpacity>
            </View>

            {/* [ Open to All ] Option */}
            <TouchableOpacity
              style={[
                styles.openToAllBtn,
                profileData.preferredProfessionId === 'open-to-all' && styles.openToAllBtnActive,
              ]}
              onPress={() => {
                setProfileData({
                  ...profileData,
                  preferredProfessionId: 'open-to-all',
                  preferredProfessionLabel: 'Open to All Professions',
                });
                setPrefProfModalVisible(false);
              }}
            >
              <Ionicons name="checkmark-done" size={18} color="#6A3794" />
              <Text style={styles.openToAllText}>[ Open to All Professions ]</Text>
            </TouchableOpacity>

            <FlatList
              data={PROFESSIONS_LOOKUP}
              keyExtractor={(item) => item.id}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => {
                const isSelected = profileData.preferredProfessionId === item.id;
                return (
                  <TouchableOpacity
                    style={[styles.modalListItem, isSelected && styles.modalListItemSelected]}
                    onPress={() => {
                      setProfileData({
                        ...profileData,
                        preferredProfessionId: item.id,
                        preferredProfessionLabel: item.name,
                      });
                      setPrefProfModalVisible(false);
                    }}
                  >
                    <View style={{ flex: 1 }}>
                      <Text style={[styles.modalListItemText, isSelected && styles.modalListItemTextSelected]}>
                        {item.name}
                      </Text>
                      <Text style={styles.modalListItemSub}>{item.categoryName}</Text>
                    </View>
                    {isSelected && <Ionicons name="checkmark-circle" size={20} color="#6A3794" />}
                  </TouchableOpacity>
                );
              }}
            />
          </View>
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
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 8,
    backgroundColor: '#FDFCFC',
    gap: 12,
  },
  backButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F0E6F1',
  },
  headerTitleCol: {
    flex: 1,
  },
  headerPhaseLabel: {
    fontFamily: typography.fontFamilies.caption,
    fontSize: 10,
    fontWeight: '800',
    color: '#6A3794',
    letterSpacing: 0.8,
    marginBottom: 4,
  },
  progressRail: {
    height: 6,
    backgroundColor: '#F0E6F1',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#6A3794',
    borderRadius: 3,
  },
  percentBadge: {
    backgroundColor: '#F0E6F1',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: radii.pill,
  },
  percentBadgeText: {
    fontFamily: typography.fontFamilies.caption,
    fontSize: 12,
    fontWeight: '700',
    color: '#6A3794',
  },
  scrollBody: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 40,
  },
  batchContainer: {
    marginTop: 4,
  },
  batchHeading: {
    fontFamily: typography.fontFamilies.heading,
    fontSize: 22,
    fontWeight: '800',
    color: '#241B33',
    marginBottom: 6,
  },
  batchSub: {
    fontFamily: typography.fontFamilies.body,
    fontSize: 14,
    color: '#59445F',
    lineHeight: 20,
    marginBottom: 20,
  },
  fieldSectionTitle: {
    fontFamily: typography.fontFamilies.caption,
    fontSize: 13,
    fontWeight: '700',
    color: '#241B33',
    marginTop: 16,
    marginBottom: 10,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  heightPickerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: '#DBCADD',
    borderRadius: 14,
    padding: 14,
    marginBottom: 10,
  },
  heightValueBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  heightValueText: {
    fontFamily: typography.fontFamilies.body,
    fontSize: 16,
    fontWeight: '700',
    color: '#241B33',
  },
  heightButtonsWrap: {
    flexDirection: 'row',
    gap: 8,
  },
  stepperBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F0E6F1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchablePickerBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: '#DBCADD',
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginBottom: 10,
  },
  pickerContentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  pickerValueText: {
    fontFamily: typography.fontFamilies.body,
    fontSize: 15,
    fontWeight: '700',
    color: '#241B33',
  },
  pickerSubText: {
    fontFamily: typography.fontFamilies.caption,
    fontSize: 12,
    color: '#59445F',
    marginTop: 2,
  },
  searchPillBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#F0E6F1',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: radii.pill,
  },
  searchPillText: {
    fontFamily: typography.fontFamilies.caption,
    fontSize: 12,
    fontWeight: '700',
    color: '#6A3794',
  },
  chipsWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 10,
  },
  milestoneBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: '#F0E6F1',
    padding: 14,
    borderRadius: 14,
    marginTop: 20,
  },
  milestoneText: {
    fontFamily: typography.fontFamilies.body,
    fontSize: 13,
    fontWeight: '700',
    color: '#6A3794',
    flex: 1,
  },
  // Media Batch Styles
  photoUploadCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#DBCADD',
    borderRadius: 16,
    padding: 14,
    gap: 14,
    marginBottom: 14,
  },
  photoThumbnail: {
    width: 80,
    height: 100,
    borderRadius: 12,
    backgroundColor: '#F0E6F1',
  },
  photoActionsCol: {
    flex: 1,
    gap: 6,
  },
  changePhotoBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    backgroundColor: '#6A3794',
    paddingVertical: 10,
    borderRadius: 12,
  },
  changePhotoBtnText: {
    fontFamily: typography.fontFamilies.button,
    fontSize: 13,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  photoGuidelineText: {
    fontFamily: typography.fontFamilies.caption,
    fontSize: 11,
    color: '#59445F',
    lineHeight: 15,
  },
  privacyToggleCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#DBCADD',
    borderRadius: 14,
    padding: 14,
    marginBottom: 14,
  },
  privacyTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 4,
  },
  privacyCardTitle: {
    fontFamily: typography.fontFamilies.body,
    fontSize: 14,
    fontWeight: '700',
    color: '#241B33',
  },
  privacyCardDesc: {
    fontFamily: typography.fontFamilies.caption,
    fontSize: 12,
    color: '#59445F',
    lineHeight: 16,
  },
  voiceCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#DBCADD',
    borderRadius: 14,
    padding: 14,
    gap: 12,
    marginBottom: 14,
  },
  voicePlayBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#6A3794',
    alignItems: 'center',
    justifyContent: 'center',
  },
  voicePromptTitle: {
    fontFamily: typography.fontFamilies.body,
    fontSize: 14,
    fontWeight: '700',
    color: '#241B33',
  },
  voiceDurationLabel: {
    fontFamily: typography.fontFamilies.caption,
    fontSize: 12,
    color: '#59445F',
    marginTop: 2,
  },
  reRecordBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F0E6F1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  selfieVerificationCard: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: '#6A3794',
    borderRadius: 18,
    padding: 18,
    alignItems: 'center',
    marginBottom: 20,
    ...shadows.card,
  },
  selfieIconCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#F0E6F1',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  selfieCardTitle: {
    fontFamily: typography.fontFamilies.heading,
    fontSize: 17,
    fontWeight: '800',
    color: '#241B33',
    marginBottom: 4,
  },
  selfieCardDesc: {
    fontFamily: typography.fontFamilies.body,
    fontSize: 13,
    color: '#59445F',
    textAlign: 'center',
    marginBottom: 12,
  },
  strictPrivacyCallout: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#F0E6F1',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 10,
    marginBottom: 14,
  },
  strictPrivacyText: {
    fontFamily: typography.fontFamilies.caption,
    fontSize: 11,
    fontWeight: '700',
    color: '#6A3794',
    flex: 1,
  },
  takeSelfieCTA: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#6A3794',
    width: '100%',
    paddingVertical: 14,
    borderRadius: 14,
  },
  takeSelfieCTAText: {
    fontFamily: typography.fontFamilies.button,
    fontSize: 15,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  bottomDock: {
    paddingHorizontal: 20,
    paddingTop: 10,
    backgroundColor: '#FDFCFC',
    borderTopWidth: 1,
    borderTopColor: '#F0E6F1',
  },
  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(36, 27, 51, 0.6)',
    justifyContent: 'flex-end',
  },
  modalSheet: {
    backgroundColor: '#FDFCFC',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    maxHeight: '88%',
    minHeight: '60%',
    paddingHorizontal: 20,
    paddingBottom: 24,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#F0E6F1',
  },
  modalTitle: {
    fontFamily: typography.fontFamilies.heading,
    fontSize: 18,
    fontWeight: '800',
    color: '#241B33',
  },
  modalCloseBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F0E6F1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchBarBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: '#DBCADD',
    borderRadius: 14,
    paddingHorizontal: 12,
    marginVertical: 12,
    gap: 8,
  },
  searchBarInput: {
    flex: 1,
    marginVertical: 0,
    borderWidth: 0,
    backgroundColor: 'transparent',
    paddingVertical: 10,
    fontSize: 14,
  },
  categoryScroll: {
    gap: 8,
    paddingBottom: 10,
  },
  catFilterPill: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: radii.pill,
    backgroundColor: '#F0E6F1',
  },
  catFilterPillActive: {
    backgroundColor: '#6A3794',
  },
  catFilterText: {
    fontFamily: typography.fontFamilies.caption,
    fontSize: 12,
    fontWeight: '700',
    color: '#59445F',
  },
  catFilterTextActive: {
    color: '#FFFFFF',
  },
  openToAllBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#F0E6F1',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 14,
    marginBottom: 12,
    borderWidth: 1.5,
    borderColor: '#DBCADD',
  },
  openToAllBtnActive: {
    borderColor: '#6A3794',
    backgroundColor: '#DBCADD',
  },
  openToAllText: {
    fontFamily: typography.fontFamilies.body,
    fontSize: 15,
    fontWeight: '800',
    color: '#6A3794',
  },
  modalListItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0E6F1',
    borderRadius: 10,
  },
  modalListItemSelected: {
    backgroundColor: '#F0E6F1',
  },
  modalListItemText: {
    fontFamily: typography.fontFamilies.body,
    fontSize: 15,
    fontWeight: '600',
    color: '#241B33',
  },
  modalListItemTextSelected: {
    fontWeight: '800',
    color: '#6A3794',
  },
  modalListItemSub: {
    fontFamily: typography.fontFamilies.caption,
    fontSize: 12,
    color: '#59445F',
    marginTop: 2,
  },
});
