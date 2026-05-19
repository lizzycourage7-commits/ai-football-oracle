import React from 'react';
import { motion } from 'framer-motion';
import { User, Bell, Shield, Wallet, Settings, LogOut, ChevronRight, Star, TrendingUp } from 'lucide-react';
import { Switch } from '../components/ui/switch';
import { Button } from '../components/ui/button';
import { toast } from 'sonner';

const Profile: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col items-center py-6">
        <div className="relative mb-4">
          <div className="w-24 h-24 bg-red-600 rounded-3xl flex items-center justify-center text-white text-3xl font-black shadow-xl shadow-red-600/20">
            JD
          </div>
          <div className="absolute -bottom-2 -right-2 bg-yellow-400 p-1.5 rounded-xl border-4 border-slate-50">
            <Star className="w-4 h-4 text-slate-900 fill-slate-900" />
          </div>
        </div>
        <h2 className="text-2xl font-bold">John Doe</h2>
        <p className="text-slate-500 text-sm">SportyAI Pro Member</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <section className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-4">
          <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
            <Settings className="w-4 h-4" />
            Preferences
          </h3>
          
          <div className="space-y-4">
            <ToggleOption 
              icon={<Bell className="w-5 h-5 text-blue-500" />} 
              label="Strong Tip Alerts" 
              desc="Notify me for 90%+ confidence" 
              defaultChecked 
            />
            <ToggleOption 
              icon={<Shield className="w-5 h-5 text-green-500" />} 
              label="Safe Bet Focus" 
              desc="Prioritize low-risk predictions" 
            />
            <ToggleOption 
              icon={<TrendingUp className="text-red-500 w-5 h-5" />} 
              label="Acca Suggestions" 
              desc="Daily multi-bet recommendations" 
              defaultChecked 
            />
          </div>
        </section>

        <section className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-2">
          <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2 mb-4">
            <User className="w-4 h-4" />
            Account Details
          </h3>
          
          <ActionItem icon={<Wallet className="text-slate-400" />} label="My Wallet" value="$42.50" />
          <ActionItem icon={<Shield className="text-slate-400" />} label="Security" />
          <ActionItem icon={<Star className="text-slate-400" />} label="Subscription" value="Pro" />
          
          <div className="pt-6">
            <Button 
              variant="ghost" 
              className="w-full text-red-500 hover:bg-red-50 hover:text-red-600 rounded-2xl justify-start h-12"
              onClick={() => toast.info('Log out clicked')}
            >
              <LogOut className="w-5 h-5 mr-3" />
              <span className="font-bold">Sign Out</span>
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
};

const ToggleOption = ({ icon, label, desc, defaultChecked }: any) => (
  <div className="flex items-center justify-between gap-4">
    <div className="flex gap-3">
      <div className="bg-slate-50 p-2.5 rounded-xl h-fit">{icon}</div>
      <div>
        <p className="text-sm font-bold text-slate-900">{label}</p>
        <p className="text-xs text-slate-400">{desc}</p>
      </div>
    </div>
    <Switch defaultChecked={defaultChecked} />
  </div>
);

const ActionItem = ({ icon, label, value }: any) => (
  <div className="flex items-center justify-between p-3 rounded-2xl hover:bg-slate-50 transition-colors cursor-pointer group">
    <div className="flex items-center gap-3">
      {icon}
      <span className="text-sm font-bold text-slate-700">{label}</span>
    </div>
    <div className="flex items-center gap-2">
      {value && <span className="text-xs font-bold text-slate-400">{value}</span>}
      <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-slate-500" />
    </div>
  </div>
);

export default Profile;