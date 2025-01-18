"use client";
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { LoginFormInputs } from '@/types/auth';
import { useLogin } from '@/hooks/useAuth';
import { setAuthToken } from '@/utils/auth';
import { LoginFormUI } from './LoginFormUI';

export function LoginForm() {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string>('');
  const { setIsAuthenticated } = useAuth();
  
  const { 
    register, 
    handleSubmit, 
    formState: { errors } 
  } = useForm<LoginFormInputs>({
    defaultValues: {
      email: 'challenge2025@arbolitics.com',
      password: 'challenge2025'
    }
  });

  const mutation = useLogin();

  const onSubmit = handleSubmit((data: LoginFormInputs) => {
    mutation.mutate(data, {
      onSuccess: (response) => {
        setAuthToken(response.data.accessToken);
        setIsAuthenticated(true);
        router.push('/');
      },
      onError: (error) => {
        setErrorMessage('Invalid email or password. Please try again.');
        console.error('Login failed:', error);
      }
    });
  });

  return (
    <LoginFormUI
      onSubmit={onSubmit}
      register={register}
      errors={errors}
      errorMessage={errorMessage}
      isLoading={mutation.isPending}
    />
  );
} 