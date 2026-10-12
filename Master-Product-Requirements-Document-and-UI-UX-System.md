Yes. I understand the product direction clearly.

What you are building is **not just another Muslim matrimony clone**. The base experience can have feature parity with established matrimonial platforms, but the product should have a distinct interaction model around:

1. **Muslim-focused profile data**
2. **Privacy-first photo handling**, especially configurable blurred/private photos
3. **Mandatory/strongly encouraged voice introduction**
4. **Wali/family involvement**
5. **A one-active-conversation rule**
6. **A very structured, low-confusion onboarding flow**
7. **A premium, calm, respectful UI rather than a dating-app feel**

I also went through the questionnaire screenshots you uploaded and researched current functionality from Shaadi.com, Jeevansathi, Muzz, Muslim matrimonial products, privacy/security standards, and India's current data-protection framework.

Below is the **master PRD + UI/UX specification** I would use as the foundation for design and development.

---

# MUSLIM MATRIMONY APP
## Master Product Requirements Document + UI/UX System

**Document Version:** 1.0  
**Date:** October 2026  
**Platform:** Android + iOS  
**Primary Market:** India initially, expandable globally  
**Product Type:** Muslim matrimonial / marriage-intent platform

---

# PART 1 — PRODUCT VISION

## 1.1 Product Objective

Create a Muslim matrimonial platform where people and families can discover compatible marriage prospects while giving users significantly more control over:

- religious compatibility
- family involvement
- privacy
- photographs
- communication
- voice introduction
- marriage expectations
- geographical preferences
- lifestyle preferences

The application should feel like:

> **A premium matrimonial service, not a dating application.**

The UI should communicate:

**Trust + Privacy + Serious Intent + Muslim Cultural Context + Modern Technology**

---

# 2. CORE PRODUCT PRINCIPLES

These should become the product's permanent design principles.

### Principle 1 — Marriage first

Every interaction should communicate that this is for serious matrimonial intentions.

Avoid:

- dating-app swipe culture
- excessive gamification
- flirtatious animations
- flashy gradients
- excessive hearts
- addictive infinite-feed patterns

Prefer:

- Interests
- Shortlist
- Compatibility
- Family
- Introduction
- Conversation
- Marriage Preferences

---

### Principle 2 — Privacy by design

Privacy is not an afterthought.

It should exist at:

- registration
- profile creation
- photo upload
- profile discovery
- voice introduction
- interest
- chat
- contact sharing
- account deletion

---

### Principle 3 — Family-aware

The profile isn't necessarily created by the person themselves.

The screenshots explicitly identify:

> Self / Parent / Sibling / Friend / Guardian / Wali

This should therefore be a **first-class account concept**, not simply a dropdown hidden inside profile settings.

---

### Principle 4 — One active matrimonial conversation

This is one of your biggest differentiators.

Your rule:

> **One person can have only one active matrimonial conversation at a time.**

Example:

**Ahmed → sends interest → Fatima accepts**

Now:

`Ahmed ↔ Fatima`

becomes the user's **Active Conversation**.

Ahmed cannot open another matrimonial chat until the current conversation is ended.

---

### Principle 5 — Voice before private conversation

The voice introduction should be treated as a major profile component rather than a secondary feature.

Potential profile hierarchy:

**Photo / Privacy → Basic identity → Voice introduction → About → Family → Religious compatibility → Education/Career → Preferences**

---

# 3. COMPETITOR RESEARCH

I researched the current public feature sets of several relevant products.

## Shaadi.com

Shaadi.com currently provides:

- partner preferences
- matching
- advanced search
- profile discovery
- photo privacy
- photo requests
- profile information
- interest-based interaction

Its matching system uses profile and partner-preference information to generate match lists. [Shaadi.com](https://support.shaadi.com/support/solutions/articles/48000953813-how-does-matches-option-help-me-to-get-more-matches-with-different-options-?utm_source=chatgpt.com)

Shaadi.com also provides configurable photo privacy and a photo-request mechanism. [Shaadi.com](https://support.shaadi.com/support/solutions/articles/48000953215-how-does-the-request-photo-feature-work-?utm_source=chatgpt.com)

### What we take from this

Implement:

- partner preferences
- advanced filtering
- interest system
- photo privacy
- profile discovery
- shortlist
- recently viewed

But **do not copy their UI**.

---

# 4. JEEVANSATHI RESEARCH

Jeevansathi currently highlights:

- manually screened profiles
- verification
- location/community/profession search
- photo/video privacy
- voice and video calling
- video profiles
- partner preferences
- profile discovery

It explicitly advertises controls for restricting unwanted access to contact details and photos/videos. [jeevansathi.com](https://www.jeevansathi.com/?utm_source=chatgpt.com)

### Product lesson

The app should have:

**Verification indicators**

rather than simply showing:

> "Verified"

for everyone.

Possible badges:

- Mobile Verified
- Photo Verified
- Identity Verified
- Profile Reviewed
- Voice Added

---

# 5. MUZZ RESEARCH

Muzz is especially relevant because it focuses specifically on Muslim users.

Its current features include:

- blurred photos
- photo privacy
- selfie verification
- chaperone mode
- behavioural guidelines
- reporting
- in-app voice/video calling

Muzz allows women to blur photos and reveal them to specific matches, while its Chaperone Mode allows chat transcripts to be shared with a wali. [Muzz](https://muzz.com/us/en/help/getting-started/how-is-muzz-halal/?utm_source=chatgpt.com)

Muzz also allows voice/video calls without exposing the user's phone number. [Muzz](https://muzz.com/us/en/help/muzz-101/how-do-voice-and-video-calls-work-on-muzz/?utm_source=chatgpt.com)

### Product lesson

Your idea fits naturally into this category, but your implementation can be more structured:

**Voice introduction → Interest → Acceptance → One active conversation → Optional Wali involvement**

---

# 6. VOICE INTRODUCTION RESEARCH

The voice concept is not technically unusual, but it is uncommon in mainstream matrimonial products.

For example, Dadio uses an audio introduction attached to profiles. Its current Google Play description says profiles include a 10-second audio introduction. [Google Play](https://play.google.com/store/apps/details?hl=en_US\&id=com.dadio.app\&utm_source=chatgpt.com)

Jeevansathi has video-profile functionality. [jeevansathi.com](https://www.jeevansathi.com/?utm_source=chatgpt.com)

### Your implementation

Instead of a tiny audio snippet:

**Minimum:** 30 seconds  
**Maximum:** 120 seconds

Recommended default:

> **30–60 seconds**

The profile should display:

### "Voice Introduction"

▶ **00:42**

`[ Play ]`

Waveform:

`▂▅▃▆▇▅▃▂▅▆▃▂`

---

# 7. IMPORTANT PRODUCT DECISION — DO NOT SCORE VOICE

The user should be able to hear the voice.

But the platform should **not automatically infer**:

- character
- religiosity
- honesty
- personality
- attractiveness
- "akhlaq score"
- intelligence
- compatibility

from someone's voice.

The voice is an introduction mechanism, not an AI personality test.

This keeps the feature much safer and more respectful.

---

# 8. PROFILE CREATION ARCHITECTURE

Your onboarding should NOT be one giant form.

It should be a sequence of small, focused steps.

## Main flow

```text
Logo
 ↓
Splash 1
 ↓
Splash 2
 ↓
Splash 3
 ↓
Get Started
 ↓
Mobile Number
 ↓
OTP
 ↓
Profile Created By
 ↓
Gender
 ↓
Basic Profile
 ↓
Physical & Lifestyle
 ↓
Religion & Practice
 ↓
Education & Career
 ↓
Location
 ↓
Family
 ↓
Marriage Expectations
 ↓
Bio
 ↓
Photos
 ↓
Voice Introduction
 ↓
Partner Preferences
 ↓
Privacy
 ↓
Verification
 ↓
Profile Preview
 ↓
Submit
 ↓
Profile Review / Home
```

---

# 9. SCREEN 01 — LOGO SCREEN

## Purpose

Brand recognition.

### UI

Full screen.

Center:

**APP LOGO**

Below:

`A meaningful line about finding your Nikah partner`

Bottom:

`© 2026 [Brand]`

### Duration

~1.5 seconds.

Do not make it unnecessarily animated.

---

# 10. SPLASH SCREENS

Use **3 splash/onboarding slides**.

Not 5–7.

### Splash 01

**Find Someone Who Shares Your Values**

Visual:

Two subtle profile cards / family-oriented illustration.

Copy:

> Discover Muslim profiles based on values, faith, family and life goals.

CTA:

`Continue`

---

### Splash 02

**Privacy Comes First**

Visual:

Blurred profile image.

Copy:

> Control who can see your photos and personal information.

---

### Splash 03

**Meet With Purpose**

Visual:

Two profile cards + voice waveform + family/wali symbol.

Copy:

> Connect respectfully, involve family when you choose, and take one meaningful conversation at a time.

CTA:

`Get Started`

---

# 11. AUTHENTICATION

## Screen — Enter Mobile Number

Header:

**Let's get started**

Subtext:

> Enter your mobile number to create or access your account.

Fields:

`+91`

`Mobile Number`

CTA:

**Send OTP**

Below:

`By continuing, you agree to our Terms & Privacy Policy.`

---

# 12. OTP SCREEN

Header:

**Verify your number**

Subtext:

> We've sent a 6-digit code to +91 XXXXX XXXXX.

OTP:

`_ _ _ _ _ _`

Timer:

`Resend in 00:28`

After timer:

`Resend OTP`

Secondary:

`Change number`

### States

- loading
- incorrect OTP
- expired OTP
- resend
- verified

---

# 13. PROFILE CREATOR SCREEN

This is one of the most important onboarding screens.

### Heading

**Who are you creating this profile for?**

Cards:

### 👤 Myself

### 👨‍👩‍👧 My Son / Daughter

### 👨‍👩‍👧‍👦 My Sibling

### 👪 My Relative

### 🛡️ Someone under my guardianship / Wali

Potentially:

`Parent`

could be separated if your business requirements need exact relationship data.

---

# 14. CREATOR RELATIONSHIP

After selecting another person:

### Who are you?

Options:

- Father
- Mother
- Brother
- Sister
- Guardian
- Wali
- Relative
- Friend
- Other

This allows:

```text
Account User
      ↓
Profile Subject
```

to be different people.

---

# 15. GENDER

### Heading

**Who is this profile for?**

Large cards:

**Male**

**Female**

Potentially:

`Prefer not to say`

should not be necessary for the matrimonial matching logic if your platform's matching model requires a binary matchmaking direction.

---

# 16. PROFILE DATA MODEL

The screenshots you provided can be converted into these sections.

---

# SECTION A — BASIC IDENTITY

From your screenshots:

### Required

- Profile created by
- Full name
- Gender
- Date of birth
- Age
- Marital status
- Religion
- Sect
- Caste / community
- Sub-caste where applicable
- Mother tongue
- Mobile
- Email

### Marital status

- Never Married
- Divorced
- Widowed
- Awaiting Divorce
- Annulled

---

# SECTION B — PHYSICAL & LIFESTYLE

From your screenshots:

### Height

Use:

`4'6" — 7'0"`

Store internally in centimeters.

### Weight

Store kilograms.

### Body type

- Slim
- Average
- Athletic
- Heavy

### Appearance

Optional.

I recommend making complexion **optional and privacy-sensitive**, rather than a mandatory onboarding question.

### Disability / special circumstances

Instead of:

> "Physical Disability: Yes/No"

use:

**Do you wish to share any accessibility or health-related information that may be relevant to marriage?**

Options:

- No
- Yes
- Prefer to discuss privately

This is more respectful.

### Diet

- Vegetarian
- Non-Vegetarian
- Eggetarian
- Vegan
- Other

### Smoking

- Never
- Occasionally
- Regularly
- Prefer not to say

### Alcohol

Same structure.

---

# SECTION C — ISLAMIC / RELIGIOUS PROFILE

This should become one of the most important profile sections.

## Sect / School of Thought

Possible values:

### Sunni

- Hanafi
- Shafi'i
- Maliki
- Hanbali

### Shia

- Jafari
- Ismaili

### Other / specific community

- Ahle-Hadith
- Salafi
- Sufi
- Other

Important:

**Do not present this taxonomy as a definitive religious authority.**

Make the taxonomy configurable by the admin.

A qualified Islamic advisor/scholar should review the final taxonomy before launch.

---

# 17. SALAH

Options:

- Prays five times regularly
- Usually prays
- Sometimes
- Only Jummah
- Only Eid
- Learning / improving
- Prefer not to say

---

# 18. QURAN PRACTICE

- Daily
- Frequently
- Occasionally
- Memorized / Hafiz / Hafiza
- Learning
- Prefer not to say

---

# 19. FASTING

- Always during Ramadan
- Usually
- Sometimes
- Medical exemption
- Other
- Prefer not to say

---

# 20. DIETARY RELIGIOUS PREFERENCE

- Strictly Halal
- Halal preferred
- Halal/vegetarian when eating out
- Other

---

# 21. ATTIRE / MODESTY

This needs gender-aware conditional questions.

For women:

- Hijab
- Niqab
- Abaya
- Modest clothing
- No Hijab
- Prefer not to say

For men:

- Clean-shaven
- Trimmed beard
- Full beard
- Prefer not to say

Do **not** show irrelevant fields.

---

# 22. EDUCATION

### Highest qualification

- High School
- Diploma
- Bachelor's
- Master's
- M.Phil
- PhD
- Professional degree
- Other

### Field of study

Searchable field.

Example:

`Computer Science`

---

# 23. CAREER

### Employment

- Private
- Government
- Business / Self-employed
- Defense
- NGO
- Student
- Homemaker
- Not employed
- Retired
- Other

### Job title

### Employer

Optional.

### Annual income

Use ranges rather than exact salary.

Example:

```text
Below ₹2 Lakh
₹2–5 Lakh
₹5–10 Lakh
₹10–20 Lakh
₹20–30 Lakh
₹30–50 Lakh
₹50 Lakh+
Prefer not to say
```

Currency should dynamically support:

- INR
- AED
- USD
- GBP
- CAD
- AUD
- etc.

---

# 24. LOCATION

### Current location

Country

State

City

### Residency

- Citizen
- Permanent Resident
- Work Permit
- Student Visa
- Other

### Grew up in

Country

State

City

---

# 25. FAMILY BACKGROUND

From your screenshots:

### Family values

- Traditional
- Moderate
- Liberal
- Prefer not to specify

### Family type

- Joint
- Nuclear
- Extended

### Family economic background

Instead of aggressively using:

> Rich / Affluent

use:

- Middle
- Upper Middle
- Affluent
- Prefer not to say

### Father

Occupation

### Mother

Occupation

### Siblings

Don't make users type:

> "1 brother married"

Instead use structured records:

```text
Brothers
[ + Add Brother ]

Brother 1
Age
Marital Status
Occupation

Sisters
[ + Add Sister ]
```

This is significantly better UX and better database design.

---

# 26. PROFILE BIO

### Heading

**Tell us about yourself**

Textarea.

Recommended:

**50–1000 characters**

Rather than 100–1000 words.

Show:

`326 / 1000`

Optional prompt chips:

- About my personality
- My family
- My career
- My interests
- What marriage means to me

---

# 27. PHOTOS

This is critical.

### Upload screen

**Add your photos**

Recommended:

- Profile photo
- Full-length photo
- Optional additional photos

Photo slots:

```text
┌───────────────┐
│               │
│       +       │
│               │
│ Profile Photo │
└───────────────┘
```

Then smaller slots.

---

# 28. PHOTO PRIVACY ENGINE

Each image should have a privacy state.

```text
PUBLIC
BLURRED
PRIVATE
MATCH_ONLY
REQUEST_REQUIRED
```

### Default for female profile

Potential product configuration:

`BLURRED`

### Male profile

Potential default:

`VISIBLE`

But this should be a **product privacy setting**, not a hardcoded assumption.

---

# 29. BLURRED PHOTO EXPERIENCE

When a man views a female profile:

Instead of:

❌ inaccessible blank box

show:

```text
┌───────────────────────┐
│                       │
│      BLURRED PHOTO    │
│                       │
│       🔒             │
│                       │
└───────────────────────┘

Photo is private

[ Request Photo ]
```

If photo access is granted:

**Reveal animation**

Blur → sharp.

---

# 30. VOICE INTRODUCTION

This is your signature feature.

## Upload screen

### Heading

**Introduce yourself in your own voice**

Subheading:

> Let your personality come through naturally.

Waveform area.

Button:

### ● Start Recording

Timer:

`00:00 / 02:00`

Controls:

`Pause`

`Resume`

`Stop`

After recording:

### Play

### Re-record

### Save

---

# 31. VOICE RULES

Recommended:

**Minimum:** 30 seconds

**Maximum:** 120 seconds

Format:

AAC / M4A

Sample rate:

44.1 kHz

Mono.

Compress server-side for streaming.

---

# 32. VOICE PROFILE CARD

Every eligible profile:

```text
VOICE INTRODUCTION

▶ ────────●──────── 00:38

"Listen to my introduction"

     🔊
```

Do not autoplay.

The user must intentionally press play.

---

# 33. VOICE PRIVACY

Voice should have:

- Public to eligible profiles
- Match-only
- Request access
- Hidden

For women, the product can default to:

**Request access**

if this is part of the chosen privacy model.

---

# 34. PARTNER PREFERENCES

Your screenshots provide the foundation.

### Age

Range slider:

`22 — 30`

### Height

`5'0" — 6'2"`

### Marital status

Multi-select.

### Religion

Multi-select.

### Sect

Multi-select.

### Community / caste

Optional.

### Mother tongue

Multi-select.

### Location

Country / State / City.

### Education

Minimum qualification.

### Income

Minimum / preferred range.

### Lifestyle

Diet.

Smoking.

Alcohol.

Religious practice.

### Marriage expectations

Relocation.

Living arrangement.

Career after marriage.

---

# 35. HARD VS SOFT PREFERENCES

This is extremely important.

Do not treat every preference equally.

Example:

### Must Have

- Muslim
- Age 25–30

### Preferred

- Mumbai
- Graduate
- Same mother tongue

### Open To

- Relocation
- Different city

UI:

```text
What matters most?

● Must have
○ Prefer
○ Open to
```

This creates a much better matching system.

---

# 36. MARRIAGE EXPECTATIONS

Your screenshot has excellent concepts here.

### Relocation

- Willing to relocate
- Prefer staying in current city
- Expect partner to relocate
- Open to discussion

### Living arrangement

- Independent with spouse
- With parents
- Joint family
- Open to discussion

### Career after marriage

- Full-time
- Part-time
- Homemaker
- Open to discussion

---

# 37. WALI SYSTEM

Don't make Wali simply a text field.

Create an actual relationship.

## Wali dashboard

A Wali can potentially:

- receive notifications
- view selected profile information
- receive conversation summaries
- participate in a conversation
- approve/review a match
- receive chat transcript access if enabled

However, the exact religious workflow should be configurable and reviewed by qualified Islamic advisors rather than being presented as universally required.

Muzz's current Chaperone Mode demonstrates that a guardian/chaperone can be integrated into the communication model. [Muzz](https://muzz.com/us/en/help/getting-started/how-is-muzz-halal/?utm_source=chatgpt.com)

---

# 38. INTEREST SYSTEM

Profile button:

### Interested

Secondary:

### Shortlist

### Pass / Not Interested

When Interest is pressed:

```text
Are you sure?

You are expressing serious matrimonial interest
in this profile.

[ Send Interest ]
[ Cancel ]
```

---

# 39. INTEREST STATES

Use a finite state machine.

```text
DISCOVERED
   ↓
INTEREST SENT
   ↓
PENDING
   ↓
ACCEPTED
   ↓
ACTIVE CONVERSATION
   ↓
CONVERSATION ENDED
```

Alternative:

```text
REJECTED
BLOCKED
EXPIRED
WITHDRAWN
```

---

# 40. THE ONE-CONVERSATION ENGINE

This needs to be enforced **server-side**.

Not merely hidden in UI.

Example:

```text
User A
  ↓
Interest accepted by B
  ↓
Conversation becomes ACTIVE
  ↓
User A tries opening C
  ↓
SERVER DENIES
  ↓
"Finish your current conversation before starting another."
```

This rule must be enforced through backend authorization.

---

# 41. ACTIVE CONVERSATION SCREEN

Home should prominently display:

### Your Active Conversation

```text
┌─────────────────────────────┐
│                             │
│       Profile Photo         │
│                             │
│       Ayesha, 27            │
│       Mumbai                │
│                             │
│   ● Conversation Active     │
│                             │
│        [ Open Chat ]        │
└─────────────────────────────┘
```

This gives the user a clear understanding that:

> "This is the person I'm currently getting to know."

---

# 42. CHAT SCREEN

Header:

Profile photo

Name

`Active Conversation`

Optional:

`Wali involved`

Message area.

Composer:

`Type a respectful message...`

Send.

No:

- GIF spam
- public comments
- random matching chat rooms
- open DMs

---

# 43. CONTACT SHARING

Do not immediately expose:

- phone
- email
- social media
- WhatsApp

Instead:

### Share Contact

After sufficient interaction or by user-controlled action:

```text
Share contact details?

Phone
Email
WhatsApp

[ Continue ]
```

The exact unlocking criteria should be a configurable business rule.

---

# 44. END CONVERSATION

This needs to be handled carefully.

Button:

### End Conversation

Modal:

**End this conversation?**

> You will no longer be able to send messages in this conversation. You can continue looking for another matrimonial connection.

Buttons:

`Keep Conversation`

`End Conversation`

Once ended:

```text
Conversation Ended
```

The history can become read-only/archived according to the retention policy.

---

# 45. PROFILE DISCOVERY

Main navigation:

### Home

### Discover

### Interests

### Messages

### Profile

---

# 46. HOME SCREEN

The home screen should NOT be a dating swipe feed.

Suggested structure:

```text
Good morning, Anas

Complete your profile
████████░░ 80%

────────────────

Your Active Conversation
[ Profile Card ]

────────────────

Recommended Matches

[ Profile ]
[ Profile ]

────────────────

Based on your preferences

[ View all ]
```

---

# 47. DISCOVER SCREEN

Top:

`Discover`

Search icon.

Filter.

Profile cards.

Each card:

- photo / blurred photo
- name
- age
- location
- education
- profession
- religious practice indicators
- voice available
- verification badges

Example:

```text
Ayesha, 25
Mumbai, Maharashtra

Software Engineer
B.E. Computer Science

Hanafi • Urdu

🎙 Voice introduction
✓ Mobile verified

[ View Profile ]
```

---

# 48. PROFILE DETAIL

This should be a very strong screen.

### Header

Photo.

Privacy overlay if applicable.

Name.

Age.

Location.

Verification.

### Voice

Large voice player.

### About

### Basic Information

### Religious Practice

### Education & Career

### Family

### Marriage Expectations

### Partner Preferences

### Actions

`Interested`

`Shortlist`

`Not Interested`

---

# 49. PROFILE INFORMATION HIERARCHY

Do not dump 30 fields on screen.

Use collapsible sections:

### About

### Basic Details

### Faith & Practice

### Education & Career

### Family

### Lifestyle

### Marriage Expectations

### Partner Preferences

### Voice Introduction

This dramatically improves readability.

---

# 50. MATCHING ENGINE

Start deterministic.

Do NOT immediately create a black-box AI matching algorithm.

Phase 1:

```text
Gender compatibility
+
Age preference
+
Location preference
+
Religion
+
Sect
+
Marital status
+
Lifestyle
+
Education
+
Income
+
Marriage expectations
```

Then calculate a compatibility value internally.

But do **not** present:

> "87% compatible"

unless you have a validated methodology.

Instead show:

### Matches your preferences

or:

### 7 of your preferences match

This is explainable.

---

# 51. MATCH EXPLANATION

Example:

**Why you're seeing this profile**

✓ Age preference  
✓ Location preference  
✓ Mother tongue  
✓ Education preference  
✓ Religious preference  
✓ Marriage expectations

This builds trust.

---

# 52. VERIFICATION SYSTEM

Potential levels:

### Mobile Verified

OTP.

### Selfie Verified

Optional identity check.

### Profile Verified

Admin/manual verification.

### Photo Verified

Photo authenticity process.

### Wali Verified

Optional.

Avoid giving users a generic "100% Verified" badge unless the exact verification scope is clear.

---

# 53. REPORTING

Every profile:

`•••`

Options:

- Report profile
- Block profile
- Hide profile
- Incorrect information
- Inappropriate content
- Suspected fake profile
- Harassment
- Other

Muzz also provides reporting and behavioural guidelines as part of its Muslim-focused safety model. [Muzz](https://muzz.com/us/en/help/getting-started/how-is-muzz-halal/?utm_source=chatgpt.com)

---

# 54. BLOCKING

When blocked:

- profile disappears
- interests cancelled
- chat disabled
- photo access revoked
- voice access revoked
- no further discovery

This must be enforced backend-side.

---

# 55. ADMIN PANEL

You absolutely need an admin system.

### Dashboard

Metrics:

- registered users
- active users
- male profiles
- female profiles
- profiles pending review
- verified profiles
- interests sent
- interests accepted
- active conversations
- ended conversations
- reports
- blocked users

---

# 56. ADMIN PROFILE REVIEW

Admin should see:

```text
Profile
Photos
Voice
Basic Information
Religious Information
Family
Preferences
Verification
Reports
```

Actions:

`Approve`

`Reject`

`Request Changes`

`Suspend`

`Ban`

---

# 57. VOICE MODERATION

Voice recordings need moderation controls.

Potential pipeline:

```text
Upload
 ↓
Virus/file validation
 ↓
Audio normalization
 ↓
Duration validation
 ↓
Optional transcription/moderation
 ↓
Storage
 ↓
Profile availability
```

Do not use voice analysis to determine personality or religious commitment.

---

# 58. PRIVACY ARCHITECTURE

This application processes highly personal information.

The profile contains:

- identity
- phone
- location
- religion
- family information
- employment
- income
- photographs
- voice recordings
- marriage preferences

Therefore privacy needs to be a first-class architectural requirement.

India's DPDP Act establishes a framework around processing digital personal data, and the 2025 Rules provide requirements around clear notices, itemised personal data, purposes, and mechanisms related to consent and rights. The commencement timeline is staggered, so the legal implementation should be checked against the provisions applicable at launch. [indiacode.nic.in](https://www.indiacode.nic.in/bitstream/123456789/22037/2/a2023-22.pdf?utm_source=chatgpt.com)

---

# 59. CONSENT SCREEN

Do not hide everything in a 10-page privacy policy.

During onboarding:

### Your Privacy

We collect:

- profile information
- contact information
- photos
- voice introduction
- preferences

We use this to:

- create your profile
- provide matchmaking
- protect the platform
- communicate with you

Buttons:

`Agree & Continue`

`Privacy Policy`

`Manage Privacy`

The current Indian rules require clear/plain notices describing the personal data and purposes in an understandable manner. [meity.gov.in](https://www.meity.gov.in/static/uploads/2025/11/53450e6e5dc0bfa85ebd78686cadad39.pdf?utm_source=chatgpt.com)

---

# 60. SECURITY REQUIREMENTS

Use OWASP MASVS as the mobile security baseline.

OWASP's current MASVS covers:

- secure storage
- cryptography
- authentication
- network security
- platform interaction
- code quality
- resilience
- privacy. [mas.owasp.org](https://mas.owasp.org/MASVS/?utm_source=chatgpt.com)

Sensitive data should not simply be stored in ordinary unprotected local storage. OWASP specifically recommends protecting sensitive data and cryptographic keys using platform security mechanisms such as Android Keystore / iOS Keychain. [mas.owasp.org](https://mas.owasp.org/MASWE/MASVS-STORAGE/MASWE-0001/?utm_source=chatgpt.com)

---

# 61. UI/UX DESIGN SYSTEM

Now the important part.

You asked for **zero inconsistency**.

Therefore the design should have a formal design system.

---

# 62. DESIGN PERSONALITY

### Keywords

**Elegant**

**Warm**

**Trustworthy**

**Minimal**

**Premium**

**Respectful**

**Modern Islamic**

Not:

❌ overly ornamental Islamic UI  
❌ excessive gold  
❌ mosque patterns everywhere  
❌ green everywhere  
❌ dating-app neon  
❌ excessive gradients  
❌ glassmorphism everywhere

---

# 63. COLOR SYSTEM

I recommend:

### Primary

**Deep Emerald**

`#0B6B57`

### Primary Dark

`#075044`

### Primary Soft

`#E8F4F0`

### Background

`#FCFCFA`

### Surface

`#FFFFFF`

### Text Primary

`#17201D`

### Text Secondary

`#68736F`

### Border

`#E4E9E6`

### Success

`#27855E`

### Warning

`#C98A22`

### Error

`#C94A4A`

### Information

`#3E6F9E`

### Privacy Overlay

`#17201D`

with approximately 70–80% opacity.

---

# 64. OPTIONAL BRAND ACCENT

If you want a more premium identity:

### Muted Gold

`#B79A5B`

Use it sparingly.

Only for:

- premium badge
- subtle divider
- special verification
- selected accent

Never use gold for everything.

---

# 65. TYPOGRAPHY

Use:

## Primary font

**Inter**

or

**Manrope**

My recommendation for the UI system:

### Manrope

It feels modern and slightly more premium.

---

# 66. TYPOGRAPHY SCALE

### Display

32 px / 40 px

### H1

28 / 36

### H2

24 / 32

### H3

20 / 28

### Body Large

17 / 26

### Body

15 / 23

### Body Small

13 / 20

### Caption

12 / 18

### Button

15 / 20

---

# 67. FONT WEIGHTS

Regular:

400

Medium:

500

SemiBold:

600

Bold:

700

Avoid 800/900 except branding.

---

# 68. CORNER SYSTEM

This must never randomly change.

Use:

### Small

8 px

### Medium

12 px

### Large

16 px

### Extra Large

20 px

### Cards

20 px

### Full pills

999 px

No random:

`13px`, `18px`, `22px`, etc.

---

# 69. SPACING SYSTEM

Use an 8-point grid.

```text
4
8
12
16
20
24
32
40
48
64
80
```

Primary screen horizontal padding:

### 20 px

Large screens:

### 24 px

---

# 70. BUTTON SYSTEM

### Primary

Height:

52 px

Radius:

14 px

Background:

Primary.

Text:

15 px / 600.

---

### Secondary

52 px.

Border:

1 px.

---

### Text button

No container.

---

# 71. INPUT SYSTEM

Height:

52–56 px.

Radius:

14 px.

Border:

1 px.

Label:

13 px.

Input:

16 px.

Focused:

2 px primary border.

Error:

2 px error border.

---

# 72. CARD SYSTEM

Profile card:

Radius:

20 px

Shadow:

Extremely subtle.

Avoid heavy shadows.

---

# 73. ICON SYSTEM

Use **one icon family only**.

Recommended:

**Lucide Icons**

Stroke:

1.8–2 px.

Never mix:

- Material
- FontAwesome
- random SVGs
- emoji

inside the primary interface.

---

# 74. SVG POLICY

All custom illustrations should be SVG.

Create:

```text
/assets/icons
/assets/illustrations
/assets/logo
/assets/patterns
```

No random web SVGs.

---

# 75. PHOTO ASPECT RATIO

Profile cards:

**4:5**

Profile hero:

**3:4**

Avatar:

**1:1**

Voice waveform:

fixed height:

**56 px**

---

# 76. ONBOARDING PROGRESS

Every profile-building screen:

Top:

```text
←                    6 of 18

████████░░░░░░░░
```

The number of steps should be dynamically calculated based on gender/profile type.

Example:

```text
Profile Setup
Step 6 of 18
```

---

# 77. QUESTION SCREEN TEMPLATE

Every questionnaire screen must use the same structure.

```text
←

SECTION NAME

Question

Short explanation

[ Option ]
[ Option ]
[ Option ]

────────────────

[ Continue ]
```

No random layout changes.

---

# 78. SINGLE SELECT

Large rounded cards.

Selected:

Primary border + soft primary background.

Example:

```text
┌─────────────────────────────┐
│ ✓  Never Married            │
└─────────────────────────────┘
```

---

# 79. MULTI SELECT

Same cards.

Top right:

`Select all that apply`

Bottom:

`Continue`

---

# 80. RANGE INPUT

Use two handles.

Display:

**25 — 30 years**

Avoid tiny sliders that are difficult to control.

---

# 81. LOCATION INPUT

Use:

Country → State → City

with search.

Do not use one huge text box.

---

# 82. CONDITIONAL QUESTIONS

This is extremely important.

Example:

### Marital status

If:

`Divorced`

then:

**Would you like to share additional information?**

If:

`Never Married`

do not show divorce-related questions.

---

# 83. GENDER-CONDITIONAL FLOW

After the initial gender selection:

```text
COMMON QUESTIONS
      ↓
GENDER-SPECIFIC QUESTIONS
      ↓
RELIGIOUS QUESTIONS
      ↓
MARRIAGE EXPECTATIONS
```

This prevents users from seeing irrelevant questions.

---

# 84. MALE PROFILE FLOW

Example:

```text
Basic Identity
↓
Physical
↓
Education
↓
Career
↓
Religious Practice
↓
Family
↓
Marriage Expectations
↓
Photos
↓
Voice
↓
Preferences
```

---

# 85. FEMALE PROFILE FLOW

Same base architecture.

Additional privacy configuration:

```text
Photos
↓
Photo Privacy
↓
Who can request access?
↓
Voice Privacy
```

The difference should be **functional**, not a completely different visual design.

---

# 86. VOICE RECORDING UI

This deserves its own design language.

When recording:

Large circular recorder:

`●`

Timer:

`00:34`

Waveform reacts to microphone input.

Bottom:

`Cancel`

`Pause`

`Done`

After completion:

```text
Your introduction

▶ 00:42

[ Re-record ]

[ Save Voice Introduction ]
```

---

# 87. PROFILE COMPLETION

Do not show:

`76% Complete`

without explaining what remains.

Use:

### Your profile is almost ready

```text
✓ Basic information
✓ Family details
✓ Education
✓ Partner preferences
○ Voice introduction
○ Photos
```

CTA:

**Complete Profile**

---

# 88. PROFILE PREVIEW

Before publishing:

### Preview as others see you

Tabs:

`Male View`

`Female View`

`Public View`

This is extremely useful for privacy validation.

Especially:

### Female preview

Shows exactly how male users see the blurred photo.

---

# 89. PRIVACY PREVIEW

Example:

```text
How others see your profile

Male users

Photo
🔒 Blurred

Voice
🎙 Available

Phone
Hidden

Email
Hidden
```

This gives confidence.

---

# 90. MAIN NAVIGATION

Five tabs:

### Home

### Discover

### Interests

### Conversation

### Profile

Avoid six or seven tabs.

---

# 91. NOTIFICATION SYSTEM

Notification categories:

### Interest

"You received a new interest."

### Interest Accepted

"Your interest was accepted."

### Conversation

"You have a new message."

### Photo Access

"Your photo access request was accepted."

### Voice

"Your voice introduction is now visible."

### Wali

"Your Wali has been added to a conversation."

---

# 92. NOTIFICATION PRIVACY

Lock-screen notifications should NOT expose sensitive information.

Instead of:

> "Ayesha accepted your marriage request."

Use:

> "You have a new matrimonial update."

This is important for shared phones / family environments.

---

# 93. EMPTY STATES

Every major section needs a designed empty state.

Example:

### No active conversation

Illustration.

**No active conversation**

> When an interest is accepted, your conversation will appear here.

---

# 94. LOADING STATES

Never use blank white screens.

Use:

Skeleton loaders.

Profile:

```text
████████████
██████
████████████████
```

---

# 95. ERROR STATES

Example:

### Something went wrong

> We couldn't load this profile. Please try again.

`Try Again`

Do not display raw server errors.

---

# 96. ACCESSIBILITY

Minimum:

- WCAG-inspired contrast
- Dynamic text support
- Screen reader labels
- 44×44 minimum touch targets
- no information conveyed by color alone
- audio controls with accessible labels

---

# 97. MICRO-INTERACTIONS

Keep animations:

**150–250ms**

Use:

- fade
- slide
- scale 0.98 → 1
- subtle spring

Avoid:

- excessive bouncing
- confetti
- gamification
- heart explosions

The product should feel calm.

---

# 98. PHOTO REVEAL ANIMATION

For a granted private image:

Blurred:

`████████`

→

0.3 sec blur transition

→

sharp photo.

No dramatic animation.

---

# 99. VOICE PLAY ANIMATION

When playing:

Waveform becomes active.

Play icon:

`▶ → ❚❚`

Progress:

`00:14 / 00:42`

---

# 100. EXACT SCREEN INVENTORY

This is the initial screen map I recommend.

## AUTH / ONBOARDING

1. Logo
2. Splash 1
3. Splash 2
4. Splash 3
5. Get Started
6. Mobile Number
7. OTP
8. Terms/Privacy

---

## PROFILE CREATION

9. Profile Created By
10. Relationship
11. Gender
12. Name
13. DOB
14. Marital Status
15. Religion
16. Sect
17. Mother Tongue

---

## PHYSICAL

18. Height
19. Weight
20. Body Type
21. Appearance
22. Disability / Special Circumstances
23. Diet
24. Smoking
25. Alcohol

---

## RELIGIOUS

26. School of Thought
27. Salah
28. Quran
29. Fasting
30. Halal Preference
31. Attire

---

## EDUCATION

32. Highest Education
33. Field of Study
34. Employment
35. Occupation
36. Employer
37. Income

---

## LOCATION

38. Current Country
39. State
40. City
41. Residency
42. Hometown

---

## FAMILY

43. Family Values
44. Family Type
45. Family Status
46. Father
47. Mother
48. Brothers
49. Sisters
50. Family Location

---

## MARRIAGE

51. Relocation
52. Living Arrangement
53. Career After Marriage
54. Wali

---

## PROFILE

55. About Me
56. Photo Upload
57. Photo Privacy
58. Voice Introduction
59. Voice Privacy

---

## PARTNER PREFERENCES

60. Age
61. Height
62. Marital Status
63. Religion
64. Sect
65. Community
66. Mother Tongue
67. Location
68. Education
69. Income
70. Lifestyle
71. Religious Practice
72. Marriage Expectations

---

## FINALIZATION

73. Profile Preview
74. Privacy Preview
75. Profile Completion
76. Verification
77. Submission
78. Home

This is the **logical screen count**, not necessarily 78 individual screens in the final implementation.

Several questions should be grouped into one screen where appropriate.

---

# 101. DATABASE ARCHITECTURE

At the backend level, do NOT store everything in one `users` table.

Recommended conceptual structure:

```text
users
profiles
profile_creators
profile_relationships

profile_basic
profile_physical
profile_religion
profile_education
profile_employment
profile_location
profile_family
profile_marriage_expectations

photos
photo_permissions

voice_introductions
voice_permissions

partner_preferences
preference_values

interests
shortlists

conversations
conversation_members
messages

wali_relationships

verifications
reports
blocks

notifications
subscriptions

audit_logs
```

---

# 102. CONVERSATION DATABASE RULE

A conversation should have:

```text
conversation_id
profile_a_id
profile_b_id
status
created_at
accepted_at
ended_at
ended_by
```

And enforce:

```text
One ACTIVE conversation per profile
```

through a backend/database constraint.

---

# 103. IMPORTANT — DO NOT RELY ON FRONTEND

This:

```javascript
if(activeConversation) {
   disableChat();
}
```

is NOT sufficient.

A malicious client could bypass it.

The backend must verify:

```text
Can user initiate conversation?
```

before:

- creating conversation
- sending message
- accepting interest
- opening protected media

---

# 104. PHOTO AUTHORIZATION

The server should return something like:

```json
{
  "photo_id": "123",
  "visibility": "blurred",
  "can_request": true,
  "can_view": false
}
```

Never expose the original private image URL to the client if the user is not authorized to view it.

---

# 105. VOICE AUTHORIZATION

Same principle.

Do not provide an unrestricted audio URL.

Use:

- authenticated streaming
- signed temporary URLs
- authorization checks

---

# 106. TECHNOLOGY DIRECTION

For your type of product, I would structure it approximately as:

### Mobile

**React Native + Expo**

or native Android/iOS if deep audio/privacy requirements justify it.

### Backend

Node/NestJS or Django.

### Database

PostgreSQL.

### Object storage

S3-compatible storage.

### Realtime

WebSocket / managed realtime infrastructure.

### Search

PostgreSQL initially.

Elastic/OpenSearch later if scale requires it.

### Notifications

FCM + APNs.

### Audio

Object storage + CDN + secure signed URLs.

---

# 107. ADMIN WEB APP

Use a separate responsive web dashboard.

Suggested:

**Next.js + TypeScript**

Sections:

```text
Dashboard
Users
Profiles
Verification
Photos
Voice
Interests
Conversations
Reports
Wali
Subscriptions
Notifications
CMS
Questionnaire Builder
Settings
Audit Logs
```

---

# 108. VERY IMPORTANT — QUESTIONNAIRE BUILDER

Because you said:

> "I will add questions later."

Do NOT hard-code every question into the mobile app.

Build a questionnaire configuration system.

Example:

```json
{
  "section": "religion",
  "question": "How often do you pray?",
  "type": "single_select",
  "gender": "all",
  "required": true,
  "options": [
    "Always",
    "Usually",
    "Sometimes",
    "Learning"
  ]
}
```

This allows the admin to add/edit questions without publishing a new mobile app version.

---

# 109. QUESTION TYPES

Support:

- single select
- multi select
- text
- number
- date
- range
- dropdown
- searchable dropdown
- location
- yes/no
- conditional question
- photo upload
- audio upload
- relationship repeater

---

# 110. CONDITIONAL QUESTION ENGINE

Example:

```text
Gender = Female
       ↓
Show Hijab question
```

Another:

```text
Marital Status = Divorced
       ↓
Show additional divorce-related fields
```

Another:

```text
Profile Created By ≠ Self
       ↓
Show creator relationship
```

This makes the onboarding dramatically cleaner.

---

# 111. PROFILE CREATION STATE

Save after every screen.

If the app closes on:

**Question 34 of 70**

the user should return to:

**Question 34**

not restart.

---

# 112. DRAFT PROFILE

Backend:

```text
profile_status =
draft
pending_review
approved
rejected
suspended
deleted
```

---

# 113. PROFILE REVIEW

Potential automated checks:

- missing required fields
- image format
- inappropriate image
- audio duration
- duplicate phone
- duplicate profile
- suspicious activity

Then:

`Pending Review`

if manual review is required.

---

# 114. DUPLICATE PROFILE DETECTION

Since parents/relatives may create profiles, the system needs to distinguish:

**Account**

from

**Profile Subject**

Otherwise:

Mother creates daughter's profile.

Daughter later creates her own account.

You accidentally create two people.

The database should support:

```text
User Account A
       ↓
Profile Subject X
       ↑
User Account B
```

with appropriate authorization.

---

# 115. BUSINESS RULE — PROFILE OWNERSHIP

Every profile should have:

### Primary profile subject

and:

### Authorized managers

Example:

```text
Ayesha
 ├── Ayesha — Primary
 ├── Mother — Manager
 └── Wali — Viewer / Chaperone
```

This is much more powerful than a simple "created by" field.

---

# 116. WALI COMMUNICATION MODEL

Potential architecture:

```text
Profile A
   ↓
Profile B
   ↓
Conversation
   ↓
Optional Wali
```

Wali should not automatically receive every private action unless the user explicitly enables that mode.

---

# 117. BUSINESS MODEL

Potential monetization can be added later.

Do not make the initial UX feel pay-to-win.

Possible:

### Free

- profile creation
- discovery
- interests
- one active conversation
- voice introduction
- privacy controls

### Premium

Could later unlock:

- advanced filters
- profile boosts
- additional discovery controls
- verification enhancements
- premium visibility

But the core marriage workflow should remain functional.

---

# 118. DO NOT PAYWALL SAFETY

Never paywall:

- report
- block
- privacy
- photo protection
- account deletion
- consent
- basic safety controls

---

# 119. PRODUCT ANALYTICS

Track:

### Onboarding

- OTP completion
- profile creator selection
- gender selection
- profile completion
- drop-off per question

### Discovery

- profiles viewed
- voice plays
- photo requests
- interests sent

### Matching

- interest acceptance
- rejection
- conversation starts

### Conversation

- first message
- messages sent
- conversation duration
- conversation ended

### Safety

- reports
- blocks
- photo abuse reports
- voice reports

Do not collect unnecessary analytics around sensitive fields.

---

# 120. CORE SUCCESS METRICS

Rather than measuring only downloads:

### Profile completion rate

### Verified profile percentage

### Interest acceptance rate

### Accepted interest → conversation rate

### Conversation → meaningful progression rate

### Report rate

### Profile deletion rate

### Median onboarding completion time

---

# 121. THE MOST IMPORTANT UX METRIC

I would specifically monitor:

> **Time from registration → completed profile**

The onboarding is intentionally detailed, so the UX needs to make the process feel manageable.

Use:

**"About 8 minutes"**

rather than making users feel like they're filling out a government form.

---

# 122. ONBOARDING UX TRICK

Instead of:

> **Question 37 of 72**

Use:

### Family & Background

**Let's understand your family**

Then:

`3 questions in this section`

This feels psychologically smaller.

---

# 123. SECTION TRANSITION

After completing a section:

```text
✓ Basic Information Complete

Next

Family & Background

3 minutes
```

Button:

**Continue**

This gives users a sense of progress.

---

# 124. DESIGN LANGUAGE FOR RELIGIOUS CONTENT

Use subtle visual cues.

For example:

- thin geometric patterns
- restrained arches
- subtle Islamic geometry
- warm neutral backgrounds

But don't make every screen look like a mosque.

The brand should feel like:

**modern premium technology + Muslim values**

---

# 125. LOGO / BRANDING

Until the final brand name/logo is confirmed:

Use a placeholder logo system.

The UI must be designed so the logo can be replaced without changing:

- spacing
- navigation
- header height
- button position

---

# 126. UI GENERATION MASTER RULE

When generating UI images with ChatGPT/Gemini, every prompt should explicitly include:

> Use the existing design system exactly. Do not introduce new colors, fonts, corner radii, spacing values, icon styles, shadows, button shapes, navigation patterns, or component styles.

And:

> Do not redesign existing components. Reuse the exact components from the established design system.

This is critical for your "zero hallucination" requirement.

---

# 127. MASTER UI DESIGN TOKEN FILE

The actual development/design handoff should have one source of truth:

```text
design-tokens.ts
```

containing:

```text
colors
typography
spacing
radii
shadows
borders
icon sizes
button heights
input heights
animation durations
```

No developer should manually invent:

`borderRadius: 17`

on one screen and:

`borderRadius: 14`

on another.

---

# 128. COMPONENT LIBRARY

Create:

```text
Button
IconButton
TextInput
OTPInput
SelectCard
MultiSelectCard
RangeSlider
ProfileCard
ProfileHeader
PhotoViewer
BlurredPhoto
VoicePlayer
VoiceRecorder
VerificationBadge
SectionHeader
ProgressHeader
BottomSheet
Modal
Toast
EmptyState
Skeleton
InterestButton
ChatBubble
ConversationCard
WaliBadge
```

Everything should reuse these components.

---

# 129. PROFILE CARD COMPONENT

One canonical profile card.

Never create:

`ProfileCardV2`

because one screen needed slightly different styling.

Instead:

```text
<ProfileCard variant="compact" />
<ProfileCard variant="featured" />
<ProfileCard variant="search" />
```

Same underlying design language.

---

# 130. PHOTO PRIVACY COMPONENT

One canonical component:

```text
<ProtectedPhoto
 visibility="blurred"
 canRequest
/>
```

This should appear consistently everywhere.

---

# 131. VOICE COMPONENT

One canonical:

```text
<VoiceIntroduction
 duration={42}
 playable={true}
/>
```

Use it on:

- profile
- discover card
- preview
- match
- admin

---

# 132. CHAT COMPONENT

One chat system.

Different states:

```text
pending
active
ended
blocked
wali_present
```

---

# 133. THE MOST IMPORTANT PRODUCT STATE

### ACTIVE CONVERSATION

The application should always know:

```text
Does this profile currently have an active matrimonial conversation?
```

If yes:

Every other profile interaction should respect this.

Example:

User visits another profile:

> **You're currently getting to know someone.**

Then:

`View Profile`

`Save for Later`

but:

**Start Conversation**

is unavailable.

This is much clearer than silently blocking things.

---

# 134. "SAVE FOR LATER"

Since only one conversation is active, you still need to allow users to save interesting profiles.

Use:

### Shortlist

not another conversation.

This lets users remember prospects without violating the one-conversation principle.

---

# 135. INTEREST QUEUE

A user can potentially have:

```text
Interests Sent
Pending
Accepted
Rejected
Shortlisted
```

But only:

```text
1 ACTIVE CONVERSATION
```

at any time.

This distinction is essential.

---

# 136. EXAMPLE USER JOURNEY

### Ahmed registers

OTP verified.

### Profile creation

Completes:

- basic information
- Islamic practice
- family
- career
- photos
- voice

### Ahmed discovers Ayesha

Ayesha's photo:

🔒 Blurred

Ahmed can see:

- profile information
- voice introduction
- preferences

He selects:

**Interested**

---

Ayesha receives:

> Ahmed has expressed matrimonial interest.

She reviews his:

- profile
- voice
- family
- preferences

She accepts.

Now:

### ACTIVE CONVERSATION

Ahmed can chat only with Ayesha.

---

# 137. SECOND PROFILE

Ahmed finds Sara.

He can:

`View`

`Shortlist`

but if he tries to start another conversation:

> **You already have an active conversation.**

> Finish your current conversation before starting another.

This is your key product behaviour.

---

# 138. IMPORTANT PRODUCT COPY

Avoid:

> "You can't talk to anyone else."

That's restrictive.

Use:

> **One conversation at a time**

Subtext:

> We keep conversations focused so you can get to know one person meaningfully before moving on.

This frames the feature positively.

---

# 139. PHOTO PRIVACY COPY

Avoid:

> "Women photos are hidden."

Instead:

> **Private Photo**

> This photo is protected by the profile owner's privacy settings.

This is cleaner and more inclusive.

---

# 140. RELIGIOUS POSITIONING

Avoid claiming:

> "100% Sharia compliant"

unless your product has actually been reviewed and governed accordingly.

Better:

> **Designed around Muslim matrimonial values, privacy and family involvement.**

If you want a formal Sharia positioning, create a documented advisory process with qualified scholars and have the final claims reviewed.

---

# 141. SAFETY

Include:

### Before meeting

> Meet in a public place.

> Inform someone you trust.

> Take your time.

> Don't share financial information.

> Report suspicious behaviour.

Muzz similarly provides safety guidance around first meetings and warns against quickly moving conversations off-platform. [Muzz](https://muzz.com/us/en/muslim-dating-app/?utm_source=chatgpt.com)

---

# 142. OFF-PLATFORM CONTACT WARNING

If users attempt to send:

- phone numbers
- WhatsApp links
- Telegram handles
- Instagram usernames

you can show:

> **Stay safe**

> For your protection, consider getting to know the person through the app first.

Don't necessarily automatically block every phone number; make this a configurable moderation policy.

---

# 143. FINAL DESIGN ARCHITECTURE

Your entire app should essentially have four layers.

```text
                    APP
                     │
        ┌────────────┴────────────┐
        │                         │
     DISCOVERY                 PROFILE
        │                         │
   Matches/Interest       Identity/Family/Faith
        │                         │
        └────────────┬────────────┘
                     │
              COMMUNICATION
                     │
             One Active Chat
                     │
                 Optional
                   Wali
```

---

# 144. FINAL APP INFORMATION ARCHITECTURE

```text
APP
│
├── Onboarding
│   ├── Logo
│   ├── Splash
│   ├── Phone
│   └── OTP
│
├── Profile Creation
│   ├── Creator
│   ├── Identity
│   ├── Physical
│   ├── Faith
│   ├── Education
│   ├── Career
│   ├── Location
│   ├── Family
│   ├── Marriage
│   ├── Bio
│   ├── Photos
│   ├── Voice
│   └── Preferences
│
├── Home
│
├── Discover
│   ├── Recommended
│   ├── Search
│   └── Filters
│
├── Interests
│   ├── Received
│   ├── Sent
│   └── Shortlist
│
├── Conversation
│   ├── Active
│   ├── Archived
│   └── Wali
│
├── Profile
│   ├── My Profile
│   ├── Edit
│   ├── Privacy
│   ├── Verification
│   └── Settings
│
└── Safety
    ├── Block
    ├── Report
    └── Support
```

---

# 145. WHAT YOUR SCREENSHOTS HAVE GIVEN US

The screenshots you provided are now the **questionnaire source specification** for the first version.

They establish these major groups:

1. Account Setup & Basic Identity
2. Physical & Lifestyle
3. Education & Career
4. Location & Residency
5. Family Background
6. Profile Bio & Photos
7. Partner Preferences
8. Religious Practice
9. Marriage Expectations & Cultural Nuances

I've incorporated those into the architecture above rather than simply reproducing the screenshot list.

---

# 146. WHAT I WOULD CHANGE FROM THE SCREENSHOTS

There are a few UX changes I'd make.

### Don't do:

> 70 questions in one long scrolling form.

### Do:

**Section → 2–5 questions → progress → next section**

---

### Don't do:

> Father occupation = giant text field

### Do:

Structured family records.

---

### Don't do:

> One "Privacy Settings" field at the end.

### Do:

Privacy at the point where data is introduced.

---

### Don't do:

> Photo privacy buried in settings.

### Do:

Photo privacy immediately after upload.

---

### Don't do:

> Voice introduction hidden inside profile settings.

### Do:

Voice introduction as a major onboarding step.

---

# 147. THE THREE SIGNATURE FEATURES

If I were defining the product identity, I'd make these the three pillars:

## 01 — Private by default

Especially around photos and personal information.

## 02 — Hear before you connect

Voice introduction.

## 03 — One meaningful conversation

One active matrimonial conversation at a time.

Together:

> **Privacy. Voice. Intent.**

That gives the product a clear identity beyond simply being another Shaadi/Jeevansathi clone.

---

# 148. DESIGN GENERATION STANDARD

When we move to generating individual UI screens, I recommend we **do not generate 78 screens randomly**.

Instead, we first establish **approximately 12 canonical screens**:

1. Splash
2. Phone
3. OTP
4. Question single-select
5. Question multi-select
6. Text input
7. Range selection
8. Photo upload
9. Voice recording
10. Profile preview
11. Discover/profile card
12. Profile detail

Once these are perfect, every other screen derives from them.

That is how we achieve your:

> **"Zero hallucination / zero inconsistency"**

requirement.

---

# 149. FINAL DESIGN RULE

Every future UI generation prompt should contain this instruction:

> **This is an existing product design system. Do not redesign the system. Reuse the exact established typography, colors, spacing, corner radii, button dimensions, card geometry, iconography, navigation, shadows, interaction patterns and component hierarchy. Only change the content required for this screen. Do not introduce any new visual language.**

This will be particularly important when you generate screens through ChatGPT/Gemini.

---

## Research sources used

- [Shaadi.com](https://www.shaadi.com/?utm_source=chatgpt.com) — matching, preferences and photo privacy functionality. [Shaadi.com](https://support.shaadi.com/support/solutions/articles/48000953813-how-does-matches-option-help-me-to-get-more-matches-with-different-options-?utm_source=chatgpt.com)
- [Jeevansathi](https://www.jeevansathi.com/?utm_source=chatgpt.com) — verification, privacy, video profiles and voice/video communication. [jeevansathi.com](https://www.jeevansathi.com/?utm_source=chatgpt.com)
- [Muzz](https://muzz.com/?utm_source=chatgpt.com) — Muslim-specific privacy, blurred photos, verification, chaperone and communication features. [Muzz](https://muzz.com/us/en/help/getting-started/how-is-muzz-halal/?utm_source=chatgpt.com)
- [India Code — DPDP Act 2023](https://www.indiacode.nic.in/indiacode/handle/123456789/22037?view_type=browse&utm_source=chatgpt.com) — Indian personal-data framework. [indiacode.nic.in](https://www.indiacode.nic.in/bitstream/123456789/22037/2/a2023-22.pdf?utm_source=chatgpt.com)
- [MeitY — DPDP Rules 2025](https://www.meity.gov.in/documents/act-and-policies/digital-personal-data-protection-rules-2025-gDOxUjMtQWa?pageTitle=Digital-Personal-Data-Protection-Rules-2025&utm_source=chatgpt.com) — current rules and implementation timeline. [meity.gov.in](https://www.meity.gov.in/documents/act-and-policies/digital-personal-data-protection-rules-2025-gDOxUjMtQWa?pageTitle=Digit\&utm_source=chatgpt.com)
- [OWASP MASVS](https://mas.owasp.org/MASVS/?utm_source=chatgpt.com) — mobile security baseline for authentication, storage, privacy and network security. [mas.owasp.org](https://mas.owasp.org/MASVS/?utm_source=chatgpt.com)

**One important note:** the religious taxonomy and the exact meaning/requirements of Wali, Purdah, interaction boundaries, etc. should be reviewed by a qualified Islamic scholar/advisory panel before you market any feature as *Sharia-compliant*. The product can absolutely be designed around those requirements, but the app itself shouldn't invent religious rulings.

### Next stage

The next thing I would do is turn this into the **actual screen-by-screen UI/UX specification**: **Screen 01 → Screen 02 → Screen 03 ...**, with for every screen:

- exact screen dimensions
- exact header
- exact copy
- component positions
- typography size/weight
- colors
- spacing
- corner radius
- icon
- button states
- loading/error/empty states
- male/female conditional behaviour
- navigation
- animation
- backend state
- and, most importantly, a **ready-to-copy ChatGPT/Gemini image-generation prompt for each screen**.

That should be the design-generation document we use to actually create the UI images without the design drifting between screens.