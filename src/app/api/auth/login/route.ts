import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    return NextResponse.json({
      data: {
        accessToken: 'mock-token',
        id: 1,
        email: body.email,
        name: 'Test User',
        role: 'user',
        company: {
          id: 1,
          name: 'Test Company'
        }
      }
    });
  } catch (err) {
    console.error('Login error:', err);
    return NextResponse.json(
      { message: 'Invalid credentials' },
      { status: 401 }
    );
  }
} 