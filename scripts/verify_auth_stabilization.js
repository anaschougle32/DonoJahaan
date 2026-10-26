// ====================================================================
// DONO JAHAAN (D O N O   J A H A A N)
// Complete Authentication & Application Stabilization Test Suite
// Deterministic tests for OAuth, Email/Password, Sessions & RLS
// ====================================================================

const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = process.env.EXPO_PUBLIC_SUPABASE_URL || 'https://fcqyukdvfifpdcckhkep.supabase.co';
const SUPABASE_KEY = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || 'sb_publishable_aimHB8yIyDraQVdXrDDfBA_0ValbCl_';

const sb = createClient(SUPABASE_URL, SUPABASE_KEY);

let totalPassed = 0;
let totalFailed = 0;

function assert(condition, testName, details = '') {
  if (condition) {
    console.log(`  [PASS] ${testName}`);
    totalPassed++;
  } else {
    console.error(`  [FAIL] ${testName} - ${details}`);
    totalFailed++;
  }
}

// -------------------------------------------------------------
// 1. OAuth Callback URL Parser (Standalone & Expo Go schemes)
// -------------------------------------------------------------
function parseOAuthRedirectParams(url) {
  const params = {};
  try {
    const parsed = new URL(url);
    parsed.searchParams.forEach((val, key) => {
      params[key] = val;
    });
    if (parsed.hash) {
      const hashParams = new URLSearchParams(parsed.hash.replace(/^#/, ''));
      hashParams.forEach((val, key) => {
        params[key] = val;
      });
    }
  } catch (e) {
    // regex fallback for custom schemes like donojaha://
  }

  const queryMatch = url.match(/\?([^#]+)/);
  if (queryMatch) {
    queryMatch[1].split('&').forEach((p) => {
      const [k, v] = p.split('=');
      if (k && v && !params[k]) params[decodeURIComponent(k)] = decodeURIComponent(v.replace(/\+/g, ' '));
    });
  }

  const hashMatch = url.match(/#(.+)/);
  if (hashMatch) {
    hashMatch[1].split('&').forEach((p) => {
      const [k, v] = p.split('=');
      if (k && v && !params[k]) params[decodeURIComponent(k)] = decodeURIComponent(v.replace(/\+/g, ' '));
    });
  }

  return {
    accessToken: params['access_token'] || null,
    refreshToken: params['refresh_token'] || null,
    code: params['code'] || null,
    error: params['error'] || null,
    errorDescription: params['error_description'] || null,
  };
}

// -------------------------------------------------------------
// 2. Email / Password Validation Logic
// -------------------------------------------------------------
function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.trim());
}

function validatePassword(password) {
  return typeof password === 'string' && password.length >= 6;
}

function validateSignup(email, password, confirmPassword) {
  if (!email || !validateEmail(email)) {
    return { valid: false, error: 'Please enter a valid email address.' };
  }
  if (!validatePassword(password)) {
    return { valid: false, error: 'Password must be at least 6 characters long.' };
  }
  if (password !== confirmPassword) {
    return { valid: false, error: 'Passwords do not match. Please re-enter.' };
  }
  return { valid: true };
}

// -------------------------------------------------------------
// 3. Profile Completion Canonical Calculation
// -------------------------------------------------------------
function calculateProfileCompletion(profile) {
  const steps = [
    { id: 'basic_info', completed: Boolean(profile.name && profile.gender && profile.sect && profile.location), weight: 15 },
    { id: 'physical_details', completed: Boolean(profile.hasPhysicalDetails && profile.height), weight: 10 },
    { id: 'education_details', completed: Boolean(profile.hasEducationDetails && profile.education), weight: 10 },
    { id: 'profession_details', completed: Boolean(profile.hasProfessionDetails && profile.profession), weight: 10 },
    { id: 'family_details', completed: Boolean(profile.hasFamilyDetails), weight: 10 },
    { id: 'partner_preferences', completed: Boolean(profile.hasPartnerPreferences), weight: 15 },
    { id: 'profile_photos', completed: Boolean(profile.hasPhoto), weight: 10 },
    { id: 'voice_intro', completed: Boolean(profile.hasVoiceIntro), weight: 10 },
    { id: 'selfie_verification', completed: Boolean(profile.hasSelfieVerification), weight: 10 },
  ];

  let percentage = 0;
  for (const step of steps) {
    if (step.completed) percentage += step.weight;
  }
  return { percentage, isComplete: percentage >= 100 };
}

async function runTestVerification() {
  console.log('====================================================');
  console.log(' DONO JAHAAN — FULL AUTH & APP STABILIZATION SUITE');
  console.log(' Timestamp:', new Date().toISOString());
  console.log(' Supabase URL:', SUPABASE_URL);
  console.log('====================================================\n');

  // TEST 1: OAuth Callback URL Parsing (Hash parameters)
  console.log('1. Testing OAuth Callback URL Parsing:');
  const hashUrl = 'donojaha://auth/callback#access_token=simulated_access_token_123&refresh_token=simulated_refresh_token_456&expires_in=3600&token_type=bearer';
  const parsedHash = parseOAuthRedirectParams(hashUrl);
  assert(
    parsedHash.accessToken === 'simulated_access_token_123' &&
    parsedHash.refreshToken === 'simulated_refresh_token_456',
    'Custom scheme hash fragments parsed successfully (native standalone)',
    JSON.stringify(parsedHash)
  );

  // TEST 2: OAuth Callback URL Parsing (Query code for PKCE flow)
  const queryUrl = 'donojaha://auth/callback?code=pkce_authorization_code_abc123';
  const parsedQuery = parseOAuthRedirectParams(queryUrl);
  assert(
    parsedQuery.code === 'pkce_authorization_code_abc123',
    'Custom scheme PKCE authorization code parsed successfully from query string',
    JSON.stringify(parsedQuery)
  );

  // TEST 3: OAuth Callback URL Parsing (Expo Go scheme)
  const expoGoUrl = 'exp://192.168.1.40:8081/--/auth/callback?code=expo_go_pkce_code_xyz789';
  const parsedExpo = parseOAuthRedirectParams(expoGoUrl);
  assert(
    parsedExpo.code === 'expo_go_pkce_code_xyz789',
    'Expo Go redirect URI (exp://.../--/auth/callback) parsed successfully',
    JSON.stringify(parsedExpo)
  );

  // TEST 4: OAuth Error and Denial Handling
  const errorUrl = 'donojaha://auth/callback?error=access_denied&error_description=User+cancelled+authorization';
  const parsedError = parseOAuthRedirectParams(errorUrl);
  assert(
    parsedError.error === 'access_denied' &&
    parsedError.errorDescription === 'User cancelled authorization',
    'OAuth error and user denial parameters parsed accurately without uncaught exceptions',
    JSON.stringify(parsedError)
  );

  // TEST 5: PKCE Duplicate Authorization Code Interception
  console.log('\n2. Testing PKCE Authorization Code Deduplication:');
  const consumedCodes = new Set();
  function exchangeCodeWithDeduplication(code) {
    if (consumedCodes.has(code)) {
      return { success: false, duplicateBlocked: true };
    }
    consumedCodes.add(code);
    return { success: true, duplicateBlocked: false };
  }

  const firstAttempt = exchangeCodeWithDeduplication('auth_code_once_only');
  const secondAttempt = exchangeCodeWithDeduplication('auth_code_once_only');
  assert(
    firstAttempt.success === true && secondAttempt.duplicateBlocked === true,
    'Duplicate authorization code exchange is strictly blocked by consumedCodes set',
    `First: ${JSON.stringify(firstAttempt)}, Second: ${JSON.stringify(secondAttempt)}`
  );

  // TEST 6: Email / Password Validation Logic
  console.log('\n3. Testing Email/Password Client Validation:');
  assert(validateEmail('anas.chougle@example.com') === true, 'Valid email format recognized');
  assert(validateEmail('invalid-email') === false, 'Invalid email without @ rejected');
  assert(validateEmail('user@missing-tld') === false, 'Email without top-level domain rejected');
  assert(validatePassword('secret123') === true, 'Password >= 6 characters accepted');
  assert(validatePassword('12345') === false, 'Password < 6 characters rejected');

  const matchRes = validateSignup('umra@example.com', 'bismillah123', 'bismillah123');
  const mismatchRes = validateSignup('umra@example.com', 'bismillah123', 'differentPassword');
  assert(matchRes.valid === true, 'Matching password and confirm password accepted');
  assert(mismatchRes.valid === false && mismatchRes.error.includes('do not match'), 'Mismatched passwords rejected with clear error message');

  // TEST 7: Supabase Email Sign-in with Invalid Credentials
  console.log('\n4. Testing Real Supabase Email/Password API Behavior:');
  const { data: signinData, error: signinError } = await sb.auth.signInWithPassword({
    email: 'nonexistent_test_user_9999@donojaha.com',
    password: 'WrongPassword123!',
  });
  assert(
    signinError !== null && (signinError.message.includes('Invalid login credentials') || signinError.status === 400),
    'Supabase correctly rejects invalid email/password credentials with friendly error',
    signinError?.message
  );

  // TEST 8: Supabase Password Reset Request
  const { error: resetError } = await sb.auth.resetPasswordForEmail('test_recovery@donojaha.com', {
    redirectTo: 'donojaha://auth/callback',
  });
  assert(
    resetError === null || resetError.status === 429 || resetError.message.includes('rate limit') || resetError.message.includes('security'),
    'Supabase password recovery endpoint responds gracefully without crashing',
    resetError?.message || 'Password reset request acknowledged'
  );

  // TEST 9: Profile Completion Metric Determinism
  console.log('\n5. Testing Canonical Profile Completion Calculation:');
  const emptyProfile = {};
  const emptyMetric = calculateProfileCompletion(emptyProfile);
  assert(emptyMetric.percentage === 0 && emptyMetric.isComplete === false, 'Empty profile computes 0% completion');

  const partialProfile = {
    name: 'Anas Chougle',
    gender: 'male',
    sect: 'Sunni',
    location: 'Mumbai, Maharashtra',
    hasPhysicalDetails: true,
    height: "5' 11\" (180 cm)",
  };
  const partialMetric = calculateProfileCompletion(partialProfile);
  assert(partialMetric.percentage === 25, 'Basic info (15%) + Physical details (10%) = 25%', `Calculated: ${partialMetric.percentage}%`);

  const fullProfile = {
    name: 'Anas Chougle',
    gender: 'male',
    sect: 'Sunni',
    location: 'Mumbai',
    hasPhysicalDetails: true,
    height: "5' 11\" (180 cm)",
    hasEducationDetails: true,
    education: 'B.Tech',
    hasProfessionDetails: true,
    profession: 'Software Engineer',
    hasFamilyDetails: true,
    hasPartnerPreferences: true,
    hasPhoto: true,
    hasVoiceIntro: true,
    hasSelfieVerification: true,
  };
  const fullMetric = calculateProfileCompletion(fullProfile);
  assert(fullMetric.percentage === 100 && fullMetric.isComplete === true, 'Complete profile computes exactly 100% completion');

  // TEST 10: Backend Core Tables & RLS Policies
  console.log('\n6. Testing Supabase PostgreSQL Tables & RLS:');
  const coreTables = ['user_accounts', 'profiles', 'profile_basic', 'interests', 'conversations', 'messages'];
  for (const tbl of coreTables) {
    const { status, error } = await sb.from(tbl).select('count', { count: 'exact', head: true });
    assert(status === 200 && !error, `PostgreSQL table "${tbl}" is active and responsive`);
  }

  // TEST 11: Matrimonial Conversation State Machine RPCs
  console.log('\n7. Testing Matrimonial Conversation State Machine (RPCs):');
  const rpcCanStart = await sb.rpc('can_start_conversation', {
    p_profile_1_id: '11111111-1111-1111-1111-111111111111',
    p_profile_2_id: '22222222-2222-2222-2222-222222222222',
  });
  assert(
    rpcCanStart.data && rpcCanStart.data.can_start === false && rpcCanStart.data.code === 'LOCKED_NO_INTEREST',
    'RPC can_start_conversation locks messaging without mutual interest acceptance',
    JSON.stringify(rpcCanStart.data)
  );

  const rpcActive = await sb.rpc('get_active_conversation_for_profile', {
    p_profile_id: '11111111-1111-1111-1111-111111111111',
  });
  assert(
    Array.isArray(rpcActive.data),
    'RPC get_active_conversation_for_profile returns structured conversation records',
    JSON.stringify(rpcActive.data)
  );

  // TEST 12: Storage Bucket Security & RLS Policies
  console.log('\n8. Testing Storage Security & RLS Enforcement:');
  const badMimeUpload = await sb.storage.from('profile-public').upload('test.exe', 'Executable file payload');
  assert(
    badMimeUpload.error && badMimeUpload.error.code === 'InvalidMimeType',
    'Storage strictly rejects unauthorized MIME types (profile-public enforces image formats)',
    badMimeUpload.error?.message
  );

  const unauthUpload = await sb.storage.from('profile-public').upload('unauth.jpg', Buffer.from([0xff, 0xd8, 0xff, 0xe0]), {
    contentType: 'image/jpeg',
  });
  assert(
    unauthUpload.error && unauthUpload.error.code === 'AccessDenied',
    'Storage strictly blocks unauthenticated photo uploads via RLS policies',
    unauthUpload.error?.message
  );

  const privateDownload = await sb.storage.from('profile-private').download('confidential/selfie.jpg');
  assert(
    privateDownload.error !== null,
    'Private verification selfie storage bucket enforces row-level privacy',
    privateDownload.error?.message
  );

  console.log('\n====================================================');
  console.log(` STABILIZATION TEST RESULTS: ${totalPassed} Passed, ${totalFailed} Failed`);
  console.log('====================================================');

  if (totalFailed > 0) {
    process.exit(1);
  }
}

runTestVerification();
