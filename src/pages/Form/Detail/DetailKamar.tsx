import Icon from '@mdi/react';
import Breadcrumb from '../../../components/Breadcrumb';
import DefaultLayout from '../../../layout/DefaultLayout';
import { mdiAlert, mdiChevronDown } from '@mdi/js';
import {
  Input,
  Select,
  SelectItem,
  SelectedItems,
  Selection,
  Spinner,
  useDisclosure,
} from '@nextui-org/react';
import { useEffect, useMemo, useState } from 'react';
import useAuth from 'src/hooks/useAuth';
import {
  createKamar,
  getKamarById,
  updateKamar,
} from 'src/hooks/kamar/kamarController';
import toast, { Toaster } from 'react-hot-toast';
import { useQuery } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { MyModal } from 'src/components';
import { fetchJenisKamarList } from 'src/hooks/jenisKamar/jenisKamarController';
import { capitalizeFirstLetter } from 'src/utils';


interface DataKamar {
  nomor_kamar: string;
  id_jenis_kamar: string;
}

const DetailKamar = () => {
  const { auth } = useAuth();
  const navigate = useNavigate();

  const { id } = useParams<{ id: string }>();
  const [value, setValue] = useState<Selection>(new Set([]));
  const [selectJK, setSelectJK] = useState<Selection>(new Set([]));
  const [jenisKamar, setJenisKamar] = useState<JenisKamar[]>([]);

  const { status, data, isFetching, isPreviousData, refetch, isLoading } =
    useQuery(
      ['detailKamar', id], // Memasukkan filterValue sebagai bagian dari query key
      () => getKamarById(id || '0', auth.token)
    );


    const { status: statusJenisKamar, data: JenisKamarList } = useQuery(
      ['JenisKamarList'],
      () => fetchJenisKamarList(50, auth.token),
      {
        keepPreviousData: true,
      }
    );

  const [dataKamar, setDataKamar] = useState<DataKamar>({
    nomor_kamar: '',
    id_jenis_kamar: '',
  });

  useEffect(() => {
    if (status === 'success' && data && statusJenisKamar === 'success' &&
    JenisKamarList) {
      // Memperbarui nilai dataKamar dengan data yang diterima dari useQuery
      setDataKamar({
        nomor_kamar: data.data.nomor_kamar.toString(),
        id_jenis_kamar: data.data.id_jenis_kamar.toString(),
      });
      setJenisKamar(JenisKamarList.data);
      // setValue(new Set([data.data.id_jenis_kamar.toString()]));
      setSelectJK(
        new Set([data.data.id_jenis_kamar.toString()])
      );
    }

    if (status === 'error') {
      toast.error('Data Kamar tidak ditemukan');
      navigate('/admin');
    }
  }, [status, data]);

  //   const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [error, setError] = useState('');

  const handleChange = (key: string, value: string) => {
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

  const handleJenisKamar = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectJK(new Set([e.target.value]));
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

    updateKamar(
      id || '0',
      dataKamar.nomor_kamar || '0',
      dataKamar.id_jenis_kamar || '0',
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
                        value={dataKamar.nomor_kamar}
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
      )}
    </DefaultLayout>
  );
};

export default DetailKamar;
