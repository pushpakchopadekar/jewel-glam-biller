
import React, { useState } from 'react';
import { AlertTriangle, Package, TrendingDown, RefreshCw, Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { toast } from '@/components/ui/use-toast';

interface LowStockItem {
  id: string;
  name: string;
  category: 'gold' | 'silver' | 'imitation';
  barcode: string;
  currentStock: number;
  reorderLevel: number;
  lastSold: string;
  weight?: number;
  purity?: string;
  price?: number;
}

const StockAlert = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('all');

  // Mock low stock data
  const lowStockItems: LowStockItem[] = [
    {
      id: '1',
      name: 'Gold Earrings',
      category: 'gold',
      barcode: 'JWL55667788',
      currentStock: 2,
      reorderLevel: 5,
      lastSold: '2024-01-14',
      weight: 6.8,
      purity: '24K'
    },
    {
      id: '2',
      name: 'Designer Bangles',
      category: 'imitation',
      barcode: 'JWL44556677',
      currentStock: 1,
      reorderLevel: 5,
      lastSold: '2024-01-13',
      price: 450
    },
    {
      id: '3',
      name: 'Silver Pendant',
      category: 'silver',
      barcode: 'JWL77889900',
      currentStock: 0,
      reorderLevel: 3,
      lastSold: '2024-01-15',
      weight: 4.2,
      purity: '925'
    },
    {
      id: '4',
      name: 'Fashion Ring Set',
      category: 'imitation',
      barcode: 'JWL33445566',
      currentStock: 2,
      reorderLevel: 8,
      lastSold: '2024-01-12',
      price: 320
    },
    {
      id: '5',
      name: 'Gold Anklet',
      category: 'gold',
      barcode: 'JWL66778899',
      currentStock: 1,
      reorderLevel: 3,
      lastSold: '2024-01-11',
      weight: 12.5,
      purity: '22K'
    }
  ];

  const filteredItems = lowStockItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.barcode.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (activeTab === 'all') {
      return matchesSearch;
    }
    
    return matchesSearch && item.category === activeTab;
  });

  const getAlertLevel = (currentStock: number, reorderLevel: number) => {
    if (currentStock === 0) {
      return { level: 'critical', color: 'bg-red-500 text-white animate-pulse', icon: '🚨' };
    } else if (currentStock <= Math.floor(reorderLevel * 0.5)) {
      return { level: 'high', color: 'bg-orange-500 text-white animate-bounce', icon: '⚠️' };
    } else {
      return { level: 'medium', color: 'bg-yellow-500 text-white', icon: '⚡' };
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'gold': return 'from-yellow-400 to-orange-500';
      case 'silver': return 'from-gray-400 to-slate-500';
      case 'imitation': return 'from-pink-400 to-purple-500';
      default: return 'from-blue-400 to-cyan-500';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'gold': return '🥇';
      case 'silver': return '🥈';
      case 'imitation': return '💎';
      default: return '📦';
    }
  };

  const handleRestock = (itemName: string) => {
    toast({
      title: "📦 Restock Initiated",
      description: `Restock order created for ${itemName}`,
    });
  };

  const handleMarkAsRestocked = (itemName: string) => {
    toast({
      title: "✅ Stock Updated",
      description: `${itemName} has been marked as restocked`,
    });
  };

  const getCriticalCount = () => lowStockItems.filter(item => item.currentStock === 0).length;
  const getHighAlertCount = () => lowStockItems.filter(item => item.currentStock > 0 && item.currentStock <= Math.floor(item.reorderLevel * 0.5)).length;
  const getMediumAlertCount = () => lowStockItems.filter(item => item.currentStock > Math.floor(item.reorderLevel * 0.5) && item.currentStock <= item.reorderLevel).length;

  return (
    <div className="p-6 space-y-8 bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 dark:from-gray-900 dark:via-red-900/20 dark:to-orange-900/20 min-h-screen">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="flex justify-center mb-4">
          <div className="relative">
            <div className="w-20 h-20 bg-gradient-to-r from-red-500 to-orange-600 rounded-2xl flex items-center justify-center transform rotate-12 hover:rotate-45 transition-all duration-500 shadow-2xl animate-pulse">
              <AlertTriangle className="w-10 h-10 text-white animate-bounce" />
            </div>
            <div className="absolute inset-0 w-20 h-20 bg-gradient-to-r from-red-400 to-orange-500 rounded-2xl blur-xl opacity-30 animate-pulse"></div>
          </div>
        </div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
          Stock Alert
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mt-2">Monitor low stock and out-of-stock items</p>
      </div>

      {/* Alert Summary */}
      <div className="grid md:grid-cols-4 gap-6 mb-8">
        <Card className="shadow-2xl border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg">
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
              <span className="text-xl">🚨</span>
            </div>
            <h3 className="text-2xl font-bold text-red-600 dark:text-red-400">{getCriticalCount()}</h3>
            <p className="text-gray-600 dark:text-gray-300">Out of Stock</p>
          </CardContent>
        </Card>
        <Card className="shadow-2xl border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg">
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
              <span className="text-xl">⚠️</span>
            </div>
            <h3 className="text-2xl font-bold text-orange-600 dark:text-orange-400">{getHighAlertCount()}</h3>
            <p className="text-gray-600 dark:text-gray-300">High Alert</p>
          </CardContent>
        </Card>
        <Card className="shadow-2xl border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg">
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-xl">⚡</span>
            </div>
            <h3 className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">{getMediumAlertCount()}</h3>
            <p className="text-gray-600 dark:text-gray-300">Medium Alert</p>
          </CardContent>
        </Card>
        <Card className="shadow-2xl border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg">
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Package className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white">{lowStockItems.length}</h3>
            <p className="text-gray-600 dark:text-gray-300">Total Alerts</p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Actions */}
      <Card className="shadow-2xl border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="relative flex-1">
              <AlertTriangle className="absolute left-3 top-3 w-4 h-4 text-red-500" />
              <Input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search low stock items..."
                className="pl-10 border-red-200 dark:border-red-600 focus:border-red-500"
              />
            </div>
            <Button 
              variant="outline" 
              className="border-orange-200 dark:border-orange-600 hover:bg-orange-50 dark:hover:bg-orange-900/20"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh Alerts
            </Button>
            <Button 
              className="bg-gradient-to-r from-red-500 to-orange-600 hover:from-red-600 hover:to-orange-700 text-white"
            >
              <Bell className="w-4 h-4 mr-2" />
              Send Notifications
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Alert Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg shadow-lg">
          <TabsTrigger value="all" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-red-500 data-[state=active]:to-orange-600 data-[state=active]:text-white">
            All Alerts ({lowStockItems.length})
          </TabsTrigger>
          <TabsTrigger value="gold" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-yellow-500 data-[state=active]:to-orange-600 data-[state=active]:text-white">
            🥇 Gold ({lowStockItems.filter(item => item.category === 'gold').length})
          </TabsTrigger>
          <TabsTrigger value="silver" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-gray-500 data-[state=active]:to-slate-600 data-[state=active]:text-white">
            🥈 Silver ({lowStockItems.filter(item => item.category === 'silver').length})
          </TabsTrigger>
          <TabsTrigger value="imitation" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-pink-500 data-[state=active]:to-purple-600 data-[state=active]:text-white">
            💎 Imitation ({lowStockItems.filter(item => item.category === 'imitation').length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab}>
          <Card className="shadow-2xl border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <AlertTriangle className="w-6 h-6 text-red-600 animate-pulse" />
                <span>
                  {activeTab === 'all' ? 'All Stock Alerts' : 
                   `${activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Stock Alerts`}
                </span>
                <span className="text-sm text-gray-500">({filteredItems.length} items)</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Alert Level</TableHead>
                      <TableHead>Product Name</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Current Stock</TableHead>
                      <TableHead>Reorder Level</TableHead>
                      <TableHead>Last Sold</TableHead>
                      <TableHead>Details</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredItems.map((item) => {
                      const alert = getAlertLevel(item.currentStock, item.reorderLevel);
                      return (
                        <TableRow 
                          key={item.id} 
                          className={`hover:bg-red-50 dark:hover:bg-red-900/20 ${
                            item.currentStock === 0 ? 'bg-red-100 dark:bg-red-900/20' : 
                            item.currentStock <= Math.floor(item.reorderLevel * 0.5) ? 'bg-orange-100 dark:bg-orange-900/20' : 
                            'bg-yellow-100 dark:bg-yellow-900/20'
                          }`}
                        >
                          <TableCell>
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${alert.color}`}>
                              {alert.icon} {alert.level.toUpperCase()}
                            </span>
                          </TableCell>
                          <TableCell className="font-semibold">{item.name}</TableCell>
                          <TableCell>
                            <span className={`px-3 py-1 rounded-full text-white text-xs font-semibold bg-gradient-to-r ${getCategoryColor(item.category)}`}>
                              {getCategoryIcon(item.category)} {item.category.toUpperCase()}
                            </span>
                          </TableCell>
                          <TableCell>
                            <span className={`px-3 py-1 rounded-full text-lg font-bold ${
                              item.currentStock === 0 ? 'bg-red-500 text-white animate-pulse' :
                              'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300'
                            }`}>
                              {item.currentStock}
                            </span>
                          </TableCell>
                          <TableCell>
                            <span className="px-2 py-1 bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300 rounded-full text-sm">
                              {item.reorderLevel}
                            </span>
                          </TableCell>
                          <TableCell className="text-sm">{new Date(item.lastSold).toLocaleDateString('en-IN')}</TableCell>
                          <TableCell>
                            {item.category === 'imitation' ? (
                              <div className="text-sm">
                                <div>Price: ₹{item.price}</div>
                              </div>
                            ) : (
                              <div className="text-sm">
                                <div>Weight: {item.weight}g</div>
                                <div className="text-gray-500">Purity: {item.purity}</div>
                              </div>
                            )}
                          </TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              <Button
                                onClick={() => handleRestock(item.name)}
                                variant="outline"
                                size="sm"
                                className="border-blue-200 dark:border-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20"
                              >
                                <Package className="w-4 h-4 mr-1" />
                                Restock
                              </Button>
                              <Button
                                onClick={() => handleMarkAsRestocked(item.name)}
                                variant="outline"
                                size="sm"
                                className="border-green-200 dark:border-green-600 hover:bg-green-50 dark:hover:bg-green-900/20"
                              >
                                ✓ Done
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default StockAlert;
