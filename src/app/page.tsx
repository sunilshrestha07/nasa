'use client';

import Saturn from '@/components/Saturn';
import Scene from '@/components/Scene';
import React from 'react';
import { motion } from 'framer-motion';

export default function page() {
  const allPlanets = [
    { name: 'Mercury', component: <Saturn />, top: 0, right: 0 },
    { name: 'Venus', component: <Scene />, top: 0, right: 0 },
    { name: 'Saturn', component: <Saturn />, top: 0, right: 200 },
    { name: 'Earth', component: <Scene />, top: 0, right: 200 },
    { name: 'Jupiter', component: <Saturn />, top: 0, right: 200 },
  ];
  return (
    <>
      <div className="bg-black w-full h-screen grid grid-cols-6 overflow-hidden">
        <div className="bg-black col-span-2">
          <Saturn/>
        </div>
        <div className=" w-full h-full flex col-span-4">
          {allPlanets.map((planet, index) => (
            <motion.div
              initial={{
                x: planet.right,
                y: 300,
              }}
              className="w-56 h-56 "
              key={index}
            >
              {planet.component}
            </motion.div>
          ))}
        </div>
      </div>
    </>
  );
}




// import Saturn from '@/components/Saturn'
// import React from 'react'

// export default function page() {
//   return (
//     <div className="w-full h-screen bg-black">
//       <div className="w-full h-full">
//         <Saturn/>
//       </div>
//     </div>
//   )
// }
