const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8620/api/v1';

interface LoginResponse {
  token: string;
  user: {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
    role: string;
    is_platform_admin: boolean;
    is_entity_staff: boolean;
  };
}

interface ApiError {
  detail?: string;
  non_field_errors?: string[];
  [key: string]: unknown;
}

export async function login(username: string, password: string): Promise<LoginResponse> {
  const response = await fetch(`${API_BASE_URL}/accounts/login/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  });

  if (!response.ok) {
    const error: ApiError = await response.json();
    const message = error.non_field_errors?.[0] || error.detail || 'Login failed. Please try again.';
    throw new Error(message);
  }

  return response.json();
}

export function setAuthToken(token: string) {
  localStorage.setItem('authToken', token);
}

export function getAuthToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('authToken');
}

export function removeAuthToken() {
  localStorage.removeItem('authToken');
}

export function setUser(user: LoginResponse['user']) {
  localStorage.setItem('user', JSON.stringify(user));
}

export function getUser(): LoginResponse['user'] | null {
  if (typeof window === 'undefined') return null;
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
}

export function removeUser() {
  localStorage.removeItem('user');
}

export function logout() {
  removeAuthToken();
  removeUser();
}
