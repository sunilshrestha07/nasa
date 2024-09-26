/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import React, { useRef, useState } from "react";
import { Sat } from "./Sat";
import { useSpring, a } from "@react-spring/three";

export default function Saturn() {
    const [scale, setScale] = useState(1);
    const [isZoomed, setIsZoomed] = useState(false);

    // Handle click and make model scale bigger
    const handleClick = () => {
        setScale(scale === 1 ? 2 : 1);
        setIsZoomed(!isZoomed);
    };

    // Handle animation for smooth scale
    const { animatedScale } = useSpring({
        animatedScale: scale,
        config: {
            duration: 600,
        },
    });

    // Handle animation for position shifting
    const { animatedPosition } = useSpring({
        animatedPosition: isZoomed ? [-4, 0, 0] : [-1.5, 0, 0],
        config: {
            duration: 600,
        },
    });

    const modelRef = useRef<THREE.Mesh>(null);

    useFrame((state, delta) => {
        if (modelRef.current) {
            modelRef.current.rotation.y += 0.005;
        }
    });

    return (
        <a.mesh
            ref={modelRef}
            rotation={[0.2, 0, -0.2]}
            position={animatedPosition.to((x, y, z) => [x, y, z] as [number, number, number])}
            scale={animatedScale}
            onClick={handleClick}
        >
            <Sat />
        </a.mesh>
    );
}
