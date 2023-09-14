import { axiosInstance } from 'Hooks/sampleData';
import useAuth from './useAuth';
import React from 'react';
import AuthContext from 'Contexts/AuthProvider';

const useRefreshToken = (authContext: any) => {
  const { setAuth } = authContext;

  const refresh = async () => {
    console.log('masuk refresh token');
    const response = await axiosInstance.get('/refresh', {
      withCredentials: true,
    });
    setAuth((prev: any) => {
      console.log(JSON.stringify(prev));
      console.log(response.data);
      return { ...prev, accessToken: response.data };
    });
    return response.data;
  };
  console.log(refresh);
  return refresh;
};

export default useRefreshToken;
