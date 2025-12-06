import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  Dumbbell, 
  Video, 
  Settings, 
  LogOut,
  Swords,
  Bell,
  Upload
} from 'lucide-react';
import { useBrand } from '../App';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { brand } = useBrand();
  const location = useLocation();

  const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
    { icon: Users, label: 'Clients', path: '/clients' },
    { icon: Dumbbell, label: 'Training', path: '/training' },
    { icon: Upload, label: 'Submit Task', path: '/submission' },
    { icon: Video, label: 'VOD Review', path: '/vods' },
    { icon: Settings, label: 'Settings', path: '/settings' },
  ];

  return (
    <div className="flex h-screen bg-background text-slate-200">
      {/* Sidebar */}
      <aside className="w-64 border-r border-slate-800 bg-surface flex flex-col">
        <div className="p-6 flex items-center gap-3">
          <div 
            className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold text-xl shadow-lg"
            style={{ backgroundColor: brand.primaryColor }}
          >
            {brand.logoUrl ? <img src={brand.logoUrl} alt="Logo" className="w-full h-full object-cover rounded-lg" /> : <Swords size={20} />}
          </div>
          <span className="font-bold text-lg tracking-tight">{brand.orgName}</span>
        </div>

        <nav className="flex-1 px-4 space-y-2 mt-4">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                  isActive 
                    ? 'text-white shadow-md' 
                    : 'text-slate-400 hover:text-slate-100 hover:bg-slate-700/50'
                }`}
                style={isActive ? { backgroundColor: brand.primaryColor } : {}}
              >
                <item.icon size={20} />
                <span className="font-medium">{item.label}</span>
              </NavLink>
            );
          })}
        </nav>

        <div className="p-4 border-t border-slate-800">
            <button className="flex items-center gap-3 px-4 py-3 w-full text-slate-400 hover:text-white hover:bg-slate-700/50 rounded-lg transition-colors">
                <LogOut size={20} />
                <span className="font-medium">Sign Out</span>
            </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Topbar */}
        <header className="h-16 border-b border-slate-800 bg-surface/50 backdrop-blur-sm flex items-center justify-between px-8">
            <h2 className="text-xl font-semibold text-white">
                {navItems.find(i => i.path === location.pathname)?.label || 'Platform'}
            </h2>
            <div className="flex items-center gap-4">
                <button className="relative p-2 text-slate-400 hover:text-white transition-colors">
                    <Bell size={20} />
                    <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>
                <div className="w-8 h-8 rounded-full bg-slate-700 border border-slate-600 overflow-hidden">
                    <img src="https://picsum.photos/100/100" alt="Coach" />
                </div>
            </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-y-auto p-8">
            <div className="max-w-7xl mx-auto">
                {children}
            </div>
        </div>
      </main>
    </div>
  );
};