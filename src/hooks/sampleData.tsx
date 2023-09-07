import { useQuery, useMutation } from '@tanstack/react-query';
import { columns, users, statusOptions, musics } from '../data/data';

import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000',
});

function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const dataUsers = () => {
  return useQuery({
    queryKey: ['users'],
    queryFn: () => wait(2000).then(() => [...users]),
  });
};

interface Contact {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  username: string;
}

interface Paging {
  page: number;
  total_item: number;
  total_page: number;
}

interface ApiResponse {
  data: Contact[];
  paging: Paging;
}

interface LoginResponse {
  data: LoginData;
}

interface LoginData {
  token: string;
}

export async function fetchContacts(page = 1): Promise<ApiResponse> {
  try {
    const response = await axios.get('http://localhost:3000/api/contacts', {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: '555ead79-fe4c-4441-9afd-6bf14c3f94f8',
      },
      params: {
        page: page,
      },
    });

    return response.data as ApiResponse;
  } catch (error) {
    console.error('Error fetching contacts:', error);
    throw error;
  }
}

interface RegisterData {
  username: string;
  name: string;
}

interface ErrorResponse {
  errors: string;
}

export function registerUser(
  username: string,
  password: string,
  name: string,
  callback: (data?: RegisterData, error?: string) => void
): void {
  axios
    .post<RegisterData>(
      'http://localhost:3000/api/users',
      {
        username: username,
        password: password,
        name: name,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      }
    )
    .then((response) => {
      const data = response.data;
      callback(data);
    })
    .catch((error) => {
      const errorResponse = error.response.data as ErrorResponse;
      const errorMessage = errorResponse.errors;
      console.error('Error registering user:', errorMessage);
      callback(undefined, errorMessage);
    });
}

export function loginUser(
  username: string,
  password: string,
  callback: (data?: any, error?: string) => void
): void {
  axios
    .post<LoginData>(
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
    )
    .then((response) => {
      const data = response.data;
      callback(data);
    })
    .catch((error) => {
      const errorResponse = error.response.data as ErrorResponse;
      const errorMessage = errorResponse.errors;
      console.error('Error logging in:', errorMessage);
      callback(undefined, errorMessage);
    });
}

export const dataMusics = () => {
  return useQuery({
    queryKey: ['musics'],
    queryFn: () =>
      wait(2000).then(() => [...musics.data.artist.discography.albums.items]),
    placeholderData: [...musics.data.artist.discography.albums.items],
  });
};
