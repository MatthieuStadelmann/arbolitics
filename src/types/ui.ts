import { UseFormRegisterReturn } from "react-hook-form";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  register?: UseFormRegisterReturn;
}

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  variant?: 'primary' | 'secondary';
  children: React.ReactNode;
}

export interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export interface FormErrorProps {
  message?: string;
} 