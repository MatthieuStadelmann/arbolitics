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
    const error = await response.json();
    throw new Error(error.message || 'Login failed');
  }

  return response.json();
}

export function useLogin() {
  return useMutation<LoginResponse, Error, LoginFormInputs>({
    mutationFn: loginUser,
    onSuccess: (data) => {
      localStorage.setItem('accessToken', data.data.accessToken);
    }
  });
} 