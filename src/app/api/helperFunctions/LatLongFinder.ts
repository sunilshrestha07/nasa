export default function LatLongFinder(lat: number, long: number, radius: number) {
    const latRad = lat * (Math.PI / 180);
    const longRad = long * (Math.PI / 180);

    // Calculate the position
    const x = radius * Math.cos(latRad) * Math.cos(longRad);
    const y = radius * Math.sin(latRad);
    const z = -1.4 * radius * Math.cos(latRad) * Math.sin(longRad);

    return [x, y, z];
}
