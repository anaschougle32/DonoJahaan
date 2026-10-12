import glob, os, re

base_dir = r"C:\Users\choug\OneDrive\Desktop\DonoJaha\stitch_duplicate_of_matrimony_app_green_palate\stitch_duplicate_of_matrimony_app_green_palate"
html_files = sorted(glob.glob(os.path.join(base_dir, "*", "code.html")))

screens = []

# Mapping logical flows
flow_mapping = {
    "splash_": ("Onboarding & Splash", "public"),
    "authentication_": ("Authentication", "public"),
    "questionnaire_": ("Questionnaire Engine", "onboarding"),
    "partner_preferences_": ("Partner Preferences", "onboarding"),
    "trust_verification_": ("Verification", "onboarding"),
    "profile_preview_": ("Profile Review", "onboarding"),
    "profile_setup_": ("Profile Complete", "onboarding"),
    "home_": ("Main App - Home", "main"),
    "discover_": ("Main App - Discover", "main"),
    "loading_state_": ("Main App - Discover (States)", "main"),
    "empty_state_": ("Main App - Discover (States)", "main"),
    "advanced_search_": ("Main App - Discovery Filters", "main"),
    "profile_detail_": ("Profile Details", "main"),
    "interests_": ("Interests & Shortlist", "main"),
    "active_conversation_": ("Active Matrimonial Chat", "main"),
    "end_conversation_": ("Chat Modals", "main"),
    "request_photo_": ("Photo Privacy Modals", "main"),
    "share_contact_": ("Contact Privacy Modals", "main"),
    "report_block_": ("Safety & Moderation", "main"),
    "family_wali_": ("Wali / Family", "main"),
    "notifications": ("Notifications", "main"),
    "my_profile_": ("Profile & Settings", "main"),
    "account_settings_": ("Account Governance", "main")
}

for h in html_files:
    folder = os.path.basename(os.path.dirname(h))
    screen_png_path = os.path.join(os.path.dirname(h), "screen.png")
    has_valid_png = False
    if os.path.exists(screen_png_path):
        with open(screen_png_path, "rb") as fp:
            if b"FIFE Image" not in fp.read(100):
                has_valid_png = True

    with open(h, "r", encoding="utf-8", errors="ignore") as f:
        content = f.read()

    # Determine flow
    flow_category = "General"
    route_group = "main"
    for prefix, (cat, rg) in flow_mapping.items():
        if folder.startswith(prefix) or folder == prefix:
            flow_category = cat
            route_group = rg
            break

    # Determine React Native Route
    rn_route = ""
    if route_group == "public":
        if "splash" in folder:
            idx = folder.split("_")[1]
            rn_route = f"/(auth)/splash/{idx}"
        elif "mobile" in folder:
            rn_route = "/(auth)/phone"
        elif "otp" in folder:
            rn_route = "/(auth)/otp"
    elif route_group == "onboarding":
        step_name = folder.replace("questionnaire_", "").replace("partner_preferences_", "").replace("trust_verification_", "")
        rn_route = f"/(onboarding)/{step_name}"
    else:
        if "home" in folder:
            rn_route = "/(main)/(tabs)/home"
        elif "discover" in folder:
            rn_route = "/(main)/(tabs)/discover"
        elif "interests" in folder:
            rn_route = "/(main)/(tabs)/interests"
        elif "active_conversation" in folder:
            rn_route = "/(main)/chat/[id]"
        elif "profile_detail" in folder:
            rn_route = "/(main)/profile/[id]"
        elif "family_wali" in folder:
            rn_route = "/(main)/wali"
        elif "notifications" in folder:
            rn_route = "/(main)/notifications"
        elif "my_profile" in folder:
            rn_route = "/(main)/(tabs)/profile"
        elif "account_settings" in folder:
            rn_route = "/(main)/settings/account"
        elif "search" in folder or "filters" in folder:
            rn_route = "/(main)/search/filters"
        elif "modal" in folder or "sheet" in folder:
            rn_route = f"/(main)/modals/{folder}"
        else:
            rn_route = f"/(main)/{folder}"

    # Identify reusable components
    components = []
    if "header" in content or "top-0" in content:
        components.append("TopBar")
    if "button" in content:
        components.append("PrimaryButton")
    if "input" in content or "tel" in content:
        components.append("InputField")
    if "material-symbols-outlined" in content:
        components.append("AppIcon")
    if "blur" in content:
        components.append("ModestyPhotoCurtain")
    if "waveform" in content or "recording" in content or "voice" in folder:
        components.append("VoiceWaveform / Player")
    if "chip" in content or "tag" in content or "rounded-full" in content:
        components.append("SelectableChip")
    if "modal" in folder or "sheet" in folder:
        components.append("BottomSheetModal")
    if "card" in content or "rounded-xl" in content:
        components.append("SurfaceCard")

    # Backend dependencies
    backend = []
    if "auth" in folder or "splash" in folder:
        backend.append("Supabase Auth (Phone OTP)")
    elif "questionnaire" in folder or "profile_setup" in folder or "profile_preview" in folder:
        backend.append("profiles, profile_details, family")
    elif "photo" in folder:
        backend.append("photos, photo_access_requests, Storage(profile-private, profile-blurred)")
    elif "voice" in folder:
        backend.append("voice_introductions, Storage(voice-introductions)")
    elif "preference" in folder:
        backend.append("partner_preferences, partner_preference_weights")
    elif "interest" in folder:
        backend.append("interests, shortlists")
    elif "chat" in folder or "active_conversation" in folder or "end_conversation" in folder:
        backend.append("conversations, conversation_members, messages, Supabase Realtime")
    elif "wali" in folder:
        backend.append("wali_relationships")
    elif "notification" in folder:
        backend.append("notifications")
    elif "account_settings" in folder or "report_block" in folder:
        backend.append("reports, blocks, user_accounts")

    screens.append({
        "folder": folder,
        "flow": flow_category,
        "png": "Valid Binary PNG" if has_valid_png else "HTML Render Required (FIFE failure)",
        "route": rn_route,
        "components": ", ".join(components[:4]),
        "backend": ", ".join(backend) if backend else "profiles"
    })

print(f"Generated complete mapping for {len(screens)} screens.")
with open("screen_mapping.txt", "w", encoding="utf-8") as out:
    for s in screens:
        out.write(f"{s['folder']} | {s['flow']} | {s['route']} | {s['png']} | {s['components']} | {s['backend']}\n")
