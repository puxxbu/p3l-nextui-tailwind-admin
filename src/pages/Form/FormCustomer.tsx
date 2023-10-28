import Breadcrumb from '../../components/Breadcrumb';
import DefaultLayout from '../../layout/DefaultLayout';

import {
  Input,
  Select,
  SelectItem,
  useDisclosure,
  Selection,
} from '@nextui-org/react';
import { useMemo, useState } from 'react';
import useAuth from 'src/hooks/useAuth';
import { createKamar } from 'src/hooks/kamar/kamarController';
import toast, { Toaster } from 'react-hot-toast';
import { MyModal } from 'src/components';
import { jenisKamar } from 'src/utils/const';
import { createCustomer } from 'src/hooks/customer/customerController';

interface DataCustomer {
  nama: string;
  nomor_identitas: string;
  nomor_telepon: string;
  email: string;
  alamat: string;
  tanggal_dibuat: string;
  nama_institusi: string;
}

const FormCustomer = () => {
  const { auth } = useAuth();
  const [data, setData] = useState<DataCustomer>({
    nama: '',
    nomor_identitas: '',
    nomor_telepon: '',
    email: '',
    alamat: '',
    tanggal_dibuat: '',
    nama_institusi: '',
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
    handleChange('nomor_telepon', value);
  };

  const validateNomorKamar = (value: string) => value.match(/^\d+$/);

  // const handleSelectionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
  //   handleChange('id_jenis_kamar', e.target.value);
  // };

  const handleSelectionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setValue(new Set([e.target.value]));
    handleChange('id_jenis_kamar', e.target.value);
    console.log(e.target.value);
  };

  const validNomorTelepon = useMemo(() => {
    if (data.nomor_telepon === '') return false;
    return validateNomorKamar(data.nomor_telepon) ? false : true;
  }, [data.nomor_telepon]);
  const validNomorIdentitas = useMemo(() => {
    if (data.nomor_identitas === '') return false;
    return validateNomorKamar(data.nomor_identitas) ? false : true;
  }, [data.nomor_identitas]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (validNomorTelepon || validNomorIdentitas)
      return toast('Tolong cek kembali inputan anda', {
        icon: '❌',
        className: 'dark:bg-boxdark dark:text-white',
      });

    createCustomer(
      data.nama,
      data.nomor_identitas,
      data.nomor_telepon,
      data.email,
      data.alamat,
      data.nama_institusi,
      auth.token,
      (data, error) => {
        if (error) {
          setModalTitle('Error');
          setError(error);
          onOpen();
        } else {
          setModalTitle('Berhasil');
          setError('Data Customer Berhasil dibuat');
          onOpen();
          setData({
            nama: '',
            nomor_identitas: '',
            nomor_telepon: '',
            email: '',
            alamat: '',
            tanggal_dibuat: '',
            nama_institusi: '',
          });
          setValue(new Set([]));
        }
      }
    );
  };

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Create Customer" />
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
          {/* <!-- Contact Form --> */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Customer Form
              </h3>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="p-6.5">
                <div className="mb-4.5  grid grid-cols-2  gap-6 ">
                  <div className="w-full xl:w-full ">
                    <Input
                      isRequired
                      type="text"
                      label="Nama"
                      value={data.nama}
                      onValueChange={(value) => handleChange('nama', value)}
                      placeholder="Masukkan Nama"
                    />
                  </div>
                  <div className="w-full xl:w-full ">
                    <Input
                      isRequired
                      type="text"
                      label="Nomor Identitas"
                      value={data.nomor_identitas}
                      isInvalid={validNomorIdentitas}
                      errorMessage={
                        validNomorIdentitas && 'Masukkan input yang valid'
                      }
                      onValueChange={(value) =>
                        handleChange('nomor_identitas', value)
                      }
                      placeholder="Masukkan Nomor Identitas"
                    />
                  </div>
                  <div className="w-full xl:w-full ">
                    <Input
                      isRequired
                      type="text"
                      label="Nomor Telepon"
                      value={data.nomor_telepon}
                      isInvalid={validNomorTelepon}
                      errorMessage={
                        validNomorTelepon && 'Masukkan input yang valid'
                      }
                      onValueChange={(value) =>
                        handleChange('nomor_telepon', value)
                      }
                      placeholder="Masukkan Nomor Telepon"
                    />
                  </div>
                  <div className="w-full xl:w-full ">
                    <Input
                      isRequired
                      type="email"
                      label="Email"
                      value={data.email}
                      onValueChange={(value) => handleChange('email', value)}
                      placeholder="Masukkan email"
                    />
                  </div>
                  <div className="w-full xl:w-full ">
                    <Input
                      isRequired
                      type="text"
                      label="Alamat"
                      value={data.alamat}
                      onValueChange={(value) => handleChange('alamat', value)}
                      placeholder="Masukkan Alamat"
                    />
                  </div>
                  <div className="w-full xl:w-full ">
                    <Input
                      isRequired
                      type="text"
                      label="Nama Institusi"
                      value={data.nama_institusi}
                      onValueChange={(value) =>
                        handleChange('nama_institusi', value)
                      }
                      placeholder="Masukkan Nama Institusi"
                    />
                  </div>
                </div>

                <button className="flex w-full justify-center rounded bg-primary p-3 font-medium text-white                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      ">
                  Create Customer
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default FormCustomer;
