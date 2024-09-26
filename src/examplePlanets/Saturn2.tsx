/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import React, { useRef, useState } from "react";
import { Sat } from "../components/Sat";
import { useSpring, a } from "@react-spring/three";

export const Saturn2 = () => {
    const [scaleFor2, setScaleFor2] = useState(1);
    const [isSecondZoomed, setIsSecondZoomed] = useState(false);

    const modelRef2 = useRef<THREE.Mesh>(null);

    // Functions For second model
    const handleClick2 = () => {
        setScaleFor2(scaleFor2 === 1 ? 2 : 1);
        setIsSecondZoomed(!isSecondZoomed);
    };
    // animated scale for 2
    const { animatedScale2 } = useSpring({
        animatedScale2: scaleFor2,
        config: {
            duration: 600,
        },
    });
    // animated Position for 2
    const { animatedPosition2 } = useSpring({
        animatedPosition2: isSecondZoomed ? [-4, 0, 0] : [2.25, 0, 0],
        config: {
            duration: 600,
        },
    });

    useFrame((state, delta) => {
        if (modelRef2.current) {
            modelRef2.current.rotation.y -= 0.007;
        }
    });

    return (
        <a.mesh
            ref={modelRef2}
            rotation={[0.2, 0, -0.2]}
            position={animatedPosition2.to((x, y, z) => [x, y, z] as [number, number, number])}
            scale={animatedScale2}
            onClick={handleClick2}
        >
            <Sat />
        </a.mesh>
    );
};
