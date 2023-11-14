interface Customer {
  id_customer: number;
  jenis_customer: string;
  nama: string;
  nomor_identitas: string;
  nomor_telepon: string;
  email: string;
  alamat: string;
  tanggal_dibuat: string;
  nama_institusi: string | null;
}

interface Paging {
  page: number;
  total_item: number;
  total_page: number;
}

interface CustomerResponseGroup {
  data: Customer[];
  paging: Paging;
}
