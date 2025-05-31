
import React, { useState } from 'react';
import { ShoppingCart, User, Phone, Mail, Scan, Plus, Trash2, Calculator, Receipt } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/components/ui/use-toast';

interface CartItem {
  id: string;
  name: string;
  category: string;
  price: number;
  quantity: number;
  weight?: number;
  makingCharges: number;
  gst: number;
  total: number;
}

const StartSale = () => {
  const [customer, setCustomer] = useState({
    name: '',
    address: '',
    phone: '',
    email: ''
  });

  const [barcodeInput, setBarcodeInput] = useState('');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [makingChargesType, setMakingChargesType] = useState<'percentage' | 'fixed'>('percentage');
  const [makingChargesValue, setMakingChargesValue] = useState(10);

  // Mock current rates (would come from dashboard)
  const currentRates = {
    gold: 6850,
    silver: 85
  };

  const addToCart = () => {
    if (!barcodeInput) {
      toast({
        title: "⚠️ Missing Barcode",
        description: "Please enter a barcode number",
        variant: "destructive"
      });
      return;
    }

    // Mock product data (would fetch from API)
    const mockProduct = {
      id: barcodeInput,
      name: 'Gold Chain',
      category: 'gold',
      weight: 10.5,
      price: currentRates.gold * 10.5
    };

    const makingCharges = makingChargesType === 'percentage' 
      ? (mockProduct.price * makingChargesValue) / 100 
      : makingChargesValue;
    
    const subtotal = mockProduct.price + makingCharges;
    const gst = (subtotal * 3) / 100;
    const total = subtotal + gst;

    const cartItem: CartItem = {
      id: Date.now().toString(),
      name: mockProduct.name,
      category: mockProduct.category,
      price: mockProduct.price,
      quantity: 1,
      weight: mockProduct.weight,
      makingCharges,
      gst,
      total
    };

    setCart(prev => [...prev, cartItem]);
    setBarcodeInput('');
    
    toast({
      title: "✅ Product Added to Cart",
      description: `${mockProduct.name} added successfully`,
    });
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
    toast({
      title: "🗑️ Item Removed",
      description: "Product removed from cart",
    });
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) return;
    
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newPrice = (item.price / item.quantity) * quantity;
        const makingCharges = makingChargesType === 'percentage' 
          ? (newPrice * makingChargesValue) / 100 
          : makingChargesValue * quantity;
        const subtotal = newPrice + makingCharges;
        const gst = (subtotal * 3) / 100;
        
        return {
          ...item,
          quantity,
          price: newPrice,
          makingCharges,
          gst,
          total: subtotal + gst
        };
      }
      return item;
    }));
  };

  const getCartTotal = () => {
    return cart.reduce((sum, item) => sum + item.total, 0);
  };

  const generateInvoice = () => {
    if (!customer.name || cart.length === 0) {
      toast({
        title: "⚠️ Incomplete Information",
        description: "Please add customer details and products",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "🧾 Invoice Generated Successfully!",
      description: `Total: ₹${getCartTotal().toFixed(2)}`,
    });

    // Reset form
    setCustomer({ name: '', address: '', phone: '', email: '' });
    setCart([]);
    setBarcodeInput('');
  };

  return (
    <div className="p-6 space-y-8 bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 dark:from-gray-900 dark:via-emerald-900/20 dark:to-teal-900/20 min-h-screen">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="flex justify-center mb-4">
          <div className="relative">
            <div className="w-20 h-20 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center transform rotate-12 hover:rotate-45 transition-all duration-500 shadow-2xl">
              <ShoppingCart className="w-10 h-10 text-white animate-bounce" />
            </div>
            <div className="absolute inset-0 w-20 h-20 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-2xl blur-xl opacity-30 animate-pulse"></div>
          </div>
        </div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
          Start Sale
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mt-2">Create new sales invoice</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Customer Details */}
        <Card className="shadow-2xl border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg">
          <CardHeader className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-t-lg">
            <CardTitle className="flex items-center space-x-2">
              <User className="w-6 h-6 animate-pulse" />
              <span>Customer Details</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            <div className="space-y-2">
              <Label className="text-emerald-700 dark:text-emerald-300 font-semibold">Name *</Label>
              <Input
                value={customer.name}
                onChange={(e) => setCustomer(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Customer name"
                className="border-emerald-200 dark:border-emerald-600 focus:border-emerald-500"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-emerald-700 dark:text-emerald-300 font-semibold">Address</Label>
              <Input
                value={customer.address}
                onChange={(e) => setCustomer(prev => ({ ...prev, address: e.target.value }))}
                placeholder="Customer address"
                className="border-emerald-200 dark:border-emerald-600 focus:border-emerald-500"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-emerald-700 dark:text-emerald-300 font-semibold">Phone *</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-3 w-4 h-4 text-emerald-500" />
                <Input
                  value={customer.phone}
                  onChange={(e) => setCustomer(prev => ({ ...prev, phone: e.target.value }))}
                  placeholder="Phone number"
                  className="pl-10 border-emerald-200 dark:border-emerald-600 focus:border-emerald-500"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label className="text-emerald-700 dark:text-emerald-300 font-semibold">Email (Optional)</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 w-4 h-4 text-emerald-500" />
                <Input
                  value={customer.email}
                  onChange={(e) => setCustomer(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="Email address"
                  className="pl-10 border-emerald-200 dark:border-emerald-600 focus:border-emerald-500"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Add Products */}
        <Card className="shadow-2xl border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg">
          <CardHeader className="bg-gradient-to-r from-teal-500 to-cyan-600 text-white rounded-t-lg">
            <CardTitle className="flex items-center space-x-2">
              <Scan className="w-6 h-6 animate-spin-slow" />
              <span>Add Products</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            <div className="space-y-2">
              <Label className="text-teal-700 dark:text-teal-300 font-semibold">Barcode Number</Label>
              <div className="flex space-x-2">
                <Input
                  value={barcodeInput}
                  onChange={(e) => setBarcodeInput(e.target.value)}
                  placeholder="Scan or enter barcode"
                  className="border-teal-200 dark:border-teal-600 focus:border-teal-500"
                />
                <Button
                  onClick={addToCart}
                  className="bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700"
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-teal-700 dark:text-teal-300 font-semibold">Making Charges</Label>
              <Select value={makingChargesType} onValueChange={(value: 'percentage' | 'fixed') => setMakingChargesType(value)}>
                <SelectTrigger className="border-teal-200 dark:border-teal-600">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="percentage">Percentage (%)</SelectItem>
                  <SelectItem value="fixed">Fixed Amount (₹)</SelectItem>
                </SelectContent>
              </Select>
              <Input
                type="number"
                value={makingChargesValue}
                onChange={(e) => setMakingChargesValue(Number(e.target.value))}
                placeholder={makingChargesType === 'percentage' ? '10' : '500'}
                className="border-teal-200 dark:border-teal-600 focus:border-teal-500"
              />
            </div>

            <div className="p-4 bg-gradient-to-r from-emerald-100 to-teal-100 dark:from-emerald-900/30 dark:to-teal-900/30 rounded-lg">
              <h4 className="font-semibold text-emerald-700 dark:text-emerald-300 mb-2">Current Metal Rates</h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-yellow-600">Gold: </span>
                  <span className="font-bold">₹{currentRates.gold}/g</span>
                </div>
                <div>
                  <span className="text-gray-600">Silver: </span>
                  <span className="font-bold">₹{currentRates.silver}/g</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Cart */}
        <Card className="shadow-2xl border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg">
          <CardHeader className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-t-lg">
            <CardTitle className="flex items-center space-x-2">
              <ShoppingCart className="w-6 h-6 animate-bounce" />
              <span>Cart ({cart.length})</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-4 max-h-96 overflow-y-auto">
            {cart.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <ShoppingCart className="w-12 h-12 mx-auto mb-2 opacity-50" />
                <p>No items in cart</p>
              </div>
            ) : (
              cart.map(item => (
                <div key={item.id} className="p-4 border border-cyan-200 dark:border-cyan-600 rounded-lg bg-gradient-to-r from-cyan-50 to-blue-50 dark:from-cyan-900/20 dark:to-blue-900/20">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-semibold text-cyan-700 dark:text-cyan-300">{item.name}</h4>
                    <Button
                      onClick={() => removeFromCart(item.id)}
                      variant="outline"
                      size="sm"
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span>Base Price:</span>
                      <span>₹{(item.price / item.quantity).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Quantity:</span>
                      <div className="flex items-center space-x-2">
                        <Button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          variant="outline"
                          size="sm"
                          className="w-6 h-6 p-0"
                        >
                          -
                        </Button>
                        <span>{item.quantity}</span>
                        <Button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          variant="outline"
                          size="sm"
                          className="w-6 h-6 p-0"
                        >
                          +
                        </Button>
                      </div>
                    </div>
                    <div className="flex justify-between">
                      <span>Making Charges:</span>
                      <span>₹{item.makingCharges.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>GST (3%):</span>
                      <span>₹{item.gst.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between font-bold text-cyan-700 dark:text-cyan-300 border-t pt-1">
                      <span>Total:</span>
                      <span>₹{item.total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </CardContent>
        </Card>
      </div>

      {/* Checkout */}
      {cart.length > 0 && (
        <Card className="shadow-2xl border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg">
          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-2xl font-bold text-gray-800 dark:text-white">Cart Total</h3>
              <div className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                ₹{getCartTotal().toFixed(2)}
              </div>
            </div>
            <Button
              onClick={generateInvoice}
              className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white py-4 text-lg font-semibold rounded-full shadow-2xl transform hover:scale-105 transition-all duration-300"
            >
              <Receipt className="w-5 h-5 mr-2" />
              Generate Invoice
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default StartSale;
