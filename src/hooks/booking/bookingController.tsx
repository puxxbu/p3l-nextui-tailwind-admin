import axios, { AxiosError } from 'axios';

const baseURL = 'http://localhost:3000';

export async function fetchKamarTersedia(
  size = 100,
  tanggal_check_in = new Date(),
  kamar_attribute = ''
): Promise<SearchKamarResponse> {
  try {
    let url = `http://localhost:3000/api/booking/kamar?size=${size}&tanggal_check_in=${tanggal_check_in.toString()}`;
    if (kamar_attribute !== '') {
      url += `&kamar_attribute=${kamar_attribute}`;
    }

    const response = await axios.get(url, {});

    return response.data as SearchKamarResponse;
  } catch (error) {
    console.error('Error fetching contacts:', error);
    throw error;
  }
}

export async function getKamarStatus(
  id_jenis_kamar = 0,
  tanggal_check_in = new Date(),
  tanggal_check_out = new Date()
): Promise<any> {
  try {
    let url = `http://localhost:3000/api/jenis-kamar/status`;

    const response = await axios.get(url, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      params: {
        id_jenis_kamar,
        tanggal_check_in: formatISOToCustomDateTime(
          new Date(tanggal_check_in).toISOString()
        ),
        tanggal_check_out: formatISOToCustomDateTime(
          new Date(tanggal_check_out).toISOString()
        ),
      },
    });
    return response.data as any;
  } catch (error) {
    console.error('Error fetching contacts:', error);
    throw error;
  }
}

function formatISOToCustomDateTime(isoDate: string): string {
  const date = new Date(isoDate);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}
