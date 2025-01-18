import { UseFormRegister, FieldErrors } from 'react-hook-form';
import { LoginFormInputs } from './auth';

export interface LoginFormUIProps {
  onSubmit: (e: React.FormEvent) => void;
  register: UseFormRegister<LoginFormInputs>;
  errors: FieldErrors<LoginFormInputs>;
  errorMessage?: string;
  isLoading: boolean;
} 