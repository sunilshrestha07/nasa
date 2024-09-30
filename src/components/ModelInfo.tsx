import allPlanets from '@/app/PlanetInfo';
import React from 'react';

// Define the interface for props
interface ModelInfoProps {
  name: string;
}

export default function ModelInfo({ name }: ModelInfoProps) {
  const selectedPlanet = allPlanets.filter((planet) => planet.name === name);

  return (
    <div className="w-full h-full rounded-lg bg-transparent backdrop-blur-sm text-white">
      <div>
        {selectedPlanet.length > 0 ? (
          selectedPlanet.map((planet, index) => (
            <div className="p-4" key={index}>
              <div className="font-semibold text-2xl py-3">
                Planet: {planet.name}
              </div>
              <div className="flex gap-10">
                <div className="w-56 aspect-video overflow-hidden rounded-lg">
                  <img
                    className="w-full h-full object-cover"
                    src={planet.images.image1}
                    alt={planet.name}
                  />
                </div>
                <div className="w-56 aspect-video overflow-hidden rounded-lg">
                  <img
                    className="w-full h-full object-cover"
                    src={planet.images.image2}
                    alt={planet.name}
                  />
                </div>
              </div>
              <div className="my-3">
                <p>
                  <span className="font-bold">Fun fact:</span> {planet.fact}
                </p>
              </div>
              <div className="w-full aspect-video backdrop-brightness-50 bg-slate-500/30 border-2 border-white p-4 rounded-lg">
                Surface Temperature
              </div>
            </div>
          ))
        ) : (
          <div>No planet found with the name "{name}".</div>
        )}
      </div>
    </div>
  );
}
