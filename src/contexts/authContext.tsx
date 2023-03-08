// contexts/auth.js

import Cookies from 'js-cookie';
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';

import { api } from '@/api/axios';

type User = {
  id?: string;
  nationalId?: string;
  name?: string;
  email?: string;
  createdAt?: string;
  updatedAt?: string;
  avg_monthly_income?: string;
  dob?: Date;
  gender?: string;
  image_src?: string;
  weight?: string;
  height_cm?: string;
  employmentStatus?: string;
  maritalStatus?: string;
  educationalLevel?: string;
};

// TODO: set the image_src to the default image
const defaultUser: User = {
  id: '',
  nationalId: '',
  name: '',
  email: '',
  createdAt: '',
  updatedAt: '',
  avg_monthly_income: '',
  gender: '',
  image_src: '',
  weight: '',
  height_cm: '',
  employmentStatus: '',
  maritalStatus: '',
  educationalLevel: '',
};

type ContextType = {
  isAuthenticated: boolean;
  user: User;
  loading: boolean;
  login: (username: string, password: string) => void;
  logout: () => void;
};

const initialContextValue: ContextType = {
  isAuthenticated: false,
  user: defaultUser,
  loading: false,
  login: () => {
    //
  },
  logout: () => {
    //
  },
};
const AuthContext = createContext<ContextType>(initialContextValue);

type props = {
  children: ReactNode;
};

export const AuthProvider = ({ children }: props) => {
  const [user, setUser] = useState<User>(defaultUser);
  const [loading, setLoading] = useState(true);

  async function loadUserFromCookies() {
    const token = Cookies.get('token');
    if (token) {
      // validate the token
      api.defaults.headers.Authorization = `Bearer ${token}`;
      const response = await api.get('users/me');
      const user = response?.data;
      if (user) setUser(user);
    }
    setLoading(false);
  }

  useEffect(() => {
    loadUserFromCookies();
  }, []);

  const login = async (email: string, password: string) => {
    const { data } = await api.post('auth/login', { email, password });
    const token = data.accessToken;
    if (token) {
      Cookies.set('token', token, { expires: 60 });
      api.defaults.headers.Authorization = `Bearer ${token.token}`;
      const { data: user } = await api.get('users/me');
      setUser(user);
    }
  };

  const logout = () => {
    Cookies.remove('token');
    setUser(defaultUser);
    delete api.defaults.headers.Authorization;
    window.location.pathname = '/login';
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated: !!user, user, login, loading, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
