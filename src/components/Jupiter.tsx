import { Canvas } from "@react-three/fiber";
import React from "react";
import Jup from "./Jup";

export default function Jupiter() {
    return (
        <>
            <Canvas>
                <mesh>
                    <Jup />
                </mesh>
            </Canvas>
        </>
    );
}
