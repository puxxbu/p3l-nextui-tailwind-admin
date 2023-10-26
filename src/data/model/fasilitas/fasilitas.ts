interface Fasilitas {
  id_fasilitas: number;
  nama_layanan: string;
  harga: number;
}

interface FasilitasResponse {
  data: Fasilitas[];
  paging: Paging;
}

interface CreateFasilitasResponse {
  data: Fasilitas;
}
