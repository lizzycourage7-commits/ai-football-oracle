import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FootballService } from '../services/FootballService';
import { Match } from '../types';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { TrendingUp, Award, Zap, ChevronRight, Target } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const [matches, setMatches] = useState<Match[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    setMatches(FootballService.getUpcomingMatches().slice(0, 4));
  }, []);

  return (
    <div className="space-y-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-3xl bg-slate-900 p-8 text-white min-h-[220px] flex flex-col justify-center"
      >
        <div className="relative z-10 max-w-md">
          <Badge className="bg-red-600 hover:bg-red-700 text-white border-none mb-4 px-3 py-1">
            AI POWERED
          </Badge>
          <h1 className="text-3xl md:text-4xl font-black mb-2">92% ACCURACY</h1>
          <p className="text-slate-300 text-sm md:text-base mb-6">
            Get the most accurate football predictions powered by advanced machine learning models.
          </p>
          <Button 
            onClick={() => navigate('/predictions')}
            className="bg-red-600 hover:bg-red-700 text-white font-bold px-6 py-6 rounded-2xl text-lg shadow-xl shadow-red-600/30 w-full md:w-auto"
          >
            VIEW TODAY'S PICKS
          </Button>
        </div>
        <div className="absolute top-0 right-0 w-1/2 h-full hidden md:block opacity-40">
           <img 
            src="https://storage.googleapis.com/dala-prod-public-storage/generated-images/192a2212-4e2d-4922-a7b2-2ee288e3c16b/ai-assistant-mascot-f4b1e54c-1779153110752.webp" 
            alt="AI Bot" 
            className="w-full h-full object-cover"
           />
        </div>
      </motion.div>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatsCard 
          icon={<TrendingUp className="text-green-500" />} 
          label="Best Tip" 
          value="Over 2.5 Goals" 
          sub="88% Confidence"
        />
        <StatsCard 
          icon={<Award className="text-yellow-500" />} 
          label="Top League" 
          value="Premier League" 
          sub="94% Success Rate"
        />
        <StatsCard 
          icon={<Zap className="text-blue-500" />} 
          label="Risk Level" 
          value="Low" 
          sub="Safe Accumulator"
        />
      </section>

      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <Target className="w-5 h-5 text-red-600" />
            Top AI Picks
          </h2>
          <Button variant="link" className="text-red-600 font-semibold p-0" onClick={() => navigate('/predictions')}>
            View all
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {matches.map((match, idx) => (
            <PredictionSummaryCard key={match.id} match={match} index={idx} />
          ))}
        </div>
      </div>
    </div>
  );
};

const StatsCard = ({ icon, label, value, sub }: any) => (
  <Card className="border-none shadow-sm hover:shadow-md transition-shadow rounded-2xl overflow-hidden">
    <CardContent className="p-5">
      <div className="flex items-center gap-3 mb-3">
        <div className="bg-slate-100 p-2 rounded-lg">{icon}</div>
        <span className="text-slate-500 text-sm font-medium">{label}</span>
      </div>
      <div className="text-lg font-bold text-slate-900">{value}</div>
      <div className="text-xs text-slate-400 font-medium">{sub}</div>
    </CardContent>
  </Card>
);

const PredictionSummaryCard = ({ match, index }: { match: Match, index: number }) => {
  const navigate = useNavigate();
  const prediction = FootballService.getPrediction(match);
  
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
      onClick={() => navigate(`/match/${match.id}`, { state: { match, prediction } })}
      className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md cursor-pointer transition-all group"
    >
      <div className="flex items-center justify-between mb-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
        <span>{match.league}</span>
        <span>{new Date(match.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
      </div>
      
      <div className="flex items-center justify-between gap-4 mb-4">
        <div className="flex-1 flex flex-col items-center">
          <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center mb-1 font-black text-slate-400">
            {match.homeTeam.shortName}
          </div>
          <span className="text-xs font-bold text-center leading-tight truncate w-full">{match.homeTeam.name}</span>
        </div>
        
        <div className="flex flex-col items-center px-4 border-x border-slate-100">
          <span className="text-xs font-black text-red-600 mb-0.5">VS</span>
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">MAY 24</span>
        </div>

        <div className="flex-1 flex flex-col items-center">
          <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center mb-1 font-black text-slate-400">
            {match.awayTeam.shortName}
          </div>
          <span className="text-xs font-bold text-center leading-tight truncate w-full">{match.awayTeam.name}</span>
        </div>
      </div>

      <div className="bg-slate-50 rounded-xl p-3 flex items-center justify-between group-hover:bg-red-50 transition-colors">
        <div className="flex flex-col">
          <span className="text-[10px] font-bold text-slate-400 uppercase">AI Pick</span>
          <span className="text-sm font-black text-slate-900">
            {prediction.outcome === '1' ? 'Home Win' : prediction.outcome === '2' ? 'Away Win' : 'Draw'}
          </span>
        </div>
        <div className="flex flex-col items-end">
          <span className="text-[10px] font-bold text-slate-400 uppercase">Confidence</span>
          <span className="text-sm font-black text-green-600">{prediction.confidence}%</span>
        </div>
        <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-red-500 transition-colors" />
      </div>
    </motion.div>
  );
};

export default Dashboard;