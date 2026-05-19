import { Match, Prediction, Team } from '../types';

const TEAMS: Team[] = [
  { id: '1', name: 'Manchester City', shortName: 'MCI' },
  { id: '2', name: 'Real Madrid', shortName: 'RMA' },
  { id: '3', name: 'Liverpool', shortName: 'LIV' },
  { id: '4', name: 'Arsenal', shortName: 'ARS' },
  { id: '5', name: 'Bayern Munich', shortName: 'BAY' },
  { id: '6', name: 'Barcelona', shortName: 'BAR' },
  { id: '7', name: 'Paris Saint-Germain', shortName: 'PSG' },
  { id: '8', name: 'Chelsea', shortName: 'CHE' },
];

const LEAGUES = ['Premier League', 'Champions League', 'La Liga', 'Bundesliga'];

export const FootballService = {
  getUpcomingMatches: (): Match[] => {
    return Array.from({ length: 10 }).map((_, i) => {
      const homeTeam = TEAMS[Math.floor(Math.random() * TEAMS.length)];
      let awayTeam = TEAMS[Math.floor(Math.random() * TEAMS.length)];
      while (awayTeam.id === homeTeam.id) {
        awayTeam = TEAMS[Math.floor(Math.random() * TEAMS.length)];
      }

      return {
        id: `match-${i}`,
        homeTeam,
        awayTeam,
        date: new Date(Date.now() + i * 3600000 * 24).toISOString(),
        league: LEAGUES[Math.floor(Math.random() * LEAGUES.length)],
        venue: `${homeTeam.name} Stadium`,
        odds: {
          home: Number((1.2 + Math.random() * 2).toFixed(2)),
          draw: Number((3.0 + Math.random() * 2).toFixed(2)),
          away: Number((1.5 + Math.random() * 3).toFixed(2)),
        },
        homeStats: {
          possession: 55,
          shotsOnTarget: 6,
          injuries: Math.floor(Math.random() * 3),
          recentForm: ['W', 'W', 'D', 'L', 'W'] as any,
        },
        awayStats: {
          possession: 45,
          shotsOnTarget: 4,
          injuries: Math.floor(Math.random() * 3),
          recentForm: ['D', 'L', 'W', 'W', 'D'] as any,
        },
      };
    });
  },

  getPrediction: (match: Match): Prediction => {
    const homePower = 0.6 + Math.random() * 0.4;
    const awayPower = 0.4 + Math.random() * 0.4;
    
    let outcome: '1' | 'X' | '2' = '1';
    if (homePower > awayPower + 0.2) outcome = '1';
    else if (awayPower > homePower + 0.2) outcome = '2';
    else outcome = 'X';

    const confidence = Math.floor(65 + Math.random() * 30);
    const btts = Math.random() > 0.4;
    const over25 = Math.random() > 0.5;

    const reasons = [
      `${match.homeTeam.name} has scored in 90% of home games.`,
      `${match.awayTeam.name} is missing their key defender due to suspension.`,
      `Head-to-head stats favor the home side in the last 3 meetings.`,
      `Weather conditions are ideal for an open attacking game.`,
    ];

    return {
      matchId: match.id,
      outcome,
      confidence,
      btts,
      over25,
      correctScore: outcome === '1' ? '2-1' : outcome === '2' ? '0-1' : '1-1',
      reasoning: reasons.sort(() => 0.5 - Math.random()).slice(0, 3),
      safeBet: over25 ? 'Over 1.5 Goals' : 'Home Win or Draw',
    };
  },

  getHistory: (): Prediction[] => {
    const saved = localStorage.getItem('prediction_history');
    return saved ? JSON.parse(saved) : [];
  },

  savePrediction: (prediction: Prediction) => {
    const history = FootballService.getHistory();
    const updated = [prediction, ...history].slice(0, 50);
    localStorage.setItem('prediction_history', JSON.stringify(updated));
  }
};