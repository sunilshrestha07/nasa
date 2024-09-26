import * as THREE from "three";
import React from "react";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";

type GLTFResult = GLTF & {
    nodes: {
        Saturn001: THREE.Mesh;
        RingsTop: THREE.Mesh;
        RingsBottom: THREE.Mesh;
    };
    materials: {
        "None.001": THREE.MeshStandardMaterial;
        SaturnRings: THREE.MeshStandardMaterial;
    };
};

type ModelProps = React.ComponentProps<"group">;

export default function SaturnNew(props: ModelProps) {
    const { nodes, materials } = useGLTF("./saturn.gltf") as GLTFResult;
    return (
        <group {...props} dispose={null}>
            <mesh
                geometry={nodes.Saturn001.geometry}
                material={materials["None.001"]}
                scale={0.013}
            />
            <mesh
                geometry={nodes.RingsTop.geometry}
                material={materials.SaturnRings}
                rotation={[-0.163, 0, 0]}
                scale={0.013}
            />
            <mesh
                geometry={nodes.RingsBottom.geometry}
                material={materials.SaturnRings}
                rotation={[-0.163, 0, 0]}
                scale={0.013}
            />
        </group>
    );
}

useGLTF.preload("/saturn.gltf");
