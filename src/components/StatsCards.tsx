
import React from 'react';
import { TrendingUp, DollarSign, Bell, AlertTriangle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const StatsCards: React.FC = () => {
  const statsData = [
    { title: "Today's Sales", value: "₹12,540", change: "+15%", color: "from-emerald-500 to-teal-600", icon: TrendingUp },
    { title: "Monthly Revenue", value: "₹3,45,680", change: "+28%", color: "from-violet-500 to-purple-600", icon: DollarSign },
    { title: "Pending Payments", value: "₹8,920", change: "-5%", color: "from-rose-500 to-pink-600", icon: Bell },
    { title: "Low Stock Items", value: "3", change: "Alert", color: "from-orange-500 to-red-600", icon: AlertTriangle },
  ];

  return (
    <div className="grid md:grid-cols-4 gap-6">
      {statsData.map((stat, index) => (
        <Card key={index} className="relative overflow-hidden group hover:shadow-xl transition-all duration-300 shadow-lg border-0 bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg">
          <div className={`absolute inset-0 bg-gradient-to-r ${stat.color} opacity-10 group-hover:opacity-20 transition-opacity`}></div>
          <CardContent className="p-6 relative">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-300">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-800 dark:text-white mt-1">{stat.value}</p>
                <p className={`text-sm mt-1 ${stat.change.includes('+') ? 'text-emerald-600' : stat.change === 'Alert' ? 'text-red-600 animate-pulse' : 'text-red-600'}`}>
                  {stat.change}
                </p>
              </div>
              <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${stat.color} flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform duration-300`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default StatsCards;
