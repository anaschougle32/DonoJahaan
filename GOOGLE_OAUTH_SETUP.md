# Dono Jahaan — Google OAuth & Supabase Authentication Master Setup Guide

> **Official Application Name:** Dono Jahaan (`D O N O   J A H A A N`)  
> **Repository Directory:** `DonoJaha`  
> **Target Platforms:** Android, iOS, Web  
> **Last Audited:** October 2026

---

## 1. Actual Project Identifiers & Configuration

The application branding has been officially updated to **Dono Jahaan** while all internal technical identifiers, package names, schemes, and build targets remain strictly preserved to ensure backward compatibility and prevent breaking changes.

| Technical Identifier | Configured Value | Status / Purpose |
| :--- | :--- | :--- |
| **User-Facing App Name** | `Dono Jahaan` | Updated in `app.json`, headers, UI alerts & screens |
| **Android Package Name** | `com.donojaha.app` | Preserved in `app.json` (`android.package`) |
| **iOS Bundle Identifier** | `com.donojaha.app` | Preserved in `app.json` (`ios.bundleIdentifier`) |
| **Expo Project Slug** | `dono-jaha` | Preserved in `app.json` (`expo.slug`) |
| **EAS Project ID** | `a9bf2489-838c-4f80-b44a-dc7958cf7e0f` | Preserved in `app.json` (`extra.eas.projectId`) |
| **EAS Account / Owner** | `anaschougle` (`chougleanas32@gmail.com`) | Authenticated in EAS CLI |
| **Deep-Link URL Scheme** | `donojaha` | Preserved (`donojaha://auth/callback`) |
| **Supabase Project ID** | `fcqyukdvfifpdcckhkep` | Remote Supabase project |
| **Supabase Base URL** | `https://fcqyukdvfifpdcckhkep.supabase.co` | API Gateway endpoint |
| **Supabase Callback URL** | `https://fcqyukdvfifpdcckhkep.supabase.co/auth/v1/callback` | OAuth redirect target for Google |

---

## 2. Actual Android & EAS Configuration

### A. EAS Project Identity
- **Full EAS Project Name:** `@anaschougle/dono-jaha`
- **EAS Project ID:** `a9bf2489-838c-4f80-b44a-dc7958cf7e0f`
- **Android Package / Application ID:** `com.donojaha.app`

### B. Android Signing Certificate Fingerprints Status
A live audit of the EAS cloud credentials for project `a9bf2489-838c-4f80-b44a-dc7958cf7e0f` via Expo's API confirmed:
- **EAS Managed Android Keystores:** Currently `[]` (Empty / Not yet generated).
- **Local Debug Keystore (`~/.android/debug.keystore`):** Not present on local machine.

### C. Certificate Fingerprints across Build & Distribution Paths
When building or releasing an Android application, different SHA-1 certificate fingerprints are used depending on the distribution path:

1. **EAS Internal / Preview Keystore (Direct `.apk` builds):**
   - **Used For:** Testing standalone APK builds installed directly onto test devices or distributed via EAS internal distribution.
   - **How to generate/retrieve:** Run `npx eas credentials -p android` or your first preview build `npx eas build -p android --profile preview`. EAS will prompt to automatically generate an Android Keystore. Once generated, EAS will display the SHA-1 and SHA-256 fingerprints in the EAS credentials dashboard.
2. **EAS Production Keystore (Google Play Store `.aab` uploads):**
   - **Used For:** Uploading the signed Android App Bundle (`.aab`) to the Google Play Developer Console.
3. **Google Play App Signing Certificate (Public Play Store downloads):**
   - **Used For:** When users install the app from Google Play, Google re-signs the app with Google's managed key.
   - **How to retrieve:** Found in Google Play Console under **Release > Setup > App Integrity > App Signing**.

> [!IMPORTANT]
> **Why SHA-1 is NOT blocking the current flow:**  
> Dono Jahaan uses the **Supabase Browser-Based OAuth flow** (`WebBrowser.openAuthSessionAsync`). In this architecture, Google authenticates Supabase's backend callback URL using a **Web Application OAuth Client**. Google Cloud Console does **NOT** require an Android SHA-1 fingerprint for Web clients. Therefore, Google Sign-In will function immediately once the Web Client ID and Secret are configured!

---

## 3. The Authentication Flow Implemented in Code

### Architecture: Supabase Browser-Based OAuth Flow
The application implements a secure, cross-platform OAuth flow in `src/services/authService.ts` utilizing `expo-web-browser`, `expo-auth-session`, and `@supabase/supabase-js`.

```
[ User taps "Continue with Google" ]
               │
               ▼
   src/services/authService.ts
   calls supabase.auth.signInWithOAuth({
     provider: 'google',
     redirectTo: 'donojaha://auth/callback',
     skipBrowserRedirect: true
   })
               │
               ▼
   Receives Google Auth URL from Supabase GoTrue
               │
               ▼
   WebBrowser.openAuthSessionAsync(authUrl, 'donojaha://auth/callback')
               │
               ▼
   [ User logs in & grants consent on Google ]
               │
               ▼
   Google redirects to:
   https://fcqyukdvfifpdcckhkep.supabase.co/auth/v1/callback?code=...
               │
               ▼
   Supabase server exchanges code with Google using Web Client Secret
   and sets up auth.users record
               │
               ▼
   Supabase redirects to mobile deep link:
   donojaha://auth/callback#access_token=...&refresh_token=...
               │
               ▼
   WebBrowser intercepts return URL & resumes app execution
               │
               ▼
   authService parses tokens / code and establishes session:
   supabase.auth.setSession({ access_token, refresh_token })
               │
               ▼
   handlePostAuthProfile() ensures user_accounts and profiles records exist:
   - If onboarding completed: routes to MainTabs
   - If new user: initializes draft profile, routes to Questionnaire
```

### Required Google OAuth Client Types:
1. **MANDATORY:** **Web application** client in Google Cloud Console.
   - Required by Supabase GoTrue to complete server-side token exchanges on callback `https://fcqyukdvfifpdcckhkep.supabase.co/auth/v1/callback`.
2. **OPTIONAL (Future):** **Android** client in Google Cloud Console.
   - Only required if migrating to native Google Sign-In (`@react-native-google-signin/google-signin`). Not required for the current browser-based flow.

---

## 4. Exact Google Cloud Console Setup Steps

Follow these exact steps in [Google Cloud Console](https://console.cloud.google.com/):

### Step 1: Select or Create Project
1. Open [Google Cloud Console](https://console.cloud.google.com/).
2. In the top navigation project dropdown, select your existing project or click **New Project**.
3. Name the project: **Dono Jahaan Matrimonial** (or `dono-jahaan`).

### Step 2: Configure OAuth Consent Screen
1. In the left navigation menu, go to **APIs & Services > OAuth consent screen**.
2. Select **External** and click **Create**.
3. Enter App information:
   - **App name:** `Dono Jahaan`
   - **User support email:** Select your email (`chougleanas32@gmail.com`)
   - **App logo:** (Optional) Upload Dono Jahaan emblem
   - **Developer contact information:** `chougleanas32@gmail.com`
4. Click **Save and Continue**.
5. **Scopes:** Click **Add or Remove Scopes**. Select:
   - `.../auth/userinfo.email`
   - `.../auth/userinfo.profile`
   - `openid`
   Click **Update** and then **Save and Continue**.
6. **Test users:**
   - While the app publishing status is in **Testing**, only accounts explicitly listed here can log in.
   - Click **Add Users** and add:
     - `chougleanas32@gmail.com`
     - Any secondary personal Google accounts you intend to test with.
   - Click **Save and Continue**.

### Step 3: Create Web Application OAuth 2.0 Client ID
1. In the left navigation menu, go to **APIs & Services > Credentials**.
2. Click **+ CREATE CREDENTIALS** at the top, and select **OAuth client ID**.
3. Set **Application type:** `Web application`.
4. Set **Name:** `Dono Jahaan Supabase Backend`.
5. Under **Authorized JavaScript origins**, click **+ ADD URI** and enter:
   ```
   https://fcqyukdvfifpdcckhkep.supabase.co
   ```
6. Under **Authorized redirect URIs**, click **+ ADD URI** and enter:
   ```
   https://fcqyukdvfifpdcckhkep.supabase.co/auth/v1/callback
   ```
7. Click **CREATE**.
8. A modal will appear displaying:
   - **Client ID** (e.g., `123456789-xxxxxx.apps.googleusercontent.com`)
   - **Client Secret** (e.g., `GOCSPX-xxxxxxxxxxxxxxxxxxxxxxxx`)
   - Keep this modal open or copy both values securely.

---

## 5. Exact Supabase Dashboard Setup Steps

Follow these exact steps in the [Supabase Dashboard](https://supabase.com/dashboard/project/fcqyukdvfifpdcckhkep):

### Step 1: Enable Google Provider
1. Go to: **Authentication > Providers > Google**  
   Direct link: `https://supabase.com/dashboard/project/fcqyukdvfifpdcckhkep/auth/providers`
2. Toggle **Enable Google provider** to **ON** (Green).
3. Paste the credentials obtained from Google Cloud Console:
   - **Client ID:** Paste your Web Client ID (`xxxx.apps.googleusercontent.com`).
   - **Client Secret:** Paste your Web Client Secret (`GOCSPX-xxxx`).
4. Leave *Authorized Client IDs* blank for now (used only for native Android/iOS ID tokens).
5. Click **Save**.

### Step 2: Configure URL Configuration & Redirect Allow-List
1. Go to: **Authentication > URL Configuration**  
   Direct link: `https://supabase.com/dashboard/project/fcqyukdvfifpdcckhkep/auth/url-configuration`
2. Set **Site URL:**
   ```
   donojaha://auth/callback
   ```
3. In **Redirect URLs**, click **Add URL** and add the following allowed redirect patterns:
   - `donojaha://*`
   - `donojaha://auth/callback`
   - `http://localhost:8081` (for local Expo web/metro testing)
   - `exp://*` (for Expo Go testing)
4. Click **Save**.

---

## 6. Required Environment Variables

Ensure your `.env` file (local development) and EAS Environment Secrets (production builds) contain these variable names:

```bash
# Public variables exposed to Expo React Native client
EXPO_PUBLIC_SUPABASE_URL=https://fcqyukdvfifpdcckhkep.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_aimHB8yIyDraQVdXrDDfBA_0ValbCl_
EXPO_PUBLIC_APP_NAME="Dono Jahaan"
EXPO_PUBLIC_APP_ENV=development
```

> [!CAUTION]
> **Security Rule:** Never put the Google OAuth **Client Secret** in `.env` or in any client-side React Native files. The Client Secret belongs exclusively inside the Supabase Dashboard.

---

## 7. Build Profiles & Testing Commands

### Build Profiles (`eas.json`)
The project includes three build profiles in `eas.json`:
- `development`: Builds an internal development build containing native debug tools.
- `preview`: Compiles a standalone `.apk` directly installable on any Android phone.
- `production`: Compiles an `.aab` (Android App Bundle) optimized for Google Play release.

### Verification & Testing Commands

```bash
# 1. Run Automated Backend & Endpoint Verification Suite
npm run test:backend

# 2. Check TypeScript Compilation
npx.cmd tsc --noEmit

# 3. Start Expo Development Server
npm start

# 4. Generate EAS Preview Android APK (when ready to test on device)
npx.cmd eas-cli build -p android --profile preview
```

---

## 8. Common OAuth Errors & Likely Causes

| Error / Symptom | Root Cause | Exact Fix |
| :--- | :--- | :--- |
| `Unsupported provider: provider is not enabled` | Google provider is toggled OFF in Supabase | Go to Supabase Dashboard > Authentication > Providers > Google, enable it, and enter Client ID & Secret. |
| `redirect_uri_mismatch` in Google browser | Google Cloud Console is missing the Supabase callback | In Google Cloud Console, ensure Authorized redirect URIs contains `https://fcqyukdvfifpdcckhkep.supabase.co/auth/v1/callback` exactly. |
| `Access blocked: App has not completed the Google verification process` | App is in "Testing" mode and current Google account is not added | In Google Cloud Console > OAuth consent screen > Test users, click "Add users" and add the email address trying to sign in. |
| Browser completes login but app does not receive tokens | Missing deep-link scheme or redirect allow list | Ensure `app.json` has `"scheme": "donojaha"` and Supabase URL Configuration has `donojaha://*` in Redirect URLs. |
| `Google Sign-In was cancelled` | User closed the browser sheet before completing login | Normal user cancellation behavior; caught safely by `authService.ts`. |
