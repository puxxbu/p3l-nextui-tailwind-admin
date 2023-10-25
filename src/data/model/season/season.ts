interface Season {
  id_season: number;
  nama_season: string;
  tanggal_mulai: string;
  tanggal_selesai: string;
}

interface SeasonResponse {
  data: Season[];
  paging: Paging;
}

interface CreateSeasonResponse {
  data: Season;
}
