import { useAppDispatch, useAppSelector } from '../redux';
import { authAPI } from '../services/authAPI';
import { setUser, setLoading, logout } from '../redux/authSlice';

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const { user, isAuthenticated, loading } = useAppSelector((state) => state.auth);

  const login = async (email: string, password: string) => {
    dispatch(setLoading(true));
    try {
      const response = await authAPI.login({ email, password });
      const { accessToken, refreshToken, user: userData } = response.data;
      
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      dispatch(setUser(userData));
      
      return userData;
    } catch (error) {
      throw error;
    } finally {
      dispatch(setLoading(false));
    }
  };

  const register = async (username: string, email: string, password: string) => {
    dispatch(setLoading(true));
    try {
      const response = await authAPI.register({ username, email, password });
      const { accessToken, refreshToken, user: userData } = response.data;
      
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      dispatch(setUser(userData));
      
      return userData;
    } catch (error) {
      throw error;
    } finally {
      dispatch(setLoading(false));
    }
  };

  const logoutUser = async () => {
    try {
      await authAPI.logout();
    } catch {
      // Ignore error on logout
    } finally {
      dispatch(logout());
    }
  };

  return {
    user,
    isAuthenticated,
    loading,
    login,
    register,
    logout: logoutUser,
  };
};