import React, { useState } from 'react';
import { Card, Button, Input, Label, Badge } from '../components/ui';
import { useBrand } from '../App';
import { generateTrainingPlan } from '../services/geminiService';
import { TrainingTask, TrainingProgram } from '../types';
import { Bot, Loader2, Save, ArrowRight, BrainCircuit, FileText, Trash2, X, Plus } from 'lucide-react';

export const ProgramBuilder: React.FC = () => {
  const { brand } = useBrand();
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<TrainingTask[] | null>(null);
  
  // Save Template State
  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);
  const [templateName, setTemplateName] = useState('');
  const [savedTemplates, setSavedTemplates] = useState<TrainingProgram[]>([
      {
          id: 'temp_1',
          title: 'Valorant - Gold to Plat Fundamentals',
          game: 'Valorant',
          targetRank: 'Platinum 1',
          createdAt: new Date().toISOString(),
          tasks: [
              { day: 'Day 1', title: 'Crosshair Placement', description: 'Deathmatch focusing solely on head height.', duration: '30m' },
              { day: 'Day 2', title: 'Utility Usage', description: 'Custom game lineup practice on Ascent.', duration: '45m' }
          ]
      }
  ]);

  const [formData, setFormData] = useState({
    game: 'Valorant',
    currentRank: 'Platinum 2',
    targetRank: 'Diamond 1',
    weaknesses: 'Inconsistent aim, poor crosshair placement, tilts easily after losing pistol rounds'
  });

  const handleGenerate = async () => {
    setLoading(true);
    setResult(null);
    try {
      const plan = await generateTrainingPlan(
        formData.game, 
        formData.currentRank, 
        formData.targetRank, 
        formData.weaknesses
      );
      setResult(plan);
    } catch (e) {
      console.error(e);
      alert("Failed to generate plan. Please check console or try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSaveTemplate = () => {
      if (!templateName || !result) return;
      
      const newTemplate: TrainingProgram = {
          id: Date.now().toString(),
          title: templateName,
          game: formData.game,
          targetRank: formData.targetRank,
          tasks: result,
          createdAt: new Date().toISOString()
      };

      setSavedTemplates([...savedTemplates, newTemplate]);
      setIsSaveModalOpen(false);
      setTemplateName('');
  };

  const loadTemplate = (template: TrainingProgram) => {
      setResult(template.tasks);
      setFormData({
          ...formData,
          game: template.game,
          targetRank: template.targetRank
      });
  };

  const deleteTemplate = (id: string, e: React.MouseEvent) => {
      e.stopPropagation();
      setSavedTemplates(savedTemplates.filter(t => t.id !== id));
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 relative">
        {/* Save Modal */}
        {isSaveModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
                <Card className="w-full max-w-md p-6 space-y-6 shadow-2xl border-slate-700 bg-surface">
                    <div className="flex justify-between items-center">
                        <h3 className="text-xl font-bold text-white">Save as Template</h3>
                        <button onClick={() => setIsSaveModalOpen(false)} className="text-slate-400 hover:text-white">
                            <X size={24} />
                        </button>
                    </div>
                    
                    <div className="space-y-3">
                        <Label>Template Name</Label>
                        <Input 
                            placeholder="e.g. Diamond Ascent Routine" 
                            value={templateName}
                            onChange={(e) => setTemplateName(e.target.value)}
                            autoFocus
                        />
                        <p className="text-xs text-slate-500">
                            Saving this will allow you to quickly assign this routine to other clients.
                        </p>
                    </div>

                    <div className="flex gap-3 justify-end pt-2">
                        <Button variant="ghost" onClick={() => setIsSaveModalOpen(false)}>Cancel</Button>
                        <Button 
                            brandColor={brand.primaryColor} 
                            onClick={handleSaveTemplate}
                            disabled={!templateName.trim()}
                        >
                            Save Template
                        </Button>
                    </div>
                </Card>
            </div>
        )}

      <div>
        <h1 className="text-2xl font-bold text-white flex items-center gap-3">
            <BrainCircuit className="text-indigo-400" />
            AI Program Builder
        </h1>
        <p className="text-slate-400 mt-2">
            Generate customized high-performance training routines for your clients using our Gemini-powered engine.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Inputs & Library */}
        <div className="lg:col-span-4 space-y-6">
            <Card className="p-6 space-y-4">
                <h3 className="font-semibold text-white border-b border-slate-700 pb-2">Configuration</h3>
                
                <div className="space-y-2">
                    <Label>Game</Label>
                    <select 
                        className="flex h-10 w-full rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        value={formData.game}
                        onChange={(e) => setFormData({...formData, game: e.target.value})}
                    >
                        <option>Valorant</option>
                        <option>League of Legends</option>
                        <option>CS2</option>
                        <option>Dota 2</option>
                        <option>Overwatch 2</option>
                    </select>
                </div>

                <div className="space-y-2">
                    <Label>Current Rank</Label>
                    <Input 
                        value={formData.currentRank}
                        onChange={(e) => setFormData({...formData, currentRank: e.target.value})}
                    />
                </div>

                <div className="space-y-2">
                    <Label>Target Rank</Label>
                    <Input 
                        value={formData.targetRank}
                        onChange={(e) => setFormData({...formData, targetRank: e.target.value})}
                    />
                </div>

                <div className="space-y-2">
                    <Label>Key Weaknesses</Label>
                    <textarea 
                        className="flex min-h-[100px] w-full rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder:text-slate-500"
                        placeholder="Describe client issues..."
                        value={formData.weaknesses}
                        onChange={(e) => setFormData({...formData, weaknesses: e.target.value})}
                    />
                </div>

                <Button 
                    className="w-full mt-4" 
                    brandColor={brand.primaryColor}
                    onClick={handleGenerate}
                    disabled={loading}
                >
                    {loading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Analyzing...</> : <><Bot className="mr-2 h-4 w-4" /> Generate Plan</>}
                </Button>
            </Card>

            <Card className="p-6">
                <div className="flex items-center justify-between mb-4 border-b border-slate-700 pb-2">
                    <h3 className="font-semibold text-white">Template Library</h3>
                    <Badge variant="default">{savedTemplates.length}</Badge>
                </div>
                
                <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2">
                    {savedTemplates.length === 0 ? (
                        <p className="text-sm text-slate-500 text-center py-4">No saved templates yet.</p>
                    ) : (
                        savedTemplates.map(template => (
                            <div 
                                key={template.id} 
                                className="group p-3 rounded-lg border border-slate-700 bg-slate-800/50 hover:bg-slate-700 hover:border-slate-500 transition-all cursor-pointer relative"
                                onClick={() => loadTemplate(template)}
                            >
                                <div className="pr-6">
                                    <h4 className="font-medium text-slate-200 text-sm truncate">{template.title}</h4>
                                    <div className="flex items-center gap-2 mt-1">
                                        <Badge className="text-[10px] px-1.5 py-0 h-4">{template.game}</Badge>
                                        <span className="text-xs text-slate-500">{template.tasks.length} tasks</span>
                                    </div>
                                </div>
                                <button 
                                    className="absolute top-2 right-2 text-slate-500 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity p-1"
                                    onClick={(e) => deleteTemplate(template.id, e)}
                                >
                                    <Trash2 size={14} />
                                </button>
                            </div>
                        ))
                    )}
                </div>
            </Card>
        </div>

        {/* Right Column: Results */}
        <div className="lg:col-span-8 space-y-6">
            {!result && !loading && (
                <div className="h-full flex flex-col items-center justify-center text-slate-500 border-2 border-dashed border-slate-800 rounded-xl p-12 bg-slate-900/50 min-h-[400px]">
                    <Bot size={48} className="mb-4 opacity-50" />
                    <p className="text-lg font-medium">Ready to Build</p>
                    <p className="text-sm max-w-sm text-center mt-2">Configure the parameters on the left and click Generate, or select a template from your library.</p>
                </div>
            )}

            {loading && (
                <div className="space-y-4">
                    {[1, 2, 3].map(i => (
                        <div key={i} className="h-32 bg-slate-800/50 rounded-xl animate-pulse" />
                    ))}
                </div>
            )}

            {result && (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                        <div>
                            <h3 className="text-2xl font-bold text-white">Current Routine</h3>
                            <p className="text-slate-400 text-sm">Review tasks before assigning to client.</p>
                        </div>
                        <div className="flex gap-3">
                            <Button 
                                variant="secondary" 
                                className="gap-2"
                                onClick={() => setIsSaveModalOpen(true)}
                            >
                                <Save size={16} /> Save Template
                            </Button>
                            <Button brandColor={brand.primaryColor} className="gap-2">
                                <Plus size={16} /> Assign to Client
                            </Button>
                        </div>
                    </div>

                    <div className="space-y-4">
                        {result.map((task, index) => (
                            <Card key={index} className="p-0 overflow-hidden flex flex-col sm:flex-row group hover:border-slate-500 transition-colors">
                                <div 
                                    className="w-full sm:w-32 bg-slate-800 flex flex-col items-center justify-center p-4 border-b sm:border-b-0 sm:border-r border-slate-700 group-hover:bg-slate-750 transition-colors"
                                >
                                    <span className="font-bold text-slate-300 text-lg">{task.day}</span>
                                    <span className="text-xs text-slate-500 mt-1 uppercase tracking-wider">{task.duration}</span>
                                </div>
                                <div className="p-5 flex-1">
                                    <h4 className="font-bold text-lg text-white mb-2">{task.title}</h4>
                                    <p className="text-slate-400 text-sm leading-relaxed">{task.description}</p>
                                </div>
                                <div className="p-4 flex items-center justify-center border-l border-slate-800 bg-slate-900/30">
                                    <button className="p-2 text-slate-500 hover:text-white transition-colors bg-slate-800 rounded-full hover:bg-slate-700">
                                        <ArrowRight size={20} />
                                    </button>
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>
            )}
        </div>
      </div>
    </div>
  );
};