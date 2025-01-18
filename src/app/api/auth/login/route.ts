import { NextResponse } from 'next/server';

/**
 * MOCK LOGIN ENDPOINT - FOR TESTING PURPOSES ONLY
 * 
 * This endpoint provides a mock authentication response used exclusively in test environments.
 * 
 * @see src/components/__tests__/LoginForm.test.tsx for usage
 */
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