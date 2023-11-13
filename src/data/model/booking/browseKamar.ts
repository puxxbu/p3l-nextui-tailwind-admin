interface Season {
  id_season: number;
  nama_season: string;
  tanggal_mulai: string;
  tanggal_selesai: string;
}

interface Tarif {
  id_tarif: number;
  harga: number;
  season: Season;
}

interface Kamar {
  id_jenis_kamar: number;
  jenis_bed: string;
  jenis_kamar: string;
  tarif: Tarif[];
  base_harga: number;
  kapasitas: number;
}

interface Booking {
  tanggal_check_in: string;
  tanggal_check_out: string;
}

interface Ketersediaan {
  id_jenis_kamar: number;
  booking: Booking;
  jumlah: number;
}

interface JumlahKamar {
  _count: { id_jenis_kamar: number };
  id_jenis_kamar: number;
}

interface Paging {
  page: number;
  total_item: number;
  total_page: number;
}

interface SearchKamarResponse {
  data: Kamar[];
  ketersediaan: Ketersediaan[];
  jumlahKamar: JumlahKamar[];
  paging: Paging;
}
