import axios from 'axios';

const baseURL = 'http://localhost:3000';

export async function fetchCustomer(
  page = 1,
  user_attribute = '',
  token: string
): Promise<CustomerResponse> {
  try {
    let url = `http://localhost:3000/api/customer?page=${page}`;
    if (user_attribute !== '') {
      url += `&user_attribute=${parseInt(user_attribute)}`;
    }

    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data as CustomerResponse;
  } catch (error) {
    console.error('Error fetching contacts:', error);
    throw error;
  }
}

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

export function updateKamar(
  id_kamar: string,
  nomor_kamar: string,
  id_jenis_kamar: string,
  token: string,
  callback: (data?: CreateCustomerResponse, error?: string) => void
): void {
  axios
    .put<CreateCustomerResponse>(
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
