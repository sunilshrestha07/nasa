/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { OrbitControls } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import React, { useRef, useState } from "react";

export default function Earth() {
    const Cube = ({ positon }: any) => {
        const cuberef = useRef<any>();

        useFrame((state, delta) => {
            cuberef.current.rotation.y += delta * 0.05;
        });
        return (
            <mesh position={[3, 0, 0]} ref={cuberef}>
                <sphereGeometry args={[3.5, 64, 64]} />
                <meshStandardMaterial wireframe />
            </mesh>
        );
    };
    return (
        <div className="w-full h-full">
            <Canvas>
                {/* <OrbitControls enableZoom={false} /> */}
                <directionalLight position={[-1, 0, 0]} />
                <Cube />
            </Canvas>
        </div>
    );
}
