"use client";
import React, { useState, useEffect } from 'react';
import { FaGithub, FaStar, FaCode, FaPuzzlePiece } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from 'framer-motion';

export const CommunitySection = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [starCount, setStarCount] = useState(4);
  const [forkCount, setForkCount] = useState(2);
  const [contributorCount, setContributorCount] = useState(4);
  const [activeMetric, setActiveMetric] = useState<number | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);

  const metrics = [
    { icon: FaStar, label: 'Stars', value: starCount, color: 'text-yellow-500' },
    { icon: FaCode, label: 'Forks', value: forkCount, color: 'text-primary' },
    { icon: FaPuzzlePiece, label: 'Contributors', value: contributorCount, color: 'text-[#D247BF]' }
  ];

  useEffect(() => {
    if (showConfetti) {
      const timer = setTimeout(() => setShowConfetti(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [showConfetti]);

  const handleButtonClick = () => {
    setShowConfetti(true);
    setStarCount(prev => prev + 1);
  };

  return (
    <section id="community" className="relative py-24">
      <div className="container">
        <div className="flex flex-col items-center">
          {/* Header Section */}
          <div className="text-center mb-12">
            <motion.div
              className="flex flex-col items-center gap-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <motion.div
                className="relative cursor-pointer"
                whileHover={{ scale: 1.1, rotate: [0, -10, 10, -10, 0] }}
                transition={{ duration: 0.4 }}
              >
                <FaGithub size={64} />
                <motion.div
                  className="absolute -top-2 -right-2 w-4 h-4 bg-primary rounded-full"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                />
              </motion.div>
              
              <motion.h2 
                className="text-4xl md:text-6xl font-bold leading-tight tracking-tight flex flex-col gap-2"
                whileHover={{ scale: 1.02 }}
              >
                Join Our Growing
                <span className="text-primary">
                  Open Source Community
                </span>
              </motion.h2>
            </motion.div>
          </div>

          {/* Content Section */}
          <div className="text-center mb-12 max-w-3xl">
            <motion.div
              className="space-y-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <p className="text-xl md:text-2xl text-muted-foreground">
                Help us build something amazing together. Every star makes a difference!
              </p>

              <div className="flex justify-center gap-12">
                {metrics.map((metric, index) => (
                  <motion.div
                    key={metric.label}
                    className="relative group cursor-pointer"
                    onHoverStart={() => setActiveMetric(index)}
                    onHoverEnd={() => setActiveMetric(null)}
                    whileHover={{ scale: 1.1 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="flex flex-col items-center gap-2">
                      <metric.icon className={`text-2xl ${metric.color}`} />
                      <div className="font-bold text-2xl">{metric.value.toLocaleString()}</div>
                      <div className="text-sm text-muted-foreground">{metric.label}</div>
                    </div>
                    
                    <AnimatePresence>
                      {activeMetric === index && (
                        <motion.div
                          className="absolute -top-12 left-1/2 -translate-x-1/2 bg-foreground text-background px-4 py-2 rounded-lg text-sm whitespace-nowrap"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                        >
                          Click to see more details
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Footer Section */}
          <div className="flex flex-col items-center gap-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Button
                size="lg"
                className="relative group h-12 px-8 text-base"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onClick={handleButtonClick}
                asChild
              >
                <a 
                  href="https://github.com/moroii69/proofly" 
                  target="_blank"
                  className="flex items-center gap-2"
                >
                  <motion.div
                    animate={isHovered ? { rotate: 360 } : { rotate: 0 }}
                    transition={{ duration: 0.6 }}
                  >
                    <FaGithub size={20} />
                  </motion.div>
                  <span>Star on GitHub</span>
                  <motion.span
                    animate={isHovered ? { scale: [1, 1.2, 0.9, 1.1, 1] } : { scale: 1 }}
                    transition={{ duration: 0.4 }}
                  >
                    ⭐
                  </motion.span>
                </a>
              </Button>
            </motion.div>

            {showConfetti && (
              <motion.div 
                className="absolute"
                initial={{ opacity: 1 }}
                animate={{ opacity: 0, y: -50 }}
                transition={{ duration: 1 }}
              >
                {Array.from({ length: 15 }).map((_, i) => (
                  <motion.span
                    key={i}
                    className="absolute text-2xl"
                    initial={{ opacity: 1 }}
                    animate={{
                      opacity: 0,
                      y: Math.random() * -100,
                      x: (Math.random() - 0.5) * 100,
                      rotate: Math.random() * 360
                    }}
                    transition={{ duration: 1 }}
                  >
                    ⭐
                  </motion.span>
                ))}
              </motion.div>
            )}

            <motion.p 
              className="text-sm text-muted-foreground"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              Already starred? Thank you for your support! 💜
            </motion.p>
          </div>
        </div>
      </div>
    </section>
  );
};