import { motion } from "framer-motion";
import React from "react";
import { Card } from "../ui/card";
import { FolderTree, Rocket, Code } from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: <FolderTree className="w-6 h-6" />,
      title: "No Commits Required",
      description:
        "Upload files directly without creating commits. Simple and straightforward.",
    },
    {
      icon: <Rocket className="w-6 h-6" />,
      title: "Reliable & Fast",
      description:
        "Powered by GitHub's infrastructure for reliable and fast content delivery.",
    },
    {
      icon: <Code className="w-6 h-6" />,
      title: "Open Source",
      description:
        "Deploy your own instance on Vercel or any platform of your choice.",
    },
  ];
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-3xl font-bold text-center mb-12"
      >
        A Better Way to Manage Persistent Uploads
      </motion.h2>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-8"
      >
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 * (index + 1) }}
          >
            <Card className="p-6 h-full bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-colors">
              <div className="p-3 bg-primary/10 rounded-full w-fit mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default Features;
