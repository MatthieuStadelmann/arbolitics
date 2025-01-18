import { InputProps } from '@/types/ui';

export function Input({ 
  label, 
  error, 
  id, 
  register, 
  ...props 
}: InputProps) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-normal text-gray-700">
        {label}
      </label>
      <input
        id={id}
        {...register}
        {...props}
        className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
      />
      {error && (
        <p className="mt-1 text-sm text-red-500" role="alert">
          {error}
        </p>
      )}
    </div>
  );
} 