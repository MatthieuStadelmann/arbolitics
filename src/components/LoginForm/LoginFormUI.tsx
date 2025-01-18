import { LoginFormUIProps } from '@/types/forms';

export function LoginFormUI({ 
  onSubmit, 
  register, 
  errors, 
  errorMessage,
  isLoading 
}: LoginFormUIProps) {
  return (
    <div className="flex h-full items-center justify-center p-4">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-normal">Welcome to Arbolitics</h1>
          <p className="mt-2 text-sm text-gray-500">Demo credentials are pre-filled</p>
        </div>
        
        {errorMessage && (
          <div className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-600">
            {errorMessage}
          </div>
        )}
        
        <form onSubmit={onSubmit} className="space-y-6" aria-label="login">
          <div>
            <label htmlFor="email" className="block text-sm font-normal text-gray-700">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              {...register('email', { 
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Please enter a valid email address'
                }
              })}
              className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-500" role="alert">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-normal text-gray-700">
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Enter your Password"
              {...register('password', { 
                required: 'Password is required',
                minLength: {
                  value: 6,
                  message: 'Password must be at least 6 characters'
                }
              })}
              className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-500" role="alert">
                {errors.password.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="flex w-full justify-center rounded-lg border border-transparent bg-[#2B4C15] px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-[#223C11] focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50"
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
          
        </form>
      </div>
    </div>
  );
} 