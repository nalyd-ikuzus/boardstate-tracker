import {
  login,
  logout,
  loggedInUserDisplayName,
} from "../lib/services/authService";
import "./Auth.css";

export function SignIn() {
  return <button onClick={login}>Sign In</button>;
}

export function SignOut() {
  return (
    <div>
      Hello, {loggedInUserDisplayName()}
      <button id="signOut" onClick={logout}>
        Sign Out
      </button>
    </div>
  );
}
