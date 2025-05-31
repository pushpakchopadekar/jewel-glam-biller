
import React, { useState } from 'react';
import { Archive, AlertTriangle, Package, Search, TrendingDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface StockItem {
  id: string;
  name: string;
  category: 'gold' | 'silver' | 'imitation';
  barcode: string;
  quantity: number;
  reorderLevel: number;
  weight?: number;
  purity?: string;
  price?: number;
}

const AvailableStock = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('all');

  // Mock stock data
  const mockStock: StockItem[] = [
    {
      id: '1',
      name: 'Gold Chain',
      category: 'gold',
      barcode: 'JWL12345678',
      quantity: 5,
      reorderLevel: 3,
      weight: 10.5,
      purity: '22K'
    },
    {
      id: '2',
      name: 'Gold Earrings',
      category: 'gold',
      barcode: 'JWL55667788',
      quantity: 2,
      reorderLevel: 3,
      weight: 6.8,
      purity: '24K'
    },
    {
      id: '3',
      name: 'Silver Ring',
      category: 'silver',
      barcode: 'JWL87654321',
      quantity: 12,
      reorderLevel: 5,
      weight: 8.2,
      purity: '925'
    },
    {
      id: '4',
      name: 'Silver Bracelet',
      category: 'silver',
      barcode: 'JWL99887766',
      quantity: 8,
      reorderLevel: 4,
      weight: 15.3,
      purity: '925'
    },
    {
      id: '5',
      name: 'Fashion Necklace',
      category: 'imitation',
      barcode: 'JWL11223344',
      quantity: 25,
      reorderLevel: 10,
      price: 750
    },
    {
      id: '6',
      name: 'Designer Bangles',
      category: 'imitation',
      barcode: 'JWL44556677',
      quantity: 1,
      reorderLevel: 5,
      price: 450
    }
  ];

  const filteredStock = mockStock.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.barcode.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (activeTab === 'all') {
      return matchesSearch && (item.category === 'gold' || item.category === 'silver');
    }
    
    return matchesSearch && item.category === activeTab;
  });

  const getLowStockItems = () => {
    return mockStock.filter(item => item.quantity <= item.reorderLevel);
  };

  const getStockStatus = (quantity: number, reorderLevel: number) => {
    if (quantity === 0) {
      return { status: 'Out of Stock', color: 'bg-red-500 text-white', icon: '🚫' };
    } else if (quantity <= reorderLevel) {
      return { status: 'Low Stock', color: 'bg-yellow-500 text-white animate-pulse', icon: '⚠️' };
    } else if (quantity <= reorderLevel * 2) {
      return { status: 'Medium Stock', color: 'bg-orange-500 text-white', icon: '📦' };
    } else {
      return { status: 'In Stock', color: 'bg-green-500 text-white', icon: '✅' };
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

  const getStockValue = (category: string) => {
    return filteredStock.filter(item => item.category === category).length;
  };

  return (
    <div className="p-6 space-y-8 bg-gradient-to-br from-cyan-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-cyan-900/20 dark:to-blue-900/20 min-h-screen">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="flex justify-center mb-4">
          <div className="relative">
            <div className="w-20 h-20 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center transform rotate-12 hover:rotate-45 transition-all duration-500 shadow-2xl">
              <Archive className="w-10 h-10 text-white animate-pulse" />
            </div>
            <div className="absolute inset-0 w-20 h-20 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-2xl blur-xl opacity-30 animate-pulse"></div>
          </div>
        </div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
          Available Stock
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mt-2">Monitor your inventory levels</p>
      </div>

      {/* Stock Summary */}
      <div className="grid md:grid-cols-4 gap-6 mb-8">
        <Card className="shadow-2xl border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg">
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Package className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white">{mockStock.length}</h3>
            <p className="text-gray-600 dark:text-gray-300">Total Items</p>
          </CardContent>
        </Card>
        <Card className="shadow-2xl border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg">
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-xl">🥇</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white">{getStockValue('gold')}</h3>
            <p className="text-gray-600 dark:text-gray-300">Gold Items</p>
          </CardContent>
        </Card>
        <Card className="shadow-2xl border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg">
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-gradient-to-r from-gray-500 to-slate-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-xl">🥈</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white">{getStockValue('silver')}</h3>
            <p className="text-gray-600 dark:text-gray-300">Silver Items</p>
          </CardContent>
        </Card>
        <Card className="shadow-2xl border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg">
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertTriangle className="w-6 h-6 text-white animate-bounce" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white">{getLowStockItems().length}</h3>
            <p className="text-gray-600 dark:text-gray-300">Low Stock</p>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <Card className="shadow-2xl border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg">
        <CardContent className="p-6">
          <div className="relative">
            <Search className="absolute left-3 top-3 w-4 h-4 text-cyan-500" />
            <Input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search products by name or barcode..."
              className="pl-10 border-cyan-200 dark:border-cyan-600 focus:border-cyan-500"
            />
          </div>
        </CardContent>
      </Card>

      {/* Stock Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg shadow-lg">
          <TabsTrigger value="all" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500 data-[state=active]:to-blue-600 data-[state=active]:text-white">
            All ({mockStock.filter(p => p.category === 'gold' || p.category === 'silver').length})
          </TabsTrigger>
          <TabsTrigger value="gold" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-yellow-500 data-[state=active]:to-orange-600 data-[state=active]:text-white">
            🥇 Gold ({getStockValue('gold')})
          </TabsTrigger>
          <TabsTrigger value="silver" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-gray-500 data-[state=active]:to-slate-600 data-[state=active]:text-white">
            🥈 Silver ({getStockValue('silver')})
          </TabsTrigger>
          <TabsTrigger value="imitation" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-pink-500 data-[state=active]:to-purple-600 data-[state=active]:text-white">
            💎 Imitation ({getStockValue('imitation')})
          </TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab}>
          <Card className="shadow-2xl border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <span>{getCategoryIcon(activeTab === 'all' ? 'gold' : activeTab)}</span>
                <span>
                  {activeTab === 'all' ? 'All Available Stock (Gold & Silver)' : 
                   activeTab.charAt(0).toUpperCase() + activeTab.slice(1) + ' Stock'}
                </span>
                <span className="text-sm text-gray-500">({filteredStock.length} items)</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Product Name</TableHead>
                      <TableHead>Barcode</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Details</TableHead>
                      <TableHead>Available Qty</TableHead>
                      <TableHead>Reorder Level</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredStock.map((item) => {
                      const stockStatus = getStockStatus(item.quantity, item.reorderLevel);
                      return (
                        <TableRow key={item.id} className={`hover:bg-cyan-50 dark:hover:bg-cyan-900/20 ${item.quantity <= item.reorderLevel ? 'bg-red-50 dark:bg-red-900/10' : ''}`}>
                          <TableCell className="font-semibold">{item.name}</TableCell>
                          <TableCell className="font-mono text-sm">{item.barcode}</TableCell>
                          <TableCell>
                            <span className={`px-3 py-1 rounded-full text-white text-xs font-semibold bg-gradient-to-r ${getCategoryColor(item.category)}`}>
                              {getCategoryIcon(item.category)} {item.category.toUpperCase()}
                            </span>
                          </TableCell>
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
                            <span className={`px-3 py-1 rounded-full text-lg font-bold ${
                              item.quantity === 0 ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300' :
                              item.quantity <= item.reorderLevel ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300' :
                              'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                            }`}>
                              {item.quantity}
                            </span>
                          </TableCell>
                          <TableCell>
                            <span className="px-2 py-1 bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300 rounded-full text-sm">
                              {item.reorderLevel}
                            </span>
                          </TableCell>
                          <TableCell>
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${stockStatus.color}`}>
                              {stockStatus.icon} {stockStatus.status}
                            </span>
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

export default AvailableStock;
