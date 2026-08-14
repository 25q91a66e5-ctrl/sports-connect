import { useState } from "react";

const iconPaths = {
  home: ["M3 10.5 12 3l9 7.5", "M5.5 9.5V21h13V9.5", "M9 21v-6h6v6"],
  search: ["m21 21-4.35-4.35", "M19 11a8 8 0 1 1-16 0 8 8 0 0 1 16 0Z"],
  play: ["m9 7 8 5-8 5V7Z"],
  coach: ["M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z", "M4 21a8 8 0 0 1 16 0"],
  opportunities: ["M12 3v18M3 12h18", "M5 5h14v14H5z"],
  user: ["M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z", "M4 21a8 8 0 0 1 16 0"],
  bell: ["M18 9a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9", "M10 22h4"],
  heart: ["M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.9-8.6a5.5 5.5 0 0 0-.1-7.8Z"],
  comment: ["M20 11.5a8 8 0 0 1-8 8 9 9 0 0 1-4-.95L4 20l1.45-3.65A8 8 0 1 1 20 11.5Z"],
  share: ["M14 5h5v5", "M19 5 10 14", "M5 9v10h10"],
  menu: ["M4 7h16M4 12h16M4 17h16"],
  arrow: ["M5 12h14", "m13 6 6 6-6 6"],
  trend: ["M5 16 10 11l3 3 6-7", "M15 7h4v4"],
  medal: ["m8 3 4 8 4-8", "M7 13a5 5 0 1 0 10 0 5 5 0 0 0-10 0Z"],
  certificate: ["M5 3h14v18H5z", "M8 8h8M8 12h8M8 16h5"],
};

export function Icon({ name, size = 18, filled = false }) {
  const paths = iconPaths[name] || iconPaths.user;
  return <svg className={`ui-icon ${filled ? "ui-icon-filled" : ""}`} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths.map((d) => <path d={d} key={d} />)}</svg>;
}

export function Avatar({ person, size = "md" }) {
  return <div className={`avatar avatar-${size} ${person.color || "violet"}`}>{person.initials}</div>;
}

export function Button({ children, variant = "primary", className = "", ...props }) {
  return <button className={`button button-${variant} ${className}`} {...props}>{children}</button>;
}

export function EmptyState({ title, detail }) {
  return <div className="empty-state"><span><Icon name="search" size={28} /></span><h3>{title}</h3><p>{detail}</p></div>;
}

export function AthleteCard({ athlete, onOpen }) {
  const [following, setFollowing] = useState(false);
  return <article className="person-card">
    <div className="person-card-top"><Avatar person={athlete} /><Button variant={following ? "soft" : "outline"} onClick={() => setFollowing(!following)}>{following ? "Following" : "Follow"}</Button></div>
    <button className="card-name" onClick={() => onOpen?.(athlete)}><h3>{athlete.name}</h3></button><p className="muted">{athlete.username}</p><span className="sport-pill">{athlete.sport}</span>
    <p className="person-meta">{athlete.location}</p><p className="achievement">{athlete.achievement}</p>
  </article>;
}

export function CoachCard({ coach }) {
  const [connected, setConnected] = useState(false);
  return <article className="coach-card">
    <div className="person-card-top"><Avatar person={coach} /><span className="experience">{coach.experience}</span></div>
    <h3>{coach.name}</h3><span className="sport-pill">{coach.sport}</span><p className="coach-specialty">{coach.specialty}</p>
    <p className="person-meta">{coach.location} · 4.9 rating</p><Button variant={connected ? "soft" : "primary"} onClick={() => setConnected(!connected)}>{connected ? "Request sent" : "Connect"}</Button>
  </article>;
}

export function OpportunityCard({ item }) {
  const [applied, setApplied] = useState(false);
  return <article className={`opportunity-card accent-${item.accent}`}>
    <div className="opportunity-top"><span className="type-label">{item.type}</span><span>{item.deadline}</span></div><h3>{item.title}</h3><p className="organization">{item.organization}</p>
    <p className="opportunity-description">{item.description}</p><div className="opportunity-details"><span>{item.sport}</span><span>⌖ {item.location}</span><span>◷ {item.date}</span></div>
    <Button variant={applied ? "soft" : "primary"} onClick={() => setApplied(!applied)}>{applied ? "Application started" : "Apply now"}</Button>
  </article>;
}

export function PostCard({ post }) {
  const [liked, setLiked] = useState(false);
  return <article className="post-card"><div className="post-head"><Avatar person={post.athlete} /><div><strong>{post.athlete.name}</strong><p>{post.athlete.sport} · {post.time}</p></div><button className="icon-button" aria-label="More options">•••</button></div>
    <p className="post-text">{post.text}</p><div className={`post-visual visual-${post.visual}`}><span><Icon name={post.visual === "medal" ? "medal" : post.visual === "boxing" ? "coach" : "trend"} size={52} /></span><small>{post.tag}</small></div>
    <div className="post-actions"><button className={liked ? "liked" : ""} onClick={() => setLiked(!liked)}><Icon name="heart" filled={liked} /> {post.likes + (liked ? 1 : 0)}</button><button><Icon name="comment" /> {post.comments}</button><button><Icon name="share" /> Share</button><button className="follow-inline">+ Follow</button></div>
  </article>;
}
