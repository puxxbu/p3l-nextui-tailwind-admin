import axios, { AxiosError } from 'axios';

const baseURL = 'http://localhost:3000';

export async function fetchFasilitas(
  page = 1,
  nama_layanan = '',
  token: string
): Promise<FasilitasResponse> {
  try {
    let url = `http://localhost:3000/api/fasilitas?page=${page}`;
    if (nama_layanan !== '') {
      url += `&nama_layanan=${nama_layanan}`;
    }

    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data as FasilitasResponse;
  } catch (error) {
    console.error('Error fetching contacts:', error);
    throw error;
  }
}

export async function fetchFasilitasSize(
  size = 100,
  nama_layanan = '',
  token: string
): Promise<FasilitasResponse> {
  try {
    let url = `http://localhost:3000/api/fasilitas?size=${size}`;
    if (nama_layanan !== '') {
      url += `&nama_layanan=${nama_layanan}`;
    }

    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data as FasilitasResponse;
  } catch (error) {
    console.error('Error fetching contacts:', error);
    throw error;
  }
}

export function createFasilitas(
  nama_layanan: string,
  harga: string,
  token: string,
  callback: (data?: CreateFasilitasResponse, error?: string) => void
): void {
  axios
    .post<CreateFasilitasResponse>(
      `${baseURL}/api/fasilitas`,
      {
        nama_layanan: nama_layanan,
        harga: harga,
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

export function updateFasilitas(
  id_fasilitas: string,
  nama_layanan: string,
  harga: string,
  token: string,
  callback: (data?: CreateFasilitasResponse, error?: string) => void
): void {
  axios
    .put<CreateFasilitasResponse>(
      `${baseURL}/api/fasilitas/${id_fasilitas}`,
      {
        nama_layanan: nama_layanan,
        harga: harga,
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

export function deleteFasilitas(
  id: string,
  token: string,
  callback: (data?: CreateFasilitasResponse, error?: string) => void
): void {
  axios
    .delete<CreateFasilitasResponse>(`${baseURL}/api/fasilitas/${id}`, {
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

export async function getFasilitasById(
  id: string,
  token: string
): Promise<CreateFasilitasResponse> {
  try {
    let url = `http://localhost:3000/api/fasilitas/${id}`;

    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data as CreateFasilitasResponse;
  } catch (error) {
    console.error('Error fetching contacts:', error);
    throw error;
  }
}
