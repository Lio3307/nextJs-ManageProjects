"use client";

import { motion } from "motion/react";
import { Loader2 } from "lucide-react";

export function LoadingOverlay({ 
  message = "Processing...", 
  isVisible = false 
}: { 
  message?: string; 
  isVisible?: boolean; 
}) {
  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm"
      aria-live="polite"
      aria-busy="true"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="flex flex-col items-center gap-4 p-8 bg-white dark:bg-neutral-900 rounded-2xl shadow-xl"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        >
          <Loader2 className="w-12 h-12 text-black dark:text-white" />
        </motion.div>
        <motion.p
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-lg font-medium text-gray-800 dark:text-gray-200"
        >
          {message}
        </motion.p>
      </motion.div>
    </motion.div>
  );
}