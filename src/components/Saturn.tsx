'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import React, { useRef, useState } from 'react';
import { Sat } from './Sat';
import Jup from './Jup'
import { Environment, OrbitControls } from '@react-three/drei';
import { useSpring, a } from '@react-spring/three';
import { Model } from './Model';

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
            duration: 1000
        }
    });

    // Handle animation for position shifting
    const { animatedPosition } = useSpring({
        animatedPosition: isZoomed ? [-4, 0, 0] : [0, 0, 0],
        config: {
            duration: 1000
        }
    });

    // Model for Saturn
    const SaturnModel = () => {
        const modelRef = useRef<any>(null);

        useFrame((state, delta) => {
            if (modelRef.current) {
                modelRef.current.rotation.y += delta;
            }
        });

        return (
            <a.mesh
                ref={modelRef}
                rotation={[0.2, 0, 0]}
                position={animatedPosition}
                scale={animatedScale}
                onClick={handleClick}
            >
                <Sat />
            </a.mesh>
        );
    };

    return (
        <Canvas camera={{ position: [0, 0, 10], fov: 30 }}>
            <OrbitControls enableZoom={false} />
            <ambientLight />
            <SaturnModel />
            <Environment preset="sunset" />
        </Canvas>
    );
}
