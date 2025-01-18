import { useMutation } from '@tanstack/react-query';
import { LoginFormInputs, LoginResponse } from '@/types/auth';

async function loginUser(credentials: LoginFormInputs): Promise<LoginResponse> {
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials)
  });

  if (!response.ok) {
    throw new Error('Login failed');
  }

  return response.json();
}

export function useLogin() {
  return useMutation({
    mutationFn: loginUser
  });
} 