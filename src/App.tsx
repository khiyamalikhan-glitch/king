import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { LayoutDashboard, Users, Database, Activity, Target, Settings, Zap, Menu, X } from 'lucide-react';
import { cn } from './lib/utils';
import CommandCenter from './components/CommandCenter';
import DashboardOverview from './components/DashboardOverview';
import AgentsView from './components/AgentsView';
import ProductsDatabase from './components/ProductsDatabase';
import AnalyticsDashboard from './components/AnalyticsDashboard';

type ViewMode = 'dashboard' | 'command' | 'agents' | 'database' | 'analytics';

function Sidebar({ activeView, setActiveView, isOpen, setIsOpen }: { activeView: ViewMode, setActiveView: (v: ViewMode) => void, isOpen: boolean, setIsOpen: (v: boolean) => void }) {
  const tabs = [
    { id: 'dashboard', label: 'Overview', icon: LayoutDashboard },
    { id: 'command', label: 'Command Center', icon: Zap },
    { id: 'agents', label: 'Agents Status', icon: Users },
    { id: 'database', label: 'Product DB', icon: Database },
    { id: 'analytics', label: 'Analytics', icon: Activity },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-20 bg-black/60 lg:hidden"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      <div className={cn(
        "fixed inset-y-0 left-0 z-30 w-64 bg-neutral-900 border-r border-neutral-800 transform transition-transform duration-300 lg:translate-x-0 lg:static lg:block",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex h-16 items-center px-6 border-b border-neutral-800">
          <Target className="w-6 h-6 text-cyan-500 mr-2" />
          <span className="text-lg font-display font-bold tracking-tight text-white">AffiliateEmpire</span>
          <button className="ml-auto lg:hidden" onClick={() => setIsOpen(false)}>
            <X className="w-5 h-5 text-neutral-400" />
          </button>
        </div>

        <nav className="p-4 space-y-1">
          <p className="px-2 text-xs font-mono font-medium text-neutral-500 mb-2 mt-4 uppercase hidden lg:block">Main Menu</p>
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeView === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => { setActiveView(tab.id as ViewMode); setIsOpen(false); }}
                className={cn(
                  "w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200",
                  isActive 
                    ? "bg-neutral-800 text-white" 
                    : "text-neutral-400 hover:bg-neutral-800/50 hover:text-neutral-200"
                )}
              >
                <Icon className={cn("w-4 h-4", isActive ? "text-cyan-400" : "text-neutral-500")} />
                {tab.label}
              </button>
            );
          })}
        </nav>

        <div className="absolute bottom-0 w-full p-4 border-t border-neutral-800">
           <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-neutral-400 hover:bg-neutral-800/50 hover:text-neutral-200 transition-colors duration-200">
             <Settings className="w-4 h-4 text-neutral-500" />
             Settings
           </button>
        </div>
      </div>
    </>
  );
}

export default function App() {
  const [activeView, setActiveView] = useState<ViewMode>('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-neutral-950 text-neutral-200">
      <Sidebar activeView={activeView} setActiveView={setActiveView} isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      
      <main className="flex-1 flex flex-col h-full overflow-hidden relative">
        <header className="h-16 flex items-center justify-between px-4 lg:px-8 border-b border-neutral-800 bg-neutral-950/80 backdrop-blur-md sticky top-0 z-10">
          <div className="flex items-center">
            <button className="p-2 mr-4 lg:hidden" onClick={() => setIsSidebarOpen(true)}>
              <Menu className="w-5 h-5 text-neutral-400" />
            </button>
            <h1 className="text-lg font-display font-semibold text-white capitalize">{activeView.replace('-', ' ')}</h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-xs font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-neutral-400 hidden sm:inline">System Online</span>
            </div>
            <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-cyan-500 to-violet-500 shadow-lg shadow-cyan-500/20"></div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-4 lg:p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeView}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="h-full max-w-7xl mx-auto"
            >
              {activeView === 'dashboard' && <DashboardOverview />}
              {activeView === 'command' && <CommandCenter />}
              {activeView === 'agents' && <AgentsView />}
              {activeView === 'database' && <ProductsDatabase />}
              {activeView === 'analytics' && <AnalyticsDashboard />}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
