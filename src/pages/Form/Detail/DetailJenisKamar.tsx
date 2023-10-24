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
import {
  getJenisKamarById,
  updateJenisKamar,
} from 'src/hooks/jenisKamar/jenisKamarController';

interface DataJenisKamar {
  jenis_kamar: string;
  jenis_bed: string;
  jumlah_kasur: string;
}

const DetailJenisKamar = () => {
  const { auth } = useAuth();
  const navigate = useNavigate();

  const { id } = useParams<{ id: string }>();

  const { status, data, isFetching, isPreviousData, refetch, isLoading } =
    useQuery(
      ['detailJenisKamar', id], // Memasukkan filterValue sebagai bagian dari query key
      () => getJenisKamarById(id || '1', auth.token),
      {
        keepPreviousData: true,
      }
    );

  const [dataJenisKamar, setDataJenisKamar] = useState<DataJenisKamar>({
    jenis_kamar: '',
    jenis_bed: '',
    jumlah_kasur: '',
  });

  useEffect(() => {
    if (status === 'success' && data) {
      setDataJenisKamar({
        jenis_kamar: data.data.jenis_kamar,
        jenis_bed: data.data.jenis_bed,
        jumlah_kasur: data.data.jumlah_kasur.toString(),
      });
    }

    if (status === 'error') {
      toast.error('Data Kamar tidak ditemukan');
      navigate('/admin');
    }
  }, [status, data]);

  //   const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [error, setError] = useState('');

  const handleChange = (key: string, value: string) => {
    console.log(key, value);
    setDataJenisKamar((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  };

  const validateAngka = (value: string) => value.match(/^\d+$/);

  const isInvalid = useMemo(() => {
    if (dataJenisKamar.jumlah_kasur === '') return false;
    return validateAngka(dataJenisKamar.jumlah_kasur) ? false : true;
  }, [dataJenisKamar.jumlah_kasur]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (isInvalid)
      return toast('Tolong cek kembali inputan anda', {
        icon: '❌',
        className: 'dark:bg-boxdark dark:text-white',
      });

    updateJenisKamar(
      id || '1',
      dataJenisKamar.jenis_kamar || '0',
      dataJenisKamar.jenis_bed || '0',
      dataJenisKamar.jumlah_kasur || '0',
      auth.token,
      (data, error) => {
        if (error) {
          setError(error);
        } else {
          toast.success('Berhasil mengupdate kamar');
        }
      }
    );
  };

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Create Jenis Kamar" />
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
                  Jenis Kamar Form
                </h3>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="p-6.5">
                  <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                    <div className="w-full xl:w-1/2">
                      <Input
                        isRequired
                        type="text"
                        label="Jenis Kamar"
                        value={dataJenisKamar.jenis_kamar}
                        isInvalid={isInvalid}
                        onValueChange={(value) =>
                          handleChange('jenis_kamar', value)
                        }
                        placeholder="Masukkan Nama Jenis Kamar"
                      />
                    </div>

                    <div className="w-full xl:w-1/2">
                      <Input
                        isRequired
                        type="text"
                        label="Jenis Bed"
                        value={dataJenisKamar.jenis_bed}
                        isInvalid={isInvalid}
                        onValueChange={(value) =>
                          handleChange('jenis_bed', value)
                        }
                        placeholder="Masukkan Jenis Bed"
                      />
                    </div>
                  </div>
                  <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                    <div className="w-full xl:w-1/2">
                      <Input
                        isRequired
                        type="text"
                        label="Jumlah Kasur"
                        value={dataJenisKamar.jumlah_kasur}
                        isInvalid={isInvalid}
                        errorMessage={isInvalid && 'Masukkan input yang valid'}
                        onValueChange={(value) =>
                          handleChange('jumlah_kasur', value)
                        }
                        placeholder="Masukkan Jumlah Kasur"
                      />
                    </div>
                  </div>

                  <button className="flex w-full justify-center rounded bg-primary p-3 font-medium text-white                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      ">
                    Create Jenis Kamar
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

export default DetailJenisKamar;
