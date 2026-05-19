import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { LayoutDashboard, Target, History, User, Bell } from 'lucide-react';
import { Button } from './ui/button';
import { Toaster } from './ui/sonner';

const Layout: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-20 md:pb-0 md:pl-64">
      {/* Mobile Header */}
      <header className="md:hidden sticky top-0 z-40 bg-red-600 text-white px-4 py-3 flex items-center justify-between shadow-md">
        <div className="flex items-center gap-2">
          <div className="bg-white p-1 rounded-lg">
            <Target className="w-6 h-6 text-red-600" />
          </div>
          <span className="font-bold text-xl tracking-tight">SportyAI</span>
        </div>
        <Button variant="ghost" size="icon" className="text-white hover:bg-red-700">
          <Bell className="w-6 h-6" />
        </Button>
      </header>

      {/* Sidebar Navigation (Desktop) */}
      <aside className="hidden md:flex flex-col fixed left-0 top-0 bottom-0 w-64 bg-slate-900 text-white p-6">
        <div className="flex items-center gap-3 mb-10">
          <div className="bg-red-600 p-2 rounded-xl shadow-lg shadow-red-600/20">
            <Target className="w-8 h-8 text-white" />
          </div>
          <span className="font-bold text-2xl">SportyAI</span>
        </div>

        <nav className="flex-1 space-y-2">
          <MenuLink to="/" icon={<LayoutDashboard size={20} />} label="Dashboard" />
          <MenuLink to="/predictions" icon={<Target size={20} />} label="AI Predictions" />
          <MenuLink to="/history" icon={<History size={20} />} label="My History" />
          <MenuLink to="/profile" icon={<User size={20} />} label="Profile" />
        </nav>

        <div className="mt-auto bg-slate-800 p-4 rounded-xl border border-slate-700">
          <p className="text-xs text-slate-400 mb-1 uppercase font-semibold">AI Status</p>
          <div className="flex items-center gap-2 text-green-400">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-sm font-medium">Predicting Live</span>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="p-4 md:p-8 max-w-5xl mx-auto">
        <Outlet />
      </main>

      {/* Bottom Navigation (Mobile) */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t flex justify-around items-center py-2 px-4 z-50">
        <MobileNavLink to="/" icon={<LayoutDashboard size={24} />} label="Home" />
        <MobileNavLink to="/predictions" icon={<Target size={24} />} label="Picks" />
        <MobileNavLink to="/history" icon={<History size={24} />} label="History" />
        <MobileNavLink to="/profile" icon={<User size={24} />} label="Me" />
      </nav>

      <Toaster position="top-center" />
    </div>
  );
};

const MenuLink = ({ to, icon, label }: { to: string, icon: React.ReactNode, label: string }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
        isActive ? 'bg-red-600 text-white shadow-lg shadow-red-600/20' : 'text-slate-400 hover:bg-slate-800 hover:text-white'
      }`
    }
  >
    {icon}
    <span className="font-medium">{label}</span>
  </NavLink>
);

const MobileNavLink = ({ to, icon, label }: { to: string, icon: React.ReactNode, label: string }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `flex flex-col items-center gap-0.5 min-w-[64px] ${
        isActive ? 'text-red-600' : 'text-slate-400'
      }`
    }
  >
    {icon}
    <span className="text-[10px] font-bold uppercase">{label}</span>
  </NavLink>
);

export default Layout;