import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Button, Input, Badge } from '../components/ui';
import { Search, Filter, MoreHorizontal } from 'lucide-react';
import { Client } from '../types';
import { useBrand } from '../App';

const MOCK_CLIENTS: Client[] = [
  { id: '1', name: 'Alex Chen', gamertag: 'Ace', game: 'Valorant', rank: 'Immortal 1', role: 'Duelist', avatar: '', status: 'active' },
  { id: '2', name: 'Sarah Jones', gamertag: 'SareBear', game: 'League of Legends', rank: 'Diamond 4', role: 'Support', avatar: '', status: 'active' },
  { id: '3', name: 'Mike Ross', gamertag: 'Mikey', game: 'CS2', rank: '15k Elo', role: 'AWPer', avatar: '', status: 'pending' },
  { id: '4', name: 'David Kim', gamertag: 'DK', game: 'Dota 2', rank: 'Ancient', role: 'Mid', avatar: '', status: 'inactive' },
];

export const Clients: React.FC = () => {
  const { brand } = useBrand();
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
            <h1 className="text-2xl font-bold text-white">Clients</h1>
            <p className="text-slate-400">Manage your roster and track progress.</p>
        </div>
        <Button brandColor={brand.primaryColor}>+ Add New Client</Button>
      </div>

      <div className="flex gap-4 mb-6">
        <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
            <Input placeholder="Search by name, gamertag, or game..." className="pl-9" />
        </div>
        <Button variant="secondary" className="gap-2">
            <Filter size={16} /> Filter
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {MOCK_CLIENTS.map((client) => (
            <Card 
                key={client.id} 
                className="p-6 hover:border-slate-600 transition-colors group cursor-pointer relative overflow-hidden"
                onClick={() => navigate(`/clients/${client.id}`)}
            >
                <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="text-slate-400 hover:text-white" onClick={(e) => e.stopPropagation()}><MoreHorizontal /></button>
                </div>
                
                <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 rounded-full bg-slate-700 flex items-center justify-center text-xl font-bold text-slate-300 border-2 border-slate-600 group-hover:border-slate-500 transition-colors">
                        {client.gamertag.substring(0,2).toUpperCase()}
                    </div>
                    <div>
                        <h3 className="font-bold text-lg text-white group-hover:text-indigo-400 transition-colors">{client.gamertag}</h3>
                        <p className="text-sm text-slate-400">{client.name}</p>
                    </div>
                </div>

                <div className="space-y-3">
                    <div className="flex justify-between items-center text-sm">
                        <span className="text-slate-500">Game</span>
                        <span className="text-slate-200 font-medium">{client.game}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                        <span className="text-slate-500">Rank</span>
                        <Badge>{client.rank}</Badge>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                        <span className="text-slate-500">Role</span>
                        <span className="text-slate-200">{client.role}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                        <span className="text-slate-500">Status</span>
                        <div className="flex items-center gap-2">
                            <span className={`w-2 h-2 rounded-full ${
                                client.status === 'active' ? 'bg-emerald-500' : 
                                client.status === 'pending' ? 'bg-amber-500' : 'bg-slate-500'
                            }`} />
                            <span className="capitalize text-slate-300">{client.status}</span>
                        </div>
                    </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-700 flex gap-3">
                    <Button 
                        variant="secondary" 
                        className="flex-1 h-9 text-xs"
                        onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/clients/${client.id}`);
                        }}
                    >
                        View Profile
                    </Button>
                    <Button 
                        variant="secondary" 
                        className="flex-1 h-9 text-xs"
                        onClick={(e) => e.stopPropagation()}
                    >
                        Message
                    </Button>
                </div>
            </Card>
        ))}
      </div>
    </div>
  );
};