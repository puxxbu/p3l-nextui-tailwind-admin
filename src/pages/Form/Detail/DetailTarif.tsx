import Breadcrumb from '../../../components/Breadcrumb';
import DefaultLayout from '../../../layout/DefaultLayout';

import {
  Input,
  Select,
  SelectItem,
  useDisclosure,
  Selection,
  SelectedItems,
} from '@nextui-org/react';
import { useEffect, useMemo, useState } from 'react';
import useAuth from 'src/hooks/useAuth';

import toast, { Toaster } from 'react-hot-toast';
import { MyModal } from 'src/components';

import { useQuery } from '@tanstack/react-query';
import { fetchSeasonList } from 'src/hooks/season/seasonController';
import { capitalizeFirstLetter, rangeDate } from 'src/utils';
import { fetchJenisKamarList } from 'src/hooks/jenisKamar/jenisKamarController';
import {
  createTarif,
  getTarifById,
  updateTarif,
} from 'src/hooks/tarif/tarifController';
import { useParams } from 'react-router-dom';

interface DataTarif {
  harga: string;
  id_jenis_kamar: any;
  id_season: any;
}

interface Season {
  id_season: number;
  nama_season: string;
  tanggal_mulai: string;
  tanggal_selesai: string;
}

const FormTarif = () => {
  const { auth } = useAuth();
  const [data, setData] = useState<DataTarif>({
    harga: '',
    id_jenis_kamar: '',
    id_season: '',
  });

  const { id } = useParams<{ id: string }>();

  const [seasons, setSeasons] = useState<Season[]>([]);
  const [jenisKamar, setJenisKamar] = useState<JenisKamar[]>([]);

  const [selectSeason, setSelectSeason] = useState<Selection>(new Set([]));
  const [selectJK, setSelectJK] = useState<Selection>(new Set([]));
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [error, setError] = useState('');
  const [modalTitle, setModalTitle] = useState('');

  const { status: statusTarif, data: dataTarif } = useQuery(
    ['Tarif'],
    () => getTarifById(id || '0', auth.token),
    {
      keepPreviousData: true,
    }
  );

  const { status: statusSeason, data: seasonList } = useQuery(
    ['SeasonList'],
    () => fetchSeasonList(50, auth.token),
    {
      keepPreviousData: true,
    }
  );
  const { status: statusJenisKamar, data: JenisKamarList } = useQuery(
    ['JenisKamarList'],
    () => fetchJenisKamarList(50, auth.token),
    {
      keepPreviousData: true,
    }
  );

  console.log(dataTarif);

  useEffect(() => {
    if (
      statusSeason === 'success' &&
      seasonList &&
      statusJenisKamar === 'success' &&
      JenisKamarList &&
      statusTarif === 'success' &&
      dataTarif
    ) {
      setSeasons(seasonList.data);
      setJenisKamar(JenisKamarList.data);
      console.log(dataTarif?.data.jenis_kamar.id_jenis_kamar + 'CEK DATA');
      setData({
        harga: dataTarif?.data.harga.toString() || '',
        id_jenis_kamar:
          dataTarif?.data.jenis_kamar.id_jenis_kamar.toString() || '',
        id_season: dataTarif?.data.season.id_season.toString() || '',
      });
      setSelectJK(
        new Set([dataTarif?.data.jenis_kamar.id_jenis_kamar.toString()])
      );
      setSelectSeason(new Set([dataTarif?.data.season.id_season.toString()]));
    }

    if (
      statusSeason === 'error' ||
      statusJenisKamar === 'error' ||
      statusTarif === 'error'
    ) {
      toast.error('Data tidak ditemukan');
    }
  }, [
    statusSeason,
    seasonList,
    statusJenisKamar,
    JenisKamarList,
    statusTarif,
    dataTarif,
  ]);

  const handleChange = (key: any, value: any) => {
    console.log(key, value);
    setData((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  };

  const validateHarga = (value: string) => value.match(/^\d+$/);

  const handleJenisKamar = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectJK(new Set([e.target.value]));
    handleChange('id_jenis_kamar', e.target.value);
    console.log(e.target.value);
  };
  const handleSeason = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectSeason(new Set([e.target.value]));
    handleChange('id_season', e.target.value);
    console.log(e.target.value);
  };

  const isInvalid = useMemo(() => {
    if (data.harga === '') return false;
    return validateHarga(data.harga) ? false : true;
  }, [data.harga]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (isInvalid)
      return toast('Tolong cek kembali inputan anda', {
        icon: '❌',
        className: 'dark:bg-boxdark dark:text-white',
      });

    updateTarif(
      id || '0',
      data.harga || '0',
      data.id_season || '0',
      data.id_jenis_kamar || '0',
      auth.token,
      (data, error) => {
        if (error) {
          setModalTitle('Error');
          setError(error);
          onOpen();
        } else {
          toast.success('Berhasil Mengupdate Tarif');
        }
      }
    );
  };

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Update Tarif" />
      <Toaster />
      <MyModal
        isOpen={isOpen}
        onOpen={onOpen}
        onOpenChange={onOpenChange}
        title={modalTitle}
        content={error}
      />
      <div className="grid grid-cols-1 gap-9 ">
        <div className="flex flex-col gap-9">
          {/* <!-- Tarif Form --> */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Tarif Form
              </h3>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="p-6.5">
                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                  <div className="w-full xl:w-1/2">
                    <Input
                      isRequired
                      type="text"
                      label="Harga"
                      value={data.harga}
                      isInvalid={isInvalid}
                      errorMessage={isInvalid && 'Masukkan input yang valid'}
                      onValueChange={(value) => handleChange('harga', value)}
                      placeholder="Masukkan Harga Tarif"
                    />
                  </div>

                  <div className="w-full xl:w-1/2">
                    <Select
                      isRequired
                      label="Jenis Kamar"
                      items={jenisKamar}
                      placeholder="Pilih Jenis Kamar"
                      selectedKeys={selectJK}
                      classNames={{
                        trigger: 'h-14',
                      }}
                      onChange={handleJenisKamar}
                      renderValue={(items: SelectedItems<JenisKamar>) => {
                        return items.map((item) => (
                          <div
                            key={item.data?.id_jenis_kamar}
                            className="flex items-center gap-2"
                          >
                            <div className="flex flex-col">
                              <span>{item.data?.jenis_kamar}</span>
                            </div>
                          </div>
                        ));
                      }}
                    >
                      {(jenisKamar) => (
                        <SelectItem
                          key={jenisKamar.id_jenis_kamar}
                          textValue={jenisKamar.jenis_kamar}
                        >
                          <div className="flex items-center gap-2">
                            <div className="flex  flex-col dark:text-white">
                              <span className="text-small">
                                {`${
                                  jenisKamar.jenis_kamar
                                } (${capitalizeFirstLetter(
                                  jenisKamar.jenis_bed
                                )})`}
                              </span>
                            </div>
                          </div>
                        </SelectItem>
                      )}
                    </Select>
                  </div>
                  <div className="w-full xl:w-1/2">
                    <Select
                      isRequired
                      label="Season"
                      items={seasons}
                      placeholder="Pilih Jarak Waktu Season"
                      classNames={{
                        trigger: 'h-14',
                      }}
                      selectedKeys={selectSeason}
                      onChange={handleSeason}
                      renderValue={(items: SelectedItems<Season>) => {
                        return items.map((item) => (
                          <div
                            key={item.key}
                            className="flex items-center gap-2"
                          >
                            <div className="flex flex-col">
                              <span>{item.data?.nama_season}</span>
                              <span className="text-tiny text-default-500">
                                {rangeDate(
                                  item.data?.tanggal_mulai || '',
                                  item.data?.tanggal_selesai || ''
                                )}
                              </span>
                            </div>
                          </div>
                        ));
                      }}
                    >
                      {(season) => (
                        <SelectItem
                          key={season.id_season}
                          textValue={season.nama_season}
                          value={season.id_season}
                        >
                          <div className="flex items-center gap-2">
                            <div className="flex  flex-col dark:text-white">
                              <span className="text-small">
                                {season.nama_season}
                              </span>
                              <span className="text-tiny  text-default-600">
                                {rangeDate(
                                  season.tanggal_mulai,
                                  season.tanggal_selesai
                                )}
                              </span>
                            </div>
                          </div>
                        </SelectItem>
                      )}
                    </Select>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default FormTarif;
