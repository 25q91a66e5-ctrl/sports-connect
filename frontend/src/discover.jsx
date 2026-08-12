import { useState } from "react";
import "./app.css";

function Discover({ onHome }) {
  const [search, setSearch] = useState("");

  const athletes = [
    {
      name: "Rahul Boxing",
      username: "@rahulboxing",
      sport: "🥊 Boxing",
      location: "Hyderabad",
      followers: "24.2K",
      icon: "🥊",
      verified: true,
    },
    {
      name: "Ananya Athletics",
      username: "@ananya_runs",
      sport: "🏃 Athletics",
      location: "Bengaluru",
      followers: "18.7K",
      icon: "🏃",
      verified: true,
    },
    {
      name: "Arjun Karate",
      username: "@arjun_karate",
      sport: "🥋 Karate",
      location: "Delhi",
      followers: "12.4K",
      icon: "🥋",
      verified: false,
    },
    {
      name: "Meera Swimming",
      username: "@meera_swims",
      sport: "🏊 Swimming",
      location: "Mumbai",
      followers: "9.8K",
      icon: "🏊",
      verified: true,
    },
  ];

  const sports = [
    { name: "Boxing", icon: "🥊", count: "12.4K athletes" },
    { name: "Badminton", icon: "🏸", count: "10.8K athletes" },
    { name: "Athletics", icon: "🏃", count: "8.6K athletes" },
    { name: "Football", icon: "⚽", count: "7.9K athletes" },
    { name: "Karate", icon: "🥋", count: "6.2K athletes" },
    { name: "Swimming", icon: "🏊", count: "5.4K athletes" },
  ];

  const filteredAthletes = athletes.filter((athlete) => {
    const text = search.toLowerCase();

    return (
      athlete.name.toLowerCase().includes(text) ||
      athlete.username.toLowerCase().includes(text) ||
      athlete.sport.toLowerCase().includes(text) ||
      athlete.location.toLowerCase().includes(text)
    );
  });

  return (
    <div className="discover-page">

      {/* HEADER */}

      <div className="discover-header">

        <button
          className="discover-home-button"
          onClick={onHome}
        >
          ← Home
        </button>

        <div>
          <p className="discover-label">EXPLORE THE COMMUNITY</p>

          <h1>Discover</h1>

          <p>
            Find athletes, teams and sporting communities
            across India.
          </p>
        </div>

      </div>

      {/* SEARCH */}

      <div className="discover-search">

        <span>🔍</span>

        <input
          type="text"
          placeholder="Search athletes, sports, teams or locations..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

      </div>

      {/* SPORTS */}

      <section className="discover-section">

        <div className="discover-section-title">
          <div>
            <h2>Explore Sports</h2>
            <p>Discover athletes based on their sport.</p>
          </div>
        </div>

        <div className="sport-discover-grid">

          {sports.map((sport) => (
            <button
              className="sport-discover-card"
              key={sport.name}
            >
              <span className="sport-discover-icon">
                {sport.icon}
              </span>

              <span className="sport-discover-name">
                {sport.name}
              </span>

              <span className="sport-discover-count">
                {sport.count}
              </span>
            </button>
          ))}

        </div>

      </section>

      {/* ATHLETES */}

      <section className="discover-section">

        <div className="discover-section-title">

          <div>
            <h2>🔥 Athletes to Discover</h2>

            <p>
              Meet athletes building their sporting journey.
            </p>
          </div>

          <span className="result-count">
            {filteredAthletes.length} athletes
          </span>

        </div>

        <div className="athlete-discover-grid">

          {filteredAthletes.map((athlete) => (
            <div
              className="athlete-discover-card"
              key={athlete.username}
            >

              <div className="athlete-top">

                <div className="athlete-avatar">
                  {athlete.icon}
                </div>

                {athlete.verified && (
                  <span className="verified">
                    ✓
                  </span>
                )}

              </div>

              <h3>
                {athlete.name}
              </h3>

              <p className="athlete-username">
                {athlete.username}
              </p>

              <span className="athlete-sport">
                {athlete.sport}
              </span>

              <div className="athlete-details">

                <span>
                  📍 {athlete.location}
                </span>

                <span>
                  👥 {athlete.followers}
                </span>

              </div>

              <div className="athlete-actions">

                <button className="view-profile">
                  View Profile
                </button>

                <button className="follow-athlete">
                  Follow
                </button>

              </div>

            </div>
          ))}

        </div>

        {filteredAthletes.length === 0 && (
          <div className="no-results">

            <div>🔎</div>

            <h3>No athletes found</h3>

            <p>
              Try searching for another athlete, sport
              or location.
            </p>

          </div>
        )}

      </section>

      {/* ACHIEVEMENT */}

      <section className="recognition-banner">

        <div className="recognition-icon">
          🥇
        </div>

        <div>
          <p className="recognition-label">
            SPORTS RECOGNITION
          </p>

          <h2>
            Every achievement deserves recognition.
          </h2>

          <p>
            Discover athletes who are working hard,
            representing their communities and chasing
            their dreams.
          </p>
        </div>

      </section>

    </div>
  );
}

export default Discover;