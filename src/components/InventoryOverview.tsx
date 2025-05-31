
import React from 'react';
import { Package, Bell, Users } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const InventoryOverview: React.FC = () => {
  return (
    <div className="grid md:grid-cols-3 gap-6">
      <Card className="shadow-2xl border-0 bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg hover:shadow-xl transition-all duration-300">
        <CardContent className="p-6 text-center">
          <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg animate-pulse">
            <Package className="w-6 h-6 text-white" />
          </div>
          <p className="text-2xl font-bold text-gray-800 dark:text-white">1,245</p>
          <p className="text-gray-600 dark:text-gray-300">Total Items</p>
        </CardContent>
      </Card>
      <Card className="shadow-2xl border-0 bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg hover:shadow-xl transition-all duration-300">
        <CardContent className="p-6 text-center">
          <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg animate-pulse">
            <Bell className="w-6 h-6 text-white" />
          </div>
          <p className="text-2xl font-bold text-gray-800 dark:text-white">3</p>
          <p className="text-gray-600 dark:text-gray-300">Low Stock</p>
        </CardContent>
      </Card>
      <Card className="shadow-2xl border-0 bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg hover:shadow-xl transition-all duration-300">
        <CardContent className="p-6 text-center">
          <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
            <Users className="w-6 h-6 text-white" />
          </div>
          <p className="text-2xl font-bold text-gray-800 dark:text-white">156</p>
          <p className="text-gray-600 dark:text-gray-300">Total Customers</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default InventoryOverview;
