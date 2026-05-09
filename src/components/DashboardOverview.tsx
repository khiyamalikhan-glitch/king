import { motion } from 'motion/react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { DollarSign, MousePointerClick, Activity, TrendingUp, Search } from 'lucide-react';
import { SCRAPED_PRODUCTS } from '../lib/data';

const data = [
  { name: 'Mon', revenue: 4000, clicks: 2400 },
  { name: 'Tue', revenue: 3000, clicks: 1398 },
  { name: 'Wed', revenue: 2000, clicks: 9800 },
  { name: 'Thu', revenue: 2780, clicks: 3908 },
  { name: 'Fri', revenue: 1890, clicks: 4800 },
  { name: 'Sat', revenue: 2390, clicks: 3800 },
  { name: 'Sun', revenue: 3490, clicks: 4300 },
];

export default function DashboardOverview() {
  return (
    <div className="space-y-6">
      {/* Top Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden shadow-xl lg:grid-cols-4">
        {[
          { label: 'Total Revenue (30d)', value: '$12,450', icon: DollarSign, trend: '+14%' },
          { label: 'Total Clicks', value: '45.2K', icon: MousePointerClick, trend: '+5%' },
          { label: 'Active Workflows', value: '8', icon: Activity, trend: '2 Queued' },
          { label: 'Win Rate (CTR)', value: '4.2%', icon: TrendingUp, trend: '+1.1%' },
        ].map((stat, i) => (
          <div key={i} className="p-6 border-b lg:border-b-0 lg:border-r border-neutral-800 last:border-0 relative group">
            <div className="flex justify-between items-start mb-4">
               <div className="p-2 bg-neutral-950 rounded-lg">
                 <stat.icon className="w-5 h-5 text-neutral-400 group-hover:text-cyan-400 transition-colors" />
               </div>
               <span className="text-xs font-mono text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded-full">{stat.trend}</span>
            </div>
            <div className="text-3xl font-display font-bold text-white mb-1">{stat.value}</div>
            <div className="text-sm text-neutral-500">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Chart View */}
        <div className="col-span-1 lg:col-span-2 bg-neutral-900 border border-neutral-800 rounded-2xl p-6 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-32 bg-cyan-500/5 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>
          <div className="flex items-center justify-between mb-8">
             <div>
               <h2 className="text-lg font-display font-semibold text-white">Revenue & Traffic</h2>
               <p className="text-sm text-neutral-500">Live analytics from affiliate links</p>
             </div>
             <select className="bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-1.5 text-sm outline-none cursor-pointer">
               <option>Last 7 Days</option>
               <option>Last 30 Days</option>
               <option>All Time</option>
             </select>
          </div>
          
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" stroke="#525252" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#525252" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(val) => `$${val}`} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#171717', borderColor: '#262626', borderRadius: '8px' }}
                  itemStyle={{ color: '#e5e5e5' }}
                />
                <Area type="monotone" dataKey="revenue" stroke="#06b6d4" strokeWidth={2} fillOpacity={1} fill="url(#colorRev)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Hot Products list */}
        <div className="col-span-1 bg-neutral-900 border border-neutral-800 rounded-2xl p-6 shadow-xl flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-display font-semibold text-white flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-rose-400" />
              Trending Now
            </h2>
            <button className="p-2 hover:bg-neutral-800 rounded-lg transition-colors">
              <Search className="w-4 h-4 text-neutral-400" />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto pr-2 space-y-4">
             {SCRAPED_PRODUCTS.slice(0, 5).map((product, idx) => (
               <div key={product.id} className="p-4 bg-neutral-950 rounded-xl border border-neutral-800/60 hover:border-neutral-700 transition-colors">
                 <div className="flex justify-between items-start mb-2">
                   <h3 className="font-medium text-sm text-neutral-200 line-clamp-1">{product.title}</h3>
                   <span className="text-xs font-mono font-bold text-rose-400 bg-rose-400/10 px-2 py-0.5 rounded ml-2 shrink-0">{product.trendScore}</span>
                 </div>
                 <div className="flex items-center justify-between text-xs text-neutral-500 font-mono">
                   <span>${product.price}</span>
                   <span>{product.orders.toLocaleString()} orders</span>
                 </div>
               </div>
             ))}
          </div>
          <button className="w-full mt-4 py-2 border border-neutral-800 rounded-lg text-sm text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors">
            View All Products
          </button>
        </div>
        
      </div>
    </div>
  );
}
