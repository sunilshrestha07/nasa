/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import Earth from "@/components/Earth";
import Saturn from "@/components/Saturn";
import Scene from "@/components/Scene";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { motion } from "framer-motion";

export default function Page() {
    const allPlanets = [
        { name: "Saturn", component: <Saturn />, right: 0, top: 400 },
        { name: "Earth", component: <Scene />, right: 200, top: 400 },
        { name: "Mars", component: <Scene />, right: 400, top: 400 },
        { name: "sd", component: <Saturn />, right: 600, top: 400 },
        { name: "shrestha", component: <Scene />, right: 800, top: 400 },
    ];

    const [selectedPlanet, setSelectedPlanet] = useState("");

    const router = useRouter();

    const handelClick = (right: number, top: number, name: string) => {
        setSelectedPlanet(name);
    };

    return (
        <div className="relative w-full h-screen overflow-hidden">
            <img className="w-full h-full object-cover" src="./images/bg.jpg" alt="Background" />
            <div className="absolute top-0 left-0 w-full h-full">
                <div className="w-full h-full grid grid-cols-7">
                    <div className="order-2 col-span-1 w-full h-full relative">
                        {selectedPlanet ? (
                            <motion.div className="w-full h-full object-cover">
                                <Saturn />
                            </motion.div>
                        ) : (
                            <div className="w-full h-full object-cover">
                                <Earth />
                            </div>
                        )}
                    </div>
                    <div className="col-span-1"></div>
                    <div className="col-span-5 w-full h-full relative">
                        {allPlanets.map((planet, index) => (
                            <motion.div
                                key={index}
                                className="absolute -translate-y-1/2 cursor-pointer"
                                // Correct initial position using x and y
                                initial={{
                                    x: planet.right,
                                    y: planet.top,
                                    scale: 1,
                                }}
                                // Animate to the same position to ensure smoothness
                                animate={{
                                    x: planet.right,
                                    y: planet.top,
                                    scale: 1,
                                    transition: { duration: 0.5 },
                                }}
                                // Define exit animation
                                exit={{
                                    x: 0,
                                    y: 0,
                                    scale: 1.2,
                                    transition: { duration: 2 },
                                }}
                                onClick={() => handelClick(planet.right, planet.top, planet.name)}
                            >
                                {planet.component}
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
