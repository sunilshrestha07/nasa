/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useRef } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { Mesh } from "three"; // Import Mesh type from three.js

export function Sat(props: any) {
    const group = useRef();
    const { nodes, materials, animations } = useGLTF("/saturn_planet.glb");
    const { actions } = useAnimations(animations, group);

    return (
        <group ref={group} {...props} dispose={null}>
            <group name="Sketchfab_Scene">
                <group name="Sketchfab_model" rotation={[-Math.PI / 2, 0, 0]} scale={0.002}>
                    <group
                        name="56fb5d81d5a845599d5e60534f293915fbx"
                        rotation={[Math.PI / 2, 0, 0]}
                    >
                        <group name="Object_2">
                            <group name="RootNode">
                                <group
                                    name="Saturn_Rings"
                                    rotation={[-Math.PI / 2, 0, 0]}
                                    scale={100}
                                >
                                    <mesh
                                        name="Saturn_Rings_Material_#63_0"
                                        castShadow
                                        receiveShadow
                                        geometry={
                                            (nodes["Saturn_Rings_Material_#63_0"] as Mesh).geometry
                                        }
                                        material={materials.Material_63}
                                    />
                                </group>
                                <group name="Saturn" rotation={[-Math.PI / 2, 0, 0]} scale={100}>
                                    <mesh
                                        name="Saturn_Material_#50_0"
                                        castShadow
                                        receiveShadow
                                        geometry={(nodes["Saturn_Material_#50_0"] as Mesh).geometry}
                                        material={materials.Material_50}
                                    />
                                </group>
                            </group>
                        </group>
                    </group>
                </group>
            </group>
        </group>
    );
}

useGLTF.preload("/saturn_planet.glb");
