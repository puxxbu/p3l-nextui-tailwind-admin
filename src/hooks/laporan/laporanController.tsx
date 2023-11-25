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

interface LaporanTigaResponse {
  data: {
    laporan: {
      jenis_kamar: string;
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

export async function fetchLaporanTiga(
  tahun = new Date().getFullYear(),
  bulan = new Date().getMonth() + 1,
  token: string
): Promise<LaporanTigaResponse> {
  try {
    let url = `${baseURL}/api/laporan/jumlah-tamu?tahun=${tahun}&bulan=${bulan}`;

    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data as LaporanTigaResponse;
  } catch (error) {
    console.error('Error fetching contacts:', error);
    throw error;
  }
}
