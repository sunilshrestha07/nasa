/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import Scene from "@/components/Scene";
import React, { Suspense } from "react";
import { motion } from "framer-motion";
import SaturnNew from "./newModels/Saturn";
// import EarthNew from "../../public/earth/EarthNew";
import Saturn from "@/components/Saturn";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Earth from "@/components/Earth";
import Image from "next/image";
import bg from "../../public/images/bg.jpeg";
import { Saturn2 } from "@/examplePlanets/Saturn2";

export default function page() {
    // const allPlanets = [
    //     { name: "Mercury", component: <Saturn />, top: 0, right: 0 },
    //     { name: "Venus", component: <Scene />, top: 0, right: 0 },
    //     { name: "Saturn", component: <Saturn />, top: 0, right: 200 },
    //     { name: "Earth", component: <Scene />, top: 0, right: 200 },
    //     { name: "Jupiter", component: <Saturn />, top: 0, right: 200 },
    // ];
    return (
        <>
            <div className=" w-[100vw] h-[100vh] ">
                <div className="h-[85vh] w-[100vw] bg-black"></div>
                <Image
                    src={bg}
                    alt="star background"
                    className="h-full w-full object-cover absolute brightness-90"
                />

                <Canvas camera={{ position: [0, 0, 10], fov: 30 }}>
                    <OrbitControls enableZoom={false} />

                    <spotLight position={[10, 1, 5]} angle={0.15} penumbra={0.5} intensity={1.5} />
                    <pointLight position={[10, 1, 10]} decay={0} intensity={1} />

                    <Saturn />
                    <Saturn2 />
                </Canvas>
            </div>
        </>
    );
}
