import { Redirect } from 'expo-router';

// Google sends the user back to /auth/callback. The code is handled in social-auth.ts,
// so this route only needs to exist and move on.
export default function AuthCallback() {
  return <Redirect href="/" />;
}
