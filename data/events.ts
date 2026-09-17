// Match-day / what's-on content — CMS-ready so screenings and
// events can be swapped without touching component code.

export type MatchEvent = {
  id: string;
  competition: string;
  fixture: string;
  date: string; // ISO date
  time: string; // 24h local
  note?: string;
};

export const upcomingMatches: MatchEvent[] = [
  { id: "m1", competition: "DStv Premiership", fixture: "Cape Town City vs Orlando Pirates", date: "2026-09-19", time: "15:30" },
  { id: "m2", competition: "URC", fixture: "Stormers vs Bulls", date: "2026-09-20", time: "17:00", note: "Big-screen doubleheader" },
  { id: "m3", competition: "Premier League", fixture: "Arsenal vs Man City", date: "2026-09-20", time: "18:30" },
  { id: "m4", competition: "Rugby Championship", fixture: "Springboks vs All Blacks", date: "2026-09-26", time: "17:10", note: "Book your table" },
];

export const announcements = [
  {
    id: "a1",
    title: "Sunday plates return every week",
    body: "Beef stew, pap and steamed bread, from midday until it's gone.",
  },
  {
    id: "a2",
    title: "Big screens for every derby",
    body: "Football and rugby, side by side, sound up for the main event.",
  },
];
