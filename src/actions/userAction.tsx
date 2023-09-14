import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { RootState } from 'src/store';

import axios from 'axios';

interface User {
  username: string;
  password: string;
}

interface LoginResponse {
  data: {
    token: string;
    role: {
      id: number;
      name: string;
    };
    accessToken: string;
    refreshToken: string;
  };
}
interface ErrorResponse {
  errors: string;
}

export const login =
  (
    username: string,
    password: string
  ): ThunkAction<Promise<void>, RootState, unknown, AnyAction> =>
  async (
    dispatch: ThunkDispatch<RootState, unknown, AnyAction>
  ): Promise<void> => {
    try {
      dispatch({
        type: 'USER_LOGIN_SUCCESS',
      });

      const { data } = await axios.post<LoginResponse>(
        'http://localhost:3000/api/users/login',
        {
          username: username,
          password: password,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
        }
      );

      const loginData = {
        token: data.data.token,
        role: data.data.role,
        accessToken: data.data.accessToken,
        refreshToken: data.data.refreshToken,
      };

      dispatch({
        type: 'USER_LOGIN_SUCCESS',
        payload: loginData,
      });
    } catch (e: any) {
      dispatch({
        type: 'USER_LOGIN_FAIL',
        payload:
          e.response && e.response.data.message
            ? e.response.data.message
            : e.message,
      });
    }
  };

// export const logout =
//   (): ThunkAction<void, RootState, unknown, AnyAction> =>
//   async (dispatch: ThunkDispatch<RootState, unknown, AnyAction>) => {
//     localStorage.removeItem('userInfo');
//     dispatch({ type: 'USER_LOGOUT' });

//     await fetch('http://localhost:3000/api/users/logout', {
//       headers: { 'Content-Type': 'application/json' },
//       credentials: 'include',
//     });
//   };
