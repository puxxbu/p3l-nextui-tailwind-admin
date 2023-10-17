interface Kamar {
  id_kamar: number;
  id_jenis_kamar: number;
  nomor_kamar: number;
}

interface Paging {
  page: number;
  total_item: number;
  total_page: number;
}

interface KamarResponse {
  data: Kamar[];
  paging: Paging;
}
