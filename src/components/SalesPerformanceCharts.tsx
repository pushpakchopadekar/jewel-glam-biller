
import React from 'react';
import { BarChart3 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const SalesPerformanceCharts: React.FC = () => {
  const monthlyData = [
    { name: 'Jan', gold: 45000, silver: 12000, imitation: 8000 },
    { name: 'Feb', gold: 52000, silver: 15000, imitation: 9500 },
    { name: 'Mar', gold: 48000, silver: 13500, imitation: 11000 },
    { name: 'Apr', gold: 61000, silver: 18000, imitation: 12500 },
    { name: 'May', gold: 55000, silver: 16500, imitation: 10800 },
    { name: 'Jun', gold: 67000, silver: 20000, imitation: 14000 },
  ];

  const pieData = [
    { name: 'Gold', value: 328000, color: '#F59E0B' },
    { name: 'Silver', value: 95000, color: '#6B7280' },
    { name: 'Imitation', value: 65800, color: '#EC4899' }
  ];

  return (
    <Card className="shadow-2xl border-0 bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <BarChart3 className="w-6 h-6 text-indigo-600 animate-pulse" />
          <span>Sales Performance</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="bar" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 bg-gray-100 dark:bg-gray-700">
            <TabsTrigger value="bar" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-500 data-[state=active]:to-purple-600 data-[state=active]:text-white">
              📊 Bar Chart
            </TabsTrigger>
            <TabsTrigger value="line" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-emerald-500 data-[state=active]:to-teal-600 data-[state=active]:text-white">
              📈 Line Chart
            </TabsTrigger>
            <TabsTrigger value="pie" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-rose-500 data-[state=active]:to-pink-600 data-[state=active]:text-white">
              🥧 Pie Chart
            </TabsTrigger>
          </TabsList>

          <TabsContent value="bar">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="gold" fill="#F59E0B" />
                <Bar dataKey="silver" fill="#6B7280" />
                <Bar dataKey="imitation" fill="#EC4899" />
              </BarChart>
            </ResponsiveContainer>
          </TabsContent>

          <TabsContent value="line">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="gold" stroke="#F59E0B" strokeWidth={3} />
                <Line type="monotone" dataKey="silver" stroke="#6B7280" strokeWidth={3} />
                <Line type="monotone" dataKey="imitation" stroke="#EC4899" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </TabsContent>

          <TabsContent value="pie">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default SalesPerformanceCharts;
