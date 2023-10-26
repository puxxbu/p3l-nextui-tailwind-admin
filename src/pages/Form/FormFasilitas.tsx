
import Breadcrumb from '../../components/Breadcrumb';
import DefaultLayout from '../../layout/DefaultLayout';

import {
  Input,

  useDisclosure,
  Selection,
} from '@nextui-org/react';
import { useMemo, useState } from 'react';
import useAuth from 'src/hooks/useAuth';
import toast, { Toaster } from 'react-hot-toast';
import { MyModal } from 'src/components';

import { createFasilitas } from 'src/hooks/fasilitas/fasilitasController';

interface DataFasilitas {
  nama_fasilitas: string;
  harga: any;
}

const FormFasilitas = () => {
  const { auth } = useAuth();
  const [data, setData] = useState<DataFasilitas>({
    nama_fasilitas: '',
    harga: '',
  });

  const [value, setValue] = useState<Selection>(new Set([]));
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [error, setError] = useState('');
  const [modalTitle, setModalTitle] = useState('');

  const handleChange = (key: any, value: any) => {
    console.log(key, value);
    setData((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  };

  const handleNomorKamar = (value: string) => {
    if (value === '') return false;
    handleChange('nama_fasilitas', value);
  };

  const validateNomorKamar = (value: string) => value.match(/^\d+$/);

  // const handleSelectionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
  //   handleChange('harga', e.target.value);
  // };

  const handleSelectionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setValue(new Set([e.target.value]));
    handleChange('harga', e.target.value);
    console.log(e.target.value);
  };

  const isInvalid = useMemo(() => {
    if (data.harga === '') return false;
    return validateNomorKamar(data.harga) ? false : true;
  }, [data.harga]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (isInvalid)
      return toast('Tolong cek kembali inputan anda', {
        icon: '❌',
        className: 'dark:bg-boxdark dark:text-white',
      });

    createFasilitas(
      data.nama_fasilitas || '0',
      data.harga || '0',
      auth.token,
      (data, error) => {
        if (error) {
          setModalTitle('Error');
          setError(error);
          onOpen();
        } else {
          setModalTitle('Berhasil');
          setError('Data Fasilitas Berhasil dibuat');
          onOpen();
          setData({
            nama_fasilitas: '',
            harga: '',
          });
          setValue(new Set([]));
        }
      }
    );
  };

  const handleClearSelect = () => {
    setValue(new Set([]));
    console.log(data.harga);
  };

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Create Fasilitas" />
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
                      value={data.nama_fasilitas}
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
                      value={data.harga}
                      isInvalid={isInvalid}
                      errorMessage={isInvalid && 'Masukkan input yang valid'}
                      onValueChange={(value) => handleChange('harga', value)}
                      placeholder="Masukkan Harga Fasilitas"
                    />
                  </div>
                </div>

                <button className="flex w-full justify-center rounded bg-primary p-3 font-medium text-white                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      ">
                  Create Fasilitas
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default FormFasilitas;
