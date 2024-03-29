// contexts/auth.js

import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useQueryClient } from 'react-query';

import { api } from '@/api/axios';
export type AdminType = {
  id: string;
  roleId: string;
  userId: string;
};

// export type AdminType =
// TODO: change the location of this
export type User = {
  admin: AdminType | null;
  isAdmin: boolean;
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
  isAnonymous: boolean;
  isDoctor: boolean;
  medicalSpecialization: string; // change this to enum later when you want to use the type
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
  isDoctor: false,
  medicalSpecialization: '',
  isAnonymous: true,
  admin: null,
  isAdmin: false,
};

type ContextType = {
  isAnonymous: boolean;
  user: User;
  loading: boolean;
  login: (username: string, password: string) => void;
  logout: () => void;
};

const initialContextValue: ContextType = {
  isAnonymous: false,
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
  const router = useRouter();
  const queryCache = useQueryClient();
  const { redirect } = router.query;

  async function validateTokenAndSetUser(token: string | undefined) {
    // validate the token
    // NOTE: the token will be undefined in production because it's set as an http only cookie
    if (token) api.defaults.headers.Authorization = `Bearer ${token}`;
    const response = await api.get('users/me');
    const user: User = response?.data;

    const isDoctor = !!user?.medicalSpecialization;
    const isAdmin = !!user?.admin;

    if (user) {
      setUser({ ...user, isAnonymous: false, isDoctor, isAdmin });
      return { success: true };
    }
  }
  async function loadUserFromCookies() {
    const token = Cookies.get('token');
    await validateTokenAndSetUser(token);
    setLoading(false);
  }

  useEffect(() => {
    loadUserFromCookies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const login = async (nationalId: string, password: string) => {
    const res = await api.post('auth/login', { nationalId, password });
    const token = res?.data?.accessToken;
    if (token) {
      const result = await validateTokenAndSetUser(token);

      if (result?.success) router.push(redirect?.toString() || '/');
    }
  };

  const logout = async () => {
    Cookies.remove('token'); //will be removed in development
    setUser(defaultUser); // this is very important , it won't only remove the user details from the context but it will cause the components that uses this context to rerender
    delete api.defaults.headers.Authorization;
    //clear the react query cache
    queryCache.clear();
    await api.post('auth/logout');
  };

  return (
    <AuthContext.Provider
      value={{ isAnonymous: user.isAnonymous, user, login, loading, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
