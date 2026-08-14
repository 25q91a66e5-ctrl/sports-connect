import { useState } from "react";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { db } from "./firebase";
import "./ProfileSetup.css";

function ProfileSetup({ user, onComplete }) {
  const [form, setForm] = useState({ name: "", username: "", sport: "", location: "", bio: "" });
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const update = (field) => (event) => setForm({ ...form, [field]: event.target.value });
  const submit = async (event) => {
    event.preventDefault(); setSaving(true); setMessage("");
    try {
      const profile = { ...form, username: form.username.replace(/^@+/, ""), email: user.email || "", profileImageUrl: user.photoURL || "", achievements: [], profileComplete: true, createdAt: serverTimestamp(), updatedAt: serverTimestamp() };
      await setDoc(doc(db, "users", user.uid), profile, { merge: true });
      onComplete({ ...profile, username: `@${profile.username}` });
    } catch { setMessage("We could not save your profile. Please check your connection and try again."); } finally { setSaving(false); }
  };
  return <div className="profile-setup-page"><div className="profile-setup-card"><div className="setup-icon">S</div><h1>Create your sports profile</h1><p>Tell the community a little about your sporting journey.</p>
    <form onSubmit={submit}><label>Full name</label><input value={form.name} onChange={update("name")} placeholder="Your name" required /><label>Username</label><input value={form.username} onChange={update("username")} placeholder="yourusername" required /><label>Sport</label><select value={form.sport} onChange={update("sport")} required><option value="">Select your sport</option>{["Athletics", "Badminton", "Basketball", "Boxing", "Football", "Swimming", "Other"].map((sport) => <option key={sport}>{sport}</option>)}</select><label>Location</label><input value={form.location} onChange={update("location")} placeholder="City, State" required /><label>Bio</label><textarea value={form.bio} onChange={update("bio")} placeholder="What are you working towards?" rows="4" /><button type="submit" disabled={saving}>{saving ? "Saving…" : "Complete profile"}</button></form>
    {message && <p className="setup-message" role="alert">{message}</p>}</div></div>;
}
export default ProfileSetup;
