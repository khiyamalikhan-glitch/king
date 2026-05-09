import { motion } from 'motion/react';
import { AGENTS } from '../lib/data';
import * as Icons from 'lucide-react';
import { cn } from '../lib/utils';

export default function AgentsView() {
  const getAgentColor = (status: string) => {
    switch (status) {
      case 'running': return 'text-cyan-400 bg-cyan-400/10 border-cyan-400/20';
      case 'idle': return 'text-neutral-400 bg-neutral-800/50 border-neutral-800';
      case 'failed': return 'text-rose-400 bg-rose-400/10 border-rose-400/20';
      default: return 'text-neutral-500 bg-neutral-900 border-neutral-800';
    }
  };

  const getStatusIndicator = (status: string) => {
    switch (status) {
      case 'running': return <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_rgba(34,211,238,0.8)]" />;
      case 'idle': return <span className="w-2 h-2 rounded-full bg-neutral-500" />;
      case 'failed': return <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />;
      default: return <span className="w-2 h-2 rounded-full bg-neutral-700" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2 relative z-10">
        <h2 className="text-xl font-display font-semibold text-white">System Agents Overview</h2>
        <p className="text-sm text-neutral-400">Monitor all autonomous sub-agents running in your cluster.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 relative z-10">
        {AGENTS.map((agent, i) => {
          // @ts-ignore
          const IconComponent = Icons[agent.icon] || Icons.Cpu;
          const colorClasses = getAgentColor(agent.status);

          return (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              key={agent.id}
              className={cn(
                "p-5 rounded-2xl border bg-neutral-900 transition-all duration-300 relative group overflow-hidden",
                agent.status === 'running' ? "border-cyan-900/50 shadow-lg shadow-cyan-900/10" : "border-neutral-800"
              )}
            >
              <div className="flex justify-between items-start mb-4">
                <div className={cn("p-2.5 rounded-xl border", colorClasses)}>
                  <IconComponent className="w-5 h-5" />
                </div>
                {getStatusIndicator(agent.status)}
              </div>
              
              <h3 className="font-medium text-white mb-1 group-hover:text-cyan-400 transition-colors">{agent.name}</h3>
              <p className="text-xs text-neutral-500 leading-relaxed mb-4 h-8">{agent.description}</p>
              
              <div className="flex justify-between items-center pt-4 border-t border-neutral-800/80">
                 <span className="text-xs font-mono text-neutral-500">{agent.lastActive}</span>
                 <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-neutral-950 border border-neutral-800 uppercase text-neutral-400">{agent.status}</span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
