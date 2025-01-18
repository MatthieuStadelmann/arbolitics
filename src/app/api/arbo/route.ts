import { NextResponse } from 'next/server';
import axios, { AxiosError } from 'axios';
import { ArboDataPoint } from '@/types/arbo';
import { DEVICE_IDS, LOCATION_ID, ARBOLITICS_DATASET_ENDPOINT } from '@/constants/arbo';
import { ERROR_MESSAGES } from '@/constants/errors';

export async function GET(request: Request) {
  try {
    const authHeader = request.headers.get('Authorization');
    if (!authHeader) {
      return NextResponse.json({ message: ERROR_MESSAGES.UNAUTHORIZED }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const limit = searchParams.get('limit') || '24';

    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}${ARBOLITICS_DATASET_ENDPOINT}`, {
      headers: { Authorization: authHeader, 'Content-Type': 'application/json' },
      data: JSON.stringify({ location_id: LOCATION_ID, limit }),
    });

    const allData = response.data.data;
    return NextResponse.json({
      device_25_225: allData.filter((d: ArboDataPoint) => d.DID === DEVICE_IDS.DEVICE_1),
      device_25_226: allData.filter((d: ArboDataPoint) => d.DID === DEVICE_IDS.DEVICE_2)
    });

  } catch (error) {
    console.error('API Fetch Error:', error);
    if (error instanceof AxiosError) {
      return NextResponse.json(
        { message: error.response?.data || ERROR_MESSAGES.INTERNAL_SERVER },
        { status: error.response?.status || 500 }
      );
    }
    return NextResponse.json(
      { message: ERROR_MESSAGES.INTERNAL_SERVER },
      { status: 500 }
    );
  }
}
