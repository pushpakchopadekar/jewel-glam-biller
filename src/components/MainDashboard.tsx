
import React, { useState } from 'react';
import { Gem, Home, Package, ShoppingCart, History, Archive, BarChart3, Bell, Settings, Sun, Moon, User, LogOut, AlertTriangle, Receipt, TrendingUp, DollarSign, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/components/ui/use-toast';
import { SidebarProvider, Sidebar, SidebarContent, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import ProductRegistration from './ProductRegistration';
import StartSale from './StartSale';
import RegisteredProducts from './RegisteredProducts';
import SalesHistory from './SalesHistory';
import AvailableStock from './AvailableStock';
import StockAlert from './StockAlert';
import SalesOverview from './SalesOverview';

interface MainDashboardProps {
  onLogout: () => void;
}

const MainDashboard: React.FC<MainDashboardProps> = ({ onLogout }) => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [metalRates, setMetalRates] = useState({
    gold: '6850',
    silver: '85'
  });

  const menuItems = [
    { id: 'dashboard', title: 'Dashboard', icon: Home },
    { id: 'product-registration', title: 'Product Registration', icon: Package },
    { id: 'start-sale', title: 'Start Sale', icon: ShoppingCart },
    { id: 'registered-products', title: 'Registered Products', icon: Archive },
    { id: 'sales-history', title: 'Sales History', icon: History },
    { id: 'available-stock', title: 'Available Stock', icon: Package },
  ];

  const navbarItems = [
    { id: 'sales-overview', title: 'Sales Overview', icon: BarChart3 },
    { id: 'stock-alert', title: 'Stock Alert', icon: AlertTriangle },
    { id: 'invoices', title: 'Invoices', icon: Receipt },
  ];

  const statsData = [
    { title: "Today's Sales", value: "₹12,540", change: "+15%", color: "from-emerald-500 to-teal-600", icon: TrendingUp },
    { title: "Monthly Revenue", value: "₹3,45,680", change: "+28%", color: "from-violet-500 to-purple-600", icon: DollarSign },
    { title: "Pending Payments", value: "₹8,920", change: "-5%", color: "from-rose-500 to-pink-600", icon: Bell },
    { title: "Low Stock Items", value: "3", change: "Alert", color: "from-orange-500 to-red-600", icon: AlertTriangle },
  ];

  // Sample data for charts
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

  const updateMetalRates = () => {
    toast({
      title: "✨ Rates Updated Successfully!",
      description: `Gold: ₹${metalRates.gold}/g, Silver: ₹${metalRates.silver}/g`,
    });
  };

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
    document.documentElement.classList.toggle('dark');
  };

  const handleNavbarItemClick = (itemId: string) => {
    setActiveTab(itemId);
    toast({
      title: `📊 ${navbarItems.find(item => item.id === itemId)?.title}`,
      description: "Opening section...",
    });
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'product-registration':
        return <ProductRegistration />;
      case 'start-sale':
        return <StartSale />;
      case 'registered-products':
        return <RegisteredProducts />;
      case 'sales-history':
        return <SalesHistory />;
      case 'available-stock':
        return <AvailableStock />;
      case 'stock-alert':
        return <StockAlert />;
      case 'sales-overview':
        return <SalesOverview />;
      case 'invoices':
        return <SalesHistory />;
      default:
        return (
          <main className="p-6 space-y-8">
            {/* Metal Rates Widget */}
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

            {/* Stats Cards */}
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

            {/* Sales Performance Charts */}
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

            {/* Inventory Overview */}
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
          </main>
        );
    }
  };

  return (
    <div className={`min-h-screen ${isDarkTheme ? 'dark' : ''}`}>
      <SidebarProvider>
        <div className="min-h-screen flex w-full bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-indigo-900/20 dark:to-purple-900/20">
          {/* Sidebar */}
          <Sidebar>
            <SidebarHeader className="p-6">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center transform rotate-12 hover:rotate-45 transition-transform duration-500 shadow-2xl">
                  <Gem className="w-8 h-8 text-white animate-spin-slow" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-800 dark:text-white">Jewelry</h2>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Billing Pro</p>
                </div>
              </div>
            </SidebarHeader>
            
            <SidebarContent className="px-4">
              <SidebarMenu>
                {menuItems.map((item) => (
                  <SidebarMenuItem key={item.id}>
                    <SidebarMenuButton
                      onClick={() => setActiveTab(item.id)}
                      isActive={activeTab === item.id}
                      className="w-full justify-start space-x-3 py-3 px-4 rounded-xl transition-all duration-300 hover:bg-gradient-to-r hover:from-indigo-100 hover:to-purple-100 dark:hover:from-indigo-900/20 dark:hover:to-purple-900/20 hover:shadow-lg transform hover:scale-105"
                    >
                      <item.icon className={`w-5 h-5 ${activeTab === item.id ? 'text-indigo-600 animate-pulse' : 'text-gray-600 dark:text-gray-300'}`} />
                      <span className={`${activeTab === item.id ? 'text-indigo-600 font-semibold' : 'text-gray-700 dark:text-gray-300'}`}>
                        {item.title}
                      </span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarContent>
          </Sidebar>

          {/* Main Content */}
          <SidebarInset className="flex-1">
            {/* Top Navbar */}
            <header className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg shadow-xl border-b border-gray-200 dark:border-gray-700 px-6 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <SidebarTrigger className="hover:bg-indigo-100 dark:hover:bg-indigo-900/20 p-2 rounded-lg transition-colors" />
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                    {menuItems.find(item => item.id === activeTab)?.title || 
                     navbarItems.find(item => item.id === activeTab)?.title || 'Dashboard'}
                  </h1>
                </div>
                
                <div className="flex items-center space-x-4">
                  {navbarItems.map((item) => (
                    <Button
                      key={item.id}
                      onClick={() => handleNavbarItemClick(item.id)}
                      variant="outline"
                      size="sm"
                      className="hover:bg-gradient-to-r hover:from-indigo-100 hover:to-purple-100 dark:hover:from-indigo-900/20 dark:hover:to-purple-900/20 border-indigo-200 dark:border-indigo-600 transition-all duration-300 transform hover:scale-105"
                    >
                      <item.icon className="w-4 h-4 mr-2" />
                      {item.title}
                    </Button>
                  ))}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={toggleTheme}
                    className="p-2 hover:bg-yellow-100 dark:hover:bg-yellow-900/20 transition-colors"
                  >
                    {isDarkTheme ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                  </Button>
                  <div className="relative group">
                    <Button variant="outline" size="sm" className="p-2 hover:bg-indigo-100 dark:hover:bg-indigo-900/20">
                      <User className="w-4 h-4" />
                    </Button>
                    <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                      <div className="p-3 border-b border-gray-200 dark:border-gray-700">
                        <p className="font-semibold text-gray-800 dark:text-white">Admin</p>
                        <p className="text-sm text-gray-600 dark:text-gray-300">admin@jewelry.com</p>
                      </div>
                      <button
                        onClick={onLogout}
                        className="w-full text-left px-3 py-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center space-x-2 transition-colors"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Logout</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </header>

            {/* Content Area */}
            <div className="flex-1 overflow-auto">
              {renderContent()}
            </div>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </div>
  );
};

export default MainDashboard;
