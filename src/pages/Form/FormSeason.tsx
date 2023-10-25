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

import Datepicker from 'react-tailwindcss-datepicker';
import { createSeason } from 'src/hooks/season/seasonController';

interface DataSeason {
  nama_season: string;
  tanggal_mulai: string;
  tanggal_selesai: string;
}

interface DatepickerProps {
  startDate: any;
  endDate: any;
}

const FormSeason = () => {
  const { auth } = useAuth();
  const today = new Date();
  const twoMonthsLater = new Date(
    today.getFullYear(),
    today.getMonth() + 2,
    today.getDate()
  );
  const [data, setData] = useState<DataSeason>({
    nama_season: '',
    tanggal_mulai: '',
    tanggal_selesai: '',
  });

  const [value, setValue] = useState<DatepickerProps>({
    startDate: null,
    endDate: null,
  });

  const handleValueChange = (newValue: any) => {
    console.log('newValue:', newValue);
    setValue(newValue);
    handleChange('tanggal_mulai', newValue.startDate);
    handleChange('tanggal_selesai', newValue.endDate);
  };
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

  //   const isInvalid = useMemo(() => {
  //     if (data.tanggal_selesai === '') return false;
  //     return validateNomorKamar(data.tanggal_selesai) ? false : true;
  //   }, [data.tanggal_selesai]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    // if (isInvalid)
    //   return toast('Tolong cek kembali inputan anda', {
    //     icon: '❌',
    //     className: 'dark:bg-boxdark dark:text-white',
    //   });

    if (value.startDate === null || value.endDate === null || value === null)
      return toast('Tolong isi range Tanggal Season terlebih dahulu', {
        icon: '❌',
        className: 'dark:bg-boxdark dark:text-white',
      });

    createSeason(
      data.nama_season || '0',
      data.tanggal_mulai || '0',
      data.tanggal_selesai || '0',
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
            nama_season: '',
            tanggal_mulai: '',
            tanggal_selesai: '',
          });
          setValue({
            startDate: null,
            endDate: null,
          });
        }
      }
    );
  };

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Create Season" />
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
                      value={data.nama_season}
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
    </DefaultLayout>
  );
};

export default FormSeason;
