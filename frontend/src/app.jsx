import { useEffect, useState } from "react";
import "./App.css";

import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "./firebase";
import { doc, getDoc } from "firebase/firestore";

import Discover from "./Discover";
import Opportunities from "./Opportunities";
import Coaches from "./coaches";
import AIJourney from "./airoadmap";
import Profile from "./Profile";
import Login from "./Login";
import ProfileSetup from "./ProfileSetup";

function App() {
  const [activePage, setActivePage] = useState("Home");

  const [user, setUser] = useState(null);

  const [checkingAuth, setCheckingAuth] = useState(true);

  const [showProfileSetup, setShowProfileSetup] = useState(false);

  const [posts, setPosts] = useState([
    {
      id: 1,
      type: "Athlete",
      name: "Rahul Boxing",
      username: "@rahulboxing",
      sport: "🥊 Boxing",
      time: "2h",
      icon: "🥊",
      content:
        "Road to the State Championship. Every training session takes me one step closer to the dream. 🥊",
      likes: 2400,
      comments: 183,
      appreciated: false,
    },
    {
      id: 2,
      type: "Team",
      name: "India Badminton Team",
      username: "@indiabadminton",
      sport: "🏸 Badminton",
      time: "5h",
      icon: "🇮🇳",
      content:
        "A proud moment for India. Our team brought home the Gold Medal. 🇮🇳🥇",
      likes: 12800,
      comments: 743,
      appreciated: false,
    },
    {
      id: 3,
      type: "Athlete",
      name: "Ananya Athletics",
      username: "@ananya_runs",
      sport: "🏃 Athletics",
      time: "1d",
      icon: "🏃",
      content:
        "Started with a dream. Training every day to turn that dream into reality.",
      likes: 5100,
      comments: 264,
      appreciated: false,
    },
  ]);

  const navigationItems = [
    "Home",
    "Discover",
    "Opportunities",
    "Coaches",
    "AI Journey",
    "Profile",
  ];

  const stories = [
    { name: "Rahul", icon: "🥊" },
    { name: "India Team", icon: "🏸" },
    { name: "Ananya", icon: "🏃" },
    { name: "Arjun", icon: "🥋" },
    { name: "Meera", icon: "🏊" },
    { name: "Vikram", icon: "⚽" },
    { name: "Priya", icon: "🏹" },
  ];

  // ================= AUTHENTICATION CHECK =================

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      async (currentUser) => {
        if (!currentUser) {
          setUser(null);
          setShowProfileSetup(false);
          setCheckingAuth(false);
          return;
        }

        setUser(currentUser);

        try {
          const profileRef = doc(
            db,
            "users",
            currentUser.uid
          );

          const profileSnapshot = await getDoc(profileRef);

          if (profileSnapshot.exists()) {
            setShowProfileSetup(false);
          } else {
            setShowProfileSetup(true);
          }
        } catch (error) {
          console.error(
            "Error checking profile:",
            error
          );

          setShowProfileSetup(true);
        }

        setCheckingAuth(false);
      }
    );

    return () => unsubscribe();
  }, []);

  // ================= APPRECIATE POST =================

  const handleAppreciate = (id) => {
    setPosts((currentPosts) =>
      currentPosts.map((post) => {
        if (post.id !== id) {
          return post;
        }

        return {
          ...post,
          appreciated: !post.appreciated,
          likes: post.appreciated
            ? post.likes - 1
            : post.likes + 1,
        };
      })
    );
  };

  // ================= CHECKING FIREBASE =================

  if (checkingAuth) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0f172a",
          color: "white",
          fontSize: "20px",
        }}
      >
        Loading SportsConnect...
      </div>
    );
  }

  // ================= NOT LOGGED IN =================

  if (!user) {
    return (
      <Login
        onLogin={() => {
          // Firebase automatically updates the auth state.
        }}
      />
    );
  }

  // ================= PROFILE NOT CREATED =================

  if (showProfileSetup) {
    return (
      <ProfileSetup
        onComplete={() => {
          setShowProfileSetup(false);
        }}
      />
    );
  }

  // ================= MAIN SPORTS CONNECT APP =================

  return (
    <div className="app">

      {/* ================= NAVIGATION ================= */}

      <nav className="navbar">

        <div
          className="logo"
          onClick={() => setActivePage("Home")}
        >
          <span className="logo-icon">🏆</span>
          <span>SportsConnect</span>
        </div>

        <div className="nav-links">

          {navigationItems.map((item) => (
            <button
              key={item}
              className={
                activePage === item
                  ? "active-nav"
                  : ""
              }
              onClick={() => setActivePage(item)}
            >
              {item}
            </button>
          ))}

        </div>

      </nav>

      {/* ================= HOME ================= */}

      {activePage === "Home" && (
        <main className="home-page">

          <section className="stories-section">

            <div className="section-heading">
              <h2>Sports Stories</h2>
              <span>View all</span>
            </div>

            <div className="stories">

              {stories.map((story) => (
                <div
                  className="story"
                  key={story.name}
                >
                  <div className="story-circle">
                    {story.icon}
                  </div>

                  <span>{story.name}</span>
                </div>
              ))}

            </div>

          </section>

          <div className="content-layout">

            <section className="feed-section">

              <div className="feed-title">

                <h1>For You</h1>

                <p>
                  Discover athletes, achievements and
                  sporting journeys.
                </p>

              </div>

              {posts.map((post) => (
                <article
                  className="post-card"
                  key={post.id}
                >

                  <div className="post-header">

                    <div className="profile-circle">
                      {post.icon}
                    </div>

                    <div className="post-user">

                      <h3>{post.name}</h3>

                      <p>
                        {post.username} · {post.time}
                      </p>

                      <span className="sport-tag">
                        {post.sport}
                      </span>

                    </div>

                    <button className="more-button">
                      ⋯
                    </button>

                  </div>

                  <div className="post-media">

                    <div className="media-content">

                      <div className="big-icon">
                        {post.type === "Team"
                          ? "🥇"
                          : post.icon}
                      </div>

                      <h2>
                        {post.type === "Team"
                          ? "GOLD MEDAL"
                          : "SPORTS JOURNEY"}
                      </h2>

                      <p>
                        {post.type === "Team"
                          ? "Representing India 🇮🇳"
                          : "Training • Passion • Dedication"}
                      </p>

                    </div>

                    <div className="play-button">
                      ▶
                    </div>

                  </div>

                  <div className="post-actions">

                    <button
                      className={
                        post.appreciated
                          ? "appreciated"
                          : ""
                      }
                      onClick={() =>
                        handleAppreciate(post.id)
                      }
                    >
                      {post.appreciated
                        ? "❤️ Appreciated"
                        : "♡ Appreciate"}
                    </button>

                    <button>
                      💬 {post.comments}
                    </button>

                    <button>
                      ↗ Share
                    </button>

                  </div>

                  <div className="post-likes">
                    {post.likes.toLocaleString()} people
                    appreciate this
                  </div>

                  <p className="post-content">
                    {post.content}
                  </p>

                  <button className="follow-button">
                    + Follow {post.name}
                  </button>

                </article>
              ))}

            </section>

            {/* ================= SIDEBAR ================= */}

            <aside className="sidebar">

              <div className="sidebar-card">

                <h3>🔥 Trending Athletes</h3>

                <div className="sidebar-item">

                  <div className="sidebar-avatar">
                    🥊
                  </div>

                  <div className="sidebar-info">
                    <strong>Rahul Boxing</strong>
                    <span>24.2K followers</span>
                  </div>

                  <button className="sidebar-follow">
                    Follow
                  </button>

                </div>

                <div className="sidebar-item">

                  <div className="sidebar-avatar">
                    🏃
                  </div>

                  <div className="sidebar-info">
                    <strong>Ananya Athletics</strong>
                    <span>18.7K followers</span>
                  </div>

                  <button className="sidebar-follow">
                    Follow
                  </button>

                </div>

                <div className="sidebar-item">

                  <div className="sidebar-avatar">
                    🥋
                  </div>

                  <div className="sidebar-info">
                    <strong>Arjun Karate</strong>
                    <span>12.4K followers</span>
                  </div>

                  <button className="sidebar-follow">
                    Follow
                  </button>

                </div>

              </div>

              <div className="sidebar-card">

                <h3>🏆 Trending Sports</h3>

                <div className="sidebar-item">

                  <div className="sidebar-avatar">
                    🥊
                  </div>

                  <div className="sidebar-info">
                    <strong>Boxing</strong>
                    <span>12.4K posts</span>
                  </div>

                </div>

                <div className="sidebar-item">

                  <div className="sidebar-avatar">
                    🏸
                  </div>

                  <div className="sidebar-info">
                    <strong>Badminton</strong>
                    <span>10.8K posts</span>
                  </div>

                </div>

                <div className="sidebar-item">

                  <div className="sidebar-avatar">
                    🏃
                  </div>

                  <div className="sidebar-info">
                    <strong>Athletics</strong>
                    <span>8.6K posts</span>
                  </div>

                </div>

              </div>

            </aside>

          </div>

        </main>
      )}

      {/* ================= DISCOVER ================= */}

      {activePage === "Discover" && (
        <Discover
          onHome={() => setActivePage("Home")}
        />
      )}

      {/* ================= OPPORTUNITIES ================= */}

      {activePage === "Opportunities" && (
        <Opportunities
          onHome={() => setActivePage("Home")}
        />
      )}

      {/* ================= COACHES ================= */}

      {activePage === "Coaches" && (
        <Coaches
          onHome={() => setActivePage("Home")}
        />
      )}

      {/* ================= AI JOURNEY ================= */}

      {activePage === "AI Journey" && (
        <AIJourney
          onHome={() => setActivePage("Home")}
        />
      )}

      {/* ================= PROFILE ================= */}

      {activePage === "Profile" && (
        <Profile
          onHome={() => setActivePage("Home")}
        />
      )}

    </div>
  );
}

export default App;