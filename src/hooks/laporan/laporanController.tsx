import axios from 'axios';

const baseURL = 'http://localhost:3000';

interface LaporanDuaResponse {
  data: {
    laporan: {
      nama_bulan: string;
      Personal: number;
      Group: number;
      total: number;
    }[];
    tahun: number;
    total: number;
  };
}

export async function fetchLaporanDua(
  tahun = new Date().getFullYear(),
  token: string
): Promise<LaporanDuaResponse> {
  try {
    let url = `${baseURL}/api/laporan/pendapatan-bulanan?tahun=${tahun}`;

    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data as LaporanDuaResponse;
  } catch (error) {
    console.error('Error fetching contacts:', error);
    throw error;
  }
}
