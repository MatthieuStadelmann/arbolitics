import { NextResponse } from 'next/server';
import axios, { AxiosError } from 'axios';
import { ArboDataResponse } from '@/types/arbo';

export async function GET(request: Request) {
  try {
    const authHeader = request.headers.get('Authorization');

    if (!authHeader) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const requestBody = { location_id: 10, limit: 1 };

    const response = await axios.get<ArboDataResponse>(
      `${process.env.NEXT_PUBLIC_API_URL}/data/getArboliticsDataset`,
      {
        headers: {
          'Authorization': authHeader,
          'Content-Type': 'application/json',
        },
        data: requestBody,
      }
    );

    return NextResponse.json(response.data);
  } catch (error) {
    console.error('Arbo data fetch error:', error);
    
    if (error instanceof AxiosError) {
      return NextResponse.json(
        { message: error.response?.data?.message || 'Failed to fetch data' },
        { status: error.response?.status || 500 }
      );
    }

    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}