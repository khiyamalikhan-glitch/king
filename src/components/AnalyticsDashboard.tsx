import { motion } from 'motion/react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { PieChart, Pie, Cell } from 'recharts';

const platformData = [
  { name: 'TikTok', value: 45, color: '#00f2fe' },
  { name: 'Pinterest', value: 30, color: '#ff0844' },
  { name: 'Facebook', value: 15, color: '#1877f2' },
  { name: 'YouTube', value: 10, color: '#ff0000' },
];

const engagementData = [
  { day: '1', tikTok: 4000, pinterest: 2400 },
  { day: '2', tikTok: 3000, pinterest: 1398 },
  { day: '3', tikTok: 2000, pinterest: 9800 },
  { day: '4', tikTok: 2780, pinterest: 3908 },
  { day: '5', tikTok: 1890, pinterest: 4800 },
  { day: '6', tikTok: 2390, pinterest: 3800 },
  { day: '7', tikTok: 3490, pinterest: 4300 },
];

export default function AnalyticsDashboard() {
  return (
    <div className="space-y-6">
       <div className="flex flex-col gap-2 mb-6">
        <h2 className="text-xl font-display font-semibold text-white">Advanced Analytics</h2>
        <p className="text-sm text-neutral-400">Deep dive into cross-platform performance metrics.</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Engagement Over Time */}
        <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 shadow-xl">
           <h3 className="text-sm font-semibold mb-6 text-neutral-300">Engagement Patterns (Last 7 Days)</h3>
           <div className="h-[250px]">
             <ResponsiveContainer width="100%" height="100%">
               <LineChart data={engagementData}>
                 <XAxis dataKey="day" stroke="#525252" fontSize={12} tickLine={false} axisLine={false} />
                 <YAxis stroke="#525252" fontSize={12} tickLine={false} axisLine={false} />
                 <Tooltip 
                   contentStyle={{ backgroundColor: '#171717', borderColor: '#262626', borderRadius: '8px' }}
                 />
                 <Line type="monotone" dataKey="tikTok" stroke="#00f2fe" strokeWidth={2} dot={false} />
                 <Line type="monotone" dataKey="pinterest" stroke="#ff0844" strokeWidth={2} dot={false} />
               </LineChart>
             </ResponsiveContainer>
           </div>
           <div className="flex gap-4 mt-4 justify-center">
             <div className="flex items-center gap-2 text-xs text-neutral-400">
               <span className="w-2 h-2 rounded-full bg-[#00f2fe]"></span> TikTok
             </div>
             <div className="flex items-center gap-2 text-xs text-neutral-400">
               <span className="w-2 h-2 rounded-full bg-[#ff0844]"></span> Pinterest
             </div>
           </div>
        </div>

        {/* Traffic Share Pie */}
        <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 shadow-xl flex flex-col">
           <h3 className="text-sm font-semibold mb-2 text-neutral-300">Traffic Source Distribution</h3>
           
           <div className="flex-1 flex items-center justify-center relative">
             <div className="h-[200px] w-full">
               <ResponsiveContainer width="100%" height="100%">
                 <PieChart>
                   <Pie
                     data={platformData}
                     cx="50%"
                     cy="50%"
                     innerRadius={60}
                     outerRadius={80}
                     paddingAngle={5}
                     dataKey="value"
                     stroke="none"
                   >
                     {platformData.map((entry, index) => (
                       <Cell key={`cell-${index}`} fill={entry.color} />
                     ))}
                   </Pie>
                   <Tooltip 
                     contentStyle={{ backgroundColor: '#171717', borderColor: '#262626', borderRadius: '8px' }}
                     itemStyle={{ color: '#e5e5e5' }}
                   />
                 </PieChart>
               </ResponsiveContainer>
             </div>
           </div>
           
           <div className="grid grid-cols-2 gap-4 mt-2">
             {platformData.map((data, i) => (
               <div key={i} className="flex justify-between items-center p-2 rounded-lg bg-neutral-950 border border-neutral-800">
                 <div className="flex items-center gap-2 text-xs text-neutral-300">
                   <span className="w-2 h-2 rounded-full" style={{ backgroundColor: data.color }}></span>
                   {data.name}
                 </div>
                 <span className="font-mono text-xs">{data.value}%</span>
               </div>
             ))}
           </div>
        </div>

      </div>
    </div>
  );
}
