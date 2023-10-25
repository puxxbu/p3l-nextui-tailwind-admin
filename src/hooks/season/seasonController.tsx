import axios from 'axios';

const baseURL = 'http://localhost:3000';

export async function fetchSeason(
  page = 1,
  nama_season = '',
  token: string
): Promise<SeasonResponse> {
  try {
    let url = `http://localhost:3000/api/season?page=${page}`;
    if (nama_season !== '') {
      url += `&nama_season=${nama_season}`;
    }

    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data as SeasonResponse;
  } catch (error) {
    console.error('Error fetching contacts:', error);
    throw error;
  }
}

export function createSeason(
  nama_season: string,
  tanggal_mulai: string,
  tanggal_selesai: string,
  token: string,
  callback: (data?: CreateSeasonResponse, error?: string) => void
): void {
  axios
    .post<CreateSeasonResponse>(
      `${baseURL}/api/season`,
      {
        nama_season: nama_season,
        tanggal_mulai: tanggal_mulai,
        tanggal_selesai: tanggal_selesai,
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

export function updateSeason(
  id_season: string,
  nama_season: string,
  tanggal_mulai: string,
  tanggal_selesai: string,
  token: string,
  callback: (data?: CreateSeasonResponse, error?: string) => void
): void {
  axios
    .put<CreateSeasonResponse>(
      `${baseURL}/api/season/${id_season}`,
      {
        nama_season: nama_season,
        tanggal_mulai: tanggal_mulai,
        tanggal_selesai: tanggal_selesai,
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

export function deleteSeason(
  id: string,
  token: string,
  callback: (data?: CreateSeasonResponse, error?: string) => void
): void {
  axios
    .delete<CreateSeasonResponse>(`${baseURL}/api/season/${id}`, {
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

export async function getSeasonById(
  id: string,
  token: string
): Promise<CreateSeasonResponse> {
  try {
    let url = `http://localhost:3000/api/season/${id}`;

    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data as CreateSeasonResponse;
  } catch (error) {
    console.error('Error fetching contacts:', error);
    throw error;
  }
}
