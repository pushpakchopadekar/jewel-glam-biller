
import React, { useState } from 'react';
import { Gem, ShoppingBag, TrendingUp, BarChart3, ArrowDown } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface WelcomePageProps {
  onEnterShop: () => void;
}

const WelcomePage: React.FC<WelcomePageProps> = ({ onEnterShop }) => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-yellow-50 dark:from-gray-900 dark:via-gray-800 dark:to-amber-900 relative overflow-hidden">
      {/* Animated Background Particles */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-2 h-2 bg-amber-400 rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-32 w-1 h-1 bg-yellow-500 rounded-full animate-bounce"></div>
        <div className="absolute bottom-32 left-32 w-3 h-3 bg-amber-300 rounded-full animate-ping"></div>
        <div className="absolute bottom-20 right-20 w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
      </div>

      {/* Hero Section */}
      <div className="container mx-auto px-6 py-20 text-center relative z-10">
        {/* 3D Rotating Diamond */}
        <div className="mb-8 flex justify-center">
          <div className="relative">
            <div className="w-32 h-32 animate-spin-slow">
              <Gem className="w-32 h-32 text-amber-500 drop-shadow-2xl transform rotate-12 hover:rotate-45 transition-transform duration-500" />
            </div>
            <div className="absolute inset-0 w-32 h-32 bg-gradient-to-r from-amber-400 to-yellow-500 rounded-full blur-xl opacity-30 animate-pulse"></div>
          </div>
        </div>

        <h1 className="text-6xl font-bold text-gray-800 dark:text-white mb-6 animate-fade-in">
          <span className="bg-gradient-to-r from-amber-500 to-yellow-600 bg-clip-text text-transparent">
            Jewelry
          </span>
          <br />
          <span className="text-4xl">Billing Software</span>
        </h1>

        <p className="text-xl text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto animate-fade-in">
          Complete billing solution for your jewelry business with inventory management, 
          sales tracking, and beautiful 3D interfaces.
        </p>

        <Button 
          onClick={onEnterShop}
          className="bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-600 hover:to-yellow-700 text-white px-8 py-4 text-lg font-semibold rounded-full shadow-2xl transform hover:scale-105 transition-all duration-300 animate-bounce"
        >
          Enter Shop ✨
        </Button>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mt-20">
          {[
            { 
              icon: ShoppingBag, 
              title: "Smart Billing", 
              desc: "Invoice with ₹ calculations",
              color: "from-blue-500 to-purple-600"
            },
            { 
              icon: TrendingUp, 
              title: "Inventory", 
              desc: "Real-time stock alerts",
              color: "from-green-500 to-emerald-600"
            },
            { 
              icon: BarChart3, 
              title: "Analytics", 
              desc: "Growth insights & charts",
              color: "from-orange-500 to-red-600"
            }
          ].map((feature, index) => (
            <div
              key={index}
              className={`relative p-8 rounded-2xl bg-white dark:bg-gray-800 shadow-xl transform transition-all duration-300 ${
                hoveredCard === index ? 'scale-105 rotate-2' : 'hover:scale-102'
              }`}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r ${feature.color} flex items-center justify-center`}>
                <feature.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">{feature.title}</h3>
              <p className="text-gray-600 dark:text-gray-300">{feature.desc}</p>
              {hoveredCard === index && (
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-amber-400/20 to-yellow-500/20 animate-pulse"></div>
              )}
            </div>
          ))}
        </div>

        {/* Scroll Hint */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ArrowDown className="w-8 h-8 text-amber-500" />
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
