/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { useGLTF } from "@react-three/drei";
import { Mesh } from "three"; // Import the Mesh type from three.js

export default function Jup(props: any) {
    const { nodes, materials } = useGLTF("/jupiter.glb") as any; // Add 'as any' to bypass strict type checking
    return (
        <group {...props} dispose={null}>
            <mesh
                castShadow
                receiveShadow
                geometry={(nodes.Jupiter_Planeta_0 as Mesh).geometry} // Cast nodes.Jupiter_Planeta_0 to Mesh
                material={materials.Planeta}
                rotation={[-Math.PI / 2, 0, 0]}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={(nodes.pierscien_Pierscien_0 as Mesh).geometry} // Cast nodes.pierscien_Pierscien_0 to Mesh
                material={materials.Pierscien}
                rotation={[-Math.PI / 2, 0, 0]}
            />
        </group>
    );
}

useGLTF.preload("/jupiter.glb");
