import { useState } from 'react';
import { Search, Filter, Download, Box, TrendingUp, DollarSign, Star, MoreVertical } from 'lucide-react';
import { SCRAPED_PRODUCTS } from '../lib/data';

export default function ProductsDatabase() {
  const [search, setSearch] = useState('');

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl font-display font-semibold text-white flex items-center gap-2">
            <Box className="w-5 h-5 text-cyan-400" />
            Product Database
          </h2>
          <p className="text-sm text-neutral-400 mt-1">Scraped items from AliExpress Scraper Agent.</p>
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" />
            <input 
              type="text" 
              placeholder="Search products..." 
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full bg-neutral-900 border border-neutral-800 rounded-lg pl-9 pr-4 py-2 text-sm text-white placeholder:text-neutral-500 outline-none focus:border-cyan-500/50 transition-colors"
            />
          </div>
          <button className="p-2 bg-neutral-900 border border-neutral-800 hover:bg-neutral-800 rounded-lg text-neutral-400 transition-colors">
            <Filter className="w-4 h-4" />
          </button>
          <button className="p-2 bg-neutral-900 border border-neutral-800 hover:bg-neutral-800 rounded-lg text-neutral-400 transition-colors">
            <Download className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-neutral-950/50 border-b border-neutral-800 text-xs font-mono text-neutral-500 uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4">Product Name</th>
                <th className="px-6 py-4">Niche</th>
                <th className="px-6 py-4">Price</th>
                <th className="px-6 py-4">Orders</th>
                <th className="px-6 py-4">Rating</th>
                <th className="px-6 py-4">Trend Score</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-800">
              {SCRAPED_PRODUCTS.filter(p => p.title.toLowerCase().includes(search.toLowerCase())).map((product) => (
                <tr key={product.id} className="hover:bg-neutral-800/20 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="font-medium text-neutral-200">{product.title}</span>
                      <span className="text-xs text-neutral-500 font-mono mt-1">ID: {product.id}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2.5 py-1 rounded-md bg-neutral-950 border border-neutral-800 text-xs text-neutral-400">
                      {product.niche}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center text-neutral-300">
                      <DollarSign className="w-3.5 h-3.5 text-emerald-400 mr-1" />
                      {product.price.toFixed(2)}
                    </div>
                  </td>
                  <td className="px-6 py-4 font-mono text-neutral-400">
                    {product.orders.toLocaleString()}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center text-amber-400 font-mono text-sm">
                      <Star className="w-3.5 h-3.5 fill-amber-400 mr-1.5" />
                      {product.rating}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                       <div className="w-16 h-1.5 bg-neutral-800 rounded-full overflow-hidden">
                         <div 
                           className={`h-full rounded-full ${product.trendScore > 90 ? 'bg-rose-400' : product.trendScore > 80 ? 'bg-orange-400' : 'bg-cyan-400'}`}
                           style={{ width: `${product.trendScore}%` }}
                         />
                       </div>
                       <span className="font-mono text-xs text-neutral-400">{product.trendScore}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-1.5 text-neutral-500 hover:text-white rounded-md hover:bg-neutral-800 transition-colors opacity-0 group-hover:opacity-100">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="p-4 border-t border-neutral-800 flex items-center justify-between text-xs text-neutral-500">
          <span>Showing {SCRAPED_PRODUCTS.length} products</span>
          <div className="flex gap-2">
            <button className="px-3 py-1.5 rounded-lg border border-neutral-800 hover:bg-neutral-800 transition-colors disabled:opacity-50">Previous</button>
            <button className="px-3 py-1.5 rounded-lg border border-neutral-800 hover:bg-neutral-800 transition-colors disabled:opacity-50">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}
