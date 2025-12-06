import React, { useState, useRef } from 'react';
import { Card, Button, Input } from '../components/ui';
import { useBrand } from '../App';
import { VodComment } from '../types';
import { Play, Pause, SkipBack, SkipForward, MessageSquare, Plus } from 'lucide-react';

const MOCK_COMMENTS: VodComment[] = [
  { id: '1', timestamp: 45, text: "Good crosshair placement here holding the angle.", author: "Coach" },
  { id: '2', timestamp: 120, text: "Wait, why did I rotate so early?", author: "Player" },
  { id: '3', timestamp: 125, text: "Exactly. You left site open. Look at the minimap.", author: "Coach" },
];

export const VODReview: React.FC = () => {
  const { brand } = useBrand();
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(125); // seconds
  const [comments, setComments] = useState(MOCK_COMMENTS);
  const [newComment, setNewComment] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const handleAddComment = () => {
    if (!newComment.trim()) return;
    const comment: VodComment = {
      id: Date.now().toString(),
      timestamp: currentTime,
      text: newComment,
      author: 'Coach'
    };
    setComments([...comments, comment].sort((a,b) => a.timestamp - b.timestamp));
    setNewComment("");
  };

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col lg:flex-row gap-6">
      {/* Video Player Area */}
      <div className="flex-1 flex flex-col gap-4 min-h-[400px]">
        <div className="flex-1 bg-black rounded-xl overflow-hidden relative group">
             {/* Mock Video Content */}
             <div className="absolute inset-0 flex items-center justify-center bg-slate-900">
                <div className="text-center">
                    <h3 className="text-2xl font-bold text-slate-700 mb-2">VOD PLAYER</h3>
                    <p className="text-slate-600">Replay ID: 89439201</p>
                </div>
             </div>
             
             {/* Controls Overlay */}
             <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-6 opacity-0 group-hover:opacity-100 transition-opacity">
                {/* Timeline */}
                <div className="w-full h-2 bg-slate-700 rounded-full mb-4 relative cursor-pointer">
                    <div 
                        className="h-full rounded-full absolute top-0 left-0" 
                        style={{ width: '35%', backgroundColor: brand.primaryColor }} 
                    />
                    {/* Comment Markers */}
                    {comments.map(c => (
                        <div 
                            key={c.id} 
                            className="absolute top-0 w-1 h-2 bg-yellow-400" 
                            style={{ left: `${(c.timestamp / 300) * 100}%` }} // assuming 5 min video
                        />
                    ))}
                </div>

                <div className="flex items-center justify-between text-white">
                    <div className="flex items-center gap-4">
                        <button onClick={() => setIsPlaying(!isPlaying)}>
                            {isPlaying ? <Pause /> : <Play />}
                        </button>
                        <span>{formatTime(currentTime)} / 5:00</span>
                    </div>
                    <div className="flex gap-2">
                        <SkipBack size={20} />
                        <SkipForward size={20} />
                    </div>
                </div>
             </div>
        </div>
      </div>

      {/* Comments Sidebar */}
      <Card className="w-full lg:w-96 flex flex-col h-full">
        <div className="p-4 border-b border-slate-700 flex justify-between items-center">
            <h3 className="font-bold text-white flex items-center gap-2">
                <MessageSquare size={18} /> Analysis
            </h3>
            <span className="text-xs text-slate-400">{comments.length} comments</span>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4" ref={scrollRef}>
            {comments.map((comment) => (
                <div 
                    key={comment.id} 
                    className={`flex gap-3 p-3 rounded-lg cursor-pointer hover:bg-slate-800 transition-colors ${
                        Math.abs(comment.timestamp - currentTime) < 5 ? 'bg-slate-800 border border-slate-600' : ''
                    }`}
                    onClick={() => setCurrentTime(comment.timestamp)}
                >
                    <div 
                        className="text-xs font-bold px-2 py-1 rounded bg-slate-900 text-slate-300 h-fit"
                    >
                        {formatTime(comment.timestamp)}
                    </div>
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <span className={`text-xs font-bold ${comment.author === 'Coach' ? 'text-indigo-400' : 'text-slate-400'}`}>
                                {comment.author}
                            </span>
                        </div>
                        <p className="text-sm text-slate-200">{comment.text}</p>
                    </div>
                </div>
            ))}
        </div>

        <div className="p-4 border-t border-slate-700 bg-slate-800/50 rounded-b-xl">
            <div className="flex gap-2">
                <Input 
                    placeholder="Add feedback at current time..." 
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleAddComment()}
                />
                <Button onClick={handleAddComment} brandColor={brand.primaryColor} className="px-3">
                    <Plus size={20} />
                </Button>
            </div>
        </div>
      </Card>
    </div>
  );
};
