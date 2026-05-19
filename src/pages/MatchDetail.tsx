import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, BrainCircuit, ShieldCheck, TrendingUp, Info, Save, Share2 } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Progress } from '../components/ui/progress';
import { FootballService } from '../services/FootballService';
import { toast } from 'sonner';

const MatchDetail: React.FC = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state || !state.match) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh]">
        <h2 className="text-xl font-bold mb-4">Match not found</h2>
        <Button onClick={() => navigate('/')}>Go Back Home</Button>
      </div>
    );
  }

  const { match, prediction } = state;

  const handleSave = () => {
    FootballService.savePrediction(prediction);
    toast.success('Prediction saved to history!');
  };

  return (
    <div className="space-y-6 pb-10">
      <Button 
        variant="ghost" 
        size="sm" 
        className="text-slate-500 mb-2 hover:bg-slate-100 rounded-xl"
        onClick={() => navigate(-1)}
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Predictions
      </Button>

      {/* Match Header */}
      <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
        <div className="text-center mb-6">
          <Badge className="bg-slate-100 text-slate-600 border-none mb-2 px-3">{match.league}</Badge>
          <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">
            {new Date(match.date).toLocaleDateString('en-GB', { dateStyle: 'full' })}
          </p>
        </div>

        <div className="flex items-center justify-between gap-4">
          <div className="flex-1 flex flex-col items-center">
            <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center text-2xl font-black text-slate-300 mb-3 shadow-inner">
              {match.homeTeam.shortName}
            </div>
            <h3 className="text-sm font-bold text-center leading-tight">{match.homeTeam.name}</h3>
            <p className="text-[10px] text-slate-400 font-bold mt-1 uppercase">Home</p>
          </div>

          <div className="flex flex-col items-center px-4 md:px-10">
            <div className="bg-red-50 text-red-600 text-xs font-black px-4 py-1.5 rounded-full mb-2">VS</div>
            <div className="text-lg font-black text-slate-400">20:00</div>
          </div>

          <div className="flex-1 flex flex-col items-center">
            <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center text-2xl font-black text-slate-300 mb-3 shadow-inner">
              {match.awayTeam.shortName}
            </div>
            <h3 className="text-sm font-bold text-center leading-tight">{match.awayTeam.name}</h3>
            <p className="text-[10px] text-slate-400 font-bold mt-1 uppercase">Away</p>
          </div>
        </div>
      </div>

      {/* AI Analysis Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Main Prediction */}
        <Card className="border-none shadow-sm rounded-3xl overflow-hidden bg-slate-900 text-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-bold flex items-center gap-2 text-red-500 uppercase tracking-wider">
              <BrainCircuit className="w-4 h-4" />
              AI Master Prediction
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="flex items-end justify-between mb-4">
              <div>
                <span className="text-3xl font-black">
                  {prediction.outcome === '1' ? 'Home Win' : prediction.outcome === '2' ? 'Away Win' : 'Draw'}
                </span>
                <p className="text-slate-400 text-xs mt-1">Recommended Betting Tip</p>
              </div>
              <div className="text-right">
                <span className="text-2xl font-black text-green-500">{prediction.confidence}%</span>
                <p className="text-slate-400 text-[10px] uppercase font-bold tracking-tighter">Confidence Score</p>
              </div>
            </div>
            
            <div className="space-y-4 pt-4 border-t border-slate-800">
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-slate-800/50 p-3 rounded-2xl">
                  <span className="text-[10px] text-slate-400 uppercase font-bold">Both Teams Score</span>
                  <div className="font-bold">{prediction.btts ? 'YES' : 'NO'}</div>
                </div>
                <div className="bg-slate-800/50 p-3 rounded-2xl">
                  <span className="text-[10px] text-slate-400 uppercase font-bold">Over 2.5 Goals</span>
                  <div className="font-bold">{prediction.over25 ? 'YES' : 'NO'}</div>
                </div>
              </div>
              <div className="bg-green-600/10 border border-green-600/20 p-4 rounded-2xl flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-green-500 uppercase font-bold">Safe Option</span>
                  <div className="text-sm font-bold text-green-400">{prediction.safeBet}</div>
                </div>
                <ShieldCheck className="w-8 h-8 text-green-500/50" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Probabilities */}
        <Card className="border-none shadow-sm rounded-3xl bg-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-bold flex items-center gap-2 text-slate-900 uppercase tracking-wider">
              <TrendingUp className="w-4 h-4 text-red-600" />
              Outcome Probabilities
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <ProbBar label="Home Win (1)" percent={prediction.outcome === '1' ? prediction.confidence : 100 - prediction.confidence - 10} />
            <ProbBar label="Draw (X)" percent={10} />
            <ProbBar label="Away Win (2)" percent={prediction.outcome === '2' ? prediction.confidence : 100 - prediction.confidence - 10} />
            
            <div className="pt-2">
              <div className="flex items-center gap-2 bg-slate-50 p-3 rounded-xl">
                <Info className="w-4 h-4 text-slate-400" />
                <p className="text-[11px] text-slate-500 leading-tight">
                  Probabilities are calculated based on head-to-head records, current form, and injury reports.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* AI Reasoning */}
      <Card className="border-none shadow-sm rounded-3xl bg-white">
        <CardHeader>
          <CardTitle className="text-sm font-bold uppercase tracking-wider">Why we picked this?</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            {prediction.reasoning.map((reason: string, i: number) => (
              <li key={i} className="flex gap-3 text-sm text-slate-600">
                <div className="mt-1 w-1.5 h-1.5 rounded-full bg-red-600 shrink-0" />
                {reason}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex gap-3 sticky bottom-20 md:static">
        <Button 
          className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold h-14 rounded-2xl shadow-lg shadow-red-600/20"
          onClick={handleSave}
        >
          <Save className="w-5 h-5 mr-2" />
          Save Tip
        </Button>
        <Button 
          variant="outline" 
          className="bg-white border-slate-200 text-slate-700 font-bold h-14 w-14 rounded-2xl p-0"
          onClick={() => {
            navigator.clipboard.writeText(`AI Tip: ${match.homeTeam.name} vs ${match.awayTeam.name} - ${prediction.outcome === '1' ? 'Home Win' : 'Away Win'} (${prediction.confidence}%)`);
            toast.info('Tip copied to clipboard!');
          }}
        >
          <Share2 className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
};

const ProbBar = ({ label, percent }: { label: string, percent: number }) => (
  <div className="space-y-1.5">
    <div className="flex justify-between text-xs font-bold uppercase">
      <span className="text-slate-500">{label}</span>
      <span className="text-slate-900">{percent}%</span>
    </div>
    <Progress value={percent} className="h-2 bg-slate-100" />
  </div>
);

export default MatchDetail;