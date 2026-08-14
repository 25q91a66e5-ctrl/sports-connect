export const athletes = [
  { id: 1, name: "Aarav Mehta", username: "@aarav.sprints", sport: "Athletics", location: "Bengaluru", achievement: "National U20 finalist", initials: "AM", color: "violet" },
  { id: 2, name: "Kiara Nair", username: "@kiara_plays", sport: "Badminton", location: "Kochi", achievement: "2× State champion", initials: "KN", color: "orange" },
  { id: 3, name: "Vivan Shah", username: "@vivanshoots", sport: "Basketball", location: "Mumbai", achievement: "All-India school team", initials: "VS", color: "blue" },
  { id: 4, name: "Zoya Khan", username: "@zoya.strikes", sport: "Boxing", location: "Hyderabad", achievement: "District gold medalist", initials: "ZK", color: "pink" },
  { id: 5, name: "Arjun Rao", username: "@arjunontrack", sport: "Swimming", location: "Chennai", achievement: "100m freestyle record", initials: "AR", color: "teal" },
  { id: 6, name: "Mira Joshi", username: "@miragoesfast", sport: "Football", location: "Pune", achievement: "University captain", initials: "MJ", color: "green" },
];

export const coaches = [
  { id: 1, name: "Sana Iyer", sport: "Athletics", location: "Bengaluru", experience: "14 years", specialty: "Sprint mechanics & youth performance", initials: "SI", color: "violet" },
  { id: 2, name: "Rohan Kapoor", sport: "Basketball", location: "Mumbai", experience: "11 years", specialty: "Player development & team strategy", initials: "RK", color: "blue" },
  { id: 3, name: "Meera Thomas", sport: "Badminton", location: "Kochi", experience: "9 years", specialty: "Singles tactics & match fitness", initials: "MT", color: "orange" },
  { id: 4, name: "Kabir Ali", sport: "Boxing", location: "Hyderabad", experience: "16 years", specialty: "Competition preparation", initials: "KA", color: "pink" },
];

export const opportunities = [
  { id: 1, type: "Trials", title: "National Youth Athletics Trials", organization: "Athletics Federation of India", sport: "Athletics", location: "Bengaluru", date: "22 Sep 2026", deadline: "Apply by 05 Sep", description: "Selection trials for emerging U18 and U20 track athletes.", accent: "violet" },
  { id: 2, type: "Scholarship", title: "Rise & Play Athlete Scholarship", organization: "Play Forward Foundation", sport: "Multi-sport", location: "Pan India", date: "2026–27 season", deadline: "Apply by 18 Sep", description: "Funding, mentoring and equipment support for high-potential athletes.", accent: "orange" },
  { id: 3, type: "Championship", title: "Coastal Open Badminton Championship", organization: "Kerala Badminton Association", sport: "Badminton", location: "Kochi", date: "11 Oct 2026", deadline: "Register by 26 Sep", description: "Open singles and doubles championship for senior and junior players.", accent: "teal" },
  { id: 4, type: "Training camp", title: "Elite Goalkeeping Camp", organization: "Next Eleven Academy", sport: "Football", location: "Pune", date: "03–08 Oct 2026", deadline: "Apply by 20 Sep", description: "Six days of specialised goalkeeper training, analysis and match play.", accent: "blue" },
];

export const posts = [
  { id: 1, athlete: athletes[0], time: "2h", text: "Small improvements, every single session. Today’s block starts are feeling sharper than ever.", tag: "Training day", likes: 248, comments: 18, visual: "track" },
  { id: 2, athlete: athletes[3], time: "5h", text: "First sparring session after a long recovery. Grateful for the people who kept me focused on the comeback.", tag: "Boxing", likes: 519, comments: 42, visual: "boxing" },
  { id: 3, athlete: athletes[1], time: "1d", text: "Gold at the Kerala State Open. The work continues — national qualifiers next.", tag: "Achievement unlocked", likes: 892, comments: 63, visual: "medal" },
];
