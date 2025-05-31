
import React from 'react';
import { Gem } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';

interface MetalRatesWidgetProps {
  metalRates: {
    gold: string;
    silver: string;
  };
  setMetalRates: React.Dispatch<React.SetStateAction<{
    gold: string;
    silver: string;
  }>>;
}

const MetalRatesWidget: React.FC<MetalRatesWidgetProps> = ({ metalRates, setMetalRates }) => {
  const updateMetalRates = () => {
    toast({
      title: "✨ Rates Updated Successfully!",
      description: `Gold: ₹${metalRates.gold}/g, Silver: ₹${metalRates.silver}/g`,
    });
  };

  return (
    <Card className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-2xl border-0">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Gem className="w-6 h-6 animate-spin-slow" />
          <span>Today's Metal Rates</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <Label className="text-indigo-100">Gold Rate (₹/gram)</Label>
            <Input
              type="number"
              value={metalRates.gold}
              onChange={(e) => setMetalRates({...metalRates, gold: e.target.value})}
              className="mt-1 bg-white/20 border-white/30 text-white placeholder-indigo-100"
            />
          </div>
          <div>
            <Label className="text-indigo-100">Silver Rate (₹/gram)</Label>
            <Input
              type="number"
              value={metalRates.silver}
              onChange={(e) => setMetalRates({...metalRates, silver: e.target.value})}
              className="mt-1 bg-white/20 border-white/30 text-white placeholder-indigo-100"
            />
          </div>
          <div className="flex items-end">
            <Button 
              onClick={updateMetalRates}
              className="w-full bg-white text-indigo-600 hover:bg-indigo-50 shadow-lg transform hover:scale-105 transition-all duration-300"
            >
              Update Rates
            </Button>
          </div>
        </div>
        <p className="text-indigo-100 text-sm mt-3">
          Last Updated: Today, {new Date().toLocaleTimeString()}
        </p>
      </CardContent>
    </Card>
  );
};

export default MetalRatesWidget;
