import { motion } from 'framer-motion';
import React from 'react'
import { Card } from '../ui/card';
import { ArrowRight, Upload } from 'lucide-react';
import { Button } from '../ui/button';

const UploadSection = () => {
  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="max-w-2xl mx-auto mt-12"
      >
        <Card className="p-8 bg-card/50 backdrop-blur-sm border-2 border-dashed border-primary/20 hover:border-primary/40 transition-colors">
          <div className="text-center">
            <Upload className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-xl font-semibold mb-2">
              Drop a file or click to upload
            </h3>
            <p className="text-muted-foreground mb-4">Press CMD + V to paste</p>
            <Button size="lg" className="gap-2">
              Connect to GitHub <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}

export default UploadSection