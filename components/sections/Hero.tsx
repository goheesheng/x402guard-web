"use client";

import { motion } from "framer-motion";
import { Shield, Zap, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui";

export function Hero() {
  const scrollToScanner = () => {
    const element = document.querySelector("#scanner");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="overview"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
    >
      {/* Background effects */}
      <div className="absolute inset-0 bg-grid opacity-30" />
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary-500/10 rounded-full blur-[150px]" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-primary-600/5 rounded-full blur-[120px]" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-primary-400 text-sm font-medium">
            <Zap className="w-4 h-4" />
            Powered by x402 Protocol
          </span>
        </motion.div>

        {/* Main Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-4xl sm:text-5xl md:text-7xl font-bold mb-6 leading-tight"
        >
          <span className="text-white">Secure Every</span>
          <br />
          <span className="text-glow text-primary-400">Agent Skill</span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg md:text-xl text-dark-300 max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Pre-install security auditing for AI agent skills. YARA malware
          detection, permission analysis, and trust attestation — all before you
          install.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Button
            size="lg"
            onClick={scrollToScanner}
            rightIcon={
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            }
            className="group"
          >
            Start Scanning
          </Button>
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-16 grid grid-cols-3 gap-8 max-w-lg mx-auto"
        >
          {[
            { value: "286+", label: "Skills Scanned" },
            { value: "<2s", label: "Avg Scan Time" },
            { value: "$0.05", label: "Starting Price" },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-primary-400">
                {stat.value}
              </div>
              <div className="text-sm text-dark-400">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Floating shield */}
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 hidden md:block"
        >
          <Shield className="w-8 h-8 text-primary-500/30" />
        </motion.div>
      </div>
    </section>
  );
}
