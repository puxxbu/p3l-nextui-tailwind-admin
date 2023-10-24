interface JenisKamar {
  id_jenis_kamar: number;
  jenis_kamar: string;
  jenis_bed: string;
  kapasitas: number;
  jumlah_kasur: number;
}

interface Paging {
  page: number;
  total_item: number;
  total_page: number;
}

interface JenisKamarResponse {
  data: JenisKamar[];
  paging: Paging;
}

interface CreateJenisKamarResponse {
  data: JenisKamar;
}
