// ====================================================================
// DONO JAHA (D O N O   J A H A)
// Master TypeScript Domain Types
// ====================================================================

export type Gender = 'male' | 'female';

export type ProfileStatus =
  | 'draft'
  | 'pending_review'
  | 'approved'
  | 'rejected'
  | 'suspended'
  | 'deleted';

export type PhotoPrivacy =
  | 'visible'
  | 'blurred'
  | 'private'
  | 'match_only'
  | 'request_required';

export type MaritalStatus =
  | 'Never Married'
  | 'Divorced'
  | 'Widowed'
  | 'Awaiting Divorce'
  | 'Annulled';

export interface Sibling {
  relation: string;
  age: number;
  status: string;
  occupation: string;
}

export interface MatrimonialProfile {
  id: string;
  name: string;
  displayName: string;
  gender: Gender;
  age: number;
  dob: string;
  height: string;
  maritalStatus: MaritalStatus;
  sect: string;
  schoolOfThought: string;
  community: string;
  motherTongue: string;
  location: string;
  residency: string;
  hometown: string;
  education: string;
  profession: string;
  employer?: string;
  income: string;
  prayer: string;
  quran: string;
  fasting: string;
  halal: string;
  attire: string;
  familyValues: string;
  familyType: string;
  economicStatus: string;
  fatherOccupation: string;
  motherOccupation: string;
  siblings: Sibling[];
  relocation: string;
  livingArrangement: string;
  careerAfterMarriage: string;
  bio: string;
  avatar: string;
  photoPrivacy: PhotoPrivacy;
  isPhotoBlurred: boolean;
  hasVoiceIntro: boolean;
  voiceDuration: number;
  voicePrompt?: string;
  voiceStoragePath?: string;
  isVerified: boolean;
  hasWaliChaperone: boolean;
  waliName?: string;
  waliRelation?: string;
}

export interface ChatMessage {
  id: string;
  conversationId: string;
  senderId: string;
  senderName: string;
  type: 'text' | 'voice' | 'system';
  content: string;
  voiceDuration?: string;
  voiceStoragePath?: string;
  timestamp: string;
  isSentByMe: boolean;
  status?: 'sending' | 'sent' | 'failed';
}

export interface MatrimonialInterest {
  id: string;
  senderProfileId: string;
  receiverProfileId: string;
  status: 'sent' | 'accepted' | 'rejected' | 'withdrawn' | 'expired';
  introductoryNote?: string;
  sentAt: string;
  respondedAt?: string;
  profile?: MatrimonialProfile;
}

export interface PartnerPreferenceState {
  minAge: number;
  maxAge: number;
  minHeightCm: number;
  maxHeightCm: number;
  maritalStatuses: string[];
  sects: string[];
  communities: string[];
  locations: string[];
  education: string;
  prayerFrequency: string[];
  relocation: string[];
  hardVsSoftPriority: Record<string, 'must_have' | 'preferred' | 'open_to'>;
}
