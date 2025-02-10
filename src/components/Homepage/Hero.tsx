"use client";

import { motion } from "framer-motion";
import {
  Github,
} from "lucide-react";

export default function HeroSection() {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-5">
      <motion.div
        initial="initial"
        animate="animate"
        variants={fadeIn}
        className="text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
          className="inline-block p-3 bg-primary/10 rounded-full mb-8"
        >
          <Github className="w-12 h-12 text-primary" />
        </motion.div>

        <motion.h1
          className="text-4xl md:text-6xl font-bold tracking-tight mb-6"
          variants={fadeIn}
        >
          GitHub as a CDN
        </motion.h1>

        <motion.p
          className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto"
          variants={fadeIn}
        >
          Store your images and static files in a public GitHub repository. Use
          them seamlessly in your blogs, websites, and applications.
        </motion.p>
      </motion.div>
    </div>
  );
}
