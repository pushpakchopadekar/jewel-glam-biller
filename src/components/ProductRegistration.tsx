
import React, { useState } from 'react';
import { Package, Camera, Hash, Save, Zap, Gem, Coins, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/components/ui/use-toast';

const ProductRegistration = () => {
  const [productData, setProductData] = useState({
    name: '',
    category: '',
    weight: '',
    purity: '',
    purchasePrice: '',
    sellingPrice: '',
    quantity: '',
    barcodeNumber: '',
    image: null as File | null
  });

  const [generatedBarcode, setGeneratedBarcode] = useState('');

  const handleInputChange = (field: string, value: string) => {
    setProductData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const generateBarcode = () => {
    const barcode = `JWL${Date.now().toString().slice(-8)}`;
    setGeneratedBarcode(barcode);
    setProductData(prev => ({
      ...prev,
      barcodeNumber: barcode
    }));
    toast({
      title: "✨ Barcode Generated Successfully!",
      description: `Barcode: ${barcode}`,
    });
  };

  const handleSubmit = () => {
    if (!productData.name || !productData.category) {
      toast({
        title: "⚠️ Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "🎉 Product Registered Successfully!",
      description: `${productData.name} has been added to inventory`,
    });

    // Reset form
    setProductData({
      name: '',
      category: '',
      weight: '',
      purity: '',
      purchasePrice: '',
      sellingPrice: '',
      quantity: '',
      barcodeNumber: '',
      image: null
    });
    setGeneratedBarcode('');
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProductData(prev => ({
        ...prev,
        image: file
      }));
      toast({
        title: "📸 Image Uploaded",
        description: "Product image has been added",
      });
    }
  };

  return (
    <div className="p-6 space-y-8 bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-pink-900/20 min-h-screen">
      {/* Header with 3D Icon */}
      <div className="text-center mb-8">
        <div className="flex justify-center mb-4">
          <div className="relative">
            <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center transform rotate-12 hover:rotate-45 transition-all duration-500 shadow-2xl">
              <Package className="w-10 h-10 text-white animate-pulse" />
            </div>
            <div className="absolute inset-0 w-20 h-20 bg-gradient-to-r from-purple-400 to-pink-500 rounded-2xl blur-xl opacity-30 animate-pulse"></div>
          </div>
        </div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          Product Registration
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mt-2">Add new jewelry items to your inventory</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Basic Product Information */}
        <Card className="shadow-2xl border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg">
          <CardHeader className="bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-t-lg">
            <CardTitle className="flex items-center space-x-2">
              <Gem className="w-6 h-6 animate-spin-slow" />
              <span>Basic Information</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            <div className="space-y-2">
              <Label className="text-purple-700 dark:text-purple-300 font-semibold">Product Name *</Label>
              <Input
                value={productData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="e.g., Gold Chain"
                className="border-purple-200 dark:border-purple-600 focus:border-purple-500 transition-all duration-300"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-purple-700 dark:text-purple-300 font-semibold">Category *</Label>
              <Select value={productData.category} onValueChange={(value) => handleInputChange('category', value)}>
                <SelectTrigger className="border-purple-200 dark:border-purple-600 focus:border-purple-500">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="gold">
                    <div className="flex items-center space-x-2">
                      <Coins className="w-4 h-4 text-yellow-500" />
                      <span>Gold</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="silver">
                    <div className="flex items-center space-x-2">
                      <Gem className="w-4 h-4 text-gray-400" />
                      <span>Silver</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="imitation">
                    <div className="flex items-center space-x-2">
                      <Star className="w-4 h-4 text-pink-500" />
                      <span>Imitation</span>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {(productData.category === 'gold' || productData.category === 'silver') && (
              <>
                <div className="space-y-2">
                  <Label className="text-purple-700 dark:text-purple-300 font-semibold">Weight (grams)</Label>
                  <Input
                    type="number"
                    value={productData.weight}
                    onChange={(e) => handleInputChange('weight', e.target.value)}
                    placeholder="e.g., 10.5"
                    className="border-purple-200 dark:border-purple-600 focus:border-purple-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-purple-700 dark:text-purple-300 font-semibold">Purity</Label>
                  <Select value={productData.purity} onValueChange={(value) => handleInputChange('purity', value)}>
                    <SelectTrigger className="border-purple-200 dark:border-purple-600">
                      <SelectValue placeholder="Select purity" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="22k">22K</SelectItem>
                      <SelectItem value="24k">24K</SelectItem>
                      <SelectItem value="18k">18K</SelectItem>
                      <SelectItem value="925">925 Silver</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </>
            )}

            {productData.category === 'imitation' && (
              <>
                <div className="space-y-2">
                  <Label className="text-purple-700 dark:text-purple-300 font-semibold">Purchase Price (₹)</Label>
                  <Input
                    type="number"
                    value={productData.purchasePrice}
                    onChange={(e) => handleInputChange('purchasePrice', e.target.value)}
                    placeholder="e.g., 500"
                    className="border-purple-200 dark:border-purple-600 focus:border-purple-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-purple-700 dark:text-purple-300 font-semibold">Selling Price (₹)</Label>
                  <Input
                    type="number"
                    value={productData.sellingPrice}
                    onChange={(e) => handleInputChange('sellingPrice', e.target.value)}
                    placeholder="e.g., 750"
                    className="border-purple-200 dark:border-purple-600 focus:border-purple-500"
                  />
                </div>
              </>
            )}

            <div className="space-y-2">
              <Label className="text-purple-700 dark:text-purple-300 font-semibold">Quantity</Label>
              <Input
                type="number"
                value={productData.quantity}
                onChange={(e) => handleInputChange('quantity', e.target.value)}
                placeholder="e.g., 5"
                className="border-purple-200 dark:border-purple-600 focus:border-purple-500"
              />
            </div>
          </CardContent>
        </Card>

        {/* Image Upload & Barcode */}
        <Card className="shadow-2xl border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg">
          <CardHeader className="bg-gradient-to-r from-pink-500 to-orange-500 text-white rounded-t-lg">
            <CardTitle className="flex items-center space-x-2">
              <Camera className="w-6 h-6 animate-bounce" />
              <span>Image & Barcode</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            <div className="space-y-2">
              <Label className="text-pink-700 dark:text-pink-300 font-semibold">Product Image</Label>
              <div className="border-2 border-dashed border-pink-300 dark:border-pink-600 rounded-lg p-6 text-center hover:border-pink-500 transition-colors">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="image-upload"
                />
                <label htmlFor="image-upload" className="cursor-pointer">
                  <Camera className="w-12 h-12 text-pink-500 mx-auto mb-2" />
                  <p className="text-pink-600 dark:text-pink-400">Click to upload image</p>
                  {productData.image && (
                    <p className="text-green-600 mt-2">✓ {productData.image.name}</p>
                  )}
                </label>
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-pink-700 dark:text-pink-300 font-semibold">Barcode Number</Label>
              <Input
                value={productData.barcodeNumber}
                readOnly
                placeholder="Auto-generated after barcode creation"
                className="border-pink-200 dark:border-pink-600 bg-gray-50 dark:bg-gray-700"
              />
            </div>

            <Button
              onClick={generateBarcode}
              className="w-full bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600 text-white shadow-lg transform hover:scale-105 transition-all duration-300"
            >
              <Hash className="w-4 h-4 mr-2" />
              Generate Barcode
            </Button>

            {generatedBarcode && (
              <div className="p-4 bg-gradient-to-r from-pink-100 to-orange-100 dark:from-pink-900/30 dark:to-orange-900/30 rounded-lg text-center">
                <div className="font-mono text-lg font-bold text-pink-700 dark:text-pink-300 mb-2">
                  {generatedBarcode}
                </div>
                <div className="h-12 bg-gradient-to-r from-black via-gray-800 to-black bg-[length:4px_100%] bg-repeat-x rounded opacity-80"></div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Submit Button */}
      <div className="text-center">
        <Button
          onClick={handleSubmit}
          className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-12 py-4 text-lg font-semibold rounded-full shadow-2xl transform hover:scale-105 transition-all duration-300"
        >
          <Save className="w-5 h-5 mr-2" />
          Register Product
        </Button>
      </div>
    </div>
  );
};

export default ProductRegistration;
