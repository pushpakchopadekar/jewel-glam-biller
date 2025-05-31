import React, { useState } from 'react';
import { Gem, Home, Package, ShoppingCart, History, Archive, BarChart3, Bell, Settings, Sun, Moon, User, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/components/ui/use-toast';
import { SidebarProvider, Sidebar, SidebarContent, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';

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

  const statsData = [
    { title: "Today's Sales", value: "₹12,540", change: "+15%", color: "from-green-500 to-emerald-600" },
    { title: "Monthly Revenue", value: "₹3,45,680", change: "+28%", color: "from-blue-500 to-cyan-600" },
    { title: "Pending Payments", value: "₹8,920", change: "-5%", color: "from-orange-500 to-red-600" },
    { title: "Low Stock Items", value: "3", change: "Alert", color: "from-red-500 to-pink-600" },
  ];

  const updateMetalRates = () => {
    toast({
      title: "Rates Updated Successfully! ✨",
      description: `Gold: ₹${metalRates.gold}/g, Silver: ₹${metalRates.silver}/g`,
    });
  };

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <div className={`min-h-screen ${isDarkTheme ? 'dark' : ''}`}>
      <SidebarProvider>
        <div className="min-h-screen flex w-full bg-gray-50 dark:bg-gray-900">
          {/* Sidebar */}
          <Sidebar>
            <SidebarHeader className="p-6">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-r from-amber-500 to-yellow-600 rounded-xl flex items-center justify-center transform rotate-12 hover:rotate-45 transition-transform duration-500">
                  <Gem className="w-8 h-8 text-white" />
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
                      className="w-full justify-start space-x-3 py-3 px-4 rounded-xl transition-all duration-300 hover:bg-amber-50 dark:hover:bg-amber-900/20"
                    >
                      <item.icon className={`w-5 h-5 ${activeTab === item.id ? 'text-amber-600' : 'text-gray-600 dark:text-gray-300'}`} />
                      <span className={`${activeTab === item.id ? 'text-amber-600 font-semibold' : 'text-gray-700 dark:text-gray-300'}`}>
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
            <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 px-6 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <SidebarTrigger />
                  <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
                    {menuItems.find(item => item.id === activeTab)?.title || 'Dashboard'}
                  </h1>
                </div>
                
                <div className="flex items-center space-x-4">
                  <Button variant="outline" size="sm">
                    <BarChart3 className="w-4 h-4 mr-2" />
                    Sales Overview
                  </Button>
                  <Button variant="outline" size="sm">
                    <Bell className="w-4 h-4 mr-2" />
                    Alerts
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={toggleTheme}
                    className="p-2"
                  >
                    {isDarkTheme ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                  </Button>
                  <div className="relative group">
                    <Button variant="outline" size="sm" className="p-2">
                      <User className="w-4 h-4" />
                    </Button>
                    <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                      <div className="p-3 border-b border-gray-200 dark:border-gray-700">
                        <p className="font-semibold text-gray-800 dark:text-white">Admin</p>
                        <p className="text-sm text-gray-600 dark:text-gray-300">admin@jewelry.com</p>
                      </div>
                      <button
                        onClick={onLogout}
                        className="w-full text-left px-3 py-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center space-x-2"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Logout</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </header>

            {/* Dashboard Content */}
            {activeTab === 'dashboard' && (
              <main className="p-6 space-y-8">
                {/* Metal Rates Widget */}
                <Card className="bg-gradient-to-r from-amber-500 to-yellow-600 text-white">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Gem className="w-6 h-6" />
                      <span>Today's Metal Rates</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <Label className="text-amber-100">Gold Rate (₹/gram)</Label>
                        <Input
                          type="number"
                          value={metalRates.gold}
                          onChange={(e) => setMetalRates({...metalRates, gold: e.target.value})}
                          className="mt-1 bg-white/20 border-white/30 text-white placeholder-amber-100"
                        />
                      </div>
                      <div>
                        <Label className="text-amber-100">Silver Rate (₹/gram)</Label>
                        <Input
                          type="number"
                          value={metalRates.silver}
                          onChange={(e) => setMetalRates({...metalRates, silver: e.target.value})}
                          className="mt-1 bg-white/20 border-white/30 text-white placeholder-amber-100"
                        />
                      </div>
                      <div className="flex items-end">
                        <Button 
                          onClick={updateMetalRates}
                          className="w-full bg-white text-amber-600 hover:bg-amber-50"
                        >
                          Update Rates
                        </Button>
                      </div>
                    </div>
                    <p className="text-amber-100 text-sm mt-3">
                      Last Updated: Today, {new Date().toLocaleTimeString()}
                    </p>
                  </CardContent>
                </Card>

                {/* Stats Cards */}
                <div className="grid md:grid-cols-4 gap-6">
                  {statsData.map((stat, index) => (
                    <Card key={index} className="relative overflow-hidden group hover:shadow-lg transition-all duration-300">
                      <div className={`absolute inset-0 bg-gradient-to-r ${stat.color} opacity-10 group-hover:opacity-20 transition-opacity`}></div>
                      <CardContent className="p-6 relative">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-gray-600 dark:text-gray-300">{stat.title}</p>
                            <p className="text-2xl font-bold text-gray-800 dark:text-white mt-1">{stat.value}</p>
                            <p className={`text-sm mt-1 ${stat.change.includes('+') ? 'text-green-600' : stat.change === 'Alert' ? 'text-red-600' : 'text-red-600'}`}>
                              {stat.change}
                            </p>
                          </div>
                          <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${stat.color} flex items-center justify-center`}>
                            <BarChart3 className="w-6 h-6 text-white" />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Sales Performance Chart Placeholder */}
                <Card>
                  <CardHeader>
                    <CardTitle>Sales Performance</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64 bg-gradient-to-r from-amber-50 to-yellow-50 dark:from-gray-800 dark:to-gray-700 rounded-lg flex items-center justify-center">
                      <div className="text-center">
                        <BarChart3 className="w-16 h-16 text-amber-500 mx-auto mb-4" />
                        <p className="text-gray-600 dark:text-gray-300">Charts will be implemented in next phase</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Inventory Overview */}
                <div className="grid md:grid-cols-3 gap-6">
                  <Card>
                    <CardContent className="p-6 text-center">
                      <Package className="w-12 h-12 text-blue-500 mx-auto mb-4" />
                      <p className="text-2xl font-bold text-gray-800 dark:text-white">1,245</p>
                      <p className="text-gray-600 dark:text-gray-300">Total Items</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-6 text-center">
                      <Bell className="w-12 h-12 text-red-500 mx-auto mb-4" />
                      <p className="text-2xl font-bold text-gray-800 dark:text-white">3</p>
                      <p className="text-gray-600 dark:text-gray-300">Low Stock</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-6 text-center">
                      <User className="w-12 h-12 text-green-500 mx-auto mb-4" />
                      <p className="text-2xl font-bold text-gray-800 dark:text-white">156</p>
                      <p className="text-gray-600 dark:text-gray-300">Total Customers</p>
                    </CardContent>
                  </Card>
                </div>
              </main>
            )}

            {/* Other tab content placeholders */}
            {activeTab !== 'dashboard' && (
              <main className="p-6">
                <Card>
                  <CardContent className="p-12 text-center">
                    <Package className="w-16 h-16 text-amber-500 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                      {menuItems.find(item => item.id === activeTab)?.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      This section will be implemented in the next phase
                    </p>
                  </CardContent>
                </Card>
              </main>
            )}
          </SidebarInset>
        </div>
      </SidebarProvider>
    </div>
  );
};

export default MainDashboard;
