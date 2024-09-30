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
    { id: 0, type: "saturn", position: [-5, 0, 0], model: <Sat /> },
    { id: 1, type: "saturn", position: [-1, 0, 0], model: <Sat /> },
    { id: 2, type: "planet", position: [3, 0, 0], model: <Sat /> },
    { id: 3, type: "planet", position: [5, 0, 0], model: <Sat /> },
    { id: 4, type: "planet", position: [7, 0, 0], model: <Sat /> },
    { id: 5, type: "planet", position: [9, 0, 0], model: <Sat /> },
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
        return { ...model, position: [-10, 0, 0] };
      } else if (model.id === selectedId) {
        return { ...model, position: [-6, 0, 0] };
      } else {
        return {
          ...model,
          position: [(model.id - selectedId) * 2, 0, 0],
        };
      }
    });
    setModels(newModels);
  };

  return (
    <div className="w-full h-screen flex flex-row">
      <Canvas camera={{ position: [0, 0, 10], fov: 45 }}>
        <ambientLight intensity={0.2} />
        <spotLight
          position={[10, 10, 5]}
          angle={0.15}
          penumbra={0.5}
          intensity={1.5}
        />
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

// Component for animated models
interface ModelProps {
  model: JSX.Element;
  position: [number, number, number];
  isSelected: boolean;
  onClick: () => void;
  index: number;
}

function ModelWithAnimation({
  model,
  position,
  isSelected,
  onClick,
  index,
}: ModelProps) {
  // Spring animations for position and scale
  const springProps = useSpring({
    animatedPosition: position,
    animatedScale: isSelected ? [2, 2, 2] : [0.5, 0.5, 0.5],
    config: { mass: 1, tension: 170, friction: 26 },
  });

  return (
    <animated.mesh
      position={springProps.animatedPosition} // Apply spring animated position
      scale={springProps.animatedScale} // Apply spring animated scale
      onClick={onClick}
      rotation={[0.3, 0, 0]}
    >
      {model}
      <Text position={[0, 1.5, 0]} fontSize={0.5} color="white">
        {index}
      </Text>
    </animated.mesh>
  );
}
