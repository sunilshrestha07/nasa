import * as THREE from "three";

// Constants
const GM = 398600.4418; // Earth's gravitational constant (km^3/s^2)
const EARTH_RADIUS = 2000; // Earth's radius in km = 6371km

// Define types
interface OrbitalElements {
    OBJECT_NAME: string;
    MEAN_MOTION: number;
    ECCENTRICITY: number;
    INCLINATION: number;
    RA_OF_ASC_NODE: number;
    ARG_OF_PERICENTER: number;
    MEAN_ANOMALY: number;
    EPOCH: string;
}

interface SpaceObjectPosition {
    name: string;
    latitude: number;
    longitude: number;
    radius: number;
    x: number;
    y: number;
    z: number;
}

interface SpaceObjectPositionForThreeFiber {
    name: string;
    position: [number, number, number];
    latitude: number;
    longitude: number;
    radius: number;
}

function calculateSpaceObjectPositions(
    orbitalElementsArray: OrbitalElements[]
): SpaceObjectPosition[] {
    return orbitalElementsArray.map((orbitalElements) => {
        const {
            OBJECT_NAME,
            MEAN_MOTION,
            ECCENTRICITY,
            INCLINATION,
            RA_OF_ASC_NODE,
            ARG_OF_PERICENTER,
            MEAN_ANOMALY,
        } = orbitalElements;

        // Convert degrees to radians
        const toRadians = (deg: number): number => (deg * Math.PI) / 180;

        // Calculate semi-major axis
        const n = (MEAN_MOTION * 2 * Math.PI) / 86400; // Convert mean motion to radians per second
        const a = Math.pow(GM / (n * n), 1 / 3);

        // Solve Kepler's equation
        let E = toRadians(MEAN_ANOMALY);
        const maxIterations = 100;
        const epsilon = 1e-6;

        for (let i = 0; i < maxIterations; i++) {
            const deltaE =
                (E - ECCENTRICITY * Math.sin(E) - toRadians(MEAN_ANOMALY)) /
                (1 - ECCENTRICITY * Math.cos(E));
            E -= deltaE;
            if (Math.abs(deltaE) < epsilon) break;
        }

        // Calculate position in orbital plane
        const x = a * (Math.cos(E) - ECCENTRICITY);
        const y = a * Math.sqrt(1 - ECCENTRICITY * ECCENTRICITY) * Math.sin(E);

        // Rotate to correct orbital orientation
        const cosInc = Math.cos(toRadians(INCLINATION));
        const sinInc = Math.sin(toRadians(INCLINATION));
        const cosRAAN = Math.cos(toRadians(RA_OF_ASC_NODE));
        const sinRAAN = Math.sin(toRadians(RA_OF_ASC_NODE));
        const cosAOP = Math.cos(toRadians(ARG_OF_PERICENTER));
        const sinAOP = Math.sin(toRadians(ARG_OF_PERICENTER));

        const xECI =
            (cosRAAN * cosAOP - sinRAAN * sinAOP * cosInc) * x +
            (-cosRAAN * sinAOP - sinRAAN * cosAOP * cosInc) * y;
        const yECI =
            (sinRAAN * cosAOP + cosRAAN * sinAOP * cosInc) * x +
            (-sinRAAN * sinAOP + cosRAAN * cosAOP * cosInc) * y;
        const zECI = sinAOP * sinInc * x + cosAOP * sinInc * y;

        const position = new THREE.Vector3(xECI, yECI, zECI);

        // Calculate latitude, longitude, and radius
        const radius = position.length();
        const latitude = Math.asin(position.z / radius);
        const longitude = Math.atan2(position.y, position.x);

        // Convert to degrees
        const latDeg = (latitude * 180) / Math.PI;
        const lonDeg = (longitude * 180) / Math.PI;

        return {
            name: OBJECT_NAME,
            latitude: latDeg,
            longitude: lonDeg,
            radius: radius,
            x: position.x,
            y: position.y,
            z: position.z,
        };
    });
}

export function getSpaceObjectPositionsForThreeFiber(
    orbitalElementsArray: OrbitalElements[]
): SpaceObjectPositionForThreeFiber[] {
    const positions = calculateSpaceObjectPositions(orbitalElementsArray);

    // Scale down the position for Three.js scene (assuming 1 unit = 1000 km)
    const baseScale = 1500;

    // Function to apply logarithmic scaling
    const logScale = (value: number, minValue: number, maxValue: number) => {
        const minLog = Math.log(minValue);
        const maxLog = Math.log(maxValue);
        const scale = (maxLog - minLog) / (maxValue - minValue);
        return Math.exp(minLog + scale * (value - minValue));
    };

    // Find the minimum and maximum radii
    const minRadius = Math.min(...positions.map((p) => p.radius));
    const maxRadius = Math.max(...positions.map((p) => p.radius));

    return positions.map(({ name, latitude, longitude, radius, x, y, z }) => {
        // Apply logarithmic scaling to the radius
        const scaledRadius = logScale(radius, minRadius, maxRadius);

        // Calculate the scaling factor
        const scaleFactor = scaledRadius / radius;

        // Apply the scaling factor to x, y, and z
        const scaledX = x * scaleFactor;
        const scaledY = y * scaleFactor;
        const scaledZ = z * scaleFactor;

        return {
            name,
            position: [scaledX / baseScale, scaledY / baseScale, scaledZ / baseScale],
            latitude,
            longitude,
            radius: radius - EARTH_RADIUS, // Original height above Earth's surface
        };
    });
}
