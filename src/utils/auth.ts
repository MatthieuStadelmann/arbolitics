export const setAuthToken = (token: string) => {
    localStorage.setItem('accessToken', token);
  };
  
  export const getAuthToken = () => {
    return localStorage.getItem('accessToken');
  };
  
  export const fetchWithAuth = async (url: string, options: RequestInit = {}) => {
    const token = getAuthToken();
    
    const headers = {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
      ...options.headers,
    };
  
    const response = await fetch(url, {
      ...options,
      headers,
    });
  
    if (!response.ok) {
      throw new Error('API request failed');
    }
  
    return response.json();
  };
  
  export const clearAuth = () => {
    localStorage.removeItem('accessToken');
  };