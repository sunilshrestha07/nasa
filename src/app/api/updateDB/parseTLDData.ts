import { getSatelliteInfo } from "tle.js";

type SimpleSatelliteData = {
    name: string;
    catalogNumber: string;
    latitude: number;
    longitude: number;
    radius: number;
};

export default function parseTLEData(tleData: string): SimpleSatelliteData[] {
    const lines = tleData.split("\n");
    const satellites: SimpleSatelliteData[] = [];
    const catalogNumbers = new Set<string>();

    for (let i = 0; i < lines.length; i += 3) {
        if (i + 2 >= lines.length) break;

        const name = lines[i].trim();
        const line1 = lines[i + 1];
        const line2 = lines[i + 2];

        if (line1.startsWith("1") && line2.startsWith("2")) {
            const tleLine1 = line1.trim();
            const tleLine2 = line2.trim();

            // Extract 6 characters, then trim to remove any trailing space
            const catalogNumber = line1.substring(2, 8).trim();

            if (
                catalogNumber &&
                (catalogNumber.length === 5 || catalogNumber.length === 6) &&
                catalogNumber !== "00000"
            ) {
                if (catalogNumbers.has(catalogNumber)) {
                    console.log(
                        `Duplicate catalog number found: ${catalogNumber} for satellite ${name}`
                    );
                    continue; // Skip this satellite
                }

                catalogNumbers.add(catalogNumber);
                const satInfo = getSatelliteInfo([name, tleLine1, tleLine2], Date.now(), 0);
                satellites.push({
                    name: name,
                    catalogNumber: catalogNumber,
                    latitude: satInfo.lat,
                    longitude: satInfo.lng,
                    radius: satInfo.height,
                });
            } else {
                console.log(
                    `Skipping satellite with invalid catalog number: ${name}, catalogNumber: ${catalogNumber}`
                );
            }
        }
    }

    console.log(`Total unique satellites processed: ${satellites.length}`);
    return satellites;
}
