import { useState } from "react";
import "./App.css";

function AIJourney({ onHome }) {
  const [form, setForm] = useState({
    sport: "",
    level: "",
    goal: "",
    location: "",
    trainingTime: "",
    support: "",
    problem: "",
  });

  const [roadmap, setRoadmap] = useState(null);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const generateRoadmap = (e) => {
    e.preventDefault();

    const sportName = form.sport || "your sport";

    setRoadmap({
      title: `${sportName} Development Roadmap`,
      steps: [
        {
          number: "01",
          title: "Build Your Foundation",
          description:
            `Start with the fundamentals of ${sportName}. Focus on technique, fitness and consistency.`,
          icon: "🎯",
        },
        {
          number: "02",
          title: "Find the Right Guidance",
          description:
            form.support === "No coach"
              ? "Your next priority should be finding a suitable coach or training centre near you."
              : "Work with your existing support system and regularly review your progress.",
          icon: "🧑‍🏫",
        },
        {
          number: "03",
          title: "Start Competing",
          description:
            "Look for local competitions, trials and events that match your current level.",
          icon: "🏆",
        },
        {
          number: "04",
          title: "Build Your Sporting Identity",
          description:
            "Document your competitions, achievements, training journey and progress on SportsConnect.",
          icon: "👤",
        },
        {
          number: "05",
          title: "Track and Improve",
          description:
            "Review your performance regularly and identify the skills that need more attention.",
          icon: "📈",
        },
        {
          number: "06",
          title: "Move Toward Your Goal",
          description:
            `Keep progressing toward your goal: ${form.goal || "higher-level competition"}.`,
          icon: "🚀",
        },
      ],
    });
  };

  return (
    <div className="ai-journey-page">

      {/* HEADER */}

      <div className="ai-journey-header">

        <button
          className="ai-home-button"
          onClick={onHome}
        >
          ← Home
        </button>

        <div>
          <p className="ai-label">
            PERSONALIZED SPORTS GUIDANCE
          </p>

          <h1>AI Journey</h1>

          <p>
            Tell us about your situation. We'll help you
            understand your next steps.
          </p>
        </div>

      </div>

      {/* INTRO */}

      <section className="ai-intro">

        <div className="ai-intro-icon">
          🤖
        </div>

        <div>
          <h2>
            Your situation is unique.
          </h2>

          <p>
            SportsConnect doesn't expect every athlete
            to follow the same path. Tell us where you
            are today, where you want to go and what is
            stopping you.
          </p>
        </div>

      </section>

      {/* FORM */}

      <form
        className="ai-form"
        onSubmit={generateRoadmap}
      >

        <div className="ai-form-heading">
          <h2>Tell us about yourself</h2>

          <p>
            This information helps create a more useful
            starting roadmap.
          </p>
        </div>

        <div className="ai-form-grid">

          {/* SPORT */}

          <div className="ai-field">

            <label>
              Sport you're interested in
            </label>

            <select
              name="sport"
              value={form.sport}
              onChange={handleChange}
              required
            >
              <option value="">
                Select a sport
              </option>

              <option value="Boxing">
                🥊 Boxing
              </option>

              <option value="Badminton">
                🏸 Badminton
              </option>

              <option value="Athletics">
                🏃 Athletics
              </option>

              <option value="Karate">
                🥋 Karate
              </option>

              <option value="Football">
                ⚽ Football
              </option>

              <option value="Swimming">
                🏊 Swimming
              </option>

              <option value="Wrestling">
                🤼 Wrestling
              </option>

              <option value="Other">
                Other
              </option>
            </select>

          </div>

          {/* LEVEL */}

          <div className="ai-field">

            <label>
              Your current level
            </label>

            <select
              name="level"
              value={form.level}
              onChange={handleChange}
              required
            >
              <option value="">
                Select your level
              </option>

              <option value="Beginner">
                Beginner
              </option>

              <option value="School">
                School level
              </option>

              <option value="District">
                District level
              </option>

              <option value="State">
                State level
              </option>

              <option value="National">
                National level
              </option>
            </select>

          </div>

          {/* GOAL */}

          <div className="ai-field ai-field-full">

            <label>
              What is your main goal?
            </label>

            <input
              type="text"
              name="goal"
              value={form.goal}
              onChange={handleChange}
              placeholder="Example: I want to represent my state"
              required
            />

          </div>

          {/* LOCATION */}

          <div className="ai-field">

            <label>
              Where are you located?
            </label>

            <input
              type="text"
              name="location"
              value={form.location}
              onChange={handleChange}
              placeholder="Example: Hyderabad"
              required
            />

          </div>

          {/* TRAINING */}

          <div className="ai-field">

            <label>
              Training time available
            </label>

            <select
              name="trainingTime"
              value={form.trainingTime}
              onChange={handleChange}
              required
            >
              <option value="">
                Select available time
              </option>

              <option value="Less than 1 hour">
                Less than 1 hour/day
              </option>

              <option value="1-2 hours">
                1–2 hours/day
              </option>

              <option value="2-4 hours">
                2–4 hours/day
              </option>

              <option value="4+ hours">
                4+ hours/day
              </option>
            </select>

          </div>

          {/* SUPPORT */}

          <div className="ai-field">

            <label>
              Current support
            </label>

            <select
              name="support"
              value={form.support}
              onChange={handleChange}
              required
            >
              <option value="">
                Select your situation
              </option>

              <option value="No coach">
                I don't have a coach
              </option>

              <option value="School coach">
                I have a school coach
              </option>

              <option value="Academy">
                I train at an academy
              </option>

              <option value="Personal coach">
                I have a personal coach
              </option>

              <option value="Family support">
                I mainly have family support
              </option>
            </select>

          </div>

          {/* PROBLEM */}

          <div className="ai-field ai-field-full">

            <label>
              What is your biggest difficulty right now?
            </label>

            <textarea
              name="problem"
              value={form.problem}
              onChange={handleChange}
              placeholder="Example: I don't know which competitions to join or how to find a good coach."
              rows="4"
              required
            />

          </div>

        </div>

        <button
          type="submit"
          className="generate-roadmap-button"
        >
          ✨ Generate My Roadmap
        </button>

      </form>

      {/* ROADMAP */}

      {roadmap && (
        <section className="roadmap-section">

          <div className="roadmap-header">

            <div className="roadmap-ai-icon">
              🤖
            </div>

            <div>
              <p>YOUR PERSONALIZED STARTING POINT</p>

              <h2>
                {roadmap.title}
              </h2>
            </div>

          </div>

          <div className="roadmap-message">

            <strong>
              Based on what you told us:
            </strong>

            <span>
              You're interested in {form.sport},
              you're currently at the {form.level} level,
              and your goal is to {form.goal.toLowerCase()}.
            </span>

          </div>

          <div className="roadmap-steps">

            {roadmap.steps.map((step) => (
              <div
                className="roadmap-step"
                key={step.number}
              >

                <div className="roadmap-number">
                  {step.number}
                </div>

                <div className="roadmap-step-icon">
                  {step.icon}
                </div>

                <div className="roadmap-step-content">

                  <h3>
                    {step.title}
                  </h3>

                  <p>
                    {step.description}
                  </p>

                </div>

              </div>
            ))}

          </div>

          {/* NEXT STEP */}

          <div className="roadmap-next">

            <div className="roadmap-next-icon">
              📍
            </div>

            <div>

              <p>NEXT RECOMMENDED ACTION</p>

              <h3>
                {form.support === "No coach"
                  ? "Start by finding a suitable coach near you."
                  : "Talk to your coach and define your next measurable goal."}
              </h3>

              <span>
                This is a starting recommendation.
                Your roadmap can evolve as your situation changes.
              </span>

            </div>

          </div>

        </section>
      )}

      {/* FOOTER */}

      <section className="ai-footer">

        <div className="ai-footer-icon">
          💡
        </div>

        <div>

          <h2>
            There is no single path to success.
          </h2>

          <p>
            SportsConnect is designed to help athletes
            understand their options and find the path
            that fits their situation.
          </p>

        </div>

      </section>

    </div>
  );
}

export default AIJourney;