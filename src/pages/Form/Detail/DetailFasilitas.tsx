import Icon from '@mdi/react';
import Breadcrumb from '../../../components/Breadcrumb';
import DefaultLayout from '../../../layout/DefaultLayout';
import { mdiAlert, mdiChevronDown } from '@mdi/js';
import {
  Input,
  Select,
  SelectItem,
  Selection,
  Spinner,
  useDisclosure,
} from '@nextui-org/react';
import { useEffect, useMemo, useState } from 'react';
import useAuth from 'src/hooks/useAuth';

import toast, { Toaster } from 'react-hot-toast';
import { useQuery } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { MyModal } from 'src/components';
import { getFasilitasById, updateFasilitas } from 'src/hooks/fasilitas/fasilitasController';


interface DataFasilitas {
    nama_fasilitas: string;
    harga: any;
  }

const DetailFasilitas = () => {
  const { auth } = useAuth();
  const navigate = useNavigate();

  const { id } = useParams<{ id: string }>();
  const [value, setValue] = useState<Selection>(new Set([]));

  const { status, data,  isLoading } =
    useQuery(
      ['detailFasilitas', id], // Memasukkan filterValue sebagai bagian dari query key
      () => getFasilitasById(id || '0', auth.token)
    );

  const [dataFasilitas, setDataFasilitas] = useState<DataFasilitas>({
    nama_fasilitas: '',
    harga: '',
  });

  useEffect(() => {
    if (status === 'success' && data) {
      // Memperbarui nilai dataFasilitas dengan data yang diterima dari useQuery
      setDataFasilitas({
        nama_fasilitas: data.data.nama_layanan.toString(),
        harga: data.data.harga.toString(),
      });
      setValue(new Set([data.data.harga.toString()]));
    }

    if (status === 'error') {
      toast.error('Data Kamar tidak ditemukan');
      navigate('/admin');
    }
  }, [status, data]);

  //   const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [error, setError] = useState('');

  const handleChange = (key: string, value: string) => {
    setDataFasilitas((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  };

  const handleInputChange = (key: string, value: string) => {
    if (value === '') return false;
    handleChange(key, value);
  };

  

  const validateNomorKamar = (value: string) => value.match(/^\d+$/);

  const isInvalid = useMemo(() => {
    if (dataFasilitas.harga === '') return false;
    return validateNomorKamar(dataFasilitas.harga) ? false : true;
  }, [dataFasilitas.harga]);



  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (isInvalid)
      return toast('Tolong cek kembali inputan anda', {
        icon: '❌',
        className: 'dark:bg-boxdark dark:text-white',
      });

    updateFasilitas(
      id || '0',
      dataFasilitas.nama_fasilitas || '0',
      dataFasilitas.harga || '0',
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
      <Breadcrumb pageName="Update Kamar" />

      <Toaster />

      {isLoading ? (
        <Spinner color="primary" />
      ) : (
        <div className="grid grid-cols-1 gap-9 ">
        <div className="flex flex-col gap-9">

          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Form Fasilitas
              </h3>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="p-6.5">
                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                  <div className="w-full xl:w-1/2">
                    <Input
                      isRequired
                      type="text"
                      label="Nama Fasilitas"
                      value={dataFasilitas.nama_fasilitas}
                      onValueChange={(value) =>
                        handleChange('nama_fasilitas', value)
                      }
                      placeholder="Masukkan Nama Fasilitas"
                    />
                  </div>

                  <div className="w-full xl:w-1/2">
                    <Input
                      isRequired
                      type="text"
                      label="Harga"
                      value={dataFasilitas.harga}
                      isInvalid={isInvalid}
                      errorMessage={isInvalid && 'Masukkan input yang valid'}
                      onValueChange={(value) => handleChange('harga', value)}
                      placeholder="Masukkan Harga Fasilitas"
                    />
                  </div>
                </div>

                <button className="flex w-full justify-center rounded bg-primary p-3 font-medium text-white                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      ">
                  Update Fasilitas
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

export default DetailFasilitas;
