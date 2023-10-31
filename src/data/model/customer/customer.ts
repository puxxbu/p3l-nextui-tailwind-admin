interface Customer {
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

interface CustomerResponse {
  data: Customer[];
  paging: Paging;
}

interface CreateCustomerResponse {
  data: Customer;
}

interface DataCustomerDetail {
  id_customer: string;
  id_akun: string;
  jenis_customer: string;
  nama: string;
  nomor_identitas: string;
  nomor_telepon: string;
  email: string;
  alamat: string;
  tanggal_dibuat: string;
  nama_institusi: string;
}

interface BookingHistoryResponse {
  data: BookingItem[];
  paging: Paging;
}

interface BookingItem {
  id_booking: string;
  pegawai_1: null;
  pegawai_2: Pegawai;
  tanggal_booking: string;
  tanggal_check_in: string;
  tanggal_check_out: string;
  status_booking: string;
}

interface Pegawai {
  id_pegawai: number;
  id_akun: number;
  nama_pegawai: string;
}
