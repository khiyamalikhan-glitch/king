import { useState } from 'react';
import { motion } from 'motion/react';
import { Send, Sparkles, Terminal, Loader2, CheckCircle2 } from 'lucide-react';
import { ACTIVE_WORKFLOWS } from '../lib/data';
import { cn } from '../lib/utils';

export default function CommandCenter() {
  const [prompt, setPrompt] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const simulateSubmit = () => {
    if (!prompt) return;
    setIsProcessing(true);
    setTimeout(() => setIsProcessing(false), 2000);
    setPrompt('');
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 h-[calc(100vh-8rem)]">
      {/* Left: Command Input */}
      <div className="xl:col-span-2 flex flex-col gap-6">
        <div className="flex-1 bg-neutral-900 border border-neutral-800 rounded-2xl shadow-xl overflow-hidden flex flex-col relative">
          <div className="p-6 border-b border-neutral-800 flex items-center justify-between">
             <h2 className="text-lg font-display font-semibold flex items-center gap-2">
               <span className="bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent">Main Orchestrator Agent</span>
             </h2>
             <div className="flex items-center gap-2 px-3 py-1 bg-neutral-950 rounded-full border border-neutral-800">
               <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
               <span className="text-xs font-mono text-neutral-400">Awaiting Orders</span>
             </div>
          </div>
          
          <div className="flex-1 p-6 flex flex-col justify-end">
             {/* Mock Chat / System Logs */}
             <div className="space-y-4 mb-8">
               <div className="p-4 bg-neutral-950 border border-neutral-800 rounded-xl rounded-tl-sm w-max max-w-[80%]">
                 <p className="text-sm font-mono text-neutral-400 mb-2">SYSTEM INITIALIZED [2026-05-09]</p>
                 <p className="text-sm">I have loaded your 13 sub-agents. How would you like to grow the empire today?</p>
               </div>
               
               {isProcessing && (
                 <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-4 bg-neutral-950 border border-cyan-900/50 rounded-xl rounded-tr-sm w-max max-w-[80%] ml-auto text-right">
                   <p className="text-sm">Processing command: "{prompt}"...</p>
                 </motion.div>
               )}
             </div>

             <div className="relative group">
               <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-violet-500 rounded-xl blur opacity-20 group-focus-within:opacity-40 transition duration-500"></div>
               <div className="relative bg-neutral-950 rounded-xl border border-neutral-800 p-2 flex items-end">
                 <textarea
                   className="flex-1 bg-transparent border-none outline-none resize-none px-4 py-3 text-sm h-24 placeholder:text-neutral-600"
                   placeholder="e.g. Find trending tech affiliate products and create TikTok + Pinterest content..."
                   value={prompt}
                   onChange={(e) => setPrompt(e.target.value)}
                   onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); simulateSubmit(); }}}
                 />
                 <button 
                   onClick={simulateSubmit}
                   disabled={!prompt || isProcessing}
                   className="p-3 mb-1 mr-1 bg-white text-black hover:bg-neutral-200 disabled:opacity-50 disabled:bg-neutral-800 disabled:text-neutral-500 rounded-lg transition-colors flex items-center justify-center"
                 >
                   {isProcessing ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
                 </button>
               </div>
             </div>
             
             <div className="mt-4 flex gap-2 overflow-x-auto pb-2 scrollbar-none">
               {[
                 "Launch TikTok campaign for viral gadgets",
                 "Write Top 10 Budget Gadgets for SEO",
                 "Refresh Pinterest Pins for Portable Printer",
                 "Scan Amazon Movers & Shakers"
               ].map((suggestion, i) => (
                 <button 
                   key={i} 
                   onClick={() => setPrompt(suggestion)}
                   className="shrink-0 px-3 py-1.5 bg-neutral-900 border border-neutral-800 hover:border-neutral-700 rounded-lg text-xs flex items-center gap-1.5 transition-colors"
                 >
                   <Sparkles className="w-3 h-3 text-violet-400" />
                   {suggestion}
                 </button>
               ))}
             </div>
          </div>
        </div>
      </div>

      {/* Right: Active Workflows */}
      <div className="xl:col-span-1 bg-neutral-900 border border-neutral-800 rounded-2xl shadow-xl flex flex-col overflow-hidden">
        <div className="p-6 border-b border-neutral-800 flex items-center gap-2">
          <Terminal className="w-5 h-5 text-neutral-400" />
          <h2 className="text-lg font-display font-semibold">Active Workflows</h2>
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {ACTIVE_WORKFLOWS.map((wf) => (
            <div key={wf.id} className="p-4 bg-neutral-950 border border-neutral-800 rounded-xl relative overflow-hidden group">
              {/* Progress background bar effect */}
              {wf.status === 'running' && (
                <div 
                   className="absolute top-0 left-0 bottom-0 bg-cyan-950/20 -z-0 transition-all duration-1000 ease-linear"
                   style={{ width: `${wf.progress}%` }}
                />
              )}
              
              <div className="relative z-10 flex justify-between items-start mb-3">
                <div className="flex items-center gap-2">
                  {wf.status === 'running' && <Loader2 className="w-4 h-4 text-cyan-400 animate-spin" />}
                  {wf.status === 'completed' && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                  {wf.status === 'queued' && <div className="w-1.5 h-1.5 rounded-full bg-neutral-500 ml-1.5 mr-1" />}
                  <span className={cn(
                    "text-xs font-mono uppercase tracking-wider",
                    wf.status === 'running' ? 'text-cyan-400' :
                    wf.status === 'completed' ? 'text-emerald-400' : 'text-neutral-500'
                  )}>
                    {wf.status}
                  </span>
                </div>
                <span className="text-xs text-neutral-600 font-mono">{wf.createdAt}</span>
              </div>
              
              <p className="text-sm relative z-10 mb-4 line-clamp-2 leading-relaxed text-neutral-300">{wf.command}</p>
              
              <div className="relative z-10 flex items-center justify-between text-xs font-mono">
                <span className="text-neutral-500">Current: <span className="text-neutral-300">{wf.currentAgent}</span></span>
                <span className="text-neutral-400">{wf.progress}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
