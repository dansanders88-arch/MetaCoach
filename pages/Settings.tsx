import React from 'react';
import { Card, Input, Label, Button } from '../components/ui';
import { useBrand } from '../App';
import { Palette, Building } from 'lucide-react';

export const Settings: React.FC = () => {
  const { brand, setBrand } = useBrand();

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">Platform Settings</h1>
            <p className="text-slate-400">Configure your white-label coaching space.</p>
          </div>
          <Button brandColor={brand.primaryColor}>Save Changes</Button>
      </div>

      <Card className="p-6 space-y-6">
        <h3 className="text-lg font-semibold text-white flex items-center gap-2 border-b border-slate-700 pb-2">
            <Building size={20} className="text-slate-400" /> Organization Details
        </h3>
        
        <div className="grid gap-4">
            <div className="space-y-2">
                <Label>Organization Name</Label>
                <Input 
                    value={brand.orgName} 
                    onChange={(e) => setBrand({ ...brand, orgName: e.target.value })}
                />
            </div>
            
            <div className="space-y-2">
                <Label>Logo URL</Label>
                <Input 
                    value={brand.logoUrl} 
                    onChange={(e) => setBrand({ ...brand, logoUrl: e.target.value })}
                    placeholder="https://..."
                />
            </div>
        </div>
      </Card>

      <Card className="p-6 space-y-6">
        <h3 className="text-lg font-semibold text-white flex items-center gap-2 border-b border-slate-700 pb-2">
            <Palette size={20} className="text-slate-400" /> Branding & Theme
        </h3>

        <div className="grid gap-4">
             <div className="space-y-2">
                <Label>Primary Brand Color</Label>
                <div className="flex items-center gap-4">
                    <input 
                        type="color" 
                        value={brand.primaryColor}
                        onChange={(e) => setBrand({ ...brand, primaryColor: e.target.value })}
                        className="h-10 w-20 rounded cursor-pointer bg-transparent"
                    />
                    <Input 
                        value={brand.primaryColor} 
                        onChange={(e) => setBrand({ ...brand, primaryColor: e.target.value })}
                        className="w-32"
                    />
                </div>
                <p className="text-xs text-slate-500">This color will be applied to buttons, active states, and charts.</p>
            </div>
            
            {/* Live Preview */}
            <div className="p-6 bg-slate-900 rounded-lg border border-slate-700 space-y-4">
                <Label>Theme Preview</Label>
                <div className="flex gap-4">
                    <Button brandColor={brand.primaryColor}>Primary Action</Button>
                    <Button variant="secondary">Secondary Action</Button>
                </div>
            </div>
        </div>
      </Card>
    </div>
  );
};
