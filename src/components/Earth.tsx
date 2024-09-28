import React, { useRef, useState } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import * as THREE from "three";
import { animated, useSpring } from "@react-spring/three";
import LatLongFinder from "@/app/helperFunctions/LatLongFinder";

export default function Earth(props) {
    const { nodes, materials } = useGLTF("/earth.glb");
    const earthRef = useRef<THREE.Mesh>(null);
    const satellite1Ref = useRef<THREE.Mesh>(null);
    const [isZoomed, setIsZoomed] = useState(false);

    // Handle click and make model scale bigger
    const handleClick = () => {
        setIsZoomed(!isZoomed);
    };

    const { positionX } = useSpring({
        positionX: 0,

        config: { duration: 600 },
    });

    const { scale } = useSpring({
        //   scale: isZoomed ? 0.0045 : 0.0025,
        scale: 0.6,
        config: { duration: 600 },
    });

    useFrame(() => {
        if (earthRef.current) {
            // earthRef.current.rotation.y += 0.0015;
        }
    });

    const { satellitePosition } = useSpring({
        satellitePosition: LatLongFinder(8.661779, -81.471264, 1.65),
        config: {
            duration: 600,
        },
    });
    return (
        <>
            <group {...props} dispose={null}>
                <animated.mesh
                    ref={earthRef}
                    castShadow
                    receiveShadow
                    geometry={nodes.earth001.geometry}
                    material={materials["Default OBJ.001"]}
                    position-x={positionX}
                    scale={scale}
                    onClick={handleClick}
                    rotation={[0, Math.PI / 2.5, 0.2]}
                />

                <animated.mesh
                    ref={satellite1Ref}
                    position={satellitePosition.to(
                        (x, y, z) => [x, y, z] as [number, number, number]
                    )}
                    scale={0.05}
                >
                    <boxGeometry />
                    <meshStandardMaterial color={"orange"} />
                </animated.mesh>
            </group>
            <EffectComposer>
                <Bloom
                    intensity={0.5}
                    luminanceThreshold={0.1}
                    luminanceSmoothing={1.5}
                    height={300}
                />
            </EffectComposer>
        </>
    );
}

useGLTF.preload("/earth.glb");
