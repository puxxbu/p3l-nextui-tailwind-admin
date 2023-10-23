import Icon from '@mdi/react';
import Breadcrumb from '../../../components/Breadcrumb';
import DefaultLayout from '../../../layout/DefaultLayout';
import { mdiAlert, mdiChevronDown } from '@mdi/js';
import {
  Input,
  Select,
  SelectItem,
  Selection,
  useDisclosure,
} from '@nextui-org/react';
import { useEffect, useMemo, useState } from 'react';
import useAuth from 'src/hooks/useAuth';
import { createKamar, getKamarById } from 'src/hooks/kamarController';
import toast, { Toaster } from 'react-hot-toast';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

const jenisKamar = [
  {
    label: 'Superior (Double)',
    value: 1,
  },
  {
    label: 'Superior (Twin)',
    value: 2,
  },
  {
    label: 'Double Deluxe (Double)',
    value: 3,
  },
  {
    label: 'Double Deluxe (Twin)',
    value: 4,
  },
  {
    label: 'Junior Suite (King)',
    value: 5,
  },
  {
    label: 'Executive Deluxe (King)',
    value: 6,
  },
];

interface DataKamar {
  nomor_kamar: string;
  id_jenis_kamar: string;
}

const DetailKamar = () => {
  const { auth } = useAuth();

  const { id } = useParams<{ id: string }>();
  const [value, setValue] = useState<Selection>(new Set([]));

  const { status, data, isFetching, isPreviousData, refetch, isLoading } =
    useQuery(
      ['projects', id], // Memasukkan filterValue sebagai bagian dari query key
      () => getKamarById(id || '1', auth.token),
      {
        keepPreviousData: true,
      }
    );

  const [dataKamar, setDataKamar] = useState<DataKamar>({
    nomor_kamar: '',
    id_jenis_kamar: '',
  });

  useEffect(() => {
    if (status === 'success' && data) {
      // Memperbarui nilai dataKamar dengan data yang diterima dari useQuery
      setDataKamar({
        nomor_kamar: data.data.nomor_kamar.toString(),
        id_jenis_kamar: data.data.id_jenis_kamar.toString(),
      });
      setValue(new Set([data.data.id_jenis_kamar.toString()]));
    }
  }, [status, data]);

  //   const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [error, setError] = useState('');

  const handleChange = (key: string, value: string) => {
    console.log(key, value);
    setDataKamar((prevData) => ({
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
    if (dataKamar.nomor_kamar === '') return false;
    return validateNomorKamar(dataKamar.nomor_kamar) ? false : true;
  }, [dataKamar.nomor_kamar]);

  const handleSelectionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setValue(new Set([e.target.value]));
    handleChange('id_jenis_kamar', e.target.value);
    console.log(e.target.value);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (isInvalid)
      return toast('Tolong cek kembali inputan anda', {
        icon: '❌',
        className: 'dark:bg-boxdark dark:text-white',
      });

    createKamar(
      dataKamar.nomor_kamar || '0',
      dataKamar.id_jenis_kamar || '0',
      auth.token,
      (data, error) => {
        if (error) {
          setError(error);
        } else {
          console.log(data);
        }
      }
    );
  };

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Update Kamar" />
      <Toaster />
      <div className="grid grid-cols-1 gap-9 ">
        <div className="flex flex-col gap-9">
          {/* <!-- Contact Form --> */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Contact Form
              </h3>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="p-6.5">
                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                  <div className="w-full xl:w-1/2">
                    <Input
                      isRequired
                      type="text"
                      label="Nomor Kamar"
                      value={dataKamar.nomor_kamar || ''}
                      isInvalid={isInvalid}
                      errorMessage={isInvalid && 'Masukkan input yang valid'}
                      onValueChange={(value) =>
                        handleInputChange('nomor_kamar', value)
                      }
                      placeholder="Masukkan Nomor Kamar"
                    />
                  </div>

                  <div className="w-full xl:w-1/2">
                    <div className="relative z-20 bg-transparent dark:bg-form-input">
                      <Select
                        isRequired
                        label="Pilih Jenis Kamar"
                        className="relative z-20 bg-transparent dark:bg-form-input"
                        selectedKeys={value}
                        onChange={handleSelectionChange}
                      >
                        {jenisKamar.map((item) => (
                          <SelectItem key={item.value} value={item.value}>
                            {item.label}
                          </SelectItem>
                        ))}
                      </Select>
                    </div>
                  </div>
                </div>

                <button className="flex w-full justify-center rounded bg-primary p-3 font-medium text-white                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      ">
                  Update Kamar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default DetailKamar;
