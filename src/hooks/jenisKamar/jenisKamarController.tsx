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

export function createJenisKamar(
  jenis_kamar: string,
  jenis_bed: string,
  jumlah_kasur: string,
  token: string,
  callback: (data?: CreateJenisKamarResponse, error?: string) => void
): void {
  axios
    .post<CreateJenisKamarResponse>(
      `${baseURL}/api/jenis-kamar`,
      {
        jenis_kamar: jenis_kamar,
        jenis_bed: jenis_bed,
        jumlah_kasur: parseInt(jumlah_kasur),
        kapasitas: 2,
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

export function updateJenisKamar(
  id_jenis_kamar: string,
  jenis_kamar: string,
  jenis_bed: string,
  jumlah_kasur: string,
  token: string,
  callback: (data?: CreateJenisKamarResponse, error?: string) => void
): void {
  axios
    .put<CreateJenisKamarResponse>(
      `${baseURL}/api/jenis-kamar/${id_jenis_kamar}`,
      {
        jenis_kamar: jenis_kamar,
        jenis_bed: jenis_bed,
        jumlah_kasur: parseInt(jumlah_kasur),
        kapasitas: 2,
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

export function deleteJenisKamar(
  id: string,
  token: string,
  callback: (data?: CreateJenisKamarResponse, error?: string) => void
): void {
  axios
    .delete<CreateJenisKamarResponse>(`${baseURL}/api/jenis-kamar/${id}`, {
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
