import { useState } from "react";
import "./App.css";

function Coaches({ onHome }) {
  const [search, setSearch] = useState("");
  const [sport, setSport] = useState("All");

  const coaches = [
    {
      id: 1,
      name: "Vikram Sharma",
      username: "@coach_vikram",
      sport: "Boxing",
      icon: "🥊",
      location: "Hyderabad",
      experience: "12 years",
      athletes: "180+",
      rating: "4.9",
      specialization: "Competitive Boxing",
      verified: true,
    },
    {
      id: 2,
      name: "Priya Menon",
      username: "@coach_priya",
      sport: "Badminton",
      icon: "🏸",
      location: "Bengaluru",
      experience: "10 years",
      athletes: "120+",
      rating: "4.8",
      specialization: "Youth Development",
      verified: true,
    },
    {
      id: 3,
      name: "Arun Reddy",
      username: "@coach_arun",
      sport: "Athletics",
      icon: "🏃",
      location: "Hyderabad",
      experience: "15 years",
      athletes: "210+",
      rating: "4.9",
      specialization: "Track & Field",
      verified: true,
    },
    {
      id: 4,
      name: "Neha Kapoor",
      username: "@coach_neha",
      sport: "Karate",
      icon: "🥋",
      location: "Delhi",
      experience: "8 years",
      athletes: "95+",
      rating: "4.7",
      specialization: "Martial Arts",
      verified: false,
    },
    {
      id: 5,
      name: "Rahul Verma",
      username: "@coach_rahul",
      sport: "Football",
      icon: "⚽",
      location: "Mumbai",
      experience: "11 years",
      athletes: "150+",
      rating: "4.8",
      specialization: "Youth Football",
      verified: true,
    },
    {
      id: 6,
      name: "Meera Iyer",
      username: "@coach_meera",
      sport: "Swimming",
      icon: "🏊",
      location: "Chennai",
      experience: "9 years",
      athletes: "110+",
      rating: "4.8",
      specialization: "Competitive Swimming",
      verified: false,
    },
  ];

  const sports = [
    "All",
    "Boxing",
    "Badminton",
    "Athletics",
    "Karate",
    "Football",
    "Swimming",
  ];

  const filteredCoaches = coaches.filter((coach) => {
    const matchesSport =
      sport === "All" || coach.sport === sport;

    const text = search.toLowerCase();

    const matchesSearch =
      coach.name.toLowerCase().includes(text) ||
      coach.username.toLowerCase().includes(text) ||
      coach.sport.toLowerCase().includes(text) ||
      coach.location.toLowerCase().includes(text) ||
      coach.specialization.toLowerCase().includes(text);

    return matchesSport && matchesSearch;
  });

  return (
    <div className="coaches-page">

      {/* HEADER */}

      <div className="coaches-header">

        <button
          className="coaches-home-button"
          onClick={onHome}
        >
          ← Home
        </button>

        <div>
          <p className="coaches-label">
            FIND THE RIGHT GUIDANCE
          </p>

          <h1>Coaches</h1>

          <p>
            Connect with experienced coaches who can
            help you move forward in your sporting journey.
          </p>
        </div>

      </div>

      {/* SEARCH */}

      <div className="coaches-search">

        <span>🔍</span>

        <input
          type="text"
          placeholder="Search coaches, sports or locations..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

      </div>

      {/* SPORTS FILTER */}

      <div className="coach-filters">

        {sports.map((item) => (
          <button
            key={item}
            className={
              sport === item
                ? "coach-filter active-coach-filter"
                : "coach-filter"
            }
            onClick={() => setSport(item)}
          >
            {item}
          </button>
        ))}

      </div>

      {/* INTRO */}

      <section className="coach-highlight">

        <div className="coach-highlight-icon">
          🧑‍🏫
        </div>

        <div>

          <p>PERSONAL GUIDANCE</p>

          <h2>
            Talent grows faster with the right mentor.
          </h2>

          <span>
            Find coaches based on your sport,
            experience and location.
          </span>

        </div>

      </section>

      {/* COACHES */}

      <section className="coaches-section">

        <div className="coaches-section-title">

          <div>

            <h2>
              Recommended Coaches
            </h2>

            <p>
              {filteredCoaches.length} coaches available
            </p>

          </div>

        </div>

        <div className="coaches-grid">

          {filteredCoaches.map((coach) => (
            <article
              className="coach-card"
              key={coach.id}
            >

              <div className="coach-card-header">

                <div className="coach-avatar">
                  {coach.icon}
                </div>

                {coach.verified && (
                  <span className="coach-verified">
                    ✓
                  </span>
                )}

              </div>

              <h3>
                {coach.name}
              </h3>

              <p className="coach-username">
                {coach.username}
              </p>

              <span className="coach-sport">
                {coach.icon} {coach.sport}
              </span>

              <p className="coach-specialization">
                {coach.specialization}
              </p>

              <div className="coach-details">

                <span>
                  📍 {coach.location}
                </span>

                <span>
                  ⏱ {coach.experience}
                </span>

                <span>
                  👥 {coach.athletes} athletes coached
                </span>

              </div>

              <div className="coach-rating">
                ⭐ {coach.rating}
              </div>

              <div className="coach-actions">

                <button className="coach-profile-button">
                  View Profile
                </button>

                <button className="connect-coach-button">
                  Connect
                </button>

              </div>

            </article>
          ))}

        </div>

        {filteredCoaches.length === 0 && (
          <div className="no-coaches">

            <div>🔎</div>

            <h3>No coaches found</h3>

            <p>
              Try searching for another sport,
              coach or location.
            </p>

          </div>
        )}

      </section>

      {/* FOOTER MESSAGE */}

      <section className="coach-footer">

        <div className="coach-footer-icon">
          🧭
        </div>

        <div>

          <h2>
            Don't know where to start?
          </h2>

          <p>
            Tell SportsConnect about your situation
            and your interests. Our AI Journey feature
            will help you understand your possible next steps.
          </p>

        </div>

      </section>

    </div>
  );
}

export default Coaches;