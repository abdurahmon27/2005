"use client";
import { HeroSection } from "./_components/Hero";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.5,
      when: "beforeChildren",
      staggerChildren: 0.2,
    },
  },
};

const childVariants = {
  hidden: {
    y: 30,
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 12,
    },
  },
};

export default function Home() {
  return (
    <motion.div
      className="w-full relative flex min-h-[80vh] flex-col"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.main
        className="w-full mx-auto min-h-[80vh] flex items-center justify-center"
        variants={childVariants}
      >
        <HeroSection />
      </motion.main>
    </motion.div>
  );
}
