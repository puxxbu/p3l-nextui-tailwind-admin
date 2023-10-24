import axios from 'axios';

const baseURL = 'http://localhost:3000';

export async function fetchJenisKamar(
  page = 1,
  jenis_kamar = '',
  token: string
): Promise<JenisKamarResponse> {
  try {
    let url = `http://localhost:3000/api/jenis-kamar?page=${page}`;
    if (jenis_kamar !== '') {
      url += `&jenis_kamar=${parseInt(jenis_kamar)}`;
    }

    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data as JenisKamarResponse;
  } catch (error) {
    console.error('Error fetching contacts:', error);
    throw error;
  }
}

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

export function updateKamar(
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

export function deleteKamar(
  id: string,
  token: string,
  callback: (data?: CreateKamarResponse, error?: string) => void
): void {
  axios
    .delete<CreateKamarResponse>(`${baseURL}/api/kamar/${id}`, {
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

export async function getJenisKamarById(
  id: string,
  token: string
): Promise<CreateJenisKamarResponse> {
  try {
    let url = `http://localhost:3000/api/jenis-kamar/${id}`;

    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data as CreateJenisKamarResponse;
  } catch (error) {
    console.error('Error fetching contacts:', error);
    throw error;
  }
}
