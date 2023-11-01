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
  SelectedItems,
} from '@nextui-org/react';
import { useEffect, useMemo, useState } from 'react';
import useAuth from 'src/hooks/useAuth';
import { createKamar } from 'src/hooks/kamar/kamarController';
import toast, { Toaster } from 'react-hot-toast';
import { MyModal } from 'src/components';
import { jenisKamar } from 'src/utils/const';
import { fetchJenisKamarList } from 'src/hooks/jenisKamar/jenisKamarController';
import { useQuery } from '@tanstack/react-query';
import { capitalizeFirstLetter } from 'src/utils';

interface DataKamar {
  nomor_kamar: string;
  id_jenis_kamar: any;
}

const FormKamar = () => {
  const { auth } = useAuth();
  const [data, setData] = useState<DataKamar>({
    nomor_kamar: '',
    id_jenis_kamar: '',
  });

  const [jenisKamar, setJenisKamar] = useState<JenisKamar[]>([]);

  const [value, setValue] = useState<Selection>(new Set([]));
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [error, setError] = useState('');
  const [modalTitle, setModalTitle] = useState('');

  const [selectJK, setSelectJK] = useState<Selection>(new Set([]));



  const handleChange = (key: any, value: any) => {
    console.log(key, value);
    setData((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  };

  const handleNomorKamar = (value: string) => {
    if (value === '') return false;
    handleChange('nomor_kamar', value);
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

  const { status: statusJenisKamar, data: JenisKamarList } = useQuery(
    ['JenisKamarList'],
    () => fetchJenisKamarList(50, auth.token),
    {
      keepPreviousData: true,
    }
  );

  useEffect(() => {
    if (

      statusJenisKamar === 'success' &&
      JenisKamarList
      
    ) {
      
      setJenisKamar(JenisKamarList.data);
     
    }

    if (
      
      statusJenisKamar === 'error' 
     
    ) {
      toast.error('Data tidak ditemukan');
    }
  }, [
    
    statusJenisKamar,
    JenisKamarList,
    
  ]);


  


  const isInvalid = useMemo(() => {
    if (data.nomor_kamar === '') return false;
    return validateNomorKamar(data.nomor_kamar) ? false : true;
  }, [data.nomor_kamar]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (isInvalid)
      return toast('Tolong cek kembali inputan anda', {
        icon: '❌',
        className: 'dark:bg-boxdark dark:text-white',
      });

    createKamar(
      data.nomor_kamar || '0',
      data.id_jenis_kamar || '0',
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
            nomor_kamar: '',
            id_jenis_kamar: '',
          });
          setValue(new Set([]));
          setSelectJK(new Set([]));
        }
      }
    );
  };

  const handleClearSelect = () => {
    setValue(new Set([]));
    console.log(data.id_jenis_kamar);
  };

  const handleJenisKamar = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectJK(new Set([e.target.value]));
    handleChange('id_jenis_kamar', e.target.value);
    console.log(e.target.value);
  };

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Create Kamar" />
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
                      value={data.nomor_kamar}
                      isInvalid={isInvalid}
                      errorMessage={isInvalid && 'Masukkan input yang valid'}
                      onValueChange={(value) =>
                        handleChange('nomor_kamar', value)
                      }
                      placeholder="Masukkan Nomor Kamar"
                    />
                  </div>

                  <div className="w-full xl:w-1/2">
                    <div className="relative z-20 bg-transparent dark:bg-form-input">
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
                      renderValue={(items: SelectedItems<JenisKamar>) => {;
                        return items.map((item) => (
                          <div
                            key={item.key}
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
                  </div>
                </div>

                <button className="flex w-full justify-center rounded bg-primary p-3 font-medium text-white                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      ">
                  Create Kamar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default FormKamar;
