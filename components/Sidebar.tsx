import React from 'react';
import { ViewMode } from '../types';
import { Icons as IconSet } from '../constants';

interface SidebarProps {
  currentView: ViewMode;
  onViewChange: (view: ViewMode) => void;
  tokenUsage: number;
  onInstall: () => void;
  canInstall: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, onViewChange, tokenUsage, onInstall, canInstall }) => {
  const navItems: { id: ViewMode; label: string; icon: React.FC }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: IconSet.Gavel },
    { id: 'assistant', label: 'AI Assistant', icon: IconSet.Chat },
    { id: 'research', label: 'Deep Research', icon: IconSet.Search },
    { id: 'drafting', label: 'Draft Motion', icon: IconSet.Scale },
    { id: 'files', label: 'Case Files', icon: IconSet.Document },
  ];

  const formatTokens = (num: number) => {
    return num > 1000 ? `${(num / 1000).toFixed(1)}k` : num;
  };

  return (
    <div className="w-20 lg:w-64 bg-legal-900 text-white flex flex-col justify-between h-screen sticky top-0">
      <div>
        <div className="p-6 flex items-center justify-center lg:justify-start gap-3 border-b border-legal-800">
          <div className="bg-yellow-600 p-2 rounded-lg">
             <IconSet.Scale />
          </div>
          <span className="text-xl font-serif font-bold hidden lg:block tracking-wide">HoosierLaw</span>
        </div>
        
        <nav className="mt-8 px-2 lg:px-4 space-y-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onViewChange(item.id)}
              className={`w-full flex items-center gap-4 px-4 py-3 rounded-lg transition-all duration-200 ${
                currentView === item.id
                  ? 'bg-yellow-600 text-white shadow-lg'
                  : 'text-legal-300 hover:bg-legal-800 hover:text-white'
              }`}
            >
              <item.icon />
              <span className="hidden lg:block font-medium">{item.label}</span>
            </button>
          ))}
        </nav>
      </div>

      <div className="p-4 border-t border-legal-800 space-y-4">
        {/* Token Tracker */}
        <div className="bg-legal-800 rounded-lg p-3 hidden lg:block border border-legal-700">
            <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-semibold text-legal-300">Session Usage</span>
                <span className="text-xs font-mono text-yellow-500">{formatTokens(tokenUsage)} toks</span>
            </div>
            <div className="h-1.5 bg-legal-900 rounded-full w-full overflow-hidden">
                <div 
                    className="h-full bg-yellow-600 transition-all duration-500" 
                    style={{ width: `${Math.min((tokenUsage / 100000) * 100, 100)}%` }}
                ></div>
            </div>
        </div>

        {canInstall && (
            <button 
                onClick={onInstall}
                className="w-full flex items-center gap-4 px-4 py-3 rounded-lg text-yellow-500 hover:bg-legal-800 transition-all duration-200 border border-yellow-600/30"
            >
                <IconSet.Download />
                <span className="hidden lg:block font-bold">Install App</span>
            </button>
        )}

        <div className="mt-4 text-center lg:text-left">
           <p className="text-[10px] text-legal-500">v1.2.0 • Desktop PWA</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;