import { LoginFormUIProps } from '@/types/forms';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { FormError } from '@/components/ui/FormError';

export function LoginFormUI({ 
  onSubmit, 
  register, 
  errors, 
  errorMessage,
  isLoading 
}: LoginFormUIProps) {
  return (
    <div className="flex h-full items-center justify-center p-4">
      <Card className="max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-normal">Welcome to Arbolitics</h1>
          <p className="mt-2 text-sm text-gray-500">Demo credentials are pre-filled</p>
        </div>
        
        <FormError message={errorMessage} />
        
        <form onSubmit={onSubmit} className="space-y-6" aria-label="login">
          <Input
            id="email"
            type="email"
            label="Email"
            placeholder="Enter your email"
            register={register('email', { 
              required: 'Email is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Please enter a valid email address'
              }
            })}
            error={errors.email?.message}
          />

          <Input
            id="password"
            type="password"
            label="Password"
            placeholder="Enter your Password"
            register={register('password', { 
              required: 'Password is required',
              minLength: {
                value: 6,
                message: 'Password must be at least 6 characters'
              }
            })}
            error={errors.password?.message}
          />

          <Button type="submit" isLoading={isLoading}>
            {isLoading ? 'Logging in...' : 'Login'}
          </Button>
        </form>
      </Card>
    </div>
  );
} 