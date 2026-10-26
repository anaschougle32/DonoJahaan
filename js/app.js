// ====================================================================
// DONO JAHA (D O N O   J A H A)
// Master Client Application Controller & Interaction Logic
// ====================================================================

(function () {
  'use strict';

  // State Store
  const State = {
    currentScreen: 'home', // 'splash', 'auth_phone', 'auth_otp', 'questionnaire', 'home', 'discover', 'interests', 'chat', 'profile', 'profile_detail'
    splashIndex: 0,
    currentQuestionStep: 0,
    activeTab: 'home',
    activeSuitor: null,
    selectedInterestTab: 'received',
    hasActiveConversation: true,
    activeConversationSuitor: null,
    photoAccessGranted: {}, // suitorId: boolean
    voicePlaying: false,
    recordingActive: false,
    recordingTimer: 14,
    recordingInterval: null,
    userForm: {
      createdBy: 'myself',
      gender: 'male',
      fullName: 'Anas Khan',
      dob: '1998-05-14',
      maritalStatus: 'Never Married',
      heightFt: 5,
      heightIn: 11,
      bodyType: 'Average',
      accessibility: 'No',
      sect: 'Sunni',
      school: 'Hanafi',
      community: 'Pathan',
      prayer: 'Prays 5 times regularly',
      quran: 'Frequently',
      fasting: 'Always during Ramadan',
      halal: 'Strictly Halal',
      attire: 'Trimmed beard',
      education: 'Master of Technology (M.Tech)',
      profession: 'Senior Software Architect',
      income: '₹25–35 Lakh / year',
      city: 'Mumbai',
      state: 'Maharashtra',
      country: 'India',
      familyValues: 'Moderate',
      familyType: 'Nuclear',
      bio: 'Seeking a practicing partner who values family warmth, mutual respect, intellect, and barakah in daily moments.'
    }
  };

  // DOM Elements cache
  const UI = {
    screenContainer: document.getElementById('main-screen-content'),
    bottomNav: document.getElementById('app-bottom-nav'),
    appHeader: document.getElementById('app-header'),
    headerTitle: document.getElementById('header-title'),
    headerBackBtn: document.getElementById('header-back-btn'),
    headerAvatar: document.getElementById('header-avatar'),
    modalOverlay: document.getElementById('global-modal-overlay'),
    modalContent: document.getElementById('modal-content-slot'),
    screenExplorerModal: document.getElementById('screen-explorer-modal')
  };

  // Init
  function init() {
    State.activeConversationSuitor = window.DonoJahaData.profiles.find(p => p.id === 'prof_ayesha_001');
    State.activeSuitor = State.activeConversationSuitor;
    
    // Bind global navigation
    document.querySelectorAll('.nav-tab-item').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const tab = btn.dataset.tab;
        switchTab(tab);
      });
    });

    // Check URL query parameters for direct screen linking
    const params = new URLSearchParams(window.location.search);
    const screenParam = params.get('screen');
    if (screenParam) {
      navigateTo(screenParam);
    } else {
      renderScreen('home');
    }
  }

  // Switch Main Bottom Tab
  function switchTab(tabName) {
    State.activeTab = tabName;
    document.querySelectorAll('.nav-tab-item').forEach(b => {
      b.classList.toggle('active', b.dataset.tab === tabName);
    });
    renderScreen(tabName);
  }

  // Navigation Router
  function navigateTo(screenName, options = {}) {
    State.currentScreen = screenName;
    if (options.suitor) {
      State.activeSuitor = options.suitor;
    }
    renderScreen(screenName, options);
  }

  // Universal Back Button
  window.handleHeaderBack = function () {
    if (State.currentScreen === 'profile_detail') {
      navigateTo(State.activeTab);
    } else if (State.currentScreen === 'questionnaire') {
      if (State.currentQuestionStep > 0) {
        State.currentQuestionStep--;
        renderScreen('questionnaire');
      } else {
        navigateTo('auth_otp');
      }
    } else if (State.currentScreen === 'auth_otp') {
      navigateTo('auth_phone');
    } else if (State.currentScreen === 'auth_phone') {
      navigateTo('splash');
    } else {
      navigateTo('home');
    }
  };

  // Screen Rendering Engine
  function renderScreen(screenName, options = {}) {
    window.scrollTo(0, 0);
    closeAllModals();

    // Configure Header & Bottom Nav visibility
    const isMainTab = ['home', 'discover', 'interests', 'chat', 'profile'].includes(screenName);
    UI.bottomNav.style.display = isMainTab ? 'flex' : 'none';

    switch (screenName) {
      case 'splash':
        renderSplashScreen();
        break;
      case 'auth_phone':
        renderPhoneAuthScreen();
        break;
      case 'auth_otp':
        renderOtpScreen();
        break;
      case 'questionnaire':
        renderQuestionnaireScreen();
        break;
      case 'preferences':
        renderPreferencesScreen();
        break;
      case 'home':
        renderHomeScreen();
        break;
      case 'discover':
        renderDiscoverScreen();
        break;
      case 'interests':
        renderInterestsScreen();
        break;
      case 'chat':
        renderChatScreen();
        break;
      case 'profile_detail':
        renderProfileDetailScreen(State.activeSuitor || State.activeConversationSuitor);
        break;
      case 'profile':
        renderProfileHubScreen();
        break;
      case 'wali_dashboard':
        renderWaliDashboardScreen();
        break;
      case 'notifications':
        renderNotificationsScreen();
        break;
      default:
        renderHomeScreen();
    }
  }

  // -------------------------------------------------------------
  // 1. SPLASH SCREEN (3 Slides)
  // -------------------------------------------------------------
  function renderSplashScreen() {
    UI.appHeader.style.display = 'none';
    const slides = [
      {
        badge: "Pure Intentions • Serious Nikah",
        title: "Find Someone Who Shares Your Values",
        subtitle: "Discover Muslim profiles based on faith, character, family traditions, and life goals.",
        icon: "diversity_1",
        btnText: "Continue"
      },
      {
        badge: "Privacy by Design",
        title: "Privacy Comes First",
        subtitle: "Protect your photos with modesty blur curtains. You control who can view your personal details.",
        icon: "shield_lock",
        btnText: "Continue"
      },
      {
        badge: "One Meaningful Connection",
        title: "Meet With Purpose",
        subtitle: "One active conversation at a time. Involve family and chaperones when you choose for peace of mind.",
        icon: "favorite",
        btnText: "Get Started"
      }
    ];

    const slide = slides[State.splashIndex];

    UI.screenContainer.innerHTML = `
      <div style="min-height: 85vh; display: flex; flex-direction: column; justify-content: space-between; padding: 24px 20px;">
        <div style="display: flex; justify-content: space-between; align-items: center; padding-top: 12px;">
          <div style="display: flex; align-items: center; gap: 8px;">
            <div style="width: 32px; height: 32px; border-radius: 8px; background: var(--primary); display: flex; align-items: center; justify-content: center; color: #FFF;">
              <span class="material-symbols-outlined" style="font-size: 20px;">mosque</span>
            </div>
            <span style="font-family: var(--font-headline); font-weight: 700; font-size: 18px; color: var(--primary); letter-spacing: 0.05em;">DONO JAHAAN</span>
          </div>
          <button onclick="window.skipSplash()" style="background: none; border: none; font-size: 13px; font-weight: 600; color: var(--text-muted); cursor: pointer;">Skip</button>
        </div>

        <div style="text-align: center; margin: 40px 0;">
          <div style="width: 96px; height: 96px; border-radius: 28px; background: var(--primary-soft); color: var(--primary); margin: 0 auto 28px auto; display: flex; align-items: center; justify-content: center; box-shadow: var(--shadow-card);">
            <span class="material-symbols-outlined" style="font-size: 48px;">${slide.icon}</span>
          </div>
          <span style="display: inline-block; padding: 4px 14px; border-radius: var(--radius-pill); background: var(--surface-container-low); color: var(--primary); font-size: 12px; font-weight: 600; margin-bottom: 16px;">
            ${slide.badge}
          </span>
          <h1 style="font-size: 26px; line-height: 1.3; margin-bottom: 14px; font-weight: 700;">${slide.title}</h1>
          <p style="color: var(--text-muted); font-size: 14px; max-width: 320px; margin: 0 auto; line-height: 1.6;">${slide.subtitle}</p>
        </div>

        <div>
          <!-- Dots -->
          <div style="display: flex; justify-content: center; gap: 8px; margin-bottom: 24px;">
            ${slides.map((_, i) => `
              <span style="width: ${i === State.splashIndex ? '24px' : '8px'}; height: 6px; border-radius: var(--radius-pill); background: ${i === State.splashIndex ? 'var(--primary)' : 'var(--surface-container-high)'}; transition: all 0.2s ease;"></span>
            `).join('')}
          </div>
          <button class="btn-primary" onclick="window.nextSplash()">
            <span>${slide.btnText}</span>
            <span class="material-symbols-outlined" style="font-size: 18px;">arrow_forward</span>
          </button>
        </div>
      </div>
    `;
  }

  window.nextSplash = function () {
    if (State.splashIndex < 2) {
      State.splashIndex++;
      renderSplashScreen();
    } else {
      navigateTo('auth_phone');
    }
  };

  window.skipSplash = function () {
    navigateTo('auth_phone');
  };

  // -------------------------------------------------------------
  // 2. AUTHENTICATION SCREENS (Phone & OTP)
  // -------------------------------------------------------------
  function renderPhoneAuthScreen() {
    UI.appHeader.style.display = 'flex';
    UI.headerTitle.innerText = "Authentication";
    UI.headerAvatar.style.display = 'none';

    UI.screenContainer.innerHTML = `
      <div style="padding: 20px;">
        <span style="display: inline-flex; align-items: center; gap: 6px; padding: 4px 12px; border-radius: var(--radius-pill); background: var(--surface-container-low); color: var(--primary); font-size: 12px; font-weight: 600; margin-bottom: 12px;">
          <span class="material-symbols-outlined" style="font-size: 16px;">verified_user</span> Pure Intentions • Verified Community
        </span>
        <h2 style="font-size: 24px; margin-bottom: 6px;">Let's get started</h2>
        <p style="color: var(--text-muted); font-size: 13px; margin-bottom: 20px;">Enter your mobile number to create or access your intentional matrimonial journey.</p>

        <!-- Trust Card -->
        <div style="background: var(--surface-card); border: 1px solid var(--border-subtle); border-radius: var(--radius-card); padding: 14px; display: flex; align-items: center; gap: 12px; margin-bottom: 24px; box-shadow: var(--shadow-sm);">
          <div style="width: 40px; height: 40px; border-radius: 10px; background: var(--surface-container-low); color: var(--primary); display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
            <span class="material-symbols-outlined" style="font-size: 22px;">shield_lock</span>
          </div>
          <div>
            <div style="font-size: 13px; font-weight: 600;">Family-First Privacy</div>
            <div style="font-size: 12px; color: var(--text-muted);">Your number is never publicly visible to suitors.</div>
          </div>
        </div>

        <div style="margin-bottom: 16px;">
          <label style="display: block; font-size: 13px; font-weight: 600; margin-bottom: 8px;">Mobile Number</label>
          <div style="display: flex; gap: 8px;">
            <div style="height: 52px; padding: 0 12px; background: var(--surface-card); border: 1.5px solid var(--border-subtle); border-radius: var(--radius-btn); display: flex; align-items: center; gap: 6px; font-weight: 600;">
              <span>🇮🇳</span>
              <span>+91</span>
            </div>
            <input type="tel" id="mobile-input" class="form-input" placeholder="98230 12345" value="9823012345" maxlength="10" style="flex: 1; letter-spacing: 0.05em; font-weight: 600;" />
          </div>
        </div>

        <div style="margin-bottom: 24px;">
          <span style="font-size: 11px; font-weight: 600; color: var(--text-muted); text-transform: uppercase;">Quick Fill Demo:</span>
          <div style="display: flex; gap: 8px; margin-top: 6px;">
            <button class="tag-chip active" onclick="document.getElementById('mobile-input').value='9823012345'">+91 98230 12345</button>
            <button class="tag-chip" onclick="document.getElementById('mobile-input').value='9765432100'">+91 97654 32100</button>
          </div>
        </div>

        <button class="btn-primary" onclick="window.sendOtp()">
          <span>Send Confirmation OTP</span>
          <span class="material-symbols-outlined" style="font-size: 18px;">arrow_forward</span>
        </button>

        <p style="text-align: center; color: var(--text-muted); font-size: 11px; margin-top: 24px; line-height: 1.5;">
          By continuing, you agree to Dono Jahaan's <span style="color: var(--primary); text-decoration: underline;">Terms of Service</span> and <span style="color: var(--primary); text-decoration: underline;">Privacy Policy</span>.
        </p>
      </div>
    `;
  }

  window.sendOtp = function () {
    navigateTo('auth_otp');
  };

  function renderOtpScreen() {
    UI.appHeader.style.display = 'flex';
    UI.headerTitle.innerText = "Verify OTP";

    UI.screenContainer.innerHTML = `
      <div style="padding: 20px;">
        <span style="display: inline-flex; align-items: center; gap: 6px; padding: 4px 12px; border-radius: var(--radius-pill); background: var(--surface-container-low); color: var(--primary); font-size: 12px; font-weight: 600; margin-bottom: 12px;">
          <span class="material-symbols-outlined" style="font-size: 16px;">sms</span> SMS Verification Code
        </span>
        <h2 style="font-size: 24px; margin-bottom: 6px;">Enter 6-digit Code</h2>
        <p style="color: var(--text-muted); font-size: 13px; margin-bottom: 24px;">We sent a secure code to <strong>+91 98230 12345</strong>.</p>

        <!-- 6 Digit OTP Boxes -->
        <div style="display: flex; justify-content: space-between; gap: 8px; margin-bottom: 24px;">
          ${[5, 8, 2, 4, 1, 9].map((val, i) => `
            <input type="text" maxlength="1" value="${val}" style="width: 48px; height: 56px; text-align: center; font-size: 20px; font-weight: 700; border: 1.5px solid var(--border-subtle); border-radius: var(--radius-btn); background: var(--surface-card); color: var(--primary);" />
          `).join('')}
        </div>

        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; font-size: 13px;">
          <span style="color: var(--text-muted);">Resend in <span style="color: var(--primary); font-weight: 600;">00:28</span></span>
          <button style="background: none; border: none; color: var(--primary); font-weight: 600; cursor: pointer;" onclick="navigateTo('auth_phone')">Change number</button>
        </div>

        <button class="btn-primary" onclick="window.verifyOtp()">
          <span>Verify & Continue</span>
          <span class="material-symbols-outlined" style="font-size: 18px;">check_circle</span>
        </button>
      </div>
    `;
  }

  window.verifyOtp = function () {
    // Transition to Questionnaire or Home based on onboarding state
    navigateTo('questionnaire');
  };

  // -------------------------------------------------------------
  // 3. QUESTIONNAIRE ENGINE (Step-by-step modular form)
  // -------------------------------------------------------------
  const questions = [
    {
      id: "created_by",
      title: "Who are you creating this profile for?",
      subtitle: "Profiles in Dono Jahaan are built with family awareness.",
      options: [
        { label: "Myself", desc: "I am looking for my own marriage partner", icon: "person", val: "myself" },
        { label: "My Son or Daughter", desc: "Parent or guardian seeking proposal", icon: "family_restroom", val: "parent" },
        { label: "My Sibling", desc: "Brother or sister assisting with search", icon: "diversity_1", val: "sibling" },
        { label: "Someone under my guardianship (Wali)", desc: "Formal Wali representation", icon: "shield_person", val: "guardian_wali" }
      ]
    },
    {
      id: "gender_name",
      title: "Basic Identity",
      subtitle: "Enter the suitor's full legal name and gender.",
      type: "inputs"
    },
    {
      id: "religion_sect",
      title: "Religious Identity & Sect",
      subtitle: "Helps connect with families sharing your school of thought.",
      type: "religion"
    },
    {
      id: "prayer_practice",
      title: "Prayer & Quran Practice",
      subtitle: "Salah frequency is a vital foundation for Islamic family life.",
      type: "prayer"
    },
    {
      id: "modesty_photos",
      title: "Photos & Modesty Privacy",
      subtitle: "You choose your photo privacy curtain level.",
      type: "photos"
    },
    {
      id: "voice_studio",
      title: "Voice Introduction Studio",
      subtitle: "Introduce yourself naturally in your own authentic voice.",
      type: "voice"
    }
  ];

  function renderQuestionnaireScreen() {
    UI.appHeader.style.display = 'flex';
    UI.headerTitle.innerText = `Questionnaire (${State.currentQuestionStep + 1}/${questions.length})`;
    UI.headerAvatar.style.display = 'none';

    const q = questions[State.currentQuestionStep];

    let contentHtml = `
      <div style="padding: 20px;">
        <span style="font-size: 11px; font-weight: 700; color: var(--primary); text-transform: uppercase; letter-spacing: 0.05em;">Step ${State.currentQuestionStep + 1} of ${questions.length}</span>
        <h2 style="font-size: 22px; margin: 4px 0 6px 0;">${q.title}</h2>
        <p style="color: var(--text-muted); font-size: 13px; margin-bottom: 20px;">${q.subtitle}</p>
    `;

    if (q.id === 'created_by') {
      contentHtml += `
        <div style="display: flex; flex-direction: column; gap: 12px; margin-bottom: 24px;">
          ${q.options.map(opt => `
            <div class="selection-card ${State.userForm.createdBy === opt.val ? 'selected' : ''}" onclick="window.selectCreatedBy('${opt.val}')">
              <div style="width: 40px; height: 40px; border-radius: 12px; background: var(--surface-container-low); color: var(--primary); display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
                <span class="material-symbols-outlined">${opt.icon}</span>
              </div>
              <div style="flex: 1;">
                <div style="font-size: 14px; font-weight: 600;">${opt.label}</div>
                <div style="font-size: 12px; color: var(--text-muted);">${opt.desc}</div>
              </div>
              <div class="card-radio"></div>
            </div>
          `).join('')}
        </div>
      `;
    } else if (q.id === 'gender_name') {
      contentHtml += `
        <div style="margin-bottom: 16px;">
          <label style="display: block; font-size: 13px; font-weight: 600; margin-bottom: 8px;">Gender of Suitor</label>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
            <div class="selection-card ${State.userForm.gender === 'male' ? 'selected' : ''}" onclick="window.setFormGender('male')" style="justify-content: center; text-align: center;">
              <span class="material-symbols-outlined" style="color: var(--primary);">man</span>
              <span style="font-weight: 600;">Male</span>
            </div>
            <div class="selection-card ${State.userForm.gender === 'female' ? 'selected' : ''}" onclick="window.setFormGender('female')" style="justify-content: center; text-align: center;">
              <span class="material-symbols-outlined" style="color: var(--primary);">woman</span>
              <span style="font-weight: 600;">Female</span>
            </div>
          </div>
        </div>

        <div style="margin-bottom: 16px;">
          <label style="display: block; font-size: 13px; font-weight: 600; margin-bottom: 8px;">Full Name</label>
          <input type="text" class="form-input" value="${State.userForm.fullName}" onchange="State.userForm.fullName = this.value" />
        </div>

        <div style="margin-bottom: 24px;">
          <label style="display: block; font-size: 13px; font-weight: 600; margin-bottom: 8px;">Date of Birth</label>
          <input type="date" class="form-input" value="${State.userForm.dob}" onchange="State.userForm.dob = this.value" />
        </div>
      `;
    } else if (q.id === 'religion_sect') {
      contentHtml += `
        <div style="margin-bottom: 16px;">
          <label style="display: block; font-size: 13px; font-weight: 600; margin-bottom: 8px;">Sect / Branch</label>
          <div style="display: flex; gap: 8px; flex-wrap: wrap;">
            ${['Sunni', 'Shia', 'Ahle-Hadith', 'Other'].map(s => `
              <button class="tag-chip ${State.userForm.sect === s ? 'active' : ''}" onclick="window.setFormSect('${s}')">${s}</button>
            `).join('')}
          </div>
        </div>

        <div style="margin-bottom: 16px;">
          <label style="display: block; font-size: 13px; font-weight: 600; margin-bottom: 8px;">School of Thought (Madhhab)</label>
          <div style="display: flex; gap: 8px; flex-wrap: wrap;">
            ${['Hanafi', 'Shafi\'i', 'Maliki', 'Hanbali', 'Jafari', 'General'].map(m => `
              <button class="tag-chip ${State.userForm.school === m ? 'active' : ''}" onclick="window.setFormSchool('${m}')">${m}</button>
            `).join('')}
          </div>
        </div>

        <div style="margin-bottom: 24px;">
          <label style="display: block; font-size: 13px; font-weight: 600; margin-bottom: 8px;">Community / Caste (Optional)</label>
          <input type="text" class="form-input" value="${State.userForm.community}" placeholder="e.g. Memon, Pathan, Syed, Ansari" onchange="State.userForm.community = this.value" />
        </div>
      `;
    } else if (q.id === 'prayer_practice') {
      contentHtml += `
        <div style="margin-bottom: 18px;">
          <label style="display: block; font-size: 13px; font-weight: 600; margin-bottom: 8px;">Salah / Prayer Routine</label>
          <div style="display: flex; flex-direction: column; gap: 8px;">
            ${['Prays 5 times regularly', 'Usually prays', 'Sometimes / Jummah only', 'Learning & improving'].map(p => `
              <div class="selection-card ${State.userForm.prayer === p ? 'selected' : ''}" onclick="window.setFormPrayer('${p}')">
                <span class="material-symbols-outlined" style="color: var(--primary);">wb_sunny</span>
                <span style="font-weight: 500;">${p}</span>
                <div class="card-radio" style="margin-left: auto;"></div>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    } else if (q.id === 'modesty_photos') {
      contentHtml += `
        <div style="background: var(--surface-card); border: 1.5px solid var(--border-subtle); border-radius: var(--radius-card); padding: 18px; margin-bottom: 20px;">
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px;">
            <div style="font-weight: 600;">Modesty Curtain (Photo Blur)</div>
            <span class="material-symbols-outlined" style="color: var(--primary);">visibility_off</span>
          </div>
          <p style="font-size: 12px; color: var(--text-muted); line-height: 1.5; margin-bottom: 14px;">
            When active, suitors can only view your blurred silhouette and must politely request access before seeing your original photograph.
          </p>
          <div style="display: flex; gap: 8px;">
            <button class="tag-chip active">Blurred (Privacy-First)</button>
            <button class="tag-chip">Visible to Verified</button>
          </div>
        </div>

        <div style="display: flex; gap: 12px; margin-bottom: 24px;">
          <div style="width: 110px; height: 140px; border-radius: 14px; border: 2px dashed var(--border-subtle); background: var(--surface-card); display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 6px; color: var(--text-muted); cursor: pointer;">
            <span class="material-symbols-outlined" style="font-size: 28px; color: var(--primary);">add_photo_alternate</span>
            <span style="font-size: 11px; font-weight: 600;">Primary Photo</span>
          </div>
          <div style="width: 110px; height: 140px; border-radius: 14px; border: 2px dashed var(--border-subtle); background: var(--surface-card); display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 6px; color: var(--text-muted); cursor: pointer;">
            <span class="material-symbols-outlined" style="font-size: 24px;">add</span>
            <span style="font-size: 11px;">Additional</span>
          </div>
        </div>
      `;
    } else if (q.id === 'voice_studio') {
      contentHtml += `
        <div style="background: var(--surface-card); border-radius: var(--radius-card); padding: 20px; box-shadow: var(--shadow-sm); text-align: center; margin-bottom: 20px; border: 1px solid var(--border-subtle);">
          <div style="font-family: var(--font-headline); font-size: 32px; font-weight: 700; color: var(--text-primary); margin-bottom: 4px;">
            00:${State.recordingTimer < 10 ? '0' + State.recordingTimer : State.recordingTimer} <span style="font-size: 18px; color: var(--text-muted); font-weight: 400;">/ 02:00</span>
          </div>
          <div style="display: flex; align-items: center; justify-content: center; gap: 6px; font-size: 12px; color: var(--primary); font-weight: 600; margin-bottom: 18px;">
            <span style="width: 8px; height: 8px; border-radius: 50%; background: var(--primary); display: inline-block;"></span>
            <span>Recorded Introduction</span>
          </div>

          <!-- Waveform Display -->
          <div style="display: flex; align-items: center; justify-content: center; gap: 4px; height: 44px; margin-bottom: 24px;">
            <span class="wave-bar-anim" style="width: 4px; background: var(--primary); border-radius: 4px;"></span>
            <span class="wave-bar-anim" style="width: 4px; background: var(--primary); border-radius: 4px;"></span>
            <span class="wave-bar-anim" style="width: 4px; background: var(--primary); border-radius: 4px;"></span>
            <span class="wave-bar-anim" style="width: 4px; background: var(--primary); border-radius: 4px;"></span>
            <span class="wave-bar-anim" style="width: 4px; background: var(--primary); border-radius: 4px;"></span>
            <span class="wave-bar-anim" style="width: 4px; background: var(--primary); border-radius: 4px;"></span>
            <span class="wave-bar-anim" style="width: 4px; background: var(--primary); border-radius: 4px;"></span>
          </div>

          <div style="display: flex; gap: 10px; justify-content: center;">
            <button class="btn-secondary" style="width: auto; padding: 0 20px;" onclick="window.playVoicePreview()">
              <span class="material-symbols-outlined" style="font-size: 20px;">play_arrow</span>
              <span>Listen</span>
            </button>
            <button class="btn-outline" style="width: auto; padding: 0 20px;">
              <span class="material-symbols-outlined" style="font-size: 20px;">replay</span>
              <span>Re-record</span>
            </button>
          </div>
        </div>

        <div style="background: var(--surface-container-low); padding: 14px; border-radius: var(--radius-card); margin-bottom: 24px;">
          <div style="font-size: 12px; font-weight: 600; color: var(--primary); margin-bottom: 6px;">💡 Selected Prompt</div>
          <div style="font-size: 13px; font-weight: 500;">"🌿 Your ideal quiet Sunday morning routine"</div>
        </div>
      `;
    }

    contentHtml += `
        <div style="display: flex; gap: 10px;">
          <button class="btn-primary" onclick="window.nextQuestion()">
            <span>${State.currentQuestionStep === questions.length - 1 ? 'Save & Go to Dashboard' : 'Next Step'}</span>
            <span class="material-symbols-outlined" style="font-size: 18px;">arrow_forward</span>
          </button>
        </div>
      </div>
    `;

    UI.screenContainer.innerHTML = contentHtml;
  }

  window.selectCreatedBy = function (val) {
    State.userForm.createdBy = val;
    renderQuestionnaireScreen();
  };

  window.setFormGender = function (g) {
    State.userForm.gender = g;
    renderQuestionnaireScreen();
  };

  window.setFormSect = function (s) {
    State.userForm.sect = s;
    renderQuestionnaireScreen();
  };

  window.setFormSchool = function (m) {
    State.userForm.school = m;
    renderQuestionnaireScreen();
  };

  window.setFormPrayer = function (p) {
    State.userForm.prayer = p;
    renderQuestionnaireScreen();
  };

  window.playVoicePreview = function () {
    alert("Voice Introduction Preview: 38s voice sample with family introduction is playing.");
  };

  window.nextQuestion = function () {
    if (State.currentQuestionStep < questions.length - 1) {
      State.currentQuestionStep++;
      renderQuestionnaireScreen();
    } else {
      navigateTo('home');
    }
  };

  // -------------------------------------------------------------
  // 4. HOME DASHBOARD (Calm Matrimonial Feed)
  // -------------------------------------------------------------
  function renderHomeScreen() {
    UI.appHeader.style.display = 'flex';
    UI.headerTitle.innerText = "Good morning, Anas";
    UI.headerAvatar.style.display = 'flex';
    UI.headerAvatar.innerHTML = `<img src="${window.DonoJahaData.currentUser.avatar}" style="width: 100%; height: 100%; object-fit: cover;" />`;

    const ayesha = window.DonoJahaData.profiles.find(p => p.id === 'prof_ayesha_001');

    UI.screenContainer.innerHTML = `
      <div style="padding: 16px 20px 80px 20px;">
        <!-- Top Greeter & Chaperone Badge -->
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
          <div style="display: flex; align-items: center; gap: 6px;">
            <span style="width: 8px; height: 8px; border-radius: 50%; background: var(--primary);"></span>
            <span style="font-size: 11px; font-weight: 700; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.05em;">Dono Jahaan Matrimonial</span>
          </div>
          <button style="border: none; background: var(--surface-container); width: 34px; height: 34px; border-radius: 50%; display: flex; align-items: center; justify-content: center; cursor: pointer;" onclick="navigateTo('notifications')">
            <span class="material-symbols-outlined" style="font-size: 18px; color: var(--text-primary);">notifications</span>
          </button>
        </div>

        <!-- Profile Completion Card -->
        <div style="background: var(--surface-card); border-radius: var(--radius-card); padding: 16px; box-shadow: var(--shadow-sm); border: 1px solid var(--border-subtle); margin-bottom: 20px;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
            <div style="display: flex; align-items: center; gap: 8px;">
              <span class="material-symbols-outlined" style="color: var(--primary); font-size: 20px;">verified</span>
              <span style="font-size: 13px; font-weight: 700;">Profile 80% Complete</span>
            </div>
            <span style="font-size: 11px; font-weight: 600; padding: 2px 8px; border-radius: var(--radius-pill); background: var(--surface-container-low); color: var(--primary);">4 of 5 steps</span>
          </div>
          <div style="width: 100%; height: 6px; background: var(--surface-container-high); border-radius: var(--radius-pill); overflow: hidden; margin-bottom: 12px;">
            <div style="width: 80%; height: 100%; background: var(--primary); border-radius: var(--radius-pill);"></div>
          </div>
          <div style="display: flex; justify-content: space-between; align-items: center; font-size: 12px;">
            <span style="color: var(--text-muted);">Add your family native origin</span>
            <button style="border: none; background: none; color: var(--primary); font-weight: 600; cursor: pointer;" onclick="navigateTo('questionnaire')">Complete →</button>
          </div>
        </div>

        <!-- CORE DIFFERENTIATOR: Active Matrimonial Conversation Banner -->
        ${State.hasActiveConversation ? `
          <div style="background: var(--surface-container-low); border: 1.5px solid var(--primary-soft); border-radius: var(--radius-card); padding: 18px; margin-bottom: 24px; box-shadow: var(--shadow-sm);">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px;">
              <div style="display: flex; align-items: center; gap: 6px;">
                <span style="width: 8px; height: 8px; border-radius: 50%; background: var(--primary);"></span>
                <span style="font-size: 11px; font-weight: 700; color: var(--primary); text-transform: uppercase; letter-spacing: 0.05em;">Your Active Conversation</span>
              </div>
              <span style="display: inline-flex; align-items: center; gap: 4px; font-size: 11px; font-weight: 600; padding: 2px 8px; border-radius: var(--radius-pill); background: #FFF; color: var(--secondary);">
                <span class="material-symbols-outlined" style="font-size: 13px;">shield</span> Wali Monitored
              </span>
            </div>

            <div style="display: flex; align-items: center; gap: 14px; margin-bottom: 16px;">
              <div style="width: 54px; height: 54px; border-radius: 50%; overflow: hidden; border: 2px solid var(--primary); flex-shrink: 0;">
                <img src="${ayesha.avatar}" style="width: 100%; height: 100%; object-fit: cover;" />
              </div>
              <div style="flex: 1; min-width: 0;">
                <div style="display: flex; align-items: center; gap: 6px;">
                  <h3 style="font-size: 16px; margin: 0; font-weight: 700;">${ayesha.name}, 27</h3>
                  <span class="material-symbols-outlined" style="color: var(--primary); font-size: 16px;">verified</span>
                </div>
                <div style="font-size: 12px; color: var(--text-muted); white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${ayesha.profession} • ${ayesha.location}</div>
                <div style="font-size: 11px; color: var(--primary); font-weight: 600; margin-top: 2px;">Sent a voice note 10m ago</div>
              </div>
            </div>

            <button class="btn-primary" onclick="navigateTo('chat')">
              <span class="material-symbols-outlined" style="font-size: 18px;">chat_bubble</span>
              <span>Open Chaperoned Chat</span>
            </button>
          </div>
        ` : `
          <div style="background: var(--surface-card); border-radius: var(--radius-card); padding: 18px; margin-bottom: 24px; text-align: center; border: 1.5px dashed var(--border-subtle);">
            <span class="material-symbols-outlined" style="font-size: 32px; color: var(--primary); margin-bottom: 8px;">connect_without_contact</span>
            <div style="font-weight: 700; font-size: 15px; margin-bottom: 4px;">No Active Conversation</div>
            <p style="font-size: 12px; color: var(--text-muted); margin-bottom: 14px;">Browse vetted suitors and send an interest to begin one dedicated conversation.</p>
            <button class="btn-secondary" style="height: 42px;" onclick="navigateTo('discover')">Explore Profiles</button>
          </div>
        `}

        <!-- Recommended Matches Section -->
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
          <div>
            <h3 style="font-size: 16px; font-weight: 700;">Based on Your Preferences</h3>
            <p style="font-size: 12px; color: var(--text-muted);">Curated for Islamic alignment & family values</p>
          </div>
          <button style="border: none; background: none; font-size: 12px; font-weight: 600; color: var(--primary); cursor: pointer;" onclick="navigateTo('discover')">View all</button>
        </div>

        <!-- Horizontal Scroll Cards -->
        <div style="display: flex; gap: 12px; overflow-x: auto; padding-bottom: 10px;">
          ${window.DonoJahaData.profiles.map(p => `
            <div style="width: 160px; flex-shrink: 0; background: var(--surface-card); border-radius: var(--radius-card); overflow: hidden; border: 1px solid var(--border-subtle); box-shadow: var(--shadow-sm); cursor: pointer;" onclick="window.viewProfile('${p.id}')">
              <div style="width: 100%; height: 130px; position: relative; overflow: hidden; background: var(--surface-container-high);">
                <img src="${p.avatar}" style="width: 100%; height: 100%; object-fit: cover; ${p.isPhotoBlurred ? 'filter: blur(14px); transform: scale(1.15);' : ''}" />
                ${p.isPhotoBlurred ? `
                  <div style="position: absolute; inset: 0; background: rgba(0,0,0,0.15); display: flex; align-items: center; justify-content: center;">
                    <span style="background: rgba(255,255,255,0.92); padding: 3px 8px; border-radius: var(--radius-pill); font-size: 10px; font-weight: 600; color: var(--primary); display: flex; align-items: center; gap: 4px;">
                      <span class="material-symbols-outlined" style="font-size: 12px;">lock</span> Protected
                    </span>
                  </div>
                ` : ''}
              </div>
              <div style="padding: 10px;">
                <div style="font-size: 13px; font-weight: 700; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${p.name}, ${p.age}</div>
                <div style="font-size: 11px; color: var(--text-muted);">${p.location.split(',')[0]}</div>
                <div style="font-size: 11px; font-weight: 600; color: var(--primary); margin-top: 4px;">${p.sect} • ${p.schoolOfThought}</div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  window.viewProfile = function (profileId) {
    const suitor = window.DonoJahaData.profiles.find(p => p.id === profileId);
    if (suitor) {
      navigateTo('profile_detail', { suitor: suitor });
    }
  };

  // -------------------------------------------------------------
  // 5. DISCOVER SCREEN (Profiles with Blurred Photo Access & Filters)
  // -------------------------------------------------------------
  function renderDiscoverScreen() {
    UI.appHeader.style.display = 'flex';
    UI.headerTitle.innerText = "Discover Suitors";
    UI.headerAvatar.style.display = 'flex';

    UI.screenContainer.innerHTML = `
      <div style="padding: 16px 20px 80px 20px;">
        <!-- Search and Filter Bar -->
        <div style="display: flex; gap: 8px; margin-bottom: 18px;">
          <div style="flex: 1; height: 46px; background: var(--surface-card); border: 1.5px solid var(--border-subtle); border-radius: var(--radius-btn); padding: 0 14px; display: flex; align-items: center; gap: 8px;">
            <span class="material-symbols-outlined" style="color: var(--text-muted); font-size: 20px;">search</span>
            <input type="text" placeholder="Search by sect, city, or profession..." style="border: none; outline: none; background: transparent; width: 100%; font-size: 13px;" />
          </div>
          <button style="width: 46px; height: 46px; border-radius: var(--radius-btn); background: var(--surface-card); border: 1.5px solid var(--border-subtle); display: flex; align-items: center; justify-content: center; color: var(--primary); cursor: pointer;" onclick="window.openFiltersModal()">
            <span class="material-symbols-outlined" style="font-size: 20px;">tune</span>
          </button>
        </div>

        <!-- Profile Feed Cards -->
        <div style="display: flex; flex-direction: column; gap: 20px;">
          ${window.DonoJahaData.profiles.map(p => `
            <div style="background: var(--surface-card); border-radius: var(--radius-card); overflow: hidden; border: 1px solid var(--border-subtle); box-shadow: var(--shadow-card);">
              <!-- Photo Container with Modesty Blur Logic -->
              <div style="width: 100%; height: 260px; position: relative; overflow: hidden; background: var(--surface-container-high);">
                <img id="discover-img-${p.id}" src="${p.avatar}" style="width: 100%; height: 100%; object-fit: cover; transition: filter 0.5s ease; ${p.isPhotoBlurred && !State.photoAccessGranted[p.id] ? 'filter: blur(24px); transform: scale(1.18);' : 'filter: none; transform: scale(1);'}" />

                ${p.isPhotoBlurred && !State.photoAccessGranted[p.id] ? `
                  <div id="discover-badge-${p.id}" style="position: absolute; inset: 0; background: rgba(20, 29, 26, 0.25); display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 8px; backdrop-filter: blur(2px);">
                    <div class="modesty-shield-badge">
                      <span class="material-symbols-outlined" style="font-size: 16px;">shield_lock</span>
                      <span>Photo Modesty Curtain</span>
                    </div>
                    <button class="btn-primary" style="width: auto; height: 38px; padding: 0 16px; font-size: 12px; background: rgba(11, 107, 87, 0.9);" onclick="window.openPhotoAccessModal('${p.id}')">
                      <span class="material-symbols-outlined" style="font-size: 16px;">key</span>
                      <span>Request Photo Access</span>
                    </button>
                  </div>
                ` : ''}

                <!-- Voice Note Chip Overlay -->
                ${p.hasVoiceIntro ? `
                  <div style="position: absolute; bottom: 12px; left: 12px;">
                    <button style="background: rgba(255, 255, 255, 0.94); border: none; padding: 6px 12px; border-radius: var(--radius-pill); display: flex; align-items: center; gap: 6px; font-size: 12px; font-weight: 600; color: var(--primary); cursor: pointer; box-shadow: 0 2px 8px rgba(0,0,0,0.15);" onclick="window.playVoicePreview()">
                      <span class="material-symbols-outlined" style="font-size: 16px;">mic</span>
                      <span>Voice Intro (0:${p.voiceDuration})</span>
                    </button>
                  </div>
                ` : ''}
              </div>

              <!-- Profile Details -->
              <div style="padding: 16px;">
                <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8px;">
                  <div>
                    <h2 style="font-size: 18px; margin: 0; font-weight: 700;">${p.name}, ${p.age}</h2>
                    <p style="font-size: 12px; color: var(--text-muted); margin-top: 2px;">${p.profession} • ${p.location}</p>
                  </div>
                  <span style="padding: 3px 8px; border-radius: var(--radius-pill); background: var(--surface-container-low); color: var(--primary); font-size: 11px; font-weight: 600;">
                    ${p.sect} • ${p.schoolOfThought}
                  </span>
                </div>

                <p style="font-size: 13px; color: var(--text-primary); line-height: 1.5; margin-bottom: 14px;">
                  "${p.bio.slice(0, 110)}..."
                </p>

                <!-- Action Buttons: Send Interest or View Profile -->
                <div style="display: flex; gap: 10px;">
                  <button class="btn-outline" style="flex: 1; height: 44px; font-size: 13px;" onclick="window.viewProfile('${p.id}')">
                    <span>View Profile</span>
                  </button>
                  <button class="btn-primary" style="flex: 1; height: 44px; font-size: 13px;" onclick="window.handleSendInterest('${p.id}')">
                    <span class="material-symbols-outlined" style="font-size: 16px;">favorite</span>
                    <span>Express Interest</span>
                  </button>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  // Handle Interest & One Active Conversation Restriction
  window.handleSendInterest = function (suitorId) {
    const suitor = window.DonoJahaData.profiles.find(p => p.id === suitorId);
    
    // Check if the user already has an active conversation with another suitor
    if (State.hasActiveConversation && State.activeConversationSuitor.id !== suitorId) {
      alert(`Notice: You already have an active conversation with ${State.activeConversationSuitor.name}.\n\nDono Jahaan strictly enforces the ONE ACTIVE CONVERSATION rule. You may express interest, but an active chat can only begin once your current connection is concluded.`);
    }

    alert(`Matrimonial interest sent with sincere intentions to ${suitor.name}. You will be notified when their family reviews your profile.`);
  };

  // -------------------------------------------------------------
  // 6. PROFILE DETAIL SCREEN (e.g. Ayesha M., 27)
  // -------------------------------------------------------------
  function renderProfileDetailScreen(suitor) {
    UI.appHeader.style.display = 'flex';
    UI.headerTitle.innerText = `${suitor.displayName}`;
    UI.headerAvatar.style.display = 'none';

    UI.screenContainer.innerHTML = `
      <div style="padding: 0 0 80px 0;">
        <!-- Hero Photo with Modesty Shield -->
        <div style="width: 100%; height: 320px; position: relative; overflow: hidden; background: var(--surface-container-high);">
          <img src="${suitor.avatar}" style="width: 100%; height: 100%; object-fit: cover; ${suitor.isPhotoBlurred && !State.photoAccessGranted[suitor.id] ? 'filter: blur(24px); transform: scale(1.18);' : 'filter: none;'}" />

          ${suitor.isPhotoBlurred && !State.photoAccessGranted[suitor.id] ? `
            <div style="position: absolute; inset: 0; background: rgba(0,0,0,0.25); display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 8px;">
              <div class="modesty-shield-badge">
                <span class="material-symbols-outlined" style="font-size: 16px;">shield_lock</span>
                <span>Photo Modesty Curtain</span>
              </div>
              <button class="btn-primary" style="width: auto; height: 38px; padding: 0 16px; font-size: 12px;" onclick="window.openPhotoAccessModal('${suitor.id}')">
                Request Photo Reveal
              </button>
            </div>
          ` : ''}

          <!-- Chaperone Banner on Photo -->
          <div style="position: absolute; top: 14px; left: 14px;">
            <span style="background: rgba(255,255,255,0.92); padding: 4px 10px; border-radius: var(--radius-pill); font-size: 11px; font-weight: 600; color: var(--secondary); display: flex; align-items: center; gap: 4px;">
              <span class="material-symbols-outlined" style="font-size: 14px;">shield</span> Wali Involved
            </span>
          </div>
        </div>

        <div style="padding: 20px;">
          <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 12px;">
            <div>
              <h1 style="font-size: 22px; font-weight: 700; margin: 0;">${suitor.name}, ${suitor.age}</h1>
              <p style="font-size: 13px; color: var(--text-muted); margin-top: 2px;">${suitor.profession}</p>
              <p style="font-size: 12px; color: var(--text-muted);">${suitor.location} • Grew up in ${suitor.hometown}</p>
            </div>
            <span style="padding: 4px 10px; border-radius: var(--radius-pill); background: var(--surface-container-low); color: var(--primary); font-size: 12px; font-weight: 600;">
              ${suitor.sect} • ${suitor.schoolOfThought}
            </span>
          </div>

          <!-- Voice Introduction Card -->
          ${suitor.hasVoiceIntro ? `
            <div style="background: var(--surface-card); border: 1.5px solid var(--border-subtle); border-radius: var(--radius-card); padding: 16px; margin-bottom: 20px; box-shadow: var(--shadow-sm);">
              <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 10px;">
                <div style="display: flex; align-items: center; gap: 8px;">
                  <span class="material-symbols-outlined" style="color: var(--primary);">mic</span>
                  <span style="font-weight: 600; font-size: 13px;">Voice Introduction</span>
                </div>
                <span style="font-size: 12px; color: var(--text-muted);">0:${suitor.voiceDuration}</span>
              </div>
              <p style="font-size: 12px; color: var(--text-muted); margin-bottom: 12px;">Prompt: ${suitor.voicePrompt}</p>
              <button class="btn-secondary" style="height: 40px;" onclick="window.playVoicePreview()">
                <span class="material-symbols-outlined" style="font-size: 18px;">play_arrow</span>
                <span>Listen to Voice Introduction</span>
              </button>
            </div>
          ` : ''}

          <!-- About Bio -->
          <div style="margin-bottom: 20px;">
            <h3 style="font-size: 14px; font-weight: 700; text-transform: uppercase; color: var(--text-muted); margin-bottom: 8px; letter-spacing: 0.05em;">About Her</h3>
            <p style="font-size: 14px; line-height: 1.6; color: var(--text-primary);">${suitor.bio}</p>
          </div>

          <!-- Islamic Compatibility Matrix -->
          <div style="background: var(--surface-subtle); border-radius: var(--radius-card); padding: 16px; margin-bottom: 20px;">
            <h3 style="font-size: 14px; font-weight: 700; margin-bottom: 12px;">Islamic Practice</h3>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; font-size: 12px;">
              <div><span style="color: var(--text-muted);">Salah:</span> <strong>${suitor.prayer}</strong></div>
              <div><span style="color: var(--text-muted);">Quran:</span> <strong>${suitor.quran}</strong></div>
              <div><span style="color: var(--text-muted);">Diet:</span> <strong>${suitor.halal}</strong></div>
              <div><span style="color: var(--text-muted);">Attire:</span> <strong>${suitor.attire}</strong></div>
            </div>
          </div>

          <!-- Family Background -->
          <div style="background: var(--surface-card); border: 1px solid var(--border-subtle); border-radius: var(--radius-card); padding: 16px; margin-bottom: 24px;">
            <h3 style="font-size: 14px; font-weight: 700; margin-bottom: 10px;">Family Details</h3>
            <div style="font-size: 12px; line-height: 1.6; color: var(--text-muted);">
              <div>Father: <strong>${suitor.fatherOccupation}</strong></div>
              <div>Mother: <strong>${suitor.motherOccupation}</strong></div>
              <div>Wali Contact: <strong>${suitor.waliName}</strong></div>
            </div>
          </div>

          <!-- Floating Action Dock -->
          <div style="display: flex; gap: 10px;">
            ${State.hasActiveConversation && State.activeConversationSuitor.id === suitor.id ? `
              <button class="btn-primary" style="flex: 1;" onclick="navigateTo('chat')">
                <span class="material-symbols-outlined" style="font-size: 18px;">chat_bubble</span>
                <span>Open Active Chat</span>
              </button>
              <button class="btn-outline" style="width: auto; padding: 0 16px;" onclick="window.openEndConversationModal()">
                <span>End Conversation</span>
              </button>
            ` : `
              <button class="btn-primary" style="flex: 1;" onclick="window.handleSendInterest('${suitor.id}')">
                <span class="material-symbols-outlined" style="font-size: 18px;">favorite</span>
                <span>Send Interest</span>
              </button>
            `}
          </div>
        </div>
      </div>
    `;
  }

  // -------------------------------------------------------------
  // 7. ACTIVE CONVERSATION & 1-ON-1 CHAPERONED CHAT
  // -------------------------------------------------------------
  function renderChatScreen() {
    UI.appHeader.style.display = 'flex';
    UI.headerTitle.innerText = "Ayesha M.";
    UI.headerAvatar.style.display = 'flex';
    UI.headerAvatar.innerHTML = `<img src="${window.DonoJahaData.profiles[0].avatar}" style="width: 100%; height: 100%; object-fit: cover;" />`;

    UI.screenContainer.innerHTML = `
      <div style="display: flex; flex-direction: column; min-height: 80vh; justify-content: space-between; padding-bottom: 75px;">
        <!-- Chaperone Top Warning Strip -->
        <div style="background: var(--surface-container-low); padding: 10px 16px; border-bottom: 1px solid var(--border-subtle); display: flex; align-items: center; justify-content: space-between;">
          <div style="display: flex; align-items: center; gap: 8px;">
            <span class="material-symbols-outlined" style="color: var(--primary); font-size: 18px;">verified_user</span>
            <div>
              <div style="font-size: 12px; font-weight: 700;">Chaperoned & Dignified Chat</div>
              <div style="font-size: 10px; color: var(--text-muted);">Dr. Farooq Merchant (Wali) is linked</div>
            </div>
          </div>
          <button style="border: none; background: none; color: var(--error); font-size: 11px; font-weight: 600; cursor: pointer;" onclick="window.openEndConversationModal()">
            End Conversation
          </button>
        </div>

        <!-- Chat Stream -->
        <div id="chat-messages-container" style="padding: 16px 20px; display: flex; flex-direction: column; gap: 12px; flex: 1;">
          <div style="text-align: center; margin: 8px 0;">
            <span style="font-size: 10px; font-weight: 600; background: var(--surface-container); padding: 3px 10px; border-radius: var(--radius-pill); color: var(--text-muted);">TODAY</span>
          </div>

          ${window.DonoJahaData.activeChatMessages.map(msg => `
            <div style="max-width: 82%; ${msg.isSentByMe ? 'align-self: flex-end;' : 'align-self: flex-start;'}">
              <div style="padding: 12px 14px; border-radius: 16px; ${msg.isSentByMe ? 'background: var(--primary); color: #FFF; border-bottom-right-radius: 2px;' : 'background: var(--surface-card); color: var(--text-primary); border: 1px solid var(--border-subtle); border-bottom-left-radius: 2px; box-shadow: var(--shadow-sm);'}">
                ${msg.type === 'voice' ? `
                  <div style="display: flex; align-items: center; gap: 10px;">
                    <button style="width: 32px; height: 32px; border-radius: 50%; background: ${msg.isSentByMe ? '#FFF' : 'var(--primary)'}; color: ${msg.isSentByMe ? 'var(--primary)' : '#FFF'}; border: none; display: flex; align-items: center; justify-content: center; cursor: pointer;" onclick="window.playVoicePreview()">
                      <span class="material-symbols-outlined" style="font-size: 18px;">play_arrow</span>
                    </button>
                    <div>
                      <div style="font-size: 11px; font-weight: 600;">Voice Note (${msg.voiceDuration})</div>
                      <div style="font-size: 9px; opacity: 0.8;">Tap to listen with modesty</div>
                    </div>
                  </div>
                ` : `
                  <p style="font-size: 13px; line-height: 1.5; margin: 0;">${msg.content}</p>
                `}
              </div>
              <div style="font-size: 10px; color: var(--text-muted); margin-top: 4px; ${msg.isSentByMe ? 'text-align: right;' : 'text-align: left;'}">
                ${msg.timestamp}
              </div>
            </div>
          `).join('')}
        </div>

        <!-- Chat Composer Dock -->
        <div style="padding: 12px 16px; background: rgba(252, 252, 250, 0.96); border-top: 1px solid var(--border-subtle); display: flex; align-items: center; gap: 8px;">
          <button style="width: 40px; height: 40px; border-radius: 50%; background: var(--surface-container); border: none; display: flex; align-items: center; justify-content: center; color: var(--primary); cursor: pointer;" onclick="window.openShareContactModal()">
            <span class="material-symbols-outlined" style="font-size: 20px;">contact_page</span>
          </button>
          <input type="text" id="chat-input" placeholder="Type a respectful message..." style="flex: 1; height: 44px; background: var(--surface-card); border: 1.5px solid var(--border-subtle); border-radius: var(--radius-btn); padding: 0 14px; font-size: 13px; outline: none;" onkeydown="if(event.key==='Enter') window.sendChatMessage()" />
          <button style="width: 44px; height: 44px; border-radius: var(--radius-btn); background: var(--primary); color: #FFF; border: none; display: flex; align-items: center; justify-content: center; cursor: pointer;" onclick="window.sendChatMessage()">
            <span class="material-symbols-outlined" style="font-size: 18px;">send</span>
          </button>
        </div>
      </div>
    `;
  }

  window.sendChatMessage = function () {
    const input = document.getElementById('chat-input');
    if (!input || !input.value.trim()) return;

    window.DonoJahaData.activeChatMessages.push({
      id: `msg_${Date.now()}`,
      senderId: 'user_anas_001',
      senderName: 'Anas Khan',
      type: 'text',
      content: input.value.trim(),
      timestamp: 'Just now',
      isSentByMe: true
    });

    input.value = '';
    renderChatScreen();
  };

  // -------------------------------------------------------------
  // 8. INTERESTS & SHORTLISTS HUB
  // -------------------------------------------------------------
  function renderInterestsScreen() {
    UI.appHeader.style.display = 'flex';
    UI.headerTitle.innerText = "Interests & Shortlist";

    UI.screenContainer.innerHTML = `
      <div style="padding: 16px 20px 80px 20px;">
        <!-- Tab Chips -->
        <div style="display: flex; gap: 8px; margin-bottom: 20px;">
          <button class="tag-chip ${State.selectedInterestTab === 'received' ? 'active' : ''}" onclick="window.switchInterestTab('received')">Received (${window.DonoJahaData.interestsReceived.length})</button>
          <button class="tag-chip ${State.selectedInterestTab === 'sent' ? 'active' : ''}" onclick="window.switchInterestTab('sent')">Sent (${window.DonoJahaData.interestsSent.length})</button>
          <button class="tag-chip ${State.selectedInterestTab === 'shortlist' ? 'active' : ''}" onclick="window.switchInterestTab('shortlist')">Shortlisted (${window.DonoJahaData.shortlists.length})</button>
        </div>

        <div style="display: flex; flex-direction: column; gap: 14px;">
          ${State.selectedInterestTab === 'received' ? `
            ${window.DonoJahaData.interestsReceived.map(item => {
              const suitor = window.DonoJahaData.profiles.find(p => p.id === item.suitorId);
              return `
                <div style="background: var(--surface-card); border-radius: var(--radius-card); padding: 16px; border: 1px solid var(--border-subtle); box-shadow: var(--shadow-sm);">
                  <div style="display: flex; gap: 12px; margin-bottom: 12px;">
                    <img src="${suitor.avatar}" style="width: 50px; height: 50px; border-radius: 50%; object-fit: cover;" />
                    <div>
                      <div style="font-weight: 700; font-size: 15px;">${suitor.name}, ${suitor.age}</div>
                      <div style="font-size: 12px; color: var(--text-muted);">${suitor.location} • ${suitor.sect}</div>
                      <div style="font-size: 11px; color: var(--primary); font-weight: 600;">${item.sentAt}</div>
                    </div>
                  </div>
                  <p style="font-size: 12px; background: var(--surface-container-low); padding: 10px; border-radius: 10px; margin-bottom: 14px; line-height: 1.5;">
                    "${item.note}"
                  </p>
                  <div style="display: flex; gap: 8px;">
                    <button class="btn-primary" style="height: 40px; font-size: 12px; flex: 1;" onclick="window.acceptInterest('${suitor.id}')">
                      Accept Interest
                    </button>
                    <button class="btn-outline" style="height: 40px; font-size: 12px; width: auto; padding: 0 16px;">
                      Decline
                    </button>
                  </div>
                </div>
              `;
            }).join('')}
          ` : `
            <div style="text-align: center; padding: 40px 20px; color: var(--text-muted);">
              <span class="material-symbols-outlined" style="font-size: 40px; color: var(--primary); margin-bottom: 10px;">hourglass_empty</span>
              <p style="font-size: 13px;">No pending items in this folder.</p>
            </div>
          `}
        </div>
      </div>
    `;
  }

  window.switchInterestTab = function (tab) {
    State.selectedInterestTab = tab;
    renderInterestsScreen();
  };

  window.acceptInterest = function (suitorId) {
    if (State.hasActiveConversation) {
      alert(`CRITICAL ONE ACTIVE CONVERSATION RULE:\n\nYou already have an ongoing active conversation with ${State.activeConversationSuitor.name}.\n\nDono Jahaan requires you to respectfully conclude your current conversation before accepting another.`);
    } else {
      State.hasActiveConversation = true;
      State.activeConversationSuitor = window.DonoJahaData.profiles.find(p => p.id === suitorId);
      alert("Interest accepted! Your dedicated One Active Conversation has begun.");
      navigateTo('chat');
    }
  };

  // -------------------------------------------------------------
  // 9. PROFILE HUB & SETTINGS
  // -------------------------------------------------------------
  function renderProfileHubScreen() {
    UI.appHeader.style.display = 'flex';
    UI.headerTitle.innerText = "My Profile Hub";

    const user = window.DonoJahaData.currentUser;

    UI.screenContainer.innerHTML = `
      <div style="padding: 16px 20px 80px 20px;">
        <!-- User Identity Header -->
        <div style="background: var(--surface-card); border-radius: var(--radius-card); padding: 18px; border: 1px solid var(--border-subtle); display: flex; align-items: center; gap: 16px; margin-bottom: 20px; box-shadow: var(--shadow-sm);">
          <div style="width: 64px; height: 64px; border-radius: 50%; overflow: hidden; border: 2px solid var(--primary);">
            <img src="${user.avatar}" style="width: 100%; height: 100%; object-fit: cover;" />
          </div>
          <div>
            <div style="font-size: 17px; font-weight: 700;">${user.name}, ${user.age}</div>
            <div style="font-size: 12px; color: var(--text-muted);">${user.profession}</div>
            <span style="display: inline-block; padding: 2px 8px; border-radius: var(--radius-pill); background: var(--surface-container-low); color: var(--primary); font-size: 10px; font-weight: 600; margin-top: 4px;">
              Verified Member
            </span>
          </div>
        </div>

        <!-- Menu Navigation List -->
        <div style="background: var(--surface-card); border-radius: var(--radius-card); border: 1px solid var(--border-subtle); overflow: hidden; margin-bottom: 24px;">
          <div style="padding: 14px 18px; display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid var(--border-subtle); cursor: pointer;" onclick="navigateTo('questionnaire')">
            <div style="display: flex; align-items: center; gap: 10px;">
              <span class="material-symbols-outlined" style="color: var(--primary);">edit_note</span>
              <span style="font-weight: 600; font-size: 13px;">Edit Profile & Values</span>
            </div>
            <span class="material-symbols-outlined" style="color: var(--text-muted); font-size: 18px;">chevron_right</span>
          </div>

          <div style="padding: 14px 18px; display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid var(--border-subtle); cursor: pointer;" onclick="navigateTo('wali_dashboard')">
            <div style="display: flex; align-items: center; gap: 10px;">
              <span class="material-symbols-outlined" style="color: var(--primary);">shield_person</span>
              <span style="font-weight: 600; font-size: 13px;">Family & Wali Chaperone Settings</span>
            </div>
            <span class="material-symbols-outlined" style="color: var(--text-muted); font-size: 18px;">chevron_right</span>
          </div>

          <div style="padding: 14px 18px; display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid var(--border-subtle); cursor: pointer;" onclick="alert('Photo Privacy: Modesty curtain is active.')">
            <div style="display: flex; align-items: center; gap: 10px;">
              <span class="material-symbols-outlined" style="color: var(--primary);">lock</span>
              <span style="font-weight: 600; font-size: 13px;">Privacy & Modesty Controls</span>
            </div>
            <span class="material-symbols-outlined" style="color: var(--text-muted); font-size: 18px;">chevron_right</span>
          </div>

          <div style="padding: 14px 18px; display: flex; align-items: center; justify-content: space-between; cursor: pointer;" onclick="window.confirmAccountPause()">
            <div style="display: flex; align-items: center; gap: 10px;">
              <span class="material-symbols-outlined" style="color: var(--error);">pause_circle</span>
              <span style="font-weight: 600; font-size: 13px; color: var(--error);">Snooze / Delete Account</span>
            </div>
            <span class="material-symbols-outlined" style="color: var(--text-muted); font-size: 18px;">chevron_right</span>
          </div>
        </div>

        <button class="btn-outline" onclick="navigateTo('splash')">
          <span>Log Out</span>
        </button>
      </div>
    `;
  }

  window.confirmAccountPause = function () {
    if (confirm("Would you like to pause or delete your Dono Jahaan profile?\n\nPausing will temporarily hide your profile from all matrimonial searches without deleting your answers.")) {
      alert("Profile visibility successfully paused.");
    }
  };

  // -------------------------------------------------------------
  // 10. MODAL BOTTOM SHEETS
  // -------------------------------------------------------------
  // 10A. Photo Access Modal
  window.openPhotoAccessModal = function (suitorId) {
    const suitor = window.DonoJahaData.profiles.find(p => p.id === suitorId);
    UI.modalContent.innerHTML = `
      <div class="sheet-drag-handle"></div>
      <div style="text-align: center; margin-bottom: 20px;">
        <div style="width: 54px; height: 54px; border-radius: 16px; background: var(--surface-container-low); color: var(--primary); display: flex; align-items: center; justify-content: center; margin: 0 auto 12px auto;">
          <span class="material-symbols-outlined" style="font-size: 28px;">key</span>
        </div>
        <h3 style="font-size: 18px; margin-bottom: 4px;">Request Photo Reveal</h3>
        <p style="font-size: 13px; color: var(--text-muted);">${suitor.name} keeps her photographs private for modesty. Requesting access sends a polite notification to her and her chaperone.</p>
      </div>

      <div style="margin-bottom: 20px;">
        <label style="display: block; font-size: 12px; font-weight: 600; margin-bottom: 6px;">Introductory Message (Optional)</label>
        <textarea class="form-input" style="height: 80px; padding: 10px 14px; font-size: 13px;" placeholder="Assalamu alaikum, I have reviewed your profile and would appreciate viewing your photograph for family consideration."></textarea>
      </div>

      <button class="btn-primary" onclick="window.submitPhotoAccessRequest('${suitorId}')">
        <span>Send Modest Request</span>
      </button>
    `;
    openModal();
  };

  window.submitPhotoAccessRequest = function (suitorId) {
    State.photoAccessGranted[suitorId] = true;
    closeAllModals();
    alert("Request sent successfully! For this interactive demo, photo access has been approved.");
    renderScreen(State.currentScreen);
  };

  // 10B. End Conversation Modal (Explains One-Conversation Rule)
  window.openEndConversationModal = function () {
    UI.modalContent.innerHTML = `
      <div class="sheet-drag-handle"></div>
      <div style="text-align: center; margin-bottom: 20px;">
        <div style="width: 54px; height: 54px; border-radius: 16px; background: var(--error-soft); color: var(--error); display: flex; align-items: center; justify-content: center; margin: 0 auto 12px auto;">
          <span class="material-symbols-outlined" style="font-size: 28px;">cancel</span>
        </div>
        <h3 style="font-size: 18px; margin-bottom: 6px;">End Active Conversation?</h3>
        <p style="font-size: 13px; color: var(--text-muted); line-height: 1.5;">
          Ending this conversation will politely archive your chat with <strong>${State.activeConversationSuitor.name}</strong>.
          <br/><br/>
          <strong>Why this matters:</strong> In Dono Jahaan, ending your conversation will free up your profile so you can focus on your next matrimonial connection.
        </p>
      </div>

      <div style="display: flex; flex-direction: column; gap: 10px;">
        <button class="btn-primary" style="background: var(--error);" onclick="window.confirmEndConversation()">
          <span>Yes, Conclude Conversation</span>
        </button>
        <button class="btn-secondary" onclick="window.closeAllModals()">
          <span>Keep Conversation Active</span>
        </button>
      </div>
    `;
    openModal();
  };

  window.confirmEndConversation = function () {
    State.hasActiveConversation = false;
    closeAllModals();
    alert("Conversation ended. Your profile is now open to engage in your next matrimonial conversation.");
    navigateTo('home');
  };

  // 10C. Share Contact Modal
  window.openShareContactModal = function () {
    UI.modalContent.innerHTML = `
      <div class="sheet-drag-handle"></div>
      <div style="text-align: center; margin-bottom: 20px;">
        <div style="width: 54px; height: 54px; border-radius: 16px; background: var(--surface-container-low); color: var(--primary); display: flex; align-items: center; justify-content: center; margin: 0 auto 12px auto;">
          <span class="material-symbols-outlined" style="font-size: 28px;">call</span>
        </div>
        <h3 style="font-size: 18px; margin-bottom: 6px;">Share Direct Contact</h3>
        <p style="font-size: 13px; color: var(--text-muted); line-height: 1.5;">
          Ready to involve parents or coordinate via WhatsApp? Share your verified contact information securely.
        </p>
      </div>

      <div style="background: var(--surface-subtle); padding: 14px; border-radius: var(--radius-card); margin-bottom: 20px; font-size: 13px;">
        <div style="margin-bottom: 6px;">Phone: <strong>+91 98230 12345</strong></div>
        <div>Email: <strong>anas.k@example.com</strong></div>
      </div>

      <button class="btn-primary" onclick="window.confirmShareContact()">
        <span>Share With Ayesha & Chaperone</span>
      </button>
    `;
    openModal();
  };

  window.confirmShareContact = function () {
    closeAllModals();
    window.DonoJahaData.activeChatMessages.push({
      id: `msg_${Date.now()}`,
      senderId: 'user_anas_001',
      senderName: 'Anas Khan',
      type: 'text',
      content: "📞 Direct Contact Shared: Mobile +91 98230 12345 (Father / Suitor direct)",
      timestamp: 'Just now',
      isSentByMe: true
    });
    renderChatScreen();
  };

  // 10D. Filters Modal
  window.openFiltersModal = function () {
    UI.modalContent.innerHTML = `
      <div class="sheet-drag-handle"></div>
      <h3 style="font-size: 18px; margin-bottom: 16px;">Advanced Search Filters</h3>

      <div style="margin-bottom: 16px;">
        <label style="display: block; font-size: 12px; font-weight: 600; margin-bottom: 6px;">Age Range: 22 — 30 years</label>
        <input type="range" min="18" max="45" value="28" style="width: 100%; accent-color: var(--primary);" />
      </div>

      <div style="margin-bottom: 16px;">
        <label style="display: block; font-size: 12px; font-weight: 600; margin-bottom: 6px;">Sect Preference</label>
        <div style="display: flex; gap: 8px; flex-wrap: wrap;">
          <button class="tag-chip active">Sunni</button>
          <button class="tag-chip">Shia</button>
          <button class="tag-chip">Any</button>
        </div>
      </div>

      <div style="margin-bottom: 24px;">
        <label style="display: block; font-size: 12px; font-weight: 600; margin-bottom: 6px;">Location</label>
        <input type="text" class="form-input" value="Mumbai, Maharashtra" />
      </div>

      <button class="btn-primary" onclick="window.closeAllModals()">
        <span>Apply Filters</span>
      </button>
    `;
    openModal();
  };

  function openModal() {
    UI.modalOverlay.classList.add('open');
  }

  window.closeAllModals = function () {
    UI.modalOverlay.classList.remove('open');
    if (UI.screenExplorerModal) {
      UI.screenExplorerModal.classList.remove('open');
    }
  };

  // -------------------------------------------------------------
  // 11. SCREEN EXPLORER / STORYBOOK CATALOG SWITCHER
  // Allows testing all 50 screens instantly
  // -------------------------------------------------------------
  window.toggleScreenExplorer = function () {
    UI.screenExplorerModal.classList.toggle('open');
  };

  window.jumpToScreen = function (screenId, options = {}) {
    closeAllModals();
    navigateTo(screenId, options);
  };

  // Initialize on DOM load
  document.addEventListener('DOMContentLoaded', init);
})();
