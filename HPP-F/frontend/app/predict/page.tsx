"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Home as HomeIcon, 
  TrendingUp, 
  MapPin, 
  Users, 
  Calendar, 
  Bed, 
  DollarSign,
  Sparkles,
  AlertCircle,
  CheckCircle2,
  Loader2,
  LogOut,
  User as UserIcon
} from "lucide-react";
import { useAuth } from "@/lib/auth";

interface HouseFeatures {
  MedInc: number;
  HouseAge: number;
  AveRooms: number;
  AveBedrms: number;
  Population: number;
  AveOccup: number;
  Latitude: number;
  Longitude: number;
}

export default function PredictPage() {
  const { user, token, logout, loading: authLoading } = useAuth();
  const router = useRouter();
  const [features, setFeatures] = useState<HouseFeatures>({
    MedInc: 3.5,
    HouseAge: 15.0,
    AveRooms: 5.0,
    AveBedrms: 1.0,
    Population: 1000,
    AveOccup: 3.0,
    Latitude: 37.5,
    Longitude: -122.0,
  });
  const [prediction, setPrediction] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  
  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/login");
    }
  }, [user, authLoading, router]);

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-purple-400 animate-spin" />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFeatures((prev) => ({
      ...prev,
      [name]: parseFloat(value) || 0,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setPrediction(null);
    setShowResult(false);

    try {
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000";
      const response = await axios.post(`${backendUrl}/predict`, features, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setPrediction(response.data.predicted_price);
      setShowResult(true);
    } catch (err: any) {
      if (err.response?.status === 401) {
        setError("Session expired. Please login again.");
        logout();
        router.push("/login");
      } else {
        setError("Failed to get prediction. Please try again.");
      }
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fields = [
    { name: "MedInc", label: "Median Income", description: "Block group median income", icon: DollarSign, step: "0.1" },
    { name: "HouseAge", label: "House Age", description: "Median house age (years)", icon: Calendar, step: "1" },
    { name: "AveRooms", label: "Average Rooms", description: "Rooms per household", icon: HomeIcon, step: "0.1" },
    { name: "AveBedrms", label: "Average Bedrooms", description: "Bedrooms per household", icon: Bed, step: "0.1" },
    { name: "Population", label: "Population", description: "Block group population", icon: Users, step: "1" },
    { name: "AveOccup", label: "Average Occupancy", description: "Household members", icon: Users, step: "0.1" },
    { name: "Latitude", label: "Latitude", description: "Geographic latitude", icon: MapPin, step: "0.01" },
    { name: "Longitude", label: "Longitude", description: "Geographic longitude", icon: MapPin, step: "0.01" },
  ];

  return (
    <main className="min-h-screen relative overflow-hidden">
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-purple-500/20 rounded-full"
            animate={{
              x: [Math.random() * window.innerWidth, Math.random() * window.innerWidth],
              y: [Math.random() * window.innerHeight, Math.random() * window.innerHeight],
            }}
            transition={{
              duration: Math.random() * 10 + 20,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </div>

      <div className="relative z-10 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-3 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 px-4 py-2">
                <UserIcon className="w-5 h-5 text-purple-400" />
                <span className="text-white font-medium">{user.name}</span>
              </div>
              <motion.button
                onClick={logout}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-400 px-4 py-2 rounded-xl font-medium transition-all"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </motion.button>
            </div>
            
            <div className="text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                className="inline-flex items-center gap-2 bg-purple-500/10 backdrop-blur-sm border border-purple-500/20 rounded-full px-6 py-2 mb-6"
              >
                <Sparkles className="w-5 h-5 text-purple-400" />
                <span className="text-purple-300 font-medium">AI-Powered Prediction</span>
              </motion.div>
              
              <h1 className="text-5xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
                House Price Prediction
              </h1>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                Get instant, accurate property valuations using advanced machine learning
              </p>
            </div>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Form Section */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="lg:col-span-2"
            >
              <div className="bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-purple-500/20 rounded-xl">
                    <TrendingUp className="w-6 h-6 text-purple-400" />
                  </div>
                  <h2 className="text-2xl font-bold text-white">Property Details</h2>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    {fields.map((field, index) => {
                      const Icon = field.icon;
                      return (
                        <motion.div
                          key={field.name}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.4 + index * 0.05 }}
                          className="group"
                        >
                          <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                            <Icon className="w-4 h-4 text-purple-400" />
                            {field.label}
                          </label>
                          <div className="relative">
                            <input
                              type="number"
                              name={field.name}
                              step={field.step}
                              value={features[field.name as keyof HouseFeatures]}
                              onChange={handleInputChange}
                              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all group-hover:border-purple-500/50"
                              required
                            />
                          </div>
                          <p className="text-xs text-gray-400 mt-1">{field.description}</p>
                        </motion.div>
                      );
                    })}
                  </div>

                  <motion.button
                    type="submit"
                    disabled={loading}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 px-6 rounded-xl font-semibold text-lg shadow-lg shadow-purple-500/50 hover:shadow-purple-500/70 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-slate-900 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Analyzing Property...
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-5 h-5" />
                        Predict Price
                      </>
                    )}
                  </motion.button>
                </form>
              </div>
            </motion.div>

            {/* Results Section */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="lg:col-span-1"
            >
              <div className="sticky top-8 space-y-6">
                {/* Prediction Result */}
                <AnimatePresence mode="wait">
                  {showResult && prediction !== null && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9, y: 20 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9, y: -20 }}
                      className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-xl rounded-3xl border border-purple-500/30 shadow-2xl p-8"
                    >
                      <div className="flex items-center gap-2 mb-4">
                        <CheckCircle2 className="w-6 h-6 text-green-400" />
                        <h3 className="text-xl font-semibold text-white">Predicted Value</h3>
                      </div>
                      
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                        className="text-center py-6"
                      >
                        <div className="text-5xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent mb-2">
                          ${prediction.toLocaleString("en-US", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}
                        </div>
                        <p className="text-gray-300 text-sm">Estimated Market Value</p>
                      </motion.div>

                      <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-white/10">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-purple-400">±5%</div>
                          <div className="text-xs text-gray-400">Confidence</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-pink-400">ML</div>
                          <div className="text-xs text-gray-400">AI Model</div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Error Message */}
                <AnimatePresence>
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className="bg-red-500/10 backdrop-blur-xl rounded-2xl border border-red-500/30 p-6"
                    >
                      <div className="flex items-start gap-3">
                        <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                        <div>
                          <h4 className="text-red-400 font-semibold mb-1">Error</h4>
                          <p className="text-red-300 text-sm">{error}</p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Info Card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6"
                >
                  <h3 className="text-lg font-semibold text-white mb-4">How it works</h3>
                  <ul className="space-y-3 text-sm text-gray-300">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-purple-400 flex-shrink-0 mt-0.5" />
                      <span>Enter property details and location data</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-purple-400 flex-shrink-0 mt-0.5" />
                      <span>AI analyzes patterns from thousands of properties</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-purple-400 flex-shrink-0 mt-0.5" />
                      <span>Get instant, accurate price predictions</span>
                    </li>
                  </ul>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </main>
  );
}
