export interface LoginFormInputs {
  email: string;
  password: string;
}

export interface LoginResponse {
  data: {
    accessToken: string;
    id: number;
    email: string;
    name: string;
    role: string;
    company: {
      id: number;
      name: string;
    };
  };
} 