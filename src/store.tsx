import {
  createStore,
  configureStore,
  combineReducers,
  applyMiddleware,
} from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { userLoginReducer } from './reducers/userReducer';
import Cookies from 'universal-cookie';

const cookie = new Cookies();

const cookieValue = cookie.get('jwt');

console.log('Cookie Value:', cookieValue);

const reducers = combineReducers({
  // Add reducers here
  userLogin: userLoginReducer,
});

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo')!)
  : undefined;

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
} as {};

const middleware = [thunk];

// const store = configureStore({
//   reducer: reducers,
//   middleware: middleware,
//   devTools: process.env.NODE_ENV !== 'production',
//   preloadedState: initialState,
// });

const store = createStore(
  reducers,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;

export type RootState = ReturnType<typeof store.getState>;
