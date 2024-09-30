/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { Canvas } from "@react-three/fiber";
import React, { useState } from "react";
import { Sat } from "./Sat";
import { Model } from "./Model";
import { Environment, Text } from "@react-three/drei";
import { useSpring, animated } from "@react-spring/three";

export default function MainScene() {
    const initialModels = [
        {
            id: 0,
            type: "saturn",
            position: [-5, 0, 0] as [number, number, number],
            model: <Sat />,
        },
        {
            id: 1,
            type: "saturn",
            position: [-1, 0, 0] as [number, number, number],
            model: <Model />,
        },
        {
            id: 2,
            type: "planet",
            position: [3, 0, 0] as [number, number, number],
            model: <Sat />,
        },
        {
            id: 3,
            type: "planet",
            position: [5, 0, 0] as [number, number, number],
            model: <Model />,
        },
        {
            id: 4,
            type: "planet",
            position: [7, 0, 0] as [number, number, number],
            model: <Sat />,
        },
        {
            id: 5,
            type: "planet",
            position: [9, 0, 0] as [number, number, number],
            model: <Model />,
        },
    ];

    const [clickedModel, setClickedModel] = useState<number | null>(null);
    const [models, setModels] = useState(initialModels);
    const [isSelected, setIsSelected] = useState(false);

    const handleClick = (id: number) => {
        setIsSelected(!isSelected);
        if (clickedModel === id) {
            setClickedModel(null);
            setModels(initialModels); // Reset the positions when unclicked
        } else {
            setClickedModel(id);
            updateModelPositions(id);
        }
    };

    const updateModelPositions = (selectedId: number) => {
        const newModels = initialModels.map((model) => {
            if (model.id < selectedId) {
                // Move models with id less than the selected one to the left (off-screen)
                return { ...model, position: [-10, 0, 0] as [number, number, number] };
            } else if (model.id === selectedId) {
                // Keep the selected model at the center
                return { ...model, position: [-6, 0, 0] as [number, number, number] };
            } else {
                // Move models with id greater than the selected one to the right, with some distance
                return {
                    ...model,
                    position: [(model.id - selectedId) * 2, 0, 0] as [number, number, number],
                };
            }
        });
        setModels(newModels);
    };

    return (
        <div className=" w-full h-screen flex flex-row ">
            <Canvas camera={{ position: [0, 0, 10], fov: 45 }}>
                <ambientLight intensity={0.2} />
                <spotLight position={[10, 10, 5]} angle={0.15} penumbra={0.5} intensity={1.5} />
                <pointLight position={[10, 5, 10]} decay={0} intensity={1} />
                {models.map((model, index) => (
                    <ModelWithAnimation
                        key={model.id}
                        model={model.model}
                        position={model.position}
                        isSelected={clickedModel === model.id}
                        onClick={() => handleClick(model.id)}
                        index={index}
                    />
                ))}
            </Canvas>
        </div>
    );
}

// Separate component for the animated model with spring animation
interface ModelProps {
    model: JSX.Element;
    position: [number, number, number];
    isSelected: boolean;
    onClick: () => void;
    index: number;
}

function ModelWithAnimation({ model, position, isSelected, onClick, index }: ModelProps) {
    // useSpring for animating the position and scale
    const { animatedPosition, animatedScale } = useSpring({
        animatedPosition: position,
        animatedScale: isSelected ? [2, 2, 2] : [0.5, 0.5, 0.5],
        config: { mass: 1, tension: 170, friction: 26 }, // Adjust animation config for smoothness
    });

    // Convert spring values to spreadable values for three.js props
    return (
        <animated.mesh
            position={animatedPosition.to((x, y, z) => [x, y, z])} // Convert spring values to position
            scale={animatedScale.to((sx, sy, sz) => [sx, sy, sz])} // Convert spring values to scale
            onClick={onClick} // Handle click event
            rotation={[0.3, 0, 0]} // Optional static rotation
        >
            {model}
            <Text position={[0, 1.5, 0]} fontSize={0.5} color="white">
                {index}
            </Text>
        </animated.mesh>
    );
}
