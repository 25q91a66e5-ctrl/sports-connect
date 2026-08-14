import { useEffect, useMemo, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import "./app.css";
import { athletes, coaches, opportunities, posts } from "./data";
import { AthleteCard, Avatar, Button, CoachCard, EmptyState, Icon, OpportunityCard, PostCard } from "./components";
import { auth, db, isFirebaseConfigured } from "./firebase";
import Login from "./login";
import ProfileSetup from "./ProfileSetup";
import AthleteAnalyzer from "./AthleteAnalyzer";

const navItems = [["Home", "home"], ["Discover", "search"], ["Reels", "play"], ["Coaches", "coach"], ["Opportunities", "opportunities"], ["Profile", "user"]];
const sports = ["All", "Athletics", "Badminton", "Basketball", "Boxing", "Football", "Swimming"];
const locations = ["All locations", "Bengaluru", "Mumbai", "Kochi", "Hyderabad", "Chennai", "Pune"];
const demoProfile = { name: "Ram Sharma", username: "ram.moves", sport: "Athletics", location: "Bengaluru", bio: "Sprint athlete building towards my first state podium. Always learning, always moving.", initials: "RS", color: "green", profileComplete: true };

function App() {
  const [page, setPage] = useState("Home");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(isFirebaseConfigured ? null : demoProfile);
  const [loading, setLoading] = useState(isFirebaseConfigured);
  const [selectedAthlete, setSelectedAthlete] = useState(null);
  useEffect(() => {
    if (!isFirebaseConfigured) return undefined;
    return onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (!currentUser) { setProfile(null); setLoading(false); return; }
      try {
        const snapshot = await getDoc(doc(db, "users", currentUser.uid));
        setProfile(snapshot.exists() ? snapshot.data() : null);
      } catch { setProfile(null); }
      setLoading(false);
    });
  }, []);
  const navigate = (next) => { setPage(next); setMobileOpen(false); window.scrollTo({ top: 0, behavior: "smooth" }); };
  const me = { ...demoProfile, ...profile, initials: (profile?.name || user?.email || "RS").split(" ").map((part) => part[0]).join("").slice(0, 2).toUpperCase() };
  const logout = async () => { if (auth) await signOut(auth); };
  if (loading) return <div className="auth-loading">Loading SportsConnect…</div>;
  if (isFirebaseConfigured && !user) return <Login />;
  if (isFirebaseConfigured && !profile?.profileComplete) return <ProfileSetup user={user} onComplete={(nextProfile) => setProfile(nextProfile)} />;
  return <div className="app-shell">
    <header className="topbar"><button className="brand" onClick={() => navigate("Home")}><span className="brand-mark">S</span><span>Sports<span>Connect</span></span></button>
      <label className="global-search"><Icon name="search" size={16} /><input placeholder="Search athletes, sports, opportunities" /></label>
      <div className="top-actions"><button className="notification" aria-label="Notifications"><Icon name="bell" size={20} /><i /></button><button className="avatar-button" onClick={() => navigate("Profile")}><Avatar person={me} size="sm" /></button><button className="menu-button" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Open navigation"><Icon name="menu" size={22} /></button></div>
    </header>
    <aside className={`side-nav ${mobileOpen ? "mobile-open" : ""}`}>{navItems.map(([name, icon]) => <button key={name} className={page === name ? "nav-active" : ""} onClick={() => navigate(name)}><span><Icon name={icon} /></span>{name}</button>)}<div className="nav-foot"><p>YOUR SPORTING JOURNEY</p><strong>Built to be seen.</strong>{isFirebaseConfigured && <button className="logout-button" onClick={logout}>Log out</button>}</div></aside>
    <main className="main-content">{page === "Home" && <Home onNavigate={navigate} me={me} />}{page === "Discover" && <Discover onOpenAthlete={(athlete) => { setSelectedAthlete(athlete); navigate("Profile"); }} />}{page === "Reels" && <Reels />}{page === "Coaches" && <Coaches />}{page === "Opportunities" && <Opportunities />}{page === "Profile" && <Profile profile={selectedAthlete || me} isOwnProfile={!selectedAthlete} onBack={() => { setSelectedAthlete(null); navigate("Discover"); }} />}</main>
  </div>;
}

function Home({ onNavigate, me }) { const [postText, setPostText] = useState(""); return <>
  <section className="hero"><div><p className="eyebrow">WELCOME BACK, {me.name.split(" ")[0].toUpperCase()}</p><h1>Your next <em>breakthrough</em><br />starts here.</h1><p>Share your journey, find your people and uncover the opportunities that move you forward.</p><Button onClick={() => document.getElementById("create-post")?.focus()}>Share an update <span>→</span></Button></div><div className="hero-stat"><strong>12</strong><span>days to your<br />next milestone</span><div className="progress"><i /></div><small>State qualifier · 28 August</small></div></section>
  <div className="content-grid"><section><div className="section-title"><div><p className="eyebrow">YOUR FEED</p><h2>From the community</h2></div><button className="text-button">Following ▾</button></div>
    <div className="create-post"><Avatar person={me}/><input id="create-post" value={postText} onChange={(e) => setPostText(e.target.value)} placeholder="Share a training update, achievement or goal…"/><Button variant="soft" disabled={!postText}>Post</Button></div>{posts.map((post) => <PostCard key={post.id} post={post} />)}</section>
    <aside className="right-rail"><div className="rail-card"><div className="section-title compact"><h3>Trending sports</h3><button className="text-button" onClick={() => onNavigate("Discover")}>Explore</button></div>{[["Athletics", "12.8k athletes", "↗"], ["Badminton", "9.4k athletes", "◉"], ["Football", "7.9k athletes", "◆"]].map(([name, count, icon]) => <div className="trend" key={name}><b>{icon}</b><div><strong>{name}</strong><p>{count}</p></div><span>↗</span></div>)}</div>
      <div className="rail-card"><div className="section-title compact"><h3>Suggested athletes</h3><button className="text-button" onClick={() => onNavigate("Discover")}>See all</button></div>{athletes.slice(3).map((person) => <div className="suggestion" key={person.id}><Avatar person={person} size="sm"/><div><strong>{person.name}</strong><p>{person.sport}</p></div><button>+</button></div>)}</div></aside></div>
  </> }

function FilterBar({ query, setQuery, sport, setSport, location, setLocation, placeholder }) { return <div className="filter-bar"><label className="search-field">⌕<input value={query} onChange={(e) => setQuery(e.target.value)} placeholder={placeholder}/></label><select value={sport} onChange={(e) => setSport(e.target.value)}>{sports.map((s) => <option key={s}>{s}</option>)}</select>{location !== undefined && <select value={location} onChange={(e) => setLocation(e.target.value)}>{locations.map((l) => <option key={l}>{l}</option>)}</select>}</div> }
function Discover({ onOpenAthlete }) { const [query, setQuery] = useState(""); const [sport, setSport] = useState("All"); const [location, setLocation] = useState("All locations"); const results = useMemo(() => athletes.filter((a) => (sport === "All" || a.sport === sport) && (location === "All locations" || a.location === location) && `${a.name} ${a.sport} ${a.location}`.toLowerCase().includes(query.toLowerCase())), [query, sport, location]); return <PageHeader eyebrow="FIND YOUR COMMUNITY" title="Discover athletes" description="Explore ambitious athletes, their stories and the sports they love."><FilterBar query={query} setQuery={setQuery} sport={sport} setSport={setSport} location={location} setLocation={setLocation} placeholder="Search by athlete, sport or location"/><p className="results-label">{results.length} athletes found</p><div className="people-grid">{results.length ? results.map((a) => <AthleteCard key={a.id} athlete={a} onOpen={onOpenAthlete}/>) : <EmptyState title="No athletes found" detail="Try a different sport, location or search."/>}</div></PageHeader> }
function Reels() { const [liked, setLiked] = useState({}); return <PageHeader eyebrow="WATCH · LEARN · GET INSPIRED" title="Sports in motion" description="A quick look at the effort behind every performance."><div className="reels-grid">{posts.map((post, i) => <article className={`reel reel-${i}`} key={post.id}><div className="reel-gradient"/><div className="reel-play">▷</div><div className="reel-copy"><div className="reel-person"><Avatar person={post.athlete} size="sm"/><strong>{post.athlete.name}</strong><Button variant="outline">Follow</Button></div><p>{post.text}</p><span>#{post.athlete.sport.toLowerCase()} #sportsconnect</span></div><div className="reel-actions"><button className={liked[post.id] ? "liked" : ""} onClick={() => setLiked({...liked, [post.id]: !liked[post.id]})}>{liked[post.id] ? "♥" : "♡"}<small>{post.likes + (liked[post.id] ? 1 : 0)}</small></button><button>◌<small>{post.comments}</small></button><button>↗<small>Share</small></button></div></article>)}</div></PageHeader> }
function Coaches() { const [query, setQuery] = useState(""); const [sport, setSport] = useState("All"); const result = coaches.filter((c) => (sport === "All" || c.sport === sport) && `${c.name} ${c.sport} ${c.location}`.toLowerCase().includes(query.toLowerCase())); return <PageHeader eyebrow="FIND THE RIGHT GUIDANCE" title="Meet your next coach" description="Connect with proven mentors who understand your sport and your ambition."><FilterBar query={query} setQuery={setQuery} sport={sport} setSport={setSport} placeholder="Search coaches or specialisations"/><div className="coach-grid">{result.map((coach) => <CoachCard key={coach.id} coach={coach}/>)}</div></PageHeader> }
function Opportunities() { const [query, setQuery] = useState(""); const [sport, setSport] = useState("All"); const result = opportunities.filter((item) => (sport === "All" || item.sport === sport) && `${item.title} ${item.sport} ${item.location}`.toLowerCase().includes(query.toLowerCase())); return <PageHeader eyebrow="MAKE YOUR MOVE" title="Opportunities built for you" description="Trials, scholarships and camps to turn talent into your next chapter."><FilterBar query={query} setQuery={setQuery} sport={sport} setSport={setSport} placeholder="Search trials, camps and scholarships"/><div className="opportunity-grid">{result.length ? result.map((item) => <OpportunityCard key={item.id} item={item}/>) : <EmptyState title="No opportunities found" detail="Try a different sport or search term."/>}</div></PageHeader> }
function Profile({ profile, isOwnProfile, onBack }) { const achievements = profile.achievements?.length ? profile.achievements : [["★", "State 400m finalist", "2026"], ["◈", "Inter-college gold", "2025"], ["✦", "Personal best: 48.92s", "400m"]]; return <>{!isOwnProfile && <button className="text-button profile-back-button" onClick={onBack}>Back to discover</button>}<section className="profile-hero"><div className="cover-pattern"/><div className="profile-main"><Avatar person={profile} size="xl"/><div><p className="eyebrow">ATHLETE PROFILE</p><h1>{profile.name}</h1><p className="muted">@{profile.username} · {profile.sport} · {profile.location}</p><p className="profile-bio">{profile.bio || "Building a sporting journey worth sharing."}</p></div>{isOwnProfile ? <Button variant="outline">Edit profile</Button> : <Button variant="outline">Follow</Button>}</div><div className="profile-stats">{[["1.8k", "Followers"], ["326", "Following"], [String(profile.achievements?.length || 14), "Achievements"], ["28", "Posts"]].map(([n, l]) => <div key={l}><strong>{n}</strong><span>{l}</span></div>)}</div></section>{isOwnProfile && <AthleteAnalyzer profile={profile}/>}<div className="profile-layout"><section><SectionTitle label="SPORTING HIGHLIGHTS" title="Achievements & medals"/><div className="highlights">{achievements.map((item, index) => { const [i, title, year] = Array.isArray(item) ? item : ["✦", item.title, item.year]; return <article key={`${title}-${index}`}><b>{i}</b><div><strong>{title}</strong><p>{year}</p></div></article>; })}</div><SectionTitle label="RECENT ACTIVITY" title="Posts & reels"/><div className="profile-posts">{posts.map((p) => <PostCard key={p.id} post={p}/>)}</div></section><aside><div className="rail-card certificates"><h3>Certificates</h3>{["State Athletics Association", "Sports Science Foundation"].map((c) => <div key={c}><b>▧</b><span><strong>{c}</strong><small>Verified credential</small></span><button>View</button></div>)}</div></aside></div></> }
function PageHeader({ eyebrow, title, description, children }) { return <section className="page"><header className="page-header"><p className="eyebrow">{eyebrow}</p><h1>{title}</h1><p>{description}</p></header>{children}</section> }
function SectionTitle({ label, title }) { return <div className="section-title"><div><p className="eyebrow">{label}</p><h2>{title}</h2></div></div> }
export default App;


