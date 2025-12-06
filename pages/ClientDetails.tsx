import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, Button, Badge } from '../components/ui';
import { useBrand } from '../App';
import { 
    AreaChart, 
    Area, 
    XAxis, 
    YAxis, 
    CartesianGrid, 
    Tooltip, 
    ResponsiveContainer 
} from 'recharts';
import { 
    ArrowLeft, 
    Trophy, 
    Target, 
    CheckCircle, 
    TrendingUp, 
    Activity, 
    Crosshair,
    Clock,
    MoreHorizontal
} from 'lucide-react';

// Mock Data Generators
const generateHistory = (baseScore: number) => [
    { date: 'Jan 1', rank: baseScore },
    { date: 'Jan 8', rank: baseScore + 20 },
    { date: 'Jan 15', rank: baseScore + 15 },
    { date: 'Jan 22', rank: baseScore + 45 },
    { date: 'Feb 1', rank: baseScore + 80 },
    { date: 'Feb 8', rank: baseScore + 120 },
];

const MOCK_CLIENT_DB: Record<string, any> = {
    '1': {
        name: 'Alex Chen',
        gamertag: 'Ace',
        game: 'Valorant',
        rank: 'Immortal 1',
        history: generateHistory(1200),
        stats: { winRate: 58, hs: 24, kda: 1.4 },
        goals: [
            { id: 1, title: 'Reach Radiant Top 500', type: 'Long-term', completed: false },
            { id: 2, title: 'Master Jett updraft spots on Haven', type: 'Short-term', completed: true },
            { id: 3, title: 'Improve pistol round winrate to 50%', type: 'Short-term', completed: false },
        ]
    },
    '2': {
        name: 'Sarah Jones',
        gamertag: 'SareBear',
        game: 'League of Legends',
        rank: 'Diamond 4',
        history: generateHistory(2100),
        stats: { winRate: 52, hs: 0, kda: 3.8 }, // LoL stats (HS is N/A usually, but keeping structure simple)
        goals: [
            { id: 1, title: 'Expand Support champion pool', type: 'Long-term', completed: false },
            { id: 2, title: 'Review vision control in mid-game', type: 'Short-term', completed: true },
        ]
    }
};

export const ClientDetails: React.FC = () => {
    const { clientId } = useParams();
    const navigate = useNavigate();
    const { brand } = useBrand();

    // Fallback to client 1 if ID not found or generic
    const client = MOCK_CLIENT_DB[clientId || '1'] || MOCK_CLIENT_DB['1'];

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
             {/* Header */}
             <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="flex items-center gap-4">
                    <Button variant="ghost" onClick={() => navigate('/clients')} className="p-2 h-10 w-10 rounded-full bg-slate-800 border border-slate-700">
                        <ArrowLeft size={20} />
                    </Button>
                    <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-full bg-slate-700 flex items-center justify-center text-2xl font-bold text-slate-300 shadow-lg border-2 border-slate-600">
                            {client.gamertag.substring(0,2).toUpperCase()}
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-white flex items-center gap-2">
                                {client.gamertag} 
                                <span className="text-slate-500 text-lg font-normal">({client.name})</span>
                            </h1>
                            <div className="flex items-center gap-3 text-sm text-slate-400 mt-1">
                                <span className="flex items-center gap-1"><Activity size={14}/> {client.game}</span>
                                <span className="w-1 h-1 rounded-full bg-slate-600" />
                                <span className="text-indigo-400 font-medium">{client.rank}</span>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className="flex gap-2">
                     <Button variant="secondary" className="gap-2">
                        <Clock size={16} /> History
                     </Button>
                     <Button brandColor={brand.primaryColor}>Assign Training</Button>
                </div>
             </div>

             {/* KPIs Grid */}
             <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Rank History Chart */}
                <Card className="lg:col-span-2 p-6 border-slate-700/50">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                            <TrendingUp size={20} className="text-indigo-400"/> Rank Progression
                        </h3>
                        <select className="bg-slate-800 border border-slate-700 text-slate-300 text-sm rounded-md px-2 py-1 outline-none">
                            <option>Last 30 Days</option>
                            <option>Last 3 Months</option>
                            <option>All Time</option>
                        </select>
                    </div>
                    <div className="h-72">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={client.history}>
                                <defs>
                                    <linearGradient id="colorRank" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor={brand.primaryColor} stopOpacity={0.3}/>
                                        <stop offset="95%" stopColor={brand.primaryColor} stopOpacity={0}/>
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                                <XAxis dataKey="date" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                                <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} domain={['dataMin - 50', 'dataMax + 50']} />
                                <Tooltip 
                                    contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', color: '#fff', borderRadius: '8px' }}
                                    itemStyle={{ color: '#fff' }}
                                    cursor={{ stroke: '#475569', strokeWidth: 1 }}
                                />
                                <Area 
                                    type="monotone" 
                                    dataKey="rank" 
                                    stroke={brand.primaryColor} 
                                    fillOpacity={1} 
                                    fill="url(#colorRank)" 
                                    strokeWidth={3} 
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </Card>

                {/* Key Stats Cards Column */}
                <div className="space-y-6">
                    <Card className="p-6 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-4 opacity-50 group-hover:opacity-100 transition-opacity">
                            <MoreHorizontal size={16} className="text-slate-400" />
                        </div>
                        <h3 className="text-sm font-medium text-slate-400 mb-4 flex items-center gap-2">
                            <Trophy size={16} className="text-amber-400"/> Win Rate
                        </h3>
                        <div className="flex items-end gap-3">
                            <span className="text-4xl font-bold text-white">{client.stats.winRate}%</span>
                            <span className="text-sm text-emerald-400 mb-2 flex items-center font-medium py-0.5 px-2 bg-emerald-500/10 rounded-full">
                                +4.2% <TrendingUp size={12} className="ml-1"/>
                            </span>
                        </div>
                        <div className="w-full bg-slate-800 h-1.5 rounded-full mt-4">
                            <div 
                                className="bg-gradient-to-r from-emerald-500 to-emerald-400 h-1.5 rounded-full shadow-[0_0_10px_rgba(16,185,129,0.5)]" 
                                style={{ width: `${client.stats.winRate}%` }}
                            ></div>
                        </div>
                    </Card>

                    <div className="grid grid-cols-2 gap-6">
                        <Card className="p-5">
                            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2 flex items-center gap-2">
                                <Crosshair size={14} /> Headshot %
                            </h3>
                            <span className="text-2xl font-bold text-white">{client.stats.hs}%</span>
                            <p className="text-xs text-slate-400 mt-1">Top 12%</p>
                        </Card>
                        
                        <Card className="p-5">
                            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2 flex items-center gap-2">
                                <Activity size={14} /> K/D Ratio
                            </h3>
                            <span className="text-2xl font-bold text-white">{client.stats.kda}</span>
                            <p className="text-xs text-slate-400 mt-1">Last 20 Matches</p>
                        </Card>
                    </div>

                    <Card className="p-5 bg-gradient-to-br from-indigo-900/20 to-surface border-indigo-500/20">
                         <div className="flex justify-between items-start">
                            <div>
                                <h3 className="text-white font-bold">Next Session</h3>
                                <p className="text-indigo-300 text-sm mt-1">Tomorrow, 4:00 PM</p>
                            </div>
                            <Badge className="bg-indigo-500 text-white border-0">Confirmed</Badge>
                         </div>
                    </Card>
                </div>
             </div>

             {/* Bottom Row */}
             <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Goals */}
                <Card className="p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                            <Target size={20} className="text-rose-400"/> Goals & Objectives
                        </h3>
                        <Button variant="ghost" className="text-xs h-8">Edit Goals</Button>
                    </div>
                    <div className="space-y-4">
                        {client.goals.map((goal: any) => (
                            <div key={goal.id} className="flex items-center gap-3 p-3 rounded-lg bg-slate-800/30 border border-slate-800 hover:border-slate-600 transition-colors group">
                                <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${
                                    goal.completed 
                                    ? 'bg-emerald-500/20 border-emerald-500 text-emerald-500' 
                                    : 'border-slate-600 text-transparent group-hover:border-slate-400'
                                }`}>
                                    <CheckCircle size={14} />
                                </div>
                                <div className="flex-1">
                                    <p className={`font-medium transition-all ${goal.completed ? 'text-slate-500 line-through decoration-slate-600' : 'text-slate-200'}`}>
                                        {goal.title}
                                    </p>
                                    <div className="flex items-center gap-2 mt-0.5">
                                        <span className={`text-[10px] px-1.5 py-0.5 rounded uppercase font-bold tracking-wide ${
                                            goal.type === 'Long-term' ? 'bg-purple-900/30 text-purple-400' : 'bg-blue-900/30 text-blue-400'
                                        }`}>
                                            {goal.type}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                         <button className="w-full py-2 border-2 border-dashed border-slate-700 rounded-lg text-slate-500 text-sm font-medium hover:border-slate-500 hover:text-slate-300 transition-all flex items-center justify-center gap-2">
                            <Target size={14} /> Add New Goal
                         </button>
                    </div>
                </Card>
                
                {/* Recent Task Completion */}
                 <Card className="p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                            <CheckCircle size={20} className="text-emerald-400"/> Recent Activity
                        </h3>
                        <span className="text-xs text-slate-500">Last 7 Days</span>
                    </div>
                    
                    <div className="space-y-0">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="flex gap-4 p-4 border-b border-slate-800 last:border-0 hover:bg-slate-800/30 transition-colors rounded-lg">
                                <div className="mt-1">
                                    <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)]"></div>
                                </div>
                                <div className="flex-1">
                                    <div className="flex justify-between items-start">
                                        <p className="text-slate-200 font-medium text-sm">Completed "VOD Review: Haven Defense"</p>
                                        <span className="text-xs text-slate-500">2d ago</span>
                                    </div>
                                    <p className="text-xs text-slate-400 mt-1">Coach Notes: "Much better crosshair placement this time."</p>
                                </div>
                            </div>
                        ))}
                         <div className="flex gap-4 p-4 hover:bg-slate-800/30 transition-colors rounded-lg opacity-60">
                                <div className="mt-1">
                                    <div className="w-2 h-2 rounded-full bg-slate-600"></div>
                                </div>
                                <div className="flex-1">
                                    <div className="flex justify-between items-start">
                                        <p className="text-slate-300 font-medium text-sm">Completed "Aim Lab: Gridshot"</p>
                                        <span className="text-xs text-slate-500">4d ago</span>
                                    </div>
                                </div>
                            </div>
                    </div>
                 </Card>
             </div>
        </div>
    );
};