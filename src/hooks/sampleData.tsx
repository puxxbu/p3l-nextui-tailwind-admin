import { useQuery, useMutation } from '@tanstack/react-query';
import { columns, users, statusOptions, musics } from '../data/data';

import axios from 'axios';
import useAuth from './useAuth';

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

interface LoginResponse {
  data: {
    token: string;
    role: {
      id_role: number;
      nama_role: string;
    };
  };
}

// export async function fetchContacts(page = 1): Promise<ApiResponse> {
//   try {
//     const response = await axios.get('https://catfact.ninja/fact', {
//       withCredentials: true,
//     });

//     return response.data as ApiResponse;
//   } catch (error) {
//     console.error('Error fetching contacts:', error);
//     throw error;
//   }
// }

interface ResponseData {
  username: string;
  name: string;
}

interface ErrorResponse {
  errors: string;
}

interface ResponseData {
  data: DataItem[];
}

interface DataItem {
  username: string;
  id_role: number;
  nama: string;
  jenis_customer: string;
}

interface Customer {
  username: string;
  password: string;
  nama: string;
  nomor_identitas: string;
  nomor_telepon: string;
  email: string;
  alamat: string;
}

export function registerUser(
  dataCustomer: Customer,

  callback: (data?: ResponseData, error?: string) => void
): void {
  axios
    .post<ResponseData>(
      'http://localhost:3000/api/users',
      {
        akun: {
          username: dataCustomer.username,
          password: dataCustomer.password,
          id_role: 2001,
        },
        customer: {
          nama: dataCustomer.nama,
          jenis_customer: 'Personal',
          nomor_identitas: dataCustomer.nomor_identitas,
          nomor_telepon: dataCustomer.nomor_telepon,
          email: dataCustomer.email,
          alamat: dataCustomer.alamat,
        },
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
      console.log(error.message);
      if (axios.isAxiosError(error)) {
        callback(undefined, error.message);
      }

      const errorResponse = error.response.data as ErrorResponse;
      const errorMessage = errorResponse.errors;
      console.error('Error logging in:', errorMessage);
      callback(undefined, errorMessage);
    });
}

export function loginUser(
  username: string,
  password: string,
  callback: (data?: LoginResponse, error?: string) => void
): void {
  axios
    .post<LoginResponse>(
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
      console.log('Error:', error);
      if (error.code === 'ERR_NETWORK') {
        console.error('Connection refused. Please check the server.');
        callback(undefined, 'Tidak Terhubung ke Server');
      }
      const errorResponse = error.response.data as ErrorResponse;
      const errorMessage = errorResponse.errors;
      console.error('Error logging in:', errorMessage, errorResponse);
      callback(undefined, errorMessage);
    });
}

export function getCurrentUser(
  token: string,
  callback: (data?: LoginResponse, error?: string) => void
): void {
  axios
    .get<LoginResponse>('http://localhost:3000/api/users/current', {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
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
