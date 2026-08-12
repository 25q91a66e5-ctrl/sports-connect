import { useState } from "react";
import "./App.css";

function Opportunities({ onHome }) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const opportunities = [
    {
      id: 1,
      title: "Telangana State Boxing Championship",
      organization: "Telangana Boxing Association",
      sport: "🥊 Boxing",
      category: "Competition",
      location: "Hyderabad, Telangana",
      date: "24 August 2026",
      deadline: "18 August 2026",
      level: "State Level",
      icon: "🥊",
    },
    {
      id: 2,
      title: "National Badminton Selection Trials",
      organization: "Indian Badminton Federation",
      sport: "🏸 Badminton",
      category: "Trial",
      location: "New Delhi, India",
      date: "5 September 2026",
      deadline: "28 August 2026",
      level: "National Level",
      icon: "🏸",
    },
    {
      id: 3,
      title: "Young Athletes Training Camp",
      organization: "Sports Authority",
      sport: "🏃 Athletics",
      category: "Camp",
      location: "Bengaluru, Karnataka",
      date: "12 September 2026",
      deadline: "2 September 2026",
      level: "National Camp",
      icon: "🏃",
    },
    {
      id: 4,
      title: "Emerging Athlete Scholarship",
      organization: "National Sports Foundation",
      sport: "🏆 Multi Sport",
      category: "Scholarship",
      location: "India",
      date: "Applications Open",
      deadline: "30 September 2026",
      level: "National",
      icon: "🎓",
    },
    {
      id: 5,
      title: "Hyderabad District Karate Trials",
      organization: "Telangana Karate Association",
      sport: "🥋 Karate",
      category: "Trial",
      location: "Hyderabad, Telangana",
      date: "30 August 2026",
      deadline: "22 August 2026",
      level: "District Level",
      icon: "🥋",
    },
    {
      id: 6,
      title: "National Junior Football Championship",
      organization: "All India Football Federation",
      sport: "⚽ Football",
      category: "Competition",
      location: "Pune, Maharashtra",
      date: "18 September 2026",
      deadline: "5 September 2026",
      level: "National Level",
      icon: "⚽",
    },
  ];

  const categories = [
    "All",
    "Competition",
    "Trial",
    "Camp",
    "Scholarship",
  ];

  const filteredOpportunities = opportunities.filter((item) => {
    const matchesCategory =
      category === "All" || item.category === category;

    const text = search.toLowerCase();

    const matchesSearch =
      item.title.toLowerCase().includes(text) ||
      item.organization.toLowerCase().includes(text) ||
      item.sport.toLowerCase().includes(text) ||
      item.location.toLowerCase().includes(text);

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="opportunities-page">

      {/* HEADER */}

      <div className="opportunities-header">

        <button
          className="opportunities-home-button"
          onClick={onHome}
        >
          ← Home
        </button>

        <div>
          <p className="opportunities-label">
            BUILD YOUR SPORTING FUTURE
          </p>

          <h1>Opportunities</h1>

          <p>
            Find competitions, trials, camps and
            scholarships that match your journey.
          </p>
        </div>

      </div>

      {/* SEARCH */}

      <div className="opportunities-search">

        <span>🔍</span>

        <input
          type="text"
          placeholder="Search opportunities, sports or locations..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

      </div>

      {/* CATEGORY FILTER */}

      <div className="opportunity-filters">

        {categories.map((item) => (
          <button
            key={item}
            className={
              category === item
                ? "opportunity-filter active-filter"
                : "opportunity-filter"
            }
            onClick={() => setCategory(item)}
          >
            {item}
          </button>
        ))}

      </div>

      {/* FEATURED MESSAGE */}

      <section className="opportunity-highlight">

        <div className="opportunity-highlight-icon">
          🎯
        </div>

        <div>
          <p>YOUR NEXT STEP</p>

          <h2>
            Don't let the right opportunity pass you by.
          </h2>

          <span>
            SportsConnect helps athletes discover
            opportunities based on their sport and goals.
          </span>
        </div>

      </section>

      {/* OPPORTUNITY LIST */}

      <section className="opportunities-section">

        <div className="opportunities-section-title">

          <div>
            <h2>Available Opportunities</h2>

            <p>
              {filteredOpportunities.length} opportunities
              found
            </p>
          </div>

        </div>

        <div className="opportunities-grid">

          {filteredOpportunities.map((item) => (
            <article
              className="opportunity-card"
              key={item.id}
            >

              <div className="opportunity-card-top">

                <div className="opportunity-icon">
                  {item.icon}
                </div>

                <span className="opportunity-level">
                  {item.level}
                </span>

              </div>

              <span className="opportunity-category">
                {item.category}
              </span>

              <h3>
                {item.title}
              </h3>

              <p className="opportunity-organization">
                {item.organization}
              </p>

              <div className="opportunity-info">

                <span>
                  🏅 {item.sport}
                </span>

                <span>
                  📍 {item.location}
                </span>

                <span>
                  📅 {item.date}
                </span>

              </div>

              <div className="deadline">
                <span>Application deadline</span>

                <strong>
                  {item.deadline}
                </strong>
              </div>

              <div className="opportunity-actions">

                <button className="view-opportunity">
                  View Details
                </button>

                <button className="save-opportunity">
                  ♡
                </button>

              </div>

            </article>
          ))}

        </div>

        {filteredOpportunities.length === 0 && (
          <div className="no-opportunities">

            <div>🔎</div>

            <h3>No opportunities found</h3>

            <p>
              Try another sport, category or location.
            </p>

          </div>
        )}

      </section>

      {/* BOTTOM MESSAGE */}

      <section className="opportunity-footer">

        <div>
          <span className="footer-icon">
            🏆
          </span>
        </div>

        <div>
          <h2>
            Your talent deserves an opportunity.
          </h2>

          <p>
            From local competitions to national trials,
            discover the next step in your sporting journey.
          </p>
        </div>

      </section>

    </div>
  );
}

export default Opportunities;