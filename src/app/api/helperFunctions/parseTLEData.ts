import { getSatelliteInfo } from "tle.js";

export type SatelliteData = {
    name: string;
    catalogNumber: string;
    latitude: number;
    longitude: number;
    radius: number;
    inclination: number;
    rightAscension: number;
    eccentricity: number;
    argumentOfPerigee: number;
    meanAnomaly: number;
    meanMotion: number;
};

export default function parseTLEData(tleData: string): SatelliteData[] {
    const lines = tleData.split("\n");
    const satellites: SatelliteData[] = [];

    for (let i = 0; i < lines.length; i += 3) {
        if (i + 2 >= lines.length) break;

        const name = lines[i].trim();
        const line1 = lines[i + 1];
        const line2 = lines[i + 2];

        if (line1.startsWith("1") && line2.startsWith("2")) {
            const tleLine1 = line1.trim();
            const tleLine2 = line2.trim();

            // Use tle.js to get satellite position
            const satInfo = getSatelliteInfo([name, tleLine1, tleLine2], Date.now(), 0);

            satellites.push({
                name,
                catalogNumber: line1.substring(2, 7).trim(),
                latitude: satInfo.lat,
                longitude: satInfo.lng,
                radius: satInfo.height * 1000, // Convert km to meters
                inclination: parseFloat(line2.substring(8, 16)),
                rightAscension: parseFloat(line2.substring(17, 25)),
                eccentricity: parseFloat(`0.${line2.substring(26, 33)}`),
                argumentOfPerigee: parseFloat(line2.substring(34, 42)),
                meanAnomaly: parseFloat(line2.substring(43, 51)),
                meanMotion: parseFloat(line2.substring(52, 63)),
            });
        }
    }

    return satellites;
}
