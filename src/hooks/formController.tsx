import { useQuery, useMutation } from '@tanstack/react-query';
import { columns, users, statusOptions, musics } from '../data/data';

import axios from 'axios';
import useAuth from './useAuth';
import { parse } from 'path';

const baseURL = 'http://localhost:3000';

export function createKamar(
  nomor_kamar: string,
  id_jenis_kamar: string,
  token: string,
  callback: (data?: CreateKamarResponse, error?: string) => void
): void {
  axios
    .post<CreateKamarResponse>(
      `${baseURL}/api/kamar`,
      {
        nomor_kamar: parseInt(nomor_kamar),
        id_jenis_kamar: parseInt(id_jenis_kamar),
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
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
