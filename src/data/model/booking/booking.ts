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

interface JenisKamar {
  id_jenis_kamar: number;
  jenis_kamar: string;
  jenis_bed: string;
  kapasitas: number;
  jumlah_kasur: number;
}

interface Layanan {
  id_fasilitas: number;
  nama_layanan: string;
  harga: number;
}

interface DetailBookingKamar {
  jenis_kamar: JenisKamar;
  sub_total: number;
  jumlah: number;
}

interface DetailBookingLayanan {
  layanan: Layanan;
  jumlah: number;
  sub_total: number;
  tanggal: string;
}

interface Invoice {
  id_invoice: string;
  id_booking: string;
  tanggal_pelunasan: string;
  total_pajak: number;
  jumlah_jaminan: number;
  total_pembayaran: number;
  nama_pic_fo: string;
}

interface Booking {
  id_booking: string;
  pegawai_1: Pegawai;
  pegawai_2: Pegawai;
  customer: Customer;
  tanggal_check_in: string;
  tanggal_check_out: string;
  tamu_dewasa: number;
  tamu_anak: number;
  tanggal_pembayaran: string;
  detail_booking_kamar: DetailBookingKamar[];
  detail_booking_layanan: DetailBookingLayanan[];
  invoice: Invoice[];
}

interface BookingApiResponse {
  data: Booking;
}