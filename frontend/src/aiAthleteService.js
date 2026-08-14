// Replace this local implementation with a server-side AI request when an approved API is available.
// No API key or athlete data is sent outside the browser in demo mode.
export async function analyzeAthleteProfile(input) {
  await new Promise((resolve) => setTimeout(resolve, 700));
  const achievementCount = input.achievements.split(/[,\n]/).filter(Boolean).length;
  const skillCount = input.skills.split(/[,\n]/).filter(Boolean).length;
  const score = Math.min(94, 48 + (input.experience === "Advanced" ? 18 : input.experience === "Intermediate" ? 11 : 5) + achievementCount * 5 + skillCount * 3 + (input.goals ? 5 : 0));
  const sport = input.sport || "your sport";
  return {
    source: "SportsConnect demo guidance",
    score,
    summary: `A focused ${input.experience.toLowerCase()} ${sport} athlete building a visible, credible sporting identity. Your profile is strongest when it connects your training, evidence of performance and next goal.`,
    strengths: [skillCount ? `Documented skills: ${input.skills.split(/[,\n]/).filter(Boolean).slice(0, 2).join(", ")}` : "Clear sport and training focus", achievementCount ? "Achievement evidence to build on" : "Opportunity to define measurable milestones"],
    opportunities: ["Local and state competitions", input.experience === "Advanced" ? "National trials and high-performance camps" : "Development camps and academy pathways", "Athlete scholarships and mentorships"],
    improvements: [input.achievements ? "Add dates and results to each achievement" : "Add your first result, ranking or competition milestone", input.skills ? "Show a short training clip that demonstrates a key skill" : "List 3–5 sport-specific skills", input.goals ? `Turn “${input.goals}” into a dated 90-day target` : "Add one specific training goal"],
  };
}
