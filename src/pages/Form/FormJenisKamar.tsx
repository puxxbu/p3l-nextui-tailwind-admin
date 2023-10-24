import Icon from '@mdi/react';
import Breadcrumb from '../../components/Breadcrumb';
import DefaultLayout from '../../layout/DefaultLayout';
import { mdiAlert, mdiChevronDown } from '@mdi/js';
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
import { createJenisKamar } from 'src/hooks/jenisKamar/jenisKamarController';

interface DataJenisKamar {
  jenis_kamar: string;
  jenis_bed: string;
  jumlah_kasur: string;
}

const FormJenisKamar = () => {
  const { auth } = useAuth();
  const [data, setData] = useState<DataJenisKamar>({
    jenis_kamar: '',
    jenis_bed: '',
    jumlah_kasur: '',
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

  const validateNomorKamar = (value: string) => value.match(/^\d+$/);

  const isInvalid = useMemo(() => {
    if (data.jumlah_kasur === '') return false;
    return validateNomorKamar(data.jumlah_kasur) ? false : true;
  }, [data.jumlah_kasur]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (isInvalid)
      return toast('Tolong cek kembali inputan anda', {
        icon: '❌',
        className: 'dark:bg-boxdark dark:text-white',
      });

    createJenisKamar(
      data.jenis_kamar || '0',
      data.jenis_bed || '0',
      data.jumlah_kasur || '0',
      auth.token,
      (data, error) => {
        if (error) {
          setModalTitle('Error');
          setError(error);
        } else {
          setModalTitle('Berhasil');
          setError('Data Kamar Berhasil dibuat');
          onOpen();
          setData({
            jenis_kamar: '',
            jenis_bed: '',
            jumlah_kasur: '',
          });
          // setValue(new Set([]));
        }
      }
    );
  };

  // const handleClearSelect = () => {
  //   setValue(new Set([]));
  //   console.log(data.id_jenis_kamar);
  // };

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Create Jenis Kamar" />
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
                      value={data.jenis_kamar}
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
                      value={data.jenis_bed}
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
                      value={data.jumlah_kasur}
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
    </DefaultLayout>
  );
};

export default FormJenisKamar;
