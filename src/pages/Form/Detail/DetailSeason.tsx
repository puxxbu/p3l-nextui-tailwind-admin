import Icon from '@mdi/react';
import Breadcrumb from '../../../components/Breadcrumb';
import DefaultLayout from '../../../layout/DefaultLayout';
import { mdiAlert, mdiChevronDown } from '@mdi/js';
import { Input, Spinner } from '@nextui-org/react';
import { useEffect, useMemo, useState } from 'react';
import useAuth from 'src/hooks/useAuth';

import toast, { Toaster } from 'react-hot-toast';
import { useQuery } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';

import Datepicker from 'react-tailwindcss-datepicker';
import {
  createSeason,
  getSeasonById,
  updateSeason,
} from 'src/hooks/season/seasonController';

interface DataSeason {
  nama_season: string;
  tanggal_mulai: string;
  tanggal_selesai: string;
}

interface DatepickerProps {
  startDate: any;
  endDate: any;
}

const DetailSeason = () => {
  const { auth } = useAuth();
  const navigate = useNavigate();

  const today = new Date();
  const twoMonthsLater = new Date(
    today.getFullYear(),
    today.getMonth() + 2,
    today.getDate()
  );

  const [value, setValue] = useState<DatepickerProps>({
    startDate: null,
    endDate: null,
  });

  const { id } = useParams<{ id: string }>();

  const { status, data, isFetching, isPreviousData, refetch, isLoading } =
    useQuery(
      ['detailSeason', id], // Memasukkan filterValue sebagai bagian dari query key
      () => getSeasonById(id || '1', auth.token),
      {
        keepPreviousData: true,
      }
    );

  const [dataSeason, setDataSeason] = useState<DataSeason>({
    nama_season: '',
    tanggal_mulai: '',
    tanggal_selesai: '',
  });

  useEffect(() => {
    if (status === 'success' && data) {
      setDataSeason({
        nama_season: data.data.nama_season,
        tanggal_mulai: new Date(data.data.tanggal_mulai).toString(),
        tanggal_selesai: new Date(data.data.tanggal_selesai).toString(),
      });

      setValue({
        startDate: new Date(data.data.tanggal_mulai),
        endDate: new Date(data.data.tanggal_selesai),
      });
    }

    if (status === 'error') {
      toast.error('Data Season tidak ditemukan');
      navigate('/admin');
    }
  }, [status, data]);

  //   const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [error, setError] = useState('');

  const handleChange = (key: string, value: string) => {
    console.log(key, value);
    setDataSeason((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  };

  const handleValueChange = (newValue: any) => {
    console.log('newValue:', newValue);
    setValue(newValue);
    handleChange('tanggal_mulai', newValue.startDate);
    handleChange('tanggal_selesai', newValue.endDate);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (value.startDate === null || value.endDate === null || value === null)
      return toast('Tolong isi range Tanggal Season terlebih dahulu', {
        icon: '❌',
        className: 'dark:bg-boxdark dark:text-white',
      });

    updateSeason(
      id || '1',
      dataSeason.nama_season || '0',
      dataSeason.tanggal_mulai || '0',
      dataSeason.tanggal_selesai || '0',
      auth.token,
      (data, error) => {
        if (error) {
          setError(error);
          toast.error(error);
        } else {
          toast.success('Berhasil mengupdate kamar');
        }
      }
    );
  };

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Create Season" />
      <Toaster />
      {isLoading ? (
        <Spinner color="primary" />
      ) : (
        <div className="grid grid-cols-1 gap-9 ">
          <div className="flex flex-col gap-9">
            {/* <!-- Contact Form --> */}
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                  Season Form
                </h3>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="p-6.5">
                  <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                    <div className="w-full  xl:w-1/2 ">
                      <Input
                        isRequired
                        type="text"
                        label="Nama Season"
                        value={dataSeason.nama_season}
                        onValueChange={(value) =>
                          handleChange('nama_season', value)
                        }
                        placeholder="Masukkan Nama Season"
                      />
                    </div>
                    <div className="flex h-[60px] w-full flex-col rounded-lg  dark:bg-slate-800 xl:w-1/2">
                      <div className="pl-[12px] pt-[2px] text-xs font-medium ">
                        Range Tanggal Season
                      </div>
                      <Datepicker
                        disabledDates={[
                          {
                            startDate: '2000-02-02',
                            endDate: twoMonthsLater,
                          },
                        ]}
                        value={value}
                        onChange={handleValueChange}
                      />
                    </div>
                  </div>

                  <button className="flex w-full justify-center rounded bg-primary p-3 font-medium text-white                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      ">
                    Create Season
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </DefaultLayout>
  );
};

export default DetailSeason;
