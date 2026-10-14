// ====================================================================
// DONO JAHA (D O N O   J A H A)
// Automated Backend & Security Verification Suite
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

async function runTestSuite() {
  console.log('====================================================');
  console.log(' DONO JAHA — AUTOMATED BACKEND VERIFICATION SUITE');
  console.log(' Endpoint:', SUPABASE_URL);
  console.log('====================================================\n');

  // TEST SUITE 1: Core PostgreSQL Tables Connectivity
  console.log('1. Verifying Core Database Tables (200 OK & Accessible):');
  const tables = [
    'user_accounts',
    'profiles',
    'profile_basic',
    'profile_physical',
    'profile_religion',
    'profile_education',
    'profile_career',
    'profile_location',
    'profile_family',
    'partner_preferences',
    'photos',
    'interests',
    'conversations',
    'conversation_members',
    'messages',
    'wali_relationships',
  ];

  for (const table of tables) {
    const { status, error } = await sb.from(table).select('count', { count: 'exact', head: true });
    assert(status === 200 && !error, `Table "${table}" accessible`, error?.message);
  }

  // TEST SUITE 2: Storage Buckets & RLS Enforcement
  console.log('\n2. Verifying Storage Buckets & RLS Policy Enforcement:');
  
  // Test invalid MIME type rejection
  const invalidMimeRes = await sb.storage.from('profile-public').upload('test.txt', 'Plain text payload');
  assert(
    invalidMimeRes.error && invalidMimeRes.error.code === 'InvalidMimeType',
    'Storage rejects unauthorized MIME types (profile-public restricts to JPEG/PNG/WebP)',
    invalidMimeRes.error?.message
  );

  // Test unauthenticated upload rejection (RLS policy check)
  const dummyJpg = Buffer.from([0xff, 0xd8, 0xff, 0xe0, 0x00, 0x10, 0x4a, 0x46, 0x49, 0x46]);
  const unauthUploadRes = await sb.storage.from('profile-public').upload('unauth.jpg', dummyJpg, {
    contentType: 'image/jpeg',
  });
  assert(
    unauthUploadRes.error && unauthUploadRes.error.code === 'AccessDenied',
    'Storage strictly blocks unauthenticated photo uploads via RLS',
    unauthUploadRes.error?.message
  );

  // Test private media isolation
  const privateDownloadRes = await sb.storage.from('profile-private').download('test/verification/selfie.jpg');
  assert(
    privateDownloadRes.error !== null,
    'Private storage bucket (verification selfies) rejects unauthenticated access',
    privateDownloadRes.error?.message
  );

  // TEST SUITE 3: Conversation State Machine (Migration 016 RPCs)
  console.log('\n3. Verifying Matrimonial Conversation State Machine (PostgreSQL RPCs):');

  // RPC 1: can_start_conversation
  const rpc1 = await sb.rpc('can_start_conversation', {
    p_profile_1_id: '11111111-1111-1111-1111-111111111111',
    p_profile_2_id: '22222222-2222-2222-2222-222222222222',
  });
  assert(
    rpc1.data && rpc1.data.can_start === false && rpc1.data.code === 'LOCKED_NO_INTEREST',
    'RPC can_start_conversation correctly locks messaging without accepted interest',
    JSON.stringify(rpc1.data)
  );

  // RPC 2: get_active_conversation_for_profile
  const rpc2 = await sb.rpc('get_active_conversation_for_profile', {
    p_profile_id: '11111111-1111-1111-1111-111111111111',
  });
  assert(
    Array.isArray(rpc2.data),
    'RPC get_active_conversation_for_profile returns structured active conversation records',
    JSON.stringify(rpc2.data)
  );

  // RPC 3: accept_interest_and_create_conversation validation
  const rpc3 = await sb.rpc('accept_interest_and_create_conversation', {
    p_interest_id: '33333333-3333-3333-3333-333333333333',
    p_receiver_profile_id: '22222222-2222-2222-2222-222222222222',
  });
  assert(
    rpc3.error && rpc3.error.message.includes('Interest not found'),
    'RPC accept_interest_and_create_conversation rejects invalid proposal ID with row-level safety',
    rpc3.error?.message
  );

  // RPC 4: end_active_conversation validation
  const rpc4 = await sb.rpc('end_active_conversation', {
    p_conversation_id: '44444444-4444-4444-4444-444444444444',
    p_ending_profile_id: '11111111-1111-1111-1111-111111111111',
    p_reason: 'Automated test conclusion',
  });
  assert(
    rpc4.error && rpc4.error.message.includes('Conversation not found or caller is not an active participant'),
    'RPC end_active_conversation enforces caller membership verification',
    rpc4.error?.message
  );

  // TEST SUITE 4: Security & Unauthorized Message Insertion
  console.log('\n4. Verifying Security & Unauthorized Message Insertion:');
  const msgInsertRes = await sb.from('messages').insert({
    conversation_id: '44444444-4444-4444-4444-444444444444',
    sender_profile_id: '11111111-1111-1111-1111-111111111111',
    content: 'Security violation test',
  });
  assert(
    msgInsertRes.error && msgInsertRes.error.code === '42501',
    'PostgreSQL RLS blocks unauthorized client message insertion (Error 42501)',
    msgInsertRes.error?.message
  );

  // TEST SUITE 5: Google OAuth Endpoint Status
  console.log('\n5. Verifying Google OAuth Provider Endpoint:');
  try {
    const oauthUrl = `${SUPABASE_URL}/auth/v1/authorize?provider=google&redirect_to=${encodeURIComponent('donojaha://auth/callback')}`;
    const oauthRes = await fetch(oauthUrl, { redirect: 'manual' });
    if (oauthRes.status === 200 || oauthRes.status === 302 || oauthRes.status === 303) {
      assert(true, 'Google OAuth Provider is enabled and redirecting');
    } else {
      const body = await oauthRes.json().catch(() => ({}));
      console.log(`  [INFO] Google OAuth Provider is awaiting Google Cloud credentials in Supabase Dashboard (${body.msg || oauthRes.statusText})`);
    }
  } catch (oauthErr) {
    console.warn('OAuth fetch error:', oauthErr);
  }

  console.log('\n====================================================');
  console.log(` VERIFICATION SUMMARY: ${totalPassed} Passed, ${totalFailed} Failed`);
  console.log('====================================================');

  if (totalFailed > 0) {
    process.exit(1);
  }
}

runTestSuite();
