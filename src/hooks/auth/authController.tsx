import axios from 'axios';

const baseURL = 'http://localhost:3000';

export function createCustomer(
  nama: string,
  nomor_identitas: string,
  nomor_telepon: string,
  email: string,
  alamat: string,
  nama_institusi: string,
  token: string,
  callback: (data?: CreateCustomerResponse, error?: string) => void
): void {
  axios
    .post<CreateCustomerResponse>(
      `${baseURL}/api/customer`,
      {
        nama: nama,
        nomor_identitas: nomor_identitas,
        nomor_telepon: nomor_telepon,
        email: email,
        alamat: alamat,
        nama_institusi: nama_institusi,
        jenis_customer: 'Group',
        tanggal_dibuat: new Date(),
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

export function updatePassword(
  oldPassword: string,
  newPassword: string,
  token: string,
  callback: (data?: UserData, error?: string) => void
): void {
  axios
    .put<UserData>(
      `${baseURL}/api/users/password`,
      {
        oldPassword: oldPassword,
        newPassword: newPassword,
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
  callback: (data?: CreateCustomerResponse, error?: string) => void
): void {
  axios
    .delete<CreateCustomerResponse>(`${baseURL}/api/kamar/${id}`, {
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
): Promise<CreateCustomerResponse> {
  try {
    let url = `http://localhost:3000/api/kamar/${id}`;

    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data as CreateCustomerResponse;
  } catch (error) {
    console.error('Error fetching contacts:', error);
    throw error;
  }
}
