/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import Scene from '@/components/Scene';
import React, { Suspense } from 'react';
import { motion } from 'framer-motion';
// import EarthNew from "../../public/earth/EarthNew";
import Saturn from '@/components/Saturn';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import Image from 'next/image';
import bg from '../../public/images/bg.jpeg';
import Earth from '@/components/Earth';
import MainScene from '@/components/MainScene';

export default function page() {
  const handleDBUpdate = async () => {
    console.log('Updating DB...');
    const response = await fetch('/api/updateDB', {
      method: 'GET',
    });
    const data = await response.json();
    console.log(data);
  };

  return (
    <>
      <div className="w-full h-full overflow-y-hidden">
        <div className=" w-[100vw] h-[100vh] bg-black relative">
          <Canvas camera={{ position: [0, 0, 10], fov: 30 }}>
            <OrbitControls enableZoom={false} enableRotate={true} />

            <spotLight
              position={[10, 1, 5]}
              angle={0.15}
              penumbra={0.5}
              intensity={1.5}
            />
            <pointLight position={[10, 1, 10]} decay={0} intensity={1} />

            <ambientLight intensity={2} />
            <Earth />
          </Canvas>
        </div>

        <div className="w-full h-screen relative">
          <img
            className="w-full h-full object-cover"
            src="./images/bg.jpeg"
            alt=""
          />
          <div className="w-full h-full bg-transparent absolute top-0 left-0">
            <MainScene />
          </div>
        </div>
      </div>
    </>
  );
}
