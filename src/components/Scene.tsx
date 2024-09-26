import { Canvas, useFrame } from '@react-three/fiber';
import React, { useRef, useState } from 'react';
import { Sat } from './Sat'; // Assuming this is the actual 3D model component
import { Environment, OrbitControls } from '@react-three/drei';
import { Model } from './Model';

export default function Scene() {

    // Inner component rendering the 3D model
    const SaturnModel = () => {
        const modelRef = useRef<any>(null);
        
        // Rotating the model over time
        useFrame((state, delta) => {
            if (modelRef.current) {
                modelRef.current.rotation.y += delta;
            }
        });

        return (
            // Apply the dynamic scale to the mesh
            <mesh ref={modelRef}  position={[0, -1, 0]}>
                <Model />
            </mesh>
        );
    };

    return (
        <Canvas>
            <OrbitControls enableZoom={false} />
            <ambientLight />
            <SaturnModel />
            <Environment preset="sunset" />
        </Canvas>
    );
}
