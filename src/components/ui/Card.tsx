import { cn } from '@/lib/utils';
import { CardProps } from '@/types/ui';

export function Card({ children, className }: CardProps) {
  return (
    <div className={cn(
      "w-full rounded-lg bg-white p-8 shadow-lg",
      className
    )}>
      {children}
    </div>
  );
} 