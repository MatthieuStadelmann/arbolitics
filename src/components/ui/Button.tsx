import { cn } from '@/lib/utils';
import { ButtonProps } from '@/types/ui';

export function Button({ 
  isLoading, 
  variant = 'primary', 
  className,
  children,
  ...props 
}: ButtonProps) {
  const baseStyles = "flex w-full justify-center rounded-lg border px-4 py-2 text-sm font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50";
  
  const variants = {
    primary: "border-transparent bg-[#2B4C15] text-white hover:bg-[#223C11] focus:ring-green-500",
    secondary: "border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:ring-green-500"
  };

  return (
    <button
      className={cn(baseStyles, variants[variant], className)}
      disabled={isLoading}
      {...props}
    >
      {isLoading ? 'Loading...' : children}
    </button>
  );
} 