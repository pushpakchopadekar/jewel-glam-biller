
import React, { useState } from 'react';
import { Package, Edit, Trash2, Search, Filter, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { toast } from '@/components/ui/use-toast';

interface Product {
  id: string;
  name: string;
  category: 'gold' | 'silver' | 'imitation';
  barcode: string;
  weight?: number;
  purity?: string;
  purchasePrice?: number;
  sellingPrice?: number;
  quantity: number;
  image: string;
}

const RegisteredProducts = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('all');

  // Mock data
  const mockProducts: Product[] = [
    {
      id: '1',
      name: 'Gold Chain',
      category: 'gold',
      barcode: 'JWL12345678',
      weight: 10.5,
      purity: '22K',
      quantity: 5,
      image: '/placeholder.svg'
    },
    {
      id: '2',
      name: 'Silver Ring',
      category: 'silver',
      barcode: 'JWL87654321',
      weight: 8.2,
      purity: '925',
      quantity: 12,
      image: '/placeholder.svg'
    },
    {
      id: '3',
      name: 'Fashion Necklace',
      category: 'imitation',
      barcode: 'JWL11223344',
      purchasePrice: 500,
      sellingPrice: 750,
      quantity: 25,
      image: '/placeholder.svg'
    },
    {
      id: '4',
      name: 'Gold Earrings',
      category: 'gold',
      barcode: 'JWL55667788',
      weight: 6.8,
      purity: '24K',
      quantity: 3,
      image: '/placeholder.svg'
    },
    {
      id: '5',
      name: 'Silver Bracelet',
      category: 'silver',
      barcode: 'JWL99887766',
      weight: 15.3,
      purity: '925',
      quantity: 8,
      image: '/placeholder.svg'
    },
    {
      id: '6',
      name: 'Designer Bangles',
      category: 'imitation',
      barcode: 'JWL44556677',
      purchasePrice: 300,
      sellingPrice: 450,
      quantity: 1,
      image: '/placeholder.svg'
    }
  ];

  const filteredProducts = mockProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.barcode.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (activeTab === 'all') {
      return matchesSearch && (product.category === 'gold' || product.category === 'silver');
    }
    
    return matchesSearch && product.category === activeTab;
  });

  const handleEdit = (id: string) => {
    toast({
      title: "✏️ Edit Product",
      description: "Edit functionality will be implemented",
    });
  };

  const handleDelete = (id: string, name: string) => {
    toast({
      title: "🗑️ Product Deleted",
      description: `${name} has been removed from inventory`,
      variant: "destructive"
    });
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

  return (
    <div className="p-6 space-y-8 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-indigo-900/20 dark:to-purple-900/20 min-h-screen">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="flex justify-center mb-4">
          <div className="relative">
            <div className="w-20 h-20 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center transform rotate-12 hover:rotate-45 transition-all duration-500 shadow-2xl">
              <Package className="w-10 h-10 text-white animate-pulse" />
            </div>
            <div className="absolute inset-0 w-20 h-20 bg-gradient-to-r from-indigo-400 to-purple-500 rounded-2xl blur-xl opacity-30 animate-pulse"></div>
          </div>
        </div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          Registered Products
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mt-2">Manage your jewelry inventory</p>
      </div>

      {/* Search and Filters */}
      <Card className="shadow-2xl border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 w-4 h-4 text-indigo-500" />
              <Input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search products by name or barcode..."
                className="pl-10 border-indigo-200 dark:border-indigo-600 focus:border-indigo-500"
              />
            </div>
            <Button variant="outline" className="border-indigo-200 dark:border-indigo-600">
              <Filter className="w-4 h-4 mr-2" />
              Advanced Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Products Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg shadow-lg">
          <TabsTrigger value="all" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-500 data-[state=active]:to-purple-600 data-[state=active]:text-white">
            All ({mockProducts.filter(p => p.category === 'gold' || p.category === 'silver').length})
          </TabsTrigger>
          <TabsTrigger value="gold" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-yellow-500 data-[state=active]:to-orange-600 data-[state=active]:text-white">
            🥇 Gold ({mockProducts.filter(p => p.category === 'gold').length})
          </TabsTrigger>
          <TabsTrigger value="silver" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-gray-500 data-[state=active]:to-slate-600 data-[state=active]:text-white">
            🥈 Silver ({mockProducts.filter(p => p.category === 'silver').length})
          </TabsTrigger>
          <TabsTrigger value="imitation" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-pink-500 data-[state=active]:to-purple-600 data-[state=active]:text-white">
            💎 Imitation ({mockProducts.filter(p => p.category === 'imitation').length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab}>
          <Card className="shadow-2xl border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <span>{getCategoryIcon(activeTab === 'all' ? 'gold' : activeTab)}</span>
                <span>
                  {activeTab === 'all' ? 'All Products (Gold & Silver)' : 
                   activeTab.charAt(0).toUpperCase() + activeTab.slice(1) + ' Products'}
                </span>
                <span className="text-sm text-gray-500">({filteredProducts.length} items)</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Image</TableHead>
                      <TableHead>Product Name</TableHead>
                      <TableHead>Barcode</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Weight/Price</TableHead>
                      <TableHead>Quantity</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredProducts.map((product) => (
                      <TableRow key={product.id} className="hover:bg-indigo-50 dark:hover:bg-indigo-900/20">
                        <TableCell>
                          <div className="w-12 h-12 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg flex items-center justify-center">
                            <Eye className="w-6 h-6 text-gray-600" />
                          </div>
                        </TableCell>
                        <TableCell className="font-semibold">{product.name}</TableCell>
                        <TableCell className="font-mono text-sm">{product.barcode}</TableCell>
                        <TableCell>
                          <span className={`px-3 py-1 rounded-full text-white text-xs font-semibold bg-gradient-to-r ${getCategoryColor(product.category)}`}>
                            {getCategoryIcon(product.category)} {product.category.toUpperCase()}
                          </span>
                        </TableCell>
                        <TableCell>
                          {product.category === 'imitation' ? (
                            <div className="text-sm">
                              <div>Buy: ₹{product.purchasePrice}</div>
                              <div>Sell: ₹{product.sellingPrice}</div>
                            </div>
                          ) : (
                            <div className="text-sm">
                              <div>{product.weight}g</div>
                              <div className="text-gray-500">{product.purity}</div>
                            </div>
                          )}
                        </TableCell>
                        <TableCell>
                          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                            product.quantity <= 2 
                              ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300' 
                              : product.quantity <= 5 
                              ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300'
                              : 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                          }`}>
                            {product.quantity}
                          </span>
                        </TableCell>
                        <TableCell>
                          {product.quantity <= 2 ? (
                            <span className="px-2 py-1 bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300 rounded-full text-xs font-semibold animate-pulse">
                              Low Stock
                            </span>
                          ) : (
                            <span className="px-2 py-1 bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 rounded-full text-xs font-semibold">
                              In Stock
                            </span>
                          )}
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button
                              onClick={() => handleEdit(product.id)}
                              variant="outline"
                              size="sm"
                              className="border-indigo-200 dark:border-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/20"
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button
                              onClick={() => handleDelete(product.id, product.name)}
                              variant="outline"
                              size="sm"
                              className="border-red-200 dark:border-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
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

export default RegisteredProducts;
