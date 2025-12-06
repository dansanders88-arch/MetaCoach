import React from 'react';
import { Card, Badge } from '../components/ui';
import { useBrand } from '../App';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line
} from 'recharts';
import { TrendingUp, Users, DollarSign, Calendar } from 'lucide-react';

const RANK_DATA = [
  { name: 'Iron', players: 2 },
  { name: 'Bronze', players: 5 },
  { name: 'Silver', players: 12 },
  { name: 'Gold', players: 18 },
  { name: 'Plat', players: 10 },
  { name: 'Dia', players: 4 },
  { name: 'Asc', players: 2 },
];

const ACTIVITY_DATA = [
  { day: 'Mon', sessions: 4 },
  { day: 'Tue', sessions: 6 },
  { day: 'Wed', sessions: 3 },
  { day: 'Thu', sessions: 8 },
  { day: 'Fri', sessions: 5 },
  { day: 'Sat', sessions: 12 },
  { day: 'Sun', sessions: 10 },
];

export const Dashboard: React.FC = () => {
  const { brand } = useBrand();

  const stats = [
    { label: 'Active Clients', value: '54', icon: Users, change: '+12%', color: 'text-indigo-400' },
    { label: 'Monthly Revenue', value: '$4,250', icon: DollarSign, change: '+8.2%', color: 'text-emerald-400' },
    { label: 'Avg. Rank Increase', value: '2.5 Divs', icon: TrendingUp, change: 'Top 5%', color: 'text-amber-400' },
    { label: 'Pending Sessions', value: '12', icon: Calendar, change: 'Action Req', color: 'text-blue-400' },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.label} className="p-6 border-l-4" style={{ borderLeftColor: brand.primaryColor }}>
            <div className="flex justify-between items-start">
              <div>
                <p className="text-slate-400 text-sm font-medium">{stat.label}</p>
                <h3 className="text-3xl font-bold text-white mt-2">{stat.value}</h3>
              </div>
              <div className={`p-3 rounded-lg bg-slate-800/50 ${stat.color}`}>
                <stat.icon size={24} />
              </div>
            </div>
            <div className="mt-4 flex items-center text-xs font-medium text-slate-500">
                <span className="text-emerald-400 mr-1">{stat.change}</span> from last month
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
            <h3 className="text-lg font-semibold text-white mb-6">Client Rank Distribution</h3>
            <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={RANK_DATA}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                        <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                        <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                        <Tooltip 
                            contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', color: '#fff' }}
                            itemStyle={{ color: '#fff' }}
                            cursor={{ fill: '#334155', opacity: 0.4 }}
                        />
                        <Bar dataKey="players" fill={brand.primaryColor} radius={[4, 4, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </Card>

        <Card className="p-6">
            <h3 className="text-lg font-semibold text-white mb-6">Weekly Session Volume</h3>
             <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={ACTIVITY_DATA}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                        <XAxis dataKey="day" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                        <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                        <Tooltip 
                            contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', color: '#fff' }}
                            itemStyle={{ color: '#fff' }}
                        />
                        <Line 
                            type="monotone" 
                            dataKey="sessions" 
                            stroke={brand.primaryColor} 
                            strokeWidth={3} 
                            dot={{ fill: '#1e293b', strokeWidth: 2, r: 4, stroke: brand.primaryColor }} 
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </Card>
      </div>

      <Card className="p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Recent Client Activity</h3>
        <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
                <thead>
                    <tr className="border-b border-slate-700 text-slate-400">
                        <th className="pb-3 pl-2">Client</th>
                        <th className="pb-3">Game</th>
                        <th className="pb-3">Activity</th>
                        <th className="pb-3">Status</th>
                        <th className="pb-3 pr-2 text-right">Date</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-700">
                    {[1, 2, 3, 4].map((i) => (
                        <tr key={i} className="group hover:bg-slate-800/50 transition-colors">
                            <td className="py-4 pl-2 font-medium text-white">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-slate-700" />
                                    <span>xSlayer_{90 + i}</span>
                                </div>
                            </td>
                            <td className="py-4 text-slate-300">Valorant</td>
                            <td className="py-4 text-slate-300">Submitted VOD for Review</td>
                            <td className="py-4"><Badge variant="success">Completed</Badge></td>
                            <td className="py-4 pr-2 text-right text-slate-400">2h ago</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
      </Card>
    </div>
  );
};
