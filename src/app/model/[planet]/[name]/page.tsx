'use client';
import Saturn from '@/components/Saturn';
import Scene from '@/components/Scene';
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useParams } from 'next/navigation';
import Link from 'next/link';

export default function Page() {
  // Effect to disable body scrolling
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  const params = useParams();
  const right = Number(params.planet) - 150;

  const name = params.planet;

  return (
    <>
      <div className="w-full h-screen relative object-cover overflow-hidden bg-red-400">
        <div className="w-full h-full object-cover bg-red-500 relative">
          <img
            className="w-full h-full object-cover"
            src="../../images/bg.jpg"
            alt="Background"
          />
          <Link href="/">
            <div className="absolute top-10 left-10 bg-black text-white font-bold px-6 py-3 cursor-pointer z-50">
              Back
            </div>
          </Link>
        </div>
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="w-full h-full bg-transparent">
            {/* Motion div handles animation for Saturn */}
            <motion.div
              key="saturn-motion"
              initial={{ x: right, y: 150, scale: 0.5 }}
              animate={{
                x: 250,
                y: 10,
                scale: 1.2,
                transition: { duration: 2 },
              }}
              exit={{
                x: right,
                y: 150,
                scale: 0.5,
                transition: { duration: 2 },
              }}
              className="w-full h-full"
            >
              <Scene />
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
}
