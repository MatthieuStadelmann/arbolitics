import { NextResponse } from "next/server";
import axios from "axios";
import { ArboDataPoint } from "@/types/arbo";
import {
  ARBOLITICS_DATASET_ENDPOINT,
  DEVICE_IDS,
  LOCATION_ID,
  TIME_LIMITS,
} from "@/constants/arbo";
import { AxiosError } from "axios";


export async function GET(request: Request) {
  try {
    const authHeader = request.headers.get("Authorization");
    if (!authHeader) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const limit = searchParams.get("limit")
      ? parseInt(searchParams.get("limit")!, 10)
      : TIME_LIMITS.daily;
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}${ARBOLITICS_DATASET_ENDPOINT}`,
      {
        headers: {
          Authorization: authHeader,
          "Content-Type": "application/json",
        },
        data: JSON.stringify({ location_id: LOCATION_ID, limit }),
      }
    );

    const allData = response.data.data;

    return NextResponse.json({
      device_25_225: allData.filter(
        (dataPoint: ArboDataPoint) => dataPoint.DID === DEVICE_IDS.DEVICE_1
      ),
      device_25_226: allData.filter(
        (dataPoint: ArboDataPoint) => dataPoint.DID === DEVICE_IDS.DEVICE_2
      ),
    });
  } catch (error: unknown) {
    console.error("API Fetch Error:", error);
    return NextResponse.json(
      {
        message:
          (error as AxiosError).response?.data || "Internal server error",
      },
      { status: 500 }
    );
  }
}
