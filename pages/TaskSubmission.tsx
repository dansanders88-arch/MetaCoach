import React, { useState } from 'react';
import { Card, Button, Input, Label } from '../components/ui';
import { useBrand } from '../App';
import { Upload, Link, Gamepad2, FileVideo, CheckCircle } from 'lucide-react';

const PENDING_TASKS = [
    { id: '1', title: 'Ranked Match - Placement 1', type: 'Match', dueDate: 'Today' },
    { id: '2', title: 'Aim Lab - Gridshot Ultimate', type: 'Drill', dueDate: 'Today' },
    { id: '3', title: 'VOD Review - Ascent Defeat', type: 'Review', dueDate: 'Tomorrow' },
];

export const TaskSubmission: React.FC = () => {
    const { brand } = useBrand();
    const [selectedTaskId, setSelectedTaskId] = useState(PENDING_TASKS[0].id);
    const [submissionType, setSubmissionType] = useState<'replay' | 'link' | 'file'>('replay');
    const [inputValue, setInputValue] = useState('');
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        // Simulate API call
        setTimeout(() => {
            setIsSubmitting(false);
            setSubmitted(true);
        }, 1500);
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setSelectedFile(e.target.files[0]);
        }
    };

    if (submitted) {
        return (
            <div className="max-w-xl mx-auto mt-12 text-center space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto text-emerald-500 border border-emerald-500/20">
                    <CheckCircle size={40} />
                </div>
                <div>
                    <h2 className="text-2xl font-bold text-white">Submission Received!</h2>
                    <p className="text-slate-400 mt-2">Your coach has been notified and will review your submission shortly.</p>
                </div>
                <Button onClick={() => {
                    setSubmitted(false);
                    setInputValue('');
                    setSelectedFile(null);
                }} brandColor={brand.primaryColor}>Submit Another Task</Button>
            </div>
        )
    }

    return (
        <div className="max-w-2xl mx-auto space-y-8">
            <div>
                <h1 className="text-2xl font-bold text-white flex items-center gap-3">
                    <Upload className="text-slate-400" />
                    Submit Task
                </h1>
                <p className="text-slate-400 mt-2">Upload VODs, screenshots, or paste match IDs for your coach.</p>
            </div>

            <Card className="p-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Task Selection */}
                    <div className="space-y-3">
                        <Label>Select Task</Label>
                        <div className="grid gap-3">
                            {PENDING_TASKS.map(task => (
                                <div 
                                    key={task.id}
                                    onClick={() => setSelectedTaskId(task.id)}
                                    className={`p-4 rounded-lg border cursor-pointer transition-all flex items-center justify-between ${
                                        selectedTaskId === task.id 
                                        ? 'border-indigo-500 bg-indigo-500/10' 
                                        : 'border-slate-700 bg-slate-800/50 hover:border-slate-600'
                                    }`}
                                    style={selectedTaskId === task.id ? { borderColor: brand.primaryColor, backgroundColor: `${brand.primaryColor}1a` } : {}}
                                >
                                    <div>
                                        <p className="font-medium text-white">{task.title}</p>
                                        <p className="text-sm text-slate-400">{task.type} • Due {task.dueDate}</p>
                                    </div>
                                    <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                                        selectedTaskId === task.id ? 'border-transparent' : 'border-slate-500'
                                    }`}
                                    style={selectedTaskId === task.id ? { backgroundColor: brand.primaryColor } : {}}
                                    >
                                        {selectedTaskId === task.id && <div className="w-2 h-2 bg-white rounded-full" />}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Submission Type Toggle */}
                    <div className="space-y-3">
                        <Label>Submission Method</Label>
                        <div className="flex p-1 bg-slate-900 rounded-lg border border-slate-700">
                            <button
                                type="button"
                                onClick={() => setSubmissionType('replay')}
                                className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-md text-sm font-medium transition-all ${
                                    submissionType === 'replay' ? 'bg-slate-700 text-white shadow' : 'text-slate-400 hover:text-slate-200'
                                }`}
                            >
                                <Gamepad2 size={16} /> Replay ID
                            </button>
                            <button
                                type="button"
                                onClick={() => setSubmissionType('link')}
                                className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-md text-sm font-medium transition-all ${
                                    submissionType === 'link' ? 'bg-slate-700 text-white shadow' : 'text-slate-400 hover:text-slate-200'
                                }`}
                            >
                                <Link size={16} /> Link
                            </button>
                            <button
                                type="button"
                                onClick={() => setSubmissionType('file')}
                                className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-md text-sm font-medium transition-all ${
                                    submissionType === 'file' ? 'bg-slate-700 text-white shadow' : 'text-slate-400 hover:text-slate-200'
                                }`}
                            >
                                <FileVideo size={16} /> File
                            </button>
                        </div>
                    </div>

                    {/* Dynamic Input Area */}
                    <div className="space-y-4">
                        {submissionType === 'replay' && (
                            <div className="space-y-2">
                                <Label>Match / Replay ID</Label>
                                <Input 
                                    placeholder="e.g. 294810482" 
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    required={submissionType === 'replay'}
                                />
                                <p className="text-xs text-slate-500">Paste the Match ID from your match history or third-party tracker.</p>
                            </div>
                        )}

                        {submissionType === 'link' && (
                            <div className="space-y-2">
                                <Label>Video URL</Label>
                                <Input 
                                    type="url" 
                                    placeholder="e.g. https://youtu.be/..." 
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    required={submissionType === 'link'}
                                />
                                <p className="text-xs text-slate-500">Supports YouTube, Twitch, Medal.tv, and Google Drive links.</p>
                            </div>
                        )}

                        {submissionType === 'file' && (
                            <div className="space-y-2">
                                <Label>Upload Video File</Label>
                                <div className="border-2 border-dashed border-slate-700 rounded-lg p-8 text-center hover:bg-slate-800/50 transition-colors relative">
                                    <input 
                                        type="file" 
                                        className="absolute inset-0 opacity-0 cursor-pointer w-full h-full" 
                                        accept="video/*"
                                        onChange={handleFileChange}
                                        required={submissionType === 'file'}
                                    />
                                    <div className="flex flex-col items-center gap-2 text-slate-400">
                                        <Upload size={32} />
                                        {selectedFile ? (
                                            <span className="text-emerald-400 font-medium">{selectedFile.name}</span>
                                        ) : (
                                            <>
                                                <span className="font-medium text-slate-300">Click to upload or drag and drop</span>
                                                <span className="text-xs">MP4, MKV, or WEBM (Max 2GB)</span>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}
                        
                        <div className="space-y-2">
                            <Label>Notes for Coach (Optional)</Label>
                            <textarea 
                                className="flex min-h-[80px] w-full rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder:text-slate-500"
                                placeholder="E.g. I struggled with rotations on defense..."
                            />
                        </div>
                    </div>

                    <div className="pt-4 border-t border-slate-800">
                        <Button 
                            type="submit" 
                            className="w-full h-12 text-lg" 
                            brandColor={brand.primaryColor}
                            disabled={isSubmitting || (submissionType !== 'file' && !inputValue) || (submissionType === 'file' && !selectedFile)}
                        >
                            {isSubmitting ? 'Uploading...' : 'Submit Task'}
                        </Button>
                    </div>
                </form>
            </Card>
        </div>
    );
};