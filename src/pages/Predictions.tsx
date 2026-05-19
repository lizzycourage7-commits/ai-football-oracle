import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FootballService } from '../services/FootballService';
import { Match } from '../types';
import { Input } from '../components/ui/input';
import { Search, Filter, Target } from 'lucide-react';
import { Button } from '../components/ui/button';
import { useNavigate } from 'react-router-dom';

const Predictions: React.FC = () => {
  const [matches, setMatches] = useState<Match[]>([]);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    setMatches(FootballService.getUpcomingMatches());
  }, []);

  const filtered = matches.filter(m => 
    m.homeTeam.name.toLowerCase().includes(search.toLowerCase()) ||
    m.awayTeam.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Daily Predictions</h1>
          <p className="text-slate-500 text-sm">AI analysis for all upcoming fixtures</p>
        </div>
        
        <div className="flex gap-2">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input 
              placeholder="Search teams..." 
              className="pl-10 rounded-xl border-slate-200 bg-white"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <Button variant="outline" size="icon" className="rounded-xl">
            <Filter className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        {filtered.map((match, idx) => {
          const prediction = FootballService.getPrediction(match);
          return (
            <motion.div
              key={match.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              onClick={() => navigate(`/match/${match.id}`, { state: { match, prediction } })}
              className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md cursor-pointer transition-all flex items-center justify-between group"
            >
              <div className="flex items-center gap-4 flex-1">
                <div className="flex flex-col items-center gap-1 w-20">
                    <div className="w-8 h-8 bg-slate-50 rounded-lg flex items-center justify-center text-[10px] font-bold text-slate-400">
                        {match.homeTeam.shortName}
                    </div>
                    <span className="text-[10px] font-black text-slate-400 text-center uppercase tracking-tighter">Home</span>
                </div>

                <div className="flex-1 flex flex-col items-center px-4">
                   <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-bold text-slate-900">{match.homeTeam.name}</span>
                        <span className="text-[10px] font-black text-red-600">VS</span>
                        <span className="text-xs font-bold text-slate-900">{match.awayTeam.name}</span>
                   </div>
                   <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold text-slate-400 px-2 py-0.5 bg-slate-50 rounded-full">{match.league}</span>
                        <span className="text-[10px] font-bold text-slate-400">{new Date(match.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                   </div>
                </div>

                <div className="flex flex-col items-center gap-1 w-20">
                    <div className="w-8 h-8 bg-slate-50 rounded-lg flex items-center justify-center text-[10px] font-bold text-slate-400">
                        {match.awayTeam.shortName}
                    </div>
                    <span className="text-[10px] font-black text-slate-400 text-center uppercase tracking-tighter">Away</span>
                </div>
              </div>

              <div className="ml-4 pl-4 border-l border-slate-100 flex flex-col items-end min-w-[100px]">
                <div className="flex items-center gap-1 mb-1">
                    <Target className="w-3 h-3 text-red-600" />
                    <span className="text-xs font-black text-slate-900 uppercase">
                        {prediction.outcome === '1' ? '1' : prediction.outcome === '2' ? '2' : 'X'}
                    </span>
                </div>
                <div className="flex items-center gap-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                    <span className="text-[10px] font-black text-green-600 uppercase tracking-tighter">{prediction.confidence}% CONF.</span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default Predictions;