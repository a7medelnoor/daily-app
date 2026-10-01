# Security

**Anything inside your app can be read.** An app file can be unpacked in minutes. Treat every key, URL and rule inside it as public.

## Five layers

| Layer | Protection |
|---|---|
| App | No secrets in code · encrypted token storage · no sensitive data in logs |
| Network | HTTPS only · certificate pinning for banking and health apps |
| Auth | Supabase Auth · short sessions · MFA for admin accounts |
| Database | Row-level security on every table · least privilege |
| Server | Secrets in Edge Functions · validate input · rate limits |

## Attacks and defences

| Attack | Defence |
|---|---|
| Pull a secret key out of the app | Secrets only on the server, in Edge Functions |
| Read other users' data with the public key | Row-level security on every table |
| Steal a session from a rooted phone | Encrypt the session, keep the key in `expo-secure-store` |
| Bots and fake requests | Rate limits, Apple App Attest, Google Play Integrity |
| A vulnerable package | `npm audit`, update monthly, use fewer packages |
| Bad input in a form | Validate on the server and with database constraints |

## Known shortcut in this workshop

The session is stored in AsyncStorage to keep setup simple. Before launch, encrypt it with a key held in `expo-secure-store` (Supabase's React Native guide shows a `LargeSecureStore` adapter).

## Security review prompt

```
Act as a security reviewer. Check this project against the OWASP Mobile Top 10.
For each problem give the file, the risk (high, medium, low) and the smallest fix.
Check: secrets in the app, row-level security, token storage, input validation
and outdated packages. Do not change code yet.
```
