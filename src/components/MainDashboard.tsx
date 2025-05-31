
import React, { useState } from 'react';
import { Gem, Home, Package, ShoppingCart, History, Archive, BarChart3, Bell, Settings, Sun, Moon, User, LogOut, AlertTriangle, Receipt } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import { SidebarProvider, Sidebar, SidebarContent, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';
import ProductRegistration from './ProductRegistration';
import StartSale from './StartSale';
import RegisteredProducts from './RegisteredProducts';
import SalesHistory from './SalesHistory';
import AvailableStock from './AvailableStock';
import StockAlert from './StockAlert';
import SalesOverview from './SalesOverview';
import MetalRatesWidget from './MetalRatesWidget';
import StatsCards from './StatsCards';
import SalesPerformanceCharts from './SalesPerformanceCharts';
import InventoryOverview from './InventoryOverview';

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
            <MetalRatesWidget metalRates={metalRates} setMetalRates={setMetalRates} />
            <StatsCards />
            <SalesPerformanceCharts />
            <InventoryOverview />
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
