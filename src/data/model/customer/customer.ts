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
