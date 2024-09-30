'use client';

import { Canvas, useThree } from '@react-three/fiber';
import React, { useState, useRef } from 'react';
import { Sat } from './Sat';
import { Model } from './Model';
import { Environment, Text, useHelper } from '@react-three/drei';
import { useSpring, animated } from '@react-spring/three';
import { CameraHelper } from 'three';
import ModelInfo from './ModelInfo';

export default function MainScene() {
  const initialModels = [
    {
      id: 0,
      name: 'Mercury',
      position: [-6, 0, 0] as [number, number, number],
      model: <Sat />,
      size:1
    },
    {
      id: 1,
      name: 'Venus',
      position: [-3, 0, 0] as [number, number, number],
      model: <Model />,
      size:1
    },
    {
      id: 2,
      name: 'Earth',
      position: [0, 0, 0] as [number, number, number],
      model: <Sat />,
      size:1.2
    },
    {
      id: 3,
      name: 'Mars',
      position: [3, 0, 0] as [number, number, number],
      model: <Model />,
      size:1
    },
    {
      id: 4,
      name: 'Jupiter',
      position: [7, 0, 0] as [number, number, number],
      model: <Sat />,
      size:1.5
    },
    {
      id: 5,
      name: 'Saturn',
      position: [10, 0, 0] as [number, number, number],
      model: <Model />,
      size:1.3
    },
  ];

  const [clickedModel, setClickedModel] = useState<number | null>(null);
  const [models, setModels] = useState(initialModels);
  const [isSelected, setIsSelected] = useState(false);
  const [slelectedPlanet, setSelectedPlanet] = useState('');

  const handleClick = (id: number, name: string) => {
    setIsSelected(!isSelected);
    setSelectedPlanet(name);
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
        return { ...model, position: [-8, 0, 0] as [number, number, number] };
      } else {
        // Move models with id greater than the selected one to the right, with some distance
        return {
          ...model,
          position: [(model.id - selectedId) * 2.5, 0, 0] as [
            number,
            number,
            number
          ],
        };
      }
    });
    setModels(newModels);
  };

  return (
    <div className=" w-full h-screen flex flex-row  relative">
      <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
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
            onClick={() => handleClick(model.id, model.name)}
            index={index}
          />
        ))}
      </Canvas>

      {/* model info */}
      {isSelected && (
        <div className=" absolute top-[15%] right-[5%]">
          <ModelInfo name={slelectedPlanet} />
        </div>
      )}
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

function ModelWithAnimation({
  model,
  position,
  isSelected,
  onClick,
  index,
}: ModelProps) {
  // useSpring for animating the position and scale
  const { animatedPosition, animatedScale } = useSpring({
    animatedPosition: position,
    animatedScale: isSelected ? [2.5, 2.5, 2.5] : [0.5, 0.5, 0.5],
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
