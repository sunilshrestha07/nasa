/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef, useState } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import * as THREE from "three";
import { animated, useSpring } from "@react-spring/three";
import { getSpaceObjectPositionsForThreeFiber } from "@/app/frontendHalperFunctions/ISSPosCalculator";

export type SatelliteData = {
    name: string;
    position: [number, number, number];
};

export default function Earth(props) {
    const earthRef = useRef<THREE.Mesh>(null);
    const satellitesRef = useRef<THREE.Group>(null);
    const [isZoomed, setIsZoomed] = useState(false);
    const [satellites, setSatellites] = useState<SatelliteData[]>();

    // Handle click and make model scale biggerimport { useGLTF, GLTFResult } from "@react-three/drei";

    const { nodes, materials } = useGLTF("/earth.glb") as any;
    const handleClick = () => {
        setIsZoomed(!isZoomed);
    };

    const { positionX } = useSpring({
        positionX: 0,

        config: { duration: 600 },
    });

    const { scale } = useSpring({
        //   scale: isZoomed ? 0.0045 : 0.0025,
        scale: 0.8,
        config: { duration: 600 },
    });

    useFrame(() => {
        if (earthRef.current && satellitesRef.current) {
            earthRef.current.rotation.y -= 0.003;
            satellitesRef.current.rotation.y -= 0.003;
        }
    });

    // Recently launched satellites
    const getRecentlyLaunched = async () => {
        const recent = await fetch("/30DaysLaunch.json");
        const recentBody = await recent.json();
        const parsedData = getSpaceObjectPositionsForThreeFiber(recentBody);
        setSatellites(parsedData);
    };

    // All active satellites
    const getActive = async () => {
        const recent = await fetch("/activeSatellites.json");
        const recentBody = await recent.json();
        const parsedData = getSpaceObjectPositionsForThreeFiber(recentBody);
        setSatellites(parsedData);
    };

    // Iss Position
    const getISS = async () => {
        const iss = await fetch("/ISS.json");
        const issBody = await iss.json();
        console.log(issBody);
        const parsedISSData = getSpaceObjectPositionsForThreeFiber(issBody);
        setSatellites(parsedISSData);
    };

    useEffect(() => {
        if (earthRef.current) {
            getActive();
        }
    }, []);

    return (
        <>
            <group {...props} dispose={null}>
                <animated.mesh
                    ref={earthRef}
                    castShadow
                    receiveShadow
                    geometry={nodes.earth001.geometry as THREE.BufferGeometry}
                    material={materials["Default OBJ.001"]}
                    position-x={positionX}
                    scale={scale}
                    onClick={handleClick}
                    rotation={[0, Math.PI / 2.5, 0.2]}
                />

                <group ref={satellitesRef}>
                    {satellites?.map((sat, index) => {
                        // console.log(satellitePosition);
                        return (
                            <animated.mesh
                                key={index}
                                name={sat.name}
                                // ref={satellite1Ref}
                                geometry={nodes.box}
                                position={sat.position}
                                scale={0.01}
                            >
                                <boxGeometry />
                                <meshStandardMaterial color={"white"} />
                            </animated.mesh>
                        );
                    })}
                </group>
                {/* <animated.mesh
                    ref={satellite1Ref}
                    geometry={nodes.box}
                    position={[3, 0, 0]}
                    scale={0.1}
                >
                    <boxGeometry />
                    <meshStandardMaterial color={"orange"} />
                </animated.mesh> */}
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
