"use client";

import { motion } from "framer-motion";

export default function Loading() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm z-50">
      <div className="relative flex flex-col items-center">
        <LoadingLogo />
        <p className="text-sm text-muted-foreground mt-4 animate-pulse">Loading...</p>
      </div>
    </div>
  );
}

const LoadingLogo = () => {
  const circleVariants = {
    initial: { scale: 0, opacity: 0 },
    animate: (i: number) => ({
      scale: 1,
      opacity: 1,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        repeat: Infinity,
        repeatType: "reverse" as const,
        repeatDelay: 0.5
      }
    })
  };

  const circles = Array.from({ length: 3 }).map((_, i) => (
    <motion.circle
      key={i}
      cx={50 + i * 40}
      cy="50"
      r="10"
      fill="currentColor"
      className="text-primary"
      variants={circleVariants}
      initial="initial"
      animate="animate"
      custom={i}
    />
  ));

  return (
    <motion.svg
      width="150"
      height="100"
      viewBox="0 0 150 100"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {circles}
    </motion.svg>
  );
}