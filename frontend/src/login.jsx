import { useState } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { auth, db } from "./firebase";
import "./login.css";

const friendlyError = (code) => ({
  "auth/email-already-in-use": "An account already exists for this email.",
  "auth/invalid-credential": "Email or password is incorrect.",
  "auth/weak-password": "Use a password with at least 6 characters.",
  "auth/invalid-email": "Enter a valid email address.",
}[code] || "We could not complete that request. Please try again.");

function Login() {
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (event) => {
    event.preventDefault(); setLoading(true); setMessage("");
    try {
      if (isSignup) {
        const credential = await createUserWithEmailAndPassword(auth, email.trim(), password);
        await setDoc(doc(db, "users", credential.user.uid), { name: "", username: "", email: credential.user.email || email.trim(), sport: "", location: "", bio: "", profileImageUrl: credential.user.photoURL || "", achievements: [], profileComplete: false, createdAt: serverTimestamp() }, { merge: true });
      } else await signInWithEmailAndPassword(auth, email.trim(), password);
    } catch (error) { setMessage(friendlyError(error.code)); } finally { setLoading(false); }
  };
  return <div className="login-page"><div className="login-card"><div className="login-logo">S</div><h1>SportsConnect</h1><p className="login-subtitle">Connect. Compete. Achieve.</p><h2>{isSignup ? "Create your account" : "Welcome back"}</h2>
    <form onSubmit={handleSubmit}><label>Email</label><input type="email" autoComplete="email" placeholder="you@example.com" value={email} onChange={(event) => setEmail(event.target.value)} required /><label>Password</label><input type="password" autoComplete={isSignup ? "new-password" : "current-password"} minLength="6" placeholder="At least 6 characters" value={password} onChange={(event) => setPassword(event.target.value)} required /><button type="submit" className="login-submit" disabled={loading}>{loading ? "Please wait…" : isSignup ? "Create account" : "Log in"}</button></form>
    {message && <p className="login-message" role="alert">{message}</p>}<div className="login-switch">{isSignup ? "Already have an account?" : "New to SportsConnect?"}<button type="button" onClick={() => { setIsSignup(!isSignup); setMessage(""); }}>{isSignup ? "Log in" : "Create one"}</button></div>
  </div></div>;
}
export default Login;
