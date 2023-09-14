export interface UserState {
  loading?: boolean;
  error?: string;
  userInfo: {
    token: string;
    role: {
      id: number;
      name: string;
    };
    accessToken: string;
    refreshToken: string;
  };
}

interface Action {
  type: string;
  payload?: string;
}

export const userLoginReducer = (
  state: UserState = { userInfo: {} },
  action: Action
) => {
  switch (action.type) {
    case 'USER_LOGIN_REQUEST':
      return { loading: true };
    case 'USER_LOGIN_SUCCESS':
      return { loading: false, userInfo: action.payload };
    case 'USER_LOGIN_FAIL':
      return { loading: false, error: action.payload };
    case 'USER_LOGOUT':
      return {};

    default:
      return state;
  }
};
