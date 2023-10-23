import axios from 'axios';

const baseURL = 'http://localhost:3000';

export async function fetchKamar(
  page = 1,
  nomor_kamar = '',
  token: string
): Promise<KamarResponse> {
  try {
    let url = `http://localhost:3000/api/kamar?page=${page}`;
    if (nomor_kamar !== '') {
      url += `&nomor_kamar=${parseInt(nomor_kamar)}`;
    }

    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data as KamarResponse;
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
  id_kamar: string,
  nomor_kamar: string,
  id_jenis_kamar: string,
  token: string,
  callback: (data?: CreateKamarResponse, error?: string) => void
): void {
  axios
    .put<CreateKamarResponse>(
      `${baseURL}/api/kamar/${id_kamar}`,
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

export async function getKamarById(
  id: string,
  token: string
): Promise<CreateKamarResponse> {
  try {
    let url = `http://localhost:3000/api/kamar/${id}`;

    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data as CreateKamarResponse;
  } catch (error) {
    console.error('Error fetching contacts:', error);
    throw error;
  }
}
