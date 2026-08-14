import { useState } from "react";
import { analyzeAthleteProfile } from "./aiAthleteService";
import { Button } from "./components";

function AthleteAnalyzer({ profile }) {
  const [form, setForm] = useState({ sport: profile.sport || "", experience: "Intermediate", achievements: Array.isArray(profile.achievements) ? profile.achievements.map((item) => item.title || item).join(", ") : "", skills: "Speed, consistency, match fitness", goals: "" });
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const change = (key) => (event) => setForm({ ...form, [key]: event.target.value });
  const analyze = async (event) => { event.preventDefault(); setLoading(true); setError(""); try { setResult(await analyzeAthleteProfile(form)); } catch { setError("Your profile could not be analyzed right now. Please try again."); } finally { setLoading(false); } };
  return <section className="analyzer-card"><div className="analyzer-header"><div><p className="eyebrow">AI ATHLETE ANALYZER</p><h2>Make your profile work harder</h2><p>Get practical profile guidance based on the information you share.</p></div><span className="ai-badge">AI</span></div>
    <form className="analyzer-form" onSubmit={analyze}><label>Sport<input value={form.sport} onChange={change("sport")} required /></label><label>Experience<select value={form.experience} onChange={change("experience")}><option>Beginner</option><option>Intermediate</option><option>Advanced</option></select></label><label>Achievements<textarea value={form.achievements} onChange={change("achievements")} placeholder="State finalist, school captain…" rows="2" /></label><label>Skills<textarea value={form.skills} onChange={change("skills")} placeholder="Speed, agility, endurance…" rows="2" /></label><label className="wide">Training goals<input value={form.goals} onChange={change("goals")} placeholder="Your next milestone" /></label><div className="wide"><Button type="submit" disabled={loading}>{loading ? "Analyzing profile…" : "Analyze profile"}</Button><small className="demo-note">Demo guidance — no external AI service is connected.</small></div></form>
    {error && <p className="analyzer-error" role="alert">{error}</p>}{result && <div className="analyzer-result"><div className="score"><strong>{result.score}</strong><span>Profile score</span></div><div><p className="demo-note">{result.source}</p><h3>Professional summary</h3><p>{result.summary}</p></div><div className="analysis-grid"><AnalysisList title="Key strengths" items={result.strengths}/><AnalysisList title="Suggested opportunities" items={result.opportunities}/><AnalysisList title="Improve next" items={result.improvements}/></div></div>}
  </section>;
}
function AnalysisList({ title, items }) { return <div><h3>{title}</h3><ul>{items.map((item) => <li key={item}>{item}</li>)}</ul></div>; }
export default AthleteAnalyzer;
