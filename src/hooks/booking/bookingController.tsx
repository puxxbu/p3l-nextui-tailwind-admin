import axios, { AxiosError } from 'axios';

const baseURL = 'http://localhost:3000';

export async function fetchKamarTersedia(
  size = 100,
  tanggal_check_in = new Date(),
  tanggal_check_out = new Date(),
  kamar_attribute = ''
): Promise<SearchKamarResponse> {
  try {
    let url = `http://localhost:3000/api/booking/kamar?size=${size}&tanggal_check_in=${tanggal_check_in.toString()}&tanggal_check_out=${tanggal_check_out.toString()}`;
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

export async function fetchAllBooking(
  page = 1,
  search_params = '',
  token: string
): Promise<BookingHistoryResponse> {
  try {
    let url = `http://localhost:3000/api/booking/search?page=${page}`;
    if (search_params !== '') {
      url += `&search_params=${search_params}`;
    }
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data as BookingHistoryResponse;
  } catch (error) {
    console.error('Error fetching contacts:', error);
    throw error;
  }
}

export async function fetchDataCheckIn(
  page = 1,
  search_params = '',
  token: string
): Promise<BookingHistoryResponse> {
  try {
    let url = `http://localhost:3000/api/booking/check-in/search?page=${page}`;
    if (search_params !== '') {
      url += `&search_params=${search_params}`;
    }
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data as BookingHistoryResponse;
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

export function createBooking(
  dataBooking: BookingData,
  token: string,
  callback: (data?: BookingResponse, error?: string) => void
): void {
  const detailBookingLayanan = dataBooking.fasilitas.map((detailFasilitas) => ({
    id_fasilitas: detailFasilitas.id_fasilitas,
    jumlah: detailFasilitas.jumlah,
    sub_total: detailFasilitas.sub_total,
  }));

  axios
    .post<BookingResponse>(
      `${baseURL}/api/booking`,
      {
        booking: dataBooking.booking,
        detail_booking: dataBooking.detail_booking,
        fasilitas: detailBookingLayanan,
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

export function changeStatusBooking(
  status_booking: string,
  id_booking: string,
  token: string,
  callback: (data?: BookingApiResponse, error?: string) => void
): void {
  axios
    .put<BookingApiResponse>(
      `${baseURL}/api/booking/change-status/${id_booking}`,
      {
        status_booking: status_booking,
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

export function updateNoRekening(
  status_booking: string,
  id_booking: string,
  no_rekening: string,
  token: string,
  callback: (data?: BookingApiResponse, error?: string) => void
): void {
  axios
    .put<BookingApiResponse>(
      `${baseURL}/api/booking/no-rekening/${id_booking}`,
      {
        status_booking: status_booking,
        no_rekening : no_rekening
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
      console.error('Error logging in:', error);
      const errorResponse = error.response.data as ErrorResponse;
      const errorMessage = errorResponse.errors;
      console.error('Error logging in:', errorMessage);
      callback(undefined, errorMessage);
    });
}

export function cancelBooking(
  id_booking: string,
  token: string,
  callback: (data?: BookingApiResponse, error?: string) => void
): void {
  axios
    .put<BookingApiResponse>(
      `${baseURL}/api/booking/cancel/${id_booking}`,
      {
       
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
      console.error('Error logging in:', error);
      const errorResponse = error.response.data as ErrorResponse;
      const errorMessage = errorResponse.errors;
      console.error('Error logging in:', errorMessage);
      callback(undefined, errorMessage);
    });
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

interface BookingData {
  booking: Booking;
  detail_booking: DetailBookingKamar[];
  fasilitas: DetailFasilitas[];
}

interface Booking {
  id_customer: number;
  tanggal_booking: string;
  tanggal_check_in: string;
  tanggal_check_out: string;
  tamu_dewasa: number;
  tamu_anak: number;
  tanggal_pembayaran?: string | null; // Tanggal pembayaran dapat kosong
  jenis_booking: string;
  status_booking: string;
  id_pegawai_fo?: number | null; // Id pegawai FO dapat kosong
  no_rekening?: string;
}

interface DetailBookingKamar {
  id_jenis_kamar: number;
  jumlah: number;
  sub_total: number;
}

interface DetailFasilitas {
  id_fasilitas: number;
  nama_fasilitas: string;
  jumlah: number;
  sub_total: number;
}

interface ICustomer {
  id_customer: number;
  id_akun: number;
  jenis_customer: string;
  nama: string;
  nomor_identitas: string;
  nomor_telepon: string;
  email: string;
  alamat: string;
  tanggal_dibuat: string;
  nama_institusi: string | null;
}

interface IJenisKamar {
  id_jenis_kamar: number;
  jenis_kamar: string;
  jenis_bed: string;
  kapasitas: number;
  jumlah_kasur: number;
  base_harga: number;
}

interface IKamar {
  jenis_kamar: IJenisKamar;
  nomor_kamar: string;
}

interface IDetailKetersediaanKamar {
  kamar: IKamar;
}

interface IDetailBookingKamar {
  id_detail_booking_kamar: number;
  id_booking: string;
  id_jenis_kamar: number;
  jumlah: number;
  sub_total: number;
  detail_ketersediaan_kamar: IDetailKetersediaanKamar[];
}

interface IPegawai {
  id_pegawai: number;
  id_akun: number;
  nama_pegawai: string;
}

interface IDetailBookingLayanan {
  id_detail_booking_layanan: number;
  id_fasilitas: number;
  id_booking: string;
  jumlah: number;
  sub_total: number;
  tanggal: string;
}

interface IBooking {
  id_booking: string;
  customer: ICustomer;
  tanggal_booking: string;
  tanggal_check_in: string;
  tanggal_check_out: string;
  tamu_dewasa: number;
  tamu_anak: number;
  tanggal_pembayaran: string;
  jenis_booking: string;
  status_booking: string;
  no_rekening: string;
  pegawai_1: IPegawai | null;
  pegawai_2: IPegawai | null;
  catatan_tambahan: string | null;
  detail_booking_kamar: IDetailBookingKamar[];
  detail_booking_layanan: IDetailBookingLayanan[]; // Tipe belum diketahui, Anda dapat menggantinya sesuai dengan struktur detail_booking_layanan
}

interface BookingResponse {
  data: IBooking;
}
