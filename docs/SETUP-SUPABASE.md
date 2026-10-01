# Supabase setup (Mission 2 and 3)

## 1. Project and keys

1. Create a free project at supabase.com. Pick the region closest to your users (for the Gulf: Frankfurt or Mumbai).
2. Project Settings → API Keys: copy the **Project URL** and the **publishable key**.
3. Copy `.env.example` to `.env` and paste both values. Restart `npx expo start`.

The secret / service_role key never goes in the app.

## 2. Email sign-in

Authentication → Sign In / Providers → Email: on.
For the workshop, turn **Confirm email** off so new accounts can sign in immediately. Turn it back on before launch.

## 3. Redirect URLs (needed for Google)

Authentication → URL Configuration → Redirect URLs, add:

```
exp://**
daily://**
```

`exp://` is Expo Go during development. `daily://` is the app's own scheme from `app.json` after you build it.

## 4. Google

1. Google Cloud Console → create a project → Google Auth Platform: fill in Branding (app name, support email) and Audience (External).
2. Clients → Create client → **Web application**.
   Authorized redirect URI: `https://YOUR-PROJECT.supabase.co/auth/v1/callback`
3. Copy the Client ID and Client secret into Supabase → Authentication → Sign In / Providers → Google.

## 5. Apple (iOS)

Native Sign in with Apple only needs client IDs in Supabase, no secret key.

1. Supabase → Authentication → Sign In / Providers → Apple: on.
2. Client IDs: `host.exp.Exponent` (Expo Go during the workshop), plus your own bundle ID, e.g. `com.yourname.daily`.
3. In your Apple Developer account, the App ID for your bundle ID needs the **Sign in with Apple** capability (EAS sets this when it builds, because `usesAppleSignIn` is true in `app.json`).

## 6. Tables

Mission 3: open SQL Editor, paste `supabase/migrations/0001_habits.sql`, run it.
Then check Table Editor: both tables show **RLS enabled**.
