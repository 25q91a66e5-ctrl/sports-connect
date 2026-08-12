import { useState } from "react";
import "./Profile.css";

function Profile({ onHome }) {
  const [following, setFollowing] = useState(false);

  return (
    <main className="profile-page">

      {/* BACK BUTTON */}
      <button className="profile-back" onClick={onHome}>
        ← Back to Home
      </button>

      {/* PROFILE HEADER */}
      <section className="profile-header">

        <div className="profile-cover">
          <div className="profile-avatar">
            🥊
          </div>
        </div>

        <div className="profile-info">

          <div>
            <h1>Rahul Sharma</h1>
            <p className="username">@rahulboxing</p>
          </div>

          <button
            className={following ? "following-btn" : "follow-profile-btn"}
            onClick={() => setFollowing(!following)}
          >
            {following ? "✓ Following" : "+ Follow"}
          </button>

        </div>

        <p className="profile-bio">
          🥊 Boxing Athlete | State Level Player
          <br />
          Training every day to represent India 🇮🇳
        </p>

        <div className="profile-location">
          📍 Hyderabad, Telangana &nbsp; • &nbsp; 🥊 Boxing
        </div>

      </section>

      {/* STATS */}
      <section className="profile-stats">

        <div>
          <strong>24</strong>
          <span>Posts</span>
        </div>

        <div>
          <strong>2.4K</strong>
          <span>Followers</span>
        </div>

        <div>
          <strong>386</strong>
          <span>Following</span>
        </div>

        <div>
          <strong>7</strong>
          <span>Achievements</span>
        </div>

      </section>

      {/* ACHIEVEMENTS */}
      <section className="profile-section">

        <div className="profile-section-title">
          <h2>🏆 Achievements</h2>
          <span>View all</span>
        </div>

        <div className="achievement-grid">

          <div className="achievement-card">
            <div className="achievement-icon">🥇</div>
            <h3>State Championship</h3>
            <p>Gold Medal • 2026</p>
          </div>

          <div className="achievement-card">
            <div className="achievement-icon">🥈</div>
            <h3>District Boxing</h3>
            <p>Silver Medal • 2025</p>
          </div>

          <div className="achievement-card">
            <div className="achievement-icon">🏅</div>
            <h3>National Trials</h3>
            <p>Qualified • 2025</p>
          </div>

        </div>

      </section>

      {/* CERTIFICATES */}
      <section className="profile-section">

        <div className="profile-section-title">
          <h2>📜 Certificates</h2>
          <button className="add-certificate">
            + Add Certificate
          </button>
        </div>

        <div className="certificate-list">

          <div className="certificate-card">
            <div className="certificate-icon">📜</div>

            <div>
              <h3>State Boxing Championship</h3>
              <p>Telangana Sports Association</p>
              <span>Issued: March 2026</span>
            </div>

            <button>View</button>
          </div>

          <div className="certificate-card">
            <div className="certificate-icon">📜</div>

            <div>
              <h3>District Level Boxing</h3>
              <p>District Sports Authority</p>
              <span>Issued: December 2025</span>
            </div>

            <button>View</button>
          </div>

        </div>

      </section>

      {/* SPORTS JOURNEY */}
      <section className="profile-section">

        <div className="profile-section-title">
          <h2>🥊 Sports Journey</h2>
        </div>

        <div className="journey">

          <div className="journey-item">
            <span>2022</span>
            <div>
              <strong>Started Boxing</strong>
              <p>Began training at local sports academy.</p>
            </div>
          </div>

          <div className="journey-item">
            <span>2024</span>
            <div>
              <strong>District Competition</strong>
              <p>Won first district-level medal.</p>
            </div>
          </div>

          <div className="journey-item">
            <span>2026</span>
            <div>
              <strong>State Championship</strong>
              <p>Won Gold Medal at state level.</p>
            </div>
          </div>

        </div>

      </section>

      {/* PROFILE POSTS */}
      <section className="profile-section">

        <div className="profile-section-title">
          <h2>🎥 Sports Posts</h2>
        </div>

        <div className="profile-post-grid">

          <div>🥊</div>
          <div>🏆</div>
          <div>🥇</div>
          <div>🥊</div>
          <div>💪</div>
          <div>🇮🇳</div>

        </div>

      </section>

    </main>
  );
}

export default Profile;