
import React, { useState } from 'react';
import { History, Download, Eye, Share2, Calendar, Filter, FileText, Sheet } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/components/ui/use-toast';

interface Sale {
  id: string;
  date: string;
  customerName: string;
  customerPhone: string;
  items: Array<{
    name: string;
    category: 'gold' | 'silver' | 'imitation';
    quantity: number;
  }>;
  total: number;
  invoiceNumber: string;
}

const SalesHistory = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('date');
  const [filterPeriod, setFilterPeriod] = useState('all');

  // Mock sales data
  const mockSales: Sale[] = [
    {
      id: '1',
      date: '2024-01-15',
      customerName: 'Rajesh Kumar',
      customerPhone: '+91 9876543210',
      items: [
        { name: 'Gold Chain', category: 'gold', quantity: 1 },
        { name: 'Gold Earrings', category: 'gold', quantity: 1 }
      ],
      total: 125000,
      invoiceNumber: 'INV-2024-001'
    },
    {
      id: '2',
      date: '2024-01-14',
      customerName: 'Priya Sharma',
      customerPhone: '+91 9876543211',
      items: [
        { name: 'Silver Ring', category: 'silver', quantity: 2 }
      ],
      total: 8500,
      invoiceNumber: 'INV-2024-002'
    },
    {
      id: '3',
      date: '2024-01-13',
      customerName: 'Amit Patel',
      customerPhone: '+91 9876543212',
      items: [
        { name: 'Fashion Necklace', category: 'imitation', quantity: 3 },
        { name: 'Designer Bangles', category: 'imitation', quantity: 2 }
      ],
      total: 3750,
      invoiceNumber: 'INV-2024-003'
    },
    {
      id: '4',
      date: '2024-01-12',
      customerName: 'Sunita Singh',
      customerPhone: '+91 9876543213',
      items: [
        { name: 'Gold Bracelet', category: 'gold', quantity: 1 },
        { name: 'Silver Earrings', category: 'silver', quantity: 1 }
      ],
      total: 95000,
      invoiceNumber: 'INV-2024-004'
    },
    {
      id: '5',
      date: '2024-01-11',
      customerName: 'Vikram Gupta',
      customerPhone: '+91 9876543214',
      items: [
        { name: 'Silver Chain', category: 'silver', quantity: 1 }
      ],
      total: 12000,
      invoiceNumber: 'INV-2024-005'
    }
  ];

  const filteredSales = mockSales.filter(sale => {
    const matchesSearch = sale.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         sale.customerPhone.includes(searchTerm) ||
                         sale.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  const handleViewInvoice = (invoiceNumber: string) => {
    toast({
      title: "📄 Invoice Viewer",
      description: `Opening invoice ${invoiceNumber}`,
    });
  };

  const handleDownloadInvoice = (invoiceNumber: string) => {
    toast({
      title: "⬇️ Download Started",
      description: `Downloading invoice ${invoiceNumber} as PDF`,
    });
  };

  const handleShareInvoice = (customerName: string, phone: string) => {
    toast({
      title: "📱 Share Invoice",
      description: `Sharing invoice with ${customerName} via WhatsApp`,
    });
  };

  const handleExportPDF = () => {
    toast({
      title: "📄 Exporting to PDF",
      description: "Sales history is being exported as PDF",
    });
  };

  const handleExportExcel = () => {
    toast({
      title: "📊 Exporting to Excel",
      description: "Sales history is being exported as Excel file",
    });
  };

  const getTotalRevenue = () => {
    return filteredSales.reduce((sum, sale) => sum + sale.total, 0);
  };

  const getCategoryBadge = (category: string) => {
    switch (category) {
      case 'gold':
        return <span className="px-2 py-1 bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300 rounded-full text-xs">🥇 Gold</span>;
      case 'silver':
        return <span className="px-2 py-1 bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300 rounded-full text-xs">🥈 Silver</span>;
      case 'imitation':
        return <span className="px-2 py-1 bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-300 rounded-full text-xs">💎 Imitation</span>;
      default:
        return null;
    }
  };

  return (
    <div className="p-6 space-y-8 bg-gradient-to-br from-rose-50 via-orange-50 to-yellow-50 dark:from-gray-900 dark:via-rose-900/20 dark:to-orange-900/20 min-h-screen">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="flex justify-center mb-4">
          <div className="relative">
            <div className="w-20 h-20 bg-gradient-to-r from-rose-500 to-orange-600 rounded-2xl flex items-center justify-center transform rotate-12 hover:rotate-45 transition-all duration-500 shadow-2xl">
              <History className="w-10 h-10 text-white animate-pulse" />
            </div>
            <div className="absolute inset-0 w-20 h-20 bg-gradient-to-r from-rose-400 to-orange-500 rounded-2xl blur-xl opacity-30 animate-pulse"></div>
          </div>
        </div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-rose-600 to-orange-600 bg-clip-text text-transparent">
          Sales History
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mt-2">Track all your sales and transactions</p>
      </div>

      {/* Summary Cards */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <Card className="shadow-2xl border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg">
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white">{filteredSales.length}</h3>
            <p className="text-gray-600 dark:text-gray-300">Total Sales</p>
          </CardContent>
        </Card>
        <Card className="shadow-2xl border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg">
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Calendar className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white">Today</h3>
            <p className="text-gray-600 dark:text-gray-300">Latest Sale</p>
          </CardContent>
        </Card>
        <Card className="shadow-2xl border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg">
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Download className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white">₹{getTotalRevenue().toLocaleString()}</h3>
            <p className="text-gray-600 dark:text-gray-300">Total Revenue</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Export */}
      <Card className="shadow-2xl border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg">
        <CardContent className="p-6">
          <div className="grid md:grid-cols-5 gap-4 items-end">
            <div className="md:col-span-2">
              <Input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by customer, phone, or invoice..."
                className="border-rose-200 dark:border-rose-600 focus:border-rose-500"
              />
            </div>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="border-rose-200 dark:border-rose-600">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="date">Date</SelectItem>
                <SelectItem value="amount">Amount</SelectItem>
                <SelectItem value="customer">Customer</SelectItem>
              </SelectContent>
            </Select>
            <Button
              onClick={handleExportPDF}
              variant="outline"
              className="border-rose-200 dark:border-rose-600 hover:bg-rose-50 dark:hover:bg-rose-900/20"
            >
              <FileText className="w-4 h-4 mr-2" />
              Export PDF
            </Button>
            <Button
              onClick={handleExportExcel}
              variant="outline"
              className="border-rose-200 dark:border-rose-600 hover:bg-rose-50 dark:hover:bg-rose-900/20"
            >
              <Sheet className="w-4 h-4 mr-2" />
              Export Excel
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Sales Table */}
      <Card className="shadow-2xl border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <History className="w-6 h-6 text-rose-600" />
            <span>Sales Records</span>
            <span className="text-sm text-gray-500">({filteredSales.length} records)</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Invoice #</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Items</TableHead>
                  <TableHead>Total Amount</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSales.map((sale) => (
                  <TableRow key={sale.id} className="hover:bg-rose-50 dark:hover:bg-rose-900/20">
                    <TableCell className="font-medium">
                      {new Date(sale.date).toLocaleDateString('en-IN')}
                    </TableCell>
                    <TableCell className="font-mono text-sm">{sale.invoiceNumber}</TableCell>
                    <TableCell className="font-semibold">{sale.customerName}</TableCell>
                    <TableCell className="font-mono text-sm">{sale.customerPhone}</TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        {sale.items.map((item, index) => (
                          <div key={index} className="flex items-center space-x-2">
                            <span className="text-sm">{item.name} (x{item.quantity})</span>
                            {getCategoryBadge(item.category)}
                          </div>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell className="font-bold text-lg">₹{sale.total.toLocaleString()}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button
                          onClick={() => handleViewInvoice(sale.invoiceNumber)}
                          variant="outline"
                          size="sm"
                          className="border-blue-200 dark:border-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20"
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button
                          onClick={() => handleDownloadInvoice(sale.invoiceNumber)}
                          variant="outline"
                          size="sm"
                          className="border-green-200 dark:border-green-600 hover:bg-green-50 dark:hover:bg-green-900/20"
                        >
                          <Download className="w-4 h-4" />
                        </Button>
                        <Button
                          onClick={() => handleShareInvoice(sale.customerName, sale.customerPhone)}
                          variant="outline"
                          size="sm"
                          className="border-purple-200 dark:border-purple-600 hover:bg-purple-50 dark:hover:bg-purple-900/20"
                        >
                          <Share2 className="w-4 h-4" />
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
    </div>
  );
};

export default SalesHistory;
