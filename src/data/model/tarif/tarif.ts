interface Tarif {
  id_tarif: number;
  season: Season;
  jenis_kamar: JenisKamar;
  harga: number;
}

interface TarifResponse {
  data: Tarif[];
  paging: Paging;
}

interface CreateTarifResponse {
  data: Tarif;
}
