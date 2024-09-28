// /* eslint-disable @typescript-eslint/no-unused-vars */
// import React, { useRef, useState } from "react";
// import { useGLTF } from "@react-three/drei";
// import { useFrame } from "@react-three/fiber";
// import { Bloom, EffectComposer } from "@react-three/postprocessing";
// import * as THREE from "three";
// import { animated, useSpring } from "@react-spring/three";
// import LatLongFinder from "@/app/helperFunctions/LatLongFinder";

// export function EarthNew(props) {
//     const { nodes, materials } = useGLTF("/earth002.glb");
//     const earthRef = useRef<THREE.Mesh>(null);
//     const satellite1Ref = useRef<THREE.Mesh>(null);
//     const [isZoomed, setIsZoomed] = useState(false);

//     // Handle click and make model scale bigger
//     const handleClick = () => {
//         setIsZoomed(!isZoomed);
//     };

//     const { positionX } = useSpring({
//         positionX: isZoomed ? 0 : 0,

//         config: { duration: 600 },
//     });

//     const { scale } = useSpring({
//         //   scale: isZoomed ? 0.0045 : 0.0025,
//         scale: isZoomed ? 0.0045 : 0.0045,
//         config: { duration: 600 },
//     });

//     useFrame(() => {
//         if (earthRef.current) {
//             // earthRef.current.rotation.y += 0.0015;
//         }
//     });

//     const { satellitePosition } = useSpring({
//         satellitePosition: LatLongFinder(30.44406, 32.0546139, 2.1),
//         config: {
//             duration: 600,
//         },
//     });

//     return (
//         <>
//             <group {...props} dispose={null}>
//                 <animated.mesh
//                     ref={earthRef}
//                     castShadow
//                     receiveShadow
//                     geometry={nodes.earth001.geometry}
//                     material={materials["Default OBJ.001"]}
//                     position-x={positionX}
//                     scale={scale}
//                     onClick={handleClick}
//                     rotation={[0, 0, 0]}
//                 />

//                 {/* Small earth */}
//                 <animated.mesh
//                     castShadow
//                     receiveShadow
//                     geometry={nodes.earth001.geometry}
//                     material={materials["Default OBJ.001"]}
//                     position={satellitePosition.to(
//                         (x, y, z) => [x, y, z] as [number, number, number]
//                     )}
//                     scale={isZoomed ? 0.0005 : 0.0005}
//                     //   rotation={[3.4, -6.6, 3.2]}
//                 />

//                 <animated.mesh ref={satellite1Ref} position={[2.39, 0, 0]} scale={0.1}>
//                     <sphereGeometry />
//                     <meshStandardMaterial color={"orange"} />
//                     {/* <pointLight /> */}
//                 </animated.mesh>
//             </group>
//             <EffectComposer>
//                 <Bloom
//                     intensity={0.5}
//                     luminanceThreshold={0.1}
//                     luminanceSmoothing={1.5}
//                     height={300}
//                 />
//             </EffectComposer>
//         </>
//     );
// }

// useGLTF.preload("/earth002.glb");
