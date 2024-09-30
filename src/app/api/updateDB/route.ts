/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse } from "next/server";
import dbConnect from "../dbConnect";
import mongoose from "mongoose";
import parseTLEData from "./parseTLDData";

// Simplified Satellite Data Type

// Mongoose Schema
const satelliteSchema = new mongoose.Schema({
    name: { type: String, required: true },
    catalogNumber: {
        type: String,
        required: true,
        // unique: true,
    },
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
    radius: { type: Number, required: true },
    lastUpdated: { type: Date, default: Date.now() },
});

// Mongoose Model
const SatelliteModel = mongoose.models.Satellite || mongoose.model("Satellite", satelliteSchema);

export async function GET() {
    try {
        await dbConnect();
        try {
            const response = await fetch(
                "https://celestrak.org/NORAD/elements/gp.php?GROUP=active&FORMAT=tle",
                { cache: "no-store" }
            );

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const dataBody = await response.text();
            const parsedData = parseTLEData(dataBody);

            console.log("parsedData", parsedData);

            return NextResponse.json(parsedData);
            // try {
            //     console.log(`Attempting to update/insert ${parsedData.length} satellites...`);

            //     for (let i = 0; i < parsedData.length - 10000; i++) {
            //         const newSatellite = new SatelliteModel({
            //             name: parsedData[i].name,
            //             catalogNumber: parsedData[i].catalogNumber,
            //             latitude: parsedData[i].latitude,
            //             longitude: parsedData[i].longitude,
            //             radius: parsedData[i].radius,
            //             lastUpdated: new Date(),
            //         });

            //         await newSatellite.save();
            //     }

            //     return NextResponse.json({
            //         message: "Database updated successfully",
            //         totalProcessed: parsedData.length,
            //     });
            // } catch (error) {
            //     console.error("Error while updating to database", error);

            //     return NextResponse.json(
            //         {
            //             error: "Error while updating to database",
            //             details: error,
            //         },
            //         { status: 500 }
            //     );
            // }
            //Finished bulk write operation
        } catch (error) {
            return NextResponse.json(
                {
                    error: "An error occurred while updating the database",
                    details: error instanceof Error ? error.message : String(error),
                },
                { status: 500 }
            );
        }
    } catch (error) {
        return NextResponse.json(
            {
                error: "An error occurred while connecting to the database",
                details: error instanceof Error ? error.message : String(error),
            },
            { status: 500 }
        );
    }
}
