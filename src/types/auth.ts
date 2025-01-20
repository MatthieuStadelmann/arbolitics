export interface LoginFormInputs {
  email: string;
  password: string;
}

interface Company {
  id: number;
  name: string;
}

export interface LoginResponse {
  data: {
    id: number;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
    name: string;
    password: string;
    email: string;
    role: string;
    isSubscribed: boolean;
    lang: string;
    passwordKey: string;
    company: Company;
    accessToken: string;
  };
  message: string;
}
