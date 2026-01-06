"use client";

import { motion } from "framer-motion";
import { Home as HomeIcon, Sparkles, TrendingUp, Shield, Zap, LogIn, UserPlus } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/lib/auth";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <Sparkles className="w-8 h-8 text-purple-400 animate-pulse" />
        </motion.div>
      </div>
    );
  }

  if (user) {
    router.push("/predict");
    return null;
  }

  return (
    <main className="min-h-screen relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-purple-500/20 rounded-full"
            animate={{
              x: [Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000), Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000)],
              y: [Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1000), Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1000)],
            }}
            transition={{
              duration: Math.random() * 10 + 20,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </div>

      <div className="relative z-10 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-purple-500/10 backdrop-blur-sm border border-purple-500/20 rounded-full px-6 py-2 mb-8"
            >
              <Sparkles className="w-5 h-5 text-purple-400" />
              <span className="text-purple-300 font-medium">AI-Powered Prediction</span>
            </motion.div>
            
            <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
              House Price Prediction
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-12">
              Get instant, accurate property valuations using advanced machine learning. Sign in to start predicting.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/login">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full sm:w-auto bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg shadow-purple-500/50 hover:shadow-purple-500/70 transition-all flex items-center justify-center gap-2"
                >
                  <LogIn className="w-5 h-5" />
                  Sign In
                </motion.button>
              </Link>
              
              <Link href="/register">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full sm:w-auto bg-white/10 backdrop-blur-xl border border-white/20 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white/20 transition-all flex items-center justify-center gap-2"
                >
                  <UserPlus className="w-5 h-5" />
                  Sign Up
                </motion.button>
              </Link>
            </div>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 mt-20">
            {[
              {
                icon: TrendingUp,
                title: "Accurate Predictions",
                description: "ML models trained on thousands of real estate transactions"
              },
              {
                icon: Zap,
                title: "Instant Results",
                description: "Get property valuations in seconds, not days"
              },
              {
                icon: Shield,
                title: "Secure & Private",
                description: "Your data is encrypted and stored securely"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-8 hover:bg-white/10 transition-all"
              >
                <div className="p-3 bg-purple-500/20 rounded-xl w-fit mb-4">
                  <feature.icon className="w-6 h-6 text-purple-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-300">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
