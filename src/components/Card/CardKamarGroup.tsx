import { Button, Card, CardFooter, CardHeader, Image } from '@nextui-org/react';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { formatJenisKamar } from 'src/utils';
type CardKamarProps = {
  dataKamar: Kamar;
  tanggal_check_in: string;
  tanggal_check_out: string;
};

const CardKamarGroup: React.FC<CardKamarProps> = ({
  dataKamar,
  tanggal_check_in,
  tanggal_check_out,
}) => {
  const navigate = useNavigate();

  let harga = 0;

  if (dataKamar.tarif.length > 0) {
    harga = dataKamar.tarif[0].harga;
  } else {
    harga = dataKamar.base_harga;
  }

  return (
    <Card
      isFooterBlurred
      className="col-span-12 h-[300px] w-full sm:col-span-7"
    >
      <CardHeader className=" absolute top-1 z-1 flex-col items-start bg-black/40">
        <p className="text-tiny font-bold uppercase text-white/60">
          Kapasitas {dataKamar.kapasitas} Orang
        </p>
        <h4 className="text-xl font-medium text-white/90">
          {formatJenisKamar(dataKamar.jenis_kamar, dataKamar.jenis_bed)}
        </h4>
      </CardHeader>
      <Image
        removeWrapper
        alt="Relaxing app background"
        className="z-0 h-full w-full object-cover"
        src="https://id.marinabaysands.com/content/dam/marinabaysands/hotel/deluxe-room/deluxe-room-gallery-1-1920x1080.jpg"
      />
      <CardFooter className="absolute bottom-0 z-1 border-t-1 border-default-600 bg-black/40 dark:border-default-100">
        <div className="flex flex-grow items-center gap-2">
          <div className="ml-2 flex flex-col">
            <p className="text-tiny text-white/90">Harga per malam</p>
            <p className="text-tiny text-white/90">Rp. {harga} / Malam</p>
          </div>
        </div>
        <Button
          radius="full"
          size="sm"
          onClick={() =>
            navigate(`/booking/group/detail/${dataKamar.id_jenis_kamar}`, {
              state: { dataKamar, tanggal_check_in, tanggal_check_out },
            })
          }
        >
          Lihat Detail
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CardKamarGroup;
