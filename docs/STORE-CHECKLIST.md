# Store checklist

Run through this before every submission.

## App

- [ ] App name, bundle ID (`ios.bundleIdentifier`) and package (`android.package`) set in `app.json`
- [ ] App icon 1024×1024, no transparency, no rounded corners (the store rounds them)
- [ ] Splash screen matches the app
- [ ] Works on a small phone and a large phone
- [ ] No crash on an empty account, on airplane mode, or after sign-out
- [ ] Account deletion inside the app (Apple 5.1.1(v))
- [ ] Google sign-in is paired with a privacy-focused option such as Sign in with Apple (Apple 4.8)
- [ ] A demo account for the reviewer, written in the review notes

## Data and privacy

- [ ] Row-level security on every table
- [ ] No secret key in the app
- [ ] Privacy policy URL that works
- [ ] App Store privacy labels: email, user ID, user content
- [ ] Google Play Data safety form filled in the same way

## Listing

- [ ] Screenshots: 6.9" iPhone (1320×2868) and Android phone
- [ ] Subtitle, description, keywords
- [ ] Support URL and support email
- [ ] Age rating questionnaire

## Build and submit

```bash
eas build --platform all --profile production
eas submit --platform ios
eas submit --platform android
```

- [ ] iOS: TestFlight on your own phone before you submit for review
- [ ] Android: closed test with 12 testers for 14 days (new personal accounts)
