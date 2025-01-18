"use client";
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { LoginFormUI } from './LoginFormUI';
import { useLogin } from '@/hooks/useAuth';
import { useAuth } from '@/contexts/AuthContext';
import { LoginFormInputs } from '@/types/auth';

export function LoginForm() {
  const router = useRouter();
  const { setIsAuthenticated } = useAuth();
  const { 
    mutate: login, 
    isPending, 
    error 
  } = useLogin();

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

  const onSubmit = handleSubmit((data) => {
    login(data, {
      onSuccess: () => {
        setIsAuthenticated(true);
        router.push('/');
      }
    });
  });

  return (
    <LoginFormUI
      onSubmit={onSubmit}
      register={register}
      errors={errors}
      errorMessage={error?.message}
      isLoading={isPending}
    />
  );
} 