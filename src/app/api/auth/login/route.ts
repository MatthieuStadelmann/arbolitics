import { ARBOLITICS_LOGIN_ENDPOINT } from '@/constants/arbo';
import { NextResponse } from 'next/server';
import { ERROR_MESSAGES } from '@/constants/errors';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${ARBOLITICS_LOGIN_ENDPOINT}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: body.email,
        password: body.password
      })
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { message: data.message || ERROR_MESSAGES.AUTH_FAILED },
        { status: response.status }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { message: ERROR_MESSAGES.INTERNAL_SERVER },
      { status: 500 }
    );
  }
} 