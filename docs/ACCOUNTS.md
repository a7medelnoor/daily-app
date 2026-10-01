# Developer accounts

Start these at least one week before you want to publish. Approval is not instant.

| | Apple Developer Program | Google Play Console | Expo (EAS) |
|---|---|---|---|
| Where | developer.apple.com/programs/enroll | play.google.com/console | expo.dev/signup |
| Cost | $99 per year | $25 once | Free tier |
| Needs | Apple Account with two-factor auth, government ID | Google account, government ID, phone and address verification | Email |
| Company account | D-U-N-S number for the legal entity | D-U-N-S number, organisation details | Organisation in Expo |
| Takes | Usually 1–2 days, can be longer for companies | Identity check takes days | Minutes |

## Apple

1. Enroll as **Individual** (your own name shows on the App Store) or **Organization** (company name; needs a D-U-N-S number).
2. After approval: App Store Connect → Apps → + New App. Bundle ID must match `app.json` → `ios.bundleIdentifier`.
3. Users and Access → Integrations → App Store Connect API: create a key so EAS can submit for you.

## Google Play

1. Choose **Personal** or **Organization**. Organization needs a D-U-N-S number.
2. New personal accounts must run a **closed test with at least 12 testers for 14 days** before they can publish to production. Plan for it.
3. Create the app. Package name must match `app.json` → `android.package`.

## Expo / EAS

```bash
npm install -g eas-cli
eas login
eas build:configure
eas build --platform ios --profile production
eas submit --platform ios
```
