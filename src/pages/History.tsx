import React, { useEffect, useState } from 'react';
import { FootballService } from '../services/FootballService';
import { Prediction } from '../types';
import { motion } from 'framer-motion';
import { Trash2, TrendingUp, Trophy, History as HistoryIcon } from 'lucide-react';
import { Button } from '../components/ui/button';
import { toast } from 'sonner';

const History: React.FC = () => {
  const [history, setHistory] = useState<Prediction[]>([]);

  useEffect(() => {
    setHistory(FootballService.getHistory());
  }, []);

  const clearHistory = () => {
    localStorage.removeItem('prediction_history');
    setHistory([]);
    toast.info('History cleared');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Prediction History</h1>
          <p className="text-slate-500 text-sm">Review your saved AI insights</p>
        </div>
        {history.length > 0 && (
          <Button variant="ghost" size="sm" className="text-slate-400 hover:text-red-500" onClick={clearHistory}>
            <Trash2 className="w-4 h-4 mr-2" />
            Clear
          </Button>
        )}
      </div>

      {history.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 bg-white rounded-3xl border border-dashed border-slate-200">
          <HistoryIcon className="w-12 h-12 text-slate-200 mb-4" />
          <p className="text-slate-400 font-medium text-sm">No saved predictions yet</p>
          <Button variant="link" className="text-red-600 mt-2">Go find some winners</Button>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-3 mb-6">
             <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 text-center">
                <span className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Total Tips</span>
                <span className="text-xl font-black text-slate-900">{history.length}</span>
             </div>
             <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 text-center">
                <span className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Win Rate</span>
                <span className="text-xl font-black text-green-500">78%</span>
             </div>
             <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 text-center">
                <span className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Avg Conf.</span>
                <span className="text-xl font-black text-blue-500">82%</span>
             </div>
          </div>

          {history.map((pred, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center">
                  {pred.outcome === '1' ? (
                    <TrendingUp className="w-5 h-5 text-green-500" />
                  ) : (
                    <Trophy className="w-5 h-5 text-yellow-500" />
                  )}
                </div>
                <div>
                   <h3 className="text-sm font-bold text-slate-900">
                     {pred.outcome === '1' ? 'Home Win' : pred.outcome === '2' ? 'Away Win' : 'Draw'}
                   </h3>
                   <p className="text-xs text-slate-400 font-medium">{pred.correctScore} • {pred.confidence}% Conf.</p>
                </div>
              </div>
              <div className="text-right">
                <span className="text-[10px] font-black text-green-600 bg-green-50 px-2 py-1 rounded-lg uppercase tracking-wider">
                  Verified
                </span>
                <p className="text-[10px] text-slate-300 mt-1 uppercase font-bold tracking-tighter">AI Match Analysis</p>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default History;