export interface Team {
  id: string;
  name: string;
  logo?: string;
  shortName: string;
}

export interface MatchStats {
  possession: number;
  shotsOnTarget: number;
  injuries: number;
  recentForm: ('W' | 'D' | 'L')[];
}

export interface Match {
  id: string;
  homeTeam: Team;
  awayTeam: Team;
  date: string;
  league: string;
  venue: string;
  odds: {
    home: number;
    draw: number;
    away: number;
  };
  homeStats: MatchStats;
  awayStats: MatchStats;
}

export interface Prediction {
  matchId: string;
  outcome: '1' | 'X' | '2';
  confidence: number;
  btts: boolean;
  over25: boolean;
  correctScore: string;
  reasoning: string[];
  safeBet: string;
}

export interface BetHistory {
  id: string;
  match: Match;
  prediction: Prediction;
  timestamp: string;
  status: 'pending' | 'won' | 'lost';
}