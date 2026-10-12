# Dono Jaha — Environment Configuration & Deployment Variables

This document outlines the environment configurations required to build and deploy **Dono Jaha (D O N O   J A H A)**.

---

## Required Client Environment Variables

| Variable | Description | Security |
|---|---|---|
| `VITE_SUPABASE_URL` | The HTTPS endpoint for your Supabase project instance (e.g., `https://xyz.supabase.co`). | **Public** (Safe for web bundle) |
| `VITE_SUPABASE_ANON_KEY` | The anonymous public API key that honors PostgreSQL Row Level Security. | **Public** (Safe for web bundle) |
| `VITE_APP_NAME` | Set to `"Dono Jaha"` (strict brand name). | Public |
| `VITE_ENABLE_MOCK_FALLBACK` | Set to `true` to allow local previewing and UI testing without an active Supabase connection. | Public |

---

## Strict Prohibitions

> **CRITICAL SECURITY WARNING:**  
> The `SUPABASE_SERVICE_ROLE_KEY` has administrative bypass privileges. **NEVER** place this key inside `.env` or any client-facing source code! It must only be stored in secure server-side execution environments (e.g. Supabase Edge Functions or private backend services).
