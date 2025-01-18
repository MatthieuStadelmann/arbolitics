import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { LoginForm } from '../LoginForm';
import { AuthProvider } from '@/contexts/AuthContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      push: jest.fn(),
    };
  },
}));

const queryClient = new QueryClient();
const renderWithProviders = (component: React.ReactNode) => {
  return render(
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        {component}
      </AuthProvider>
    </QueryClientProvider>
  );
};

describe('LoginForm', () => {
  const originalConsoleError = console.error;
  
  beforeEach(() => {
    localStorage.clear();
    queryClient.clear();
    jest.clearAllMocks();
    console.error = jest.fn();
  });

  afterEach(() => {
    console.error = originalConsoleError;
  });

  it('renders all form elements', () => {
    renderWithProviders(<LoginForm />);
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
  });

  it('validates required fields', async () => {
    renderWithProviders(<LoginForm />);
    const form = screen.getByLabelText('login');
    fireEvent.submit(form);
    
    const emailError = await screen.findByText(/email is required/i);
    const passwordError = await screen.findByText(/password is required/i);
    
    expect(emailError).toBeInTheDocument();
    expect(passwordError).toBeInTheDocument();
  });

  it('validates email format', async () => {
    renderWithProviders(<LoginForm />);
    
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    
    await userEvent.type(emailInput, 'invalid-email');
    await userEvent.type(passwordInput, 'password123');
    
    const form = screen.getByLabelText('login');
    fireEvent.submit(form);

    const errorMessage = await screen.findByText(/please enter a valid email address/i);
    expect(errorMessage).toBeInTheDocument();
  });

  it('validates password length', async () => {
    renderWithProviders(<LoginForm />);
    
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    
    await userEvent.type(emailInput, 'test@example.com');
    await userEvent.type(passwordInput, '12345');
    
    const form = screen.getByLabelText('login');
    fireEvent.submit(form);

    const errorMessage = await screen.findByText(/password must be at least 6 characters/i);
    expect(errorMessage).toBeInTheDocument();
  });

  it('handles failed login attempt', async () => {
    renderWithProviders(<LoginForm />);
    
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    
    await userEvent.type(emailInput, 'test@example.com');
    await userEvent.type(passwordInput, 'password123');
    
    const form = screen.getByLabelText('login');
    fireEvent.submit(form);

    const errorMessage = await screen.findByText(/invalid email or password/i);
    expect(errorMessage).toBeInTheDocument();
  });

  it('handles successful login', async () => {
    const mockResponse = {
      data: {
        accessToken: 'mock-token',
        id: 1,
        email: 'test@example.com',
        name: 'Test User',
        role: 'user',
        company: {
          id: 1,
          name: 'Test Company'
        }
      }
    };

    global.fetch = jest.fn().mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockResponse),
      })
    );

    renderWithProviders(<LoginForm />);
    
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    
    await userEvent.type(emailInput, 'test@example.com');
    await userEvent.type(passwordInput, 'password123');
    
    const form = screen.getByLabelText('login');
    fireEvent.submit(form);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith('/api/auth/login', expect.any(Object));
    });
  });

  it('shows loading state during submission', async () => {
    global.fetch = jest.fn().mockImplementationOnce(() =>
      new Promise(resolve => setTimeout(resolve, 100))
    );

    renderWithProviders(<LoginForm />);
    
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    
    await userEvent.type(emailInput, 'test@example.com');
    await userEvent.type(passwordInput, 'password123');
    
    const form = screen.getByLabelText('login');
    fireEvent.submit(form);

    expect(await screen.findByText(/logging in/i)).toBeInTheDocument();
  });
}); 