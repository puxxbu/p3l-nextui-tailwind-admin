import axios from 'axios';

const baseURL = 'http://localhost:3000';

export async function fetchTarif(
  page = 1,
  tarif_attribute = '',
  token: string
): Promise<TarifResponse> {
  try {
    let url = `http://localhost:3000/api/tarif?page=${page}`;
    if (tarif_attribute !== '') {
      url += `&tarif_attribute=${tarif_attribute}`;
    }

    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data as TarifResponse;
  } catch (error) {
    console.error('Error fetching contacts:', error);
    throw error;
  }
}

// export async function fetchSeasonList(
//   size = 50,
//   token: string
// ): Promise<TarifResponse> {
//   try {
//     let url = `http://localhost:3000/api/tarif?size=${size}`;

//     const response = await axios.get(url, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });

//     return response.data as TarifResponse;
//   } catch (error) {
//     console.error('Error fetching contacts:', error);
//     throw error;
//   }
// }

export function createTarif(
  harga: string,
  id_season: string,
  id_jenis_kamar: string,
  token: string,
  callback: (data?: CreateTarifResponse, error?: string) => void
): void {
  axios
    .post<CreateTarifResponse>(
      `${baseURL}/api/tarif`,
      {
        harga: parseInt(harga),
        id_season: id_season,
        id_jenis_kamar: id_jenis_kamar,
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
      if (axios.isAxiosError(error)) {
        callback(undefined, error.message);
      }

      const errorResponse = error.response.data as ErrorResponse;
      const errorMessage = errorResponse.errors;
      console.error('Error logging in:', errorMessage);
      callback(undefined, errorMessage);
    });
}

export function updateTarif(
  id_tarif: string,
  harga: string,
  id_season: string,
  id_jenis_kamar: string,
  token: string,
  callback: (data?: CreateTarifResponse, error?: string) => void
): void {
  axios
    .put<CreateTarifResponse>(
      `${baseURL}/api/tarif/${id_tarif}`,
      {
        harga: parseInt(harga),
        id_season: id_season,
        id_jenis_kamar: id_jenis_kamar,
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

export function deleteTarif(
  id: string,
  token: string,
  callback: (data?: CreateTarifResponse, error?: string) => void
): void {
  axios
    .delete<CreateTarifResponse>(`${baseURL}/api/tarif/${id}`, {
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

export async function getTarifById(
  id: string,
  token: string
): Promise<CreateTarifResponse> {
  try {
    let url = `http://localhost:3000/api/tarif/${id}`;

    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data as CreateTarifResponse;
  } catch (error) {
    console.error('Error fetching contacts:', error);
    throw error;
  }
}
