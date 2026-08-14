import { useState } from "react";

export function Avatar({ person, size = "md" }) {
  return <div className={`avatar avatar-${size} ${person.color || "violet"}`}>{person.initials}</div>;
}

export function Button({ children, variant = "primary", className = "", ...props }) {
  return <button className={`button button-${variant} ${className}`} {...props}>{children}</button>;
}

export function EmptyState({ title, detail }) {
  return <div className="empty-state"><span>⌕</span><h3>{title}</h3><p>{detail}</p></div>;
}

export function AthleteCard({ athlete, onOpen }) {
  const [following, setFollowing] = useState(false);
  return <article className="person-card">
    <div className="person-card-top"><Avatar person={athlete} /><Button variant={following ? "soft" : "outline"} onClick={() => setFollowing(!following)}>{following ? "Following" : "Follow"}</Button></div>
    <button className="card-name" onClick={() => onOpen?.(athlete)}><h3>{athlete.name}</h3></button><p className="muted">{athlete.username}</p><span className="sport-pill">{athlete.sport}</span>
    <p className="person-meta">⌖ {athlete.location}</p><p className="achievement">✦ {athlete.achievement}</p>
  </article>;
}

export function CoachCard({ coach }) {
  const [connected, setConnected] = useState(false);
  return <article className="coach-card">
    <div className="person-card-top"><Avatar person={coach} /><span className="experience">{coach.experience}</span></div>
    <h3>{coach.name}</h3><span className="sport-pill">{coach.sport}</span><p className="coach-specialty">{coach.specialty}</p>
    <p className="person-meta">⌖ {coach.location} · ★ 4.9</p><Button variant={connected ? "soft" : "primary"} onClick={() => setConnected(!connected)}>{connected ? "Request sent" : "Connect"}</Button>
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
    <p className="post-text">{post.text}</p><div className={`post-visual visual-${post.visual}`}><span>{post.visual === "medal" ? "★" : post.visual === "boxing" ? "◆" : "↗"}</span><small>{post.tag}</small></div>
    <div className="post-actions"><button className={liked ? "liked" : ""} onClick={() => setLiked(!liked)}>{liked ? "♥" : "♡"} {post.likes + (liked ? 1 : 0)}</button><button>◌ {post.comments}</button><button>↗ Share</button><button className="follow-inline">+ Follow</button></div>
  </article>;
}
