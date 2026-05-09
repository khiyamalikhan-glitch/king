export type AgentStatus = 'idle' | 'running' | 'success' | 'failed' | 'offline';

export interface Agent {
  id: string;
  name: string;
  description: string;
  status: AgentStatus;
  lastActive: string;
  icon: string; // We'll map string to Lucide icon in UI
}

export const AGENTS: Agent[] = [
  { id: '1', name: 'Main Orchestrator', description: 'Brain of the system, delegates tasks', status: 'running', lastActive: '2s ago', icon: 'Cpu' },
  { id: '2', name: 'Trend Detection', description: 'Scrapes TikTok, Pinterest, Google Trends', status: 'idle', lastActive: '5m ago', icon: 'TrendingUp' },
  { id: '3', name: 'AliExpress Scraper', description: 'Collects profitable products', status: 'idle', lastActive: '15m ago', icon: 'ShoppingCart' },
  { id: '4', name: 'SEO Keyword', description: 'Generates high-traffic keywords', status: 'idle', lastActive: '1h ago', icon: 'Search' },
  { id: '5', name: 'Blog Writer', description: 'Writes SEO affiliate articles', status: 'idle', lastActive: '1h ago', icon: 'PenTool' },
  { id: '6', name: 'Pinterest', description: 'Creates & schedules pins', status: 'running', lastActive: 'Just now', icon: 'Image' },
  { id: '7', name: 'TikTok Video', description: 'Generates viral shorts', status: 'idle', lastActive: '2h ago', icon: 'Video' },
  { id: '8', name: 'Facebook', description: 'Automates FB affiliate posts', status: 'idle', lastActive: '1d ago', icon: 'Facebook' },
  { id: '9', name: 'YouTube Shorts', description: 'Creates YT short scripts & SEO', status: 'idle', lastActive: '3h ago', icon: 'Youtube' },
  { id: '10', name: 'Ad Copy', description: 'Generates high-converting ads', status: 'idle', lastActive: '5h ago', icon: 'FileText' },
  { id: '11', name: 'Analytics', description: 'Tracks performance & optimizes', status: 'running', lastActive: '10s ago', icon: 'BarChart' },
  { id: '12', name: 'Automation Scheduler', description: 'Handles recurring jobs', status: 'running', lastActive: 'Syncing', icon: 'Clock' },
  { id: '13', name: 'Memory', description: 'Stores long-term insights', status: 'running', lastActive: 'Active', icon: 'Database' },
  { id: '14', name: 'Browser Control', description: 'Automates web actions', status: 'running', lastActive: 'Just now', icon: 'Globe' },
];

export interface ScrapedProduct {
  id: string;
  title: string;
  price: number;
  rating: number;
  orders: number;
  trendScore: number;
  niche: string;
}

export const SCRAPED_PRODUCTS: ScrapedProduct[] = [
  { id: 'p1', title: 'Mini Portable Printer Model X', price: 18.5, rating: 4.8, orders: 25040, trendScore: 94, niche: 'Gadgets' },
  { id: 'p2', title: 'Magnetic Wireless Power Bank', price: 22.0, rating: 4.7, orders: 18000, trendScore: 89, niche: 'Tech' },
  { id: 'p3', title: 'Smart Posture Corrector', price: 12.99, rating: 4.5, orders: 12500, trendScore: 82, niche: 'Health' },
  { id: 'p4', title: 'LED Night Light Projector', price: 15.5, rating: 4.9, orders: 45000, trendScore: 98, niche: 'Home Decor' },
  { id: 'p5', title: 'Electric Cleaning Brush', price: 28.0, rating: 4.6, orders: 9400, trendScore: 76, niche: 'Home' },
];

export interface WorkflowTask {
  id: string;
  command: string;
  progress: number;
  status: 'running' | 'completed' | 'failed' | 'queued';
  currentAgent: string;
  createdAt: string;
}

export const ACTIVE_WORKFLOWS: WorkflowTask[] = [
  { id: 'w1', command: 'Find trending tech affiliate products and create TikTok + Pinterest content', progress: 65, status: 'running', currentAgent: 'Pinterest', createdAt: '10m ago' },
  { id: 'w2', command: 'Write Top 10 Budget Gadgets 2026 Blog Article', progress: 100, status: 'completed', currentAgent: 'Blog Writer', createdAt: '1h ago' },
  { id: 'w3', command: 'Scan AliExpress for new portable blenders', progress: 0, status: 'queued', currentAgent: 'Pending', createdAt: 'Just now' },
];
