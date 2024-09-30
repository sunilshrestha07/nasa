export default function TLEPositionFinder(
    inclination: number,
    raan: number,
    radius: number
): [number, number, number] {
    // Convert degrees to radians
    const incRad = inclination * (Math.PI / 180);
    const raanRad = raan * (Math.PI / 180);

    // Calculate position
    const x = radius * Math.cos(raanRad) * Math.sin(incRad);
    const y = radius * Math.sin(raanRad) * Math.sin(incRad);
    const z = radius * Math.cos(incRad);

    return [x, y, z];
}
