'use client';
import Saturn from '@/components/Saturn';
import React, { useEffect } from 'react';
import { motion, useMotionValue } from 'framer-motion';
import { AnimatePresence } from 'framer-motion'; // Import AnimatePresence

export default function Page() {
  // Effect to disable body scrolling
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <>
      <div className="w-full h-screen relative object-cover overflow-hidden">
        <img
          className="w-full h-full object-cover"
          src="./images/bg.jpg"
          alt="Background"
        />
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="w-full h-full bg-transparent">
            {' '}
            {/* Wrap animated component */}
            <motion.div
              key="saturn-motion" // Important to provide a key for motion elements
              initial={{ x: 0, y: 0, scale: 0.5 }}
              animate={{
                x: 50,
                y: 10,
                scale: 1.2,
                transition: { duration: 2 },
              }}
              exit={{ x: 0, y: 0, scale: 0.5, transition: { duration: 2 } }} // Exit animation
              className="w-full h-full"
            >
              <Saturn />
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
}
