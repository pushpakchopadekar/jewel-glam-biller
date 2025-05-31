
import React, { useState } from 'react';
import { BarChart3, PieChart, TrendingUp, Calendar, Download, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const SalesOverview = () => {
  const [timePeriod, setTimePeriod] = useState('monthly');

  // Mock chart data
  const chartData = {
    bar: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      gold: [45000, 52000, 48000, 61000, 55000, 67000],
      silver: [12000, 15000, 13000, 18000, 16000, 19000],
      imitation: [8000, 9500, 8500, 11000, 9800, 12500]
    },
    pie: {
      gold: 65,
      silver: 25,
      imitation: 10
    }
  };

  const overviewData = {
    gold: {
      totalSales: '₹3,28,000',
      units: '485 items',
      avgPrice: '₹67,628',
      growth: '+18%'
    },
    silver: {
      totalSales: '₹93,000',
      units: '1,245 items',
      avgPrice: '₹7,470',
      growth: '+12%'
    },
    imitation: {
      totalSales: '₹59,300',
      units: '2,680 items',
      avgPrice: '₹221',
      growth: '+25%'
    }
  };

  const renderBarChart = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Monthly Sales Performance</h3>
        <div className="flex space-x-2">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-gradient-to-r from-yellow-400 to-orange-500 rounded"></div>
            <span className="text-sm">Gold</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-gradient-to-r from-gray-400 to-slate-500 rounded"></div>
            <span className="text-sm">Silver</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-gradient-to-r from-pink-400 to-purple-500 rounded"></div>
            <span className="text-sm">Imitation</span>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-6 gap-4 h-64">
        {chartData.bar.labels.map((month, index) => (
          <div key={month} className="flex flex-col items-center space-y-2">
            <div className="flex-1 flex flex-col justify-end items-center space-y-1 w-full">
              {/* Gold Bar */}
              <div 
                className="w-6 bg-gradient-to-t from-yellow-400 to-orange-500 rounded-t shadow-lg transition-all duration-500 hover:scale-110"
                style={{ height: `${(chartData.bar.gold[index] / 70000) * 150}px` }}
                title={`Gold: ₹${chartData.bar.gold[index].toLocaleString()}`}
              ></div>
              {/* Silver Bar */}
              <div 
                className="w-6 bg-gradient-to-t from-gray-400 to-slate-500 shadow-lg transition-all duration-500 hover:scale-110"
                style={{ height: `${(chartData.bar.silver[index] / 70000) * 150}px` }}
                title={`Silver: ₹${chartData.bar.silver[index].toLocaleString()}`}
              ></div>
              {/* Imitation Bar */}
              <div 
                className="w-6 bg-gradient-to-t from-pink-400 to-purple-500 rounded-b shadow-lg transition-all duration-500 hover:scale-110"
                style={{ height: `${(chartData.bar.imitation[index] / 70000) * 150}px` }}
                title={`Imitation: ₹${chartData.bar.imitation[index].toLocaleString()}`}
              ></div>
            </div>
            <span className="text-xs font-medium text-gray-600 dark:text-gray-300">{month}</span>
          </div>
        ))}
      </div>
    </div>
  );

  const renderPieChart = () => (
    <div className="flex flex-col items-center space-y-6">
      <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Sales Distribution by Category</h3>
      <div className="relative w-64 h-64">
        {/* Pie Chart using CSS */}
        <div className="w-64 h-64 rounded-full relative overflow-hidden shadow-2xl">
          {/* Gold Segment (65%) */}
          <div 
            className="absolute w-full h-full bg-gradient-to-br from-yellow-400 to-orange-500"
            style={{
              clipPath: 'polygon(50% 50%, 50% 0%, 100% 0%, 100% 100%, 85% 100%)'
            }}
          ></div>
          {/* Silver Segment (25%) */}
          <div 
            className="absolute w-full h-full bg-gradient-to-br from-gray-400 to-slate-500"
            style={{
              clipPath: 'polygon(50% 50%, 85% 100%, 15% 100%)'
            }}
          ></div>
          {/* Imitation Segment (10%) */}
          <div 
            className="absolute w-full h-full bg-gradient-to-br from-pink-400 to-purple-500"
            style={{
              clipPath: 'polygon(50% 50%, 15% 100%, 50% 0%)'
            }}
          ></div>
          {/* Center Circle */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-white dark:bg-gray-800 rounded-full shadow-lg flex items-center justify-center">
            <PieChart className="w-8 h-8 text-gray-600 dark:text-gray-300" />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-6 text-center">
        <div className="space-y-2">
          <div className="w-6 h-6 bg-gradient-to-r from-yellow-400 to-orange-500 rounded mx-auto"></div>
          <div className="text-2xl font-bold text-gray-800 dark:text-white">{chartData.pie.gold}%</div>
          <div className="text-sm text-gray-600 dark:text-gray-300">Gold</div>
        </div>
        <div className="space-y-2">
          <div className="w-6 h-6 bg-gradient-to-r from-gray-400 to-slate-500 rounded mx-auto"></div>
          <div className="text-2xl font-bold text-gray-800 dark:text-white">{chartData.pie.silver}%</div>
          <div className="text-sm text-gray-600 dark:text-gray-300">Silver</div>
        </div>
        <div className="space-y-2">
          <div className="w-6 h-6 bg-gradient-to-r from-pink-400 to-purple-500 rounded mx-auto"></div>
          <div className="text-2xl font-bold text-gray-800 dark:text-white">{chartData.pie.imitation}%</div>
          <div className="text-sm text-gray-600 dark:text-gray-300">Imitation</div>
        </div>
      </div>
    </div>
  );

  const renderLineChart = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Sales Trend Analysis</h3>
      <div className="relative h-64 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg p-6">
        <svg className="w-full h-full" viewBox="0 0 600 200">
          {/* Grid Lines */}
          <defs>
            <pattern id="grid" width="50" height="40" patternUnits="userSpaceOnUse">
              <path d="M 50 0 L 0 0 0 40" fill="none" stroke="#e5e7eb" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
          
          {/* Gold Line */}
          <polyline
            fill="none"
            stroke="url(#goldGradient)"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
            points="50,160 150,140 250,150 350,120 450,130 550,100"
            className="animate-pulse"
          />
          
          {/* Silver Line */}
          <polyline
            fill="none"
            stroke="url(#silverGradient)"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
            points="50,170 150,160 250,165 350,150 450,155 550,145"
            className="animate-pulse"
          />
          
          {/* Imitation Line */}
          <polyline
            fill="none"
            stroke="url(#imitationGradient)"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
            points="50,180 150,175 250,178 350,170 450,172 550,165"
            className="animate-pulse"
          />
          
          {/* Gradients */}
          <defs>
            <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" style={{stopColor:"#fbbf24", stopOpacity:1}} />
              <stop offset="100%" style={{stopColor:"#f59e0b", stopOpacity:1}} />
            </linearGradient>
            <linearGradient id="silverGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" style={{stopColor:"#9ca3af", stopOpacity:1}} />
              <stop offset="100%" style={{stopColor:"#6b7280", stopOpacity:1}} />
            </linearGradient>
            <linearGradient id="imitationGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" style={{stopColor:"#f472b6", stopOpacity:1}} />
              <stop offset="100%" style={{stopColor:"#a855f7", stopOpacity:1}} />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute bottom-2 right-2 text-xs text-gray-500">
          Trend over last 6 months
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-6 space-y-8 bg-gradient-to-br from-violet-50 via-purple-50 to-fuchsia-50 dark:from-gray-900 dark:via-violet-900/20 dark:to-purple-900/20 min-h-screen">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="flex justify-center mb-4">
          <div className="relative">
            <div className="w-20 h-20 bg-gradient-to-r from-violet-500 to-purple-600 rounded-2xl flex items-center justify-center transform rotate-12 hover:rotate-45 transition-all duration-500 shadow-2xl">
              <BarChart3 className="w-10 h-10 text-white animate-pulse" />
            </div>
            <div className="absolute inset-0 w-20 h-20 bg-gradient-to-r from-violet-400 to-purple-500 rounded-2xl blur-xl opacity-30 animate-pulse"></div>
          </div>
        </div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
          Sales Overview
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mt-2">Comprehensive analytics and insights</p>
      </div>

      {/* Controls */}
      <Card className="shadow-2xl border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex gap-4 items-center">
              <Select value={timePeriod} onValueChange={setTimePeriod}>
                <SelectTrigger className="w-48 border-violet-200 dark:border-violet-600">
                  <SelectValue placeholder="Select time period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="yearly">Yearly</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" className="border-violet-200 dark:border-violet-600">
                <Filter className="w-4 h-4 mr-2" />
                Filters
              </Button>
            </div>
            <Button className="bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 text-white">
              <Download className="w-4 h-4 mr-2" />
              Export Report
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Charts */}
      <Tabs defaultValue="bar" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg shadow-lg">
          <TabsTrigger value="bar" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-violet-500 data-[state=active]:to-purple-600 data-[state=active]:text-white">
            📊 Bar Chart
          </TabsTrigger>
          <TabsTrigger value="line" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-violet-500 data-[state=active]:to-purple-600 data-[state=active]:text-white">
            📈 Line Chart
          </TabsTrigger>
          <TabsTrigger value="pie" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-violet-500 data-[state=active]:to-purple-600 data-[state=active]:text-white">
            🥧 Pie Chart
          </TabsTrigger>
        </TabsList>

        <TabsContent value="bar">
          <Card className="shadow-2xl border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BarChart3 className="w-6 h-6 text-violet-600" />
                <span>Sales Performance - Bar Chart</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              {renderBarChart()}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="line">
          <Card className="shadow-2xl border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="w-6 h-6 text-violet-600" />
                <span>Sales Trend - Line Chart</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              {renderLineChart()}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pie">
          <Card className="shadow-2xl border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <PieChart className="w-6 h-6 text-violet-600" />
                <span>Category Distribution - Pie Chart</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              {renderPieChart()}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Category Overview */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card className="shadow-2xl border-0 bg-gradient-to-br from-yellow-100 to-orange-200 dark:from-yellow-900/30 dark:to-orange-900/30">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center space-x-2 text-orange-800 dark:text-orange-200">
              <span className="text-2xl">🥇</span>
              <span>Gold Performance</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between">
              <span className="text-orange-700 dark:text-orange-300">Total Sales:</span>
              <span className="font-bold text-orange-900 dark:text-orange-100">{overviewData.gold.totalSales}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-orange-700 dark:text-orange-300">Units Sold:</span>
              <span className="font-bold text-orange-900 dark:text-orange-100">{overviewData.gold.units}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-orange-700 dark:text-orange-300">Avg Price:</span>
              <span className="font-bold text-orange-900 dark:text-orange-100">{overviewData.gold.avgPrice}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-orange-700 dark:text-orange-300">Growth:</span>
              <span className="font-bold text-green-600 dark:text-green-400">{overviewData.gold.growth}</span>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-2xl border-0 bg-gradient-to-br from-gray-100 to-slate-200 dark:from-gray-800/50 dark:to-slate-800/50">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center space-x-2 text-slate-800 dark:text-slate-200">
              <span className="text-2xl">🥈</span>
              <span>Silver Performance</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between">
              <span className="text-slate-700 dark:text-slate-300">Total Sales:</span>
              <span className="font-bold text-slate-900 dark:text-slate-100">{overviewData.silver.totalSales}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-700 dark:text-slate-300">Units Sold:</span>
              <span className="font-bold text-slate-900 dark:text-slate-100">{overviewData.silver.units}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-700 dark:text-slate-300">Avg Price:</span>
              <span className="font-bold text-slate-900 dark:text-slate-100">{overviewData.silver.avgPrice}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-700 dark:text-slate-300">Growth:</span>
              <span className="font-bold text-green-600 dark:text-green-400">{overviewData.silver.growth}</span>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-2xl border-0 bg-gradient-to-br from-pink-100 to-purple-200 dark:from-pink-900/30 dark:to-purple-900/30">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center space-x-2 text-purple-800 dark:text-purple-200">
              <span className="text-2xl">💎</span>
              <span>Imitation Performance</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between">
              <span className="text-purple-700 dark:text-purple-300">Total Sales:</span>
              <span className="font-bold text-purple-900 dark:text-purple-100">{overviewData.imitation.totalSales}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-purple-700 dark:text-purple-300">Units Sold:</span>
              <span className="font-bold text-purple-900 dark:text-purple-100">{overviewData.imitation.units}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-purple-700 dark:text-purple-300">Avg Price:</span>
              <span className="font-bold text-purple-900 dark:text-purple-100">{overviewData.imitation.avgPrice}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-purple-700 dark:text-purple-300">Growth:</span>
              <span className="font-bold text-green-600 dark:text-green-400">{overviewData.imitation.growth}</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SalesOverview;
