import { motion } from 'framer-motion';
import { FolderTree, Search } from 'lucide-react';
import React from 'react'

const AdditionalFeatures = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-card/50 backdrop-blur-sm rounded-lg p-8"
        >
          <FolderTree className="w-8 h-8 mb-4 text-primary" />
          <h3 className="text-xl font-semibold mb-2">
            Extensible Directory Structure
          </h3>
          <p className="text-muted-foreground mb-4">
            Create directory structures on the fly using filename patterns:
            <code className="block mt-2 p-2 bg-muted rounded">
              foo_directory/bar.pdf
            </code>
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.7 }}
          className="bg-card/50 backdrop-blur-sm rounded-lg p-8"
        >
          <Search className="w-8 h-8 mb-4 text-primary" />
          <h3 className="text-xl font-semibold mb-2">Search and Preview</h3>
          <p className="text-muted-foreground">
            Easily search through your uploads and preview files. Click to copy
            URLs instantly.
          </p>
        </motion.div>
      </div>
    </div>
  );
}

export default AdditionalFeatures