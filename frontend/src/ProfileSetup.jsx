import { useState } from "react";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "./firebase";
import "./ProfileSetup.css";

function ProfileSetup({ onComplete }) {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [sport, setSport] = useState("");
  const [location, setLocation] = useState("");
  const [bio, setBio] = useState("");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!auth.currentUser) {
      setMessage("User is not logged in.");
      return;
    }

    setSaving(true);
    setMessage("");

    try {
      const userId = auth.currentUser.uid;

      await setDoc(doc(db, "users", userId), {
        name,
        username,
        sport,
        location,
        bio,
        email: auth.currentUser.email,
        createdAt: new Date(),
      });

      setMessage("Profile created successfully!");

      setTimeout(() => {
        onComplete();
      }, 700);
    } catch (error) {
      console.error(error);
      setMessage("Could not save profile.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="profile-setup-page">

      <div className="profile-setup-card">

        <div className="setup-icon">
          🏆
        </div>

        <h1>Create Your Sports Profile</h1>

        <p>
          Tell us about yourself and your sporting journey.
        </p>

        <form onSubmit={handleSubmit}>

          <label>Full Name</label>

          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <label>Username</label>

          <input
            type="text"
            placeholder="@yourusername"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <label>Sport</label>

          <select
            value={sport}
            onChange={(e) => setSport(e.target.value)}
            required
          >
            <option value="">Select your sport</option>
            <option value="Boxing">🥊 Boxing</option>
            <option value="Badminton">🏸 Badminton</option>
            <option value="Athletics">🏃 Athletics</option>
            <option value="Karate">🥋 Karate</option>
            <option value="Swimming">🏊 Swimming</option>
            <option value="Football">⚽ Football</option>
            <option value="Archery">🏹 Archery</option>
            <option value="Wrestling">🤼 Wrestling</option>
            <option value="Other">🏆 Other</option>
          </select>

          <label>Location</label>

          <input
            type="text"
            placeholder="City, State"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />

          <label>Bio</label>

          <textarea
            placeholder="Tell us about your sports journey..."
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            rows="4"
          />

          <button
            type="submit"
            disabled={saving}
          >
            {saving ? "Saving..." : "Create Profile"}
          </button>

        </form>

        {message && (
          <p className="setup-message">
            {message}
          </p>
        )}

      </div>

    </div>
  );
}

export default ProfileSetup;