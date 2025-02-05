"use client";

import { motion } from "framer-motion";
import { Github, Twitter, Linkedin, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import RepoConnector from "../Repo-login/RepoConnector";

export function Navbar() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      {/* Gradient line animation */}
      <motion.div
        className="h-1 bg-gradient-to-r from-primary via-chart-1 to-chart-2"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      />

      {/* Main navbar content */}
      <div className="bg-background/70 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo section with animated hover effect */}
            <motion.div
              className="relative flex items-center gap-3"
              onHoverStart={() => setIsHovered(true)}
              onHoverEnd={() => setIsHovered(false)}
            >
              <motion.div
                className="absolute inset-0 bg-primary/5 rounded-full"
                initial={{ scale: 0 }}
                animate={{ scale: isHovered ? 1 : 0 }}
                transition={{ duration: 0.2 }}
              />
              <motion.div
                className="relative z-10 p-2"
                whileHover={{ rotate: 180 }}
                transition={{ duration: 0.3 }}
              >
                <Github className="w-6 h-6 text-primary" />
              </motion.div>
              <motion.span
                className="relative z-10 font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-chart-1"
                whileHover={{ scale: 1.05 }}
              >
                Github Cdn
              </motion.span>
            </motion.div>

            {/* Social links with hover animations */}
            {/* <div className="flex items-center gap-1">
              {[
                { icon: Github, href: "https://github.com/yourusername" },
                { icon: Twitter, href: "https://twitter.com/yourusername" },
                {
                  icon: Linkedin,
                  href: "https://linkedin.com/in/yourusername",
                },
              ].map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative p-2 group"
                  whileHover={{ y: -2 }}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index }}
                >
                  <motion.div
                    className="absolute inset-0 bg-primary/5 rounded-full"
                    initial={{ scale: 0 }}
                    whileHover={{ scale: 1 }}
                    transition={{ duration: 0.2 }}
                  />
                  <social.icon className="w-5 h-5 text-primary/80 group-hover:text-primary transition-colors" />
                </motion.a>
              ))} */}

              {/* Mobile menu button */}
              {/* <motion.button
                className="ml-2 p-2 md:hidden relative group"
                whileTap={{ scale: 0.95 }}
              >
                <motion.div
                  className="absolute inset-0 bg-primary/5 rounded-full"
                  initial={{ scale: 0 }}
                  whileHover={{ scale: 1 }}
                  transition={{ duration: 0.2 }}
                />
                <Menu className="w-5 h-5 text-primary/80 group-hover:text-primary transition-colors" />
              </motion.button>
            </div> */}

            {/* Center section with repository link */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="hidden md:flex items-center"
            >
              <Button variant="ghost" size="sm" className="relative group px-4">
                <RepoConnector />
                <motion.div
                  className="absolute inset-0 bg-primary/5 rounded-md"
                  initial={{ scale: 0 }}
                  whileHover={{ scale: 1 }}
                  transition={{ duration: 0.2 }}
                />
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.header>
  );
}
