import React, { useEffect, useMemo, useState } from 'react';

import userSix from '../../images/user/user-06.png';

import MainLayout from 'src/layout/MainLayout';

import { mdiCamera, mdiEye, mdiEyeOff, mdiMagnify } from '@mdi/js';
import Icon from '@mdi/react';

import { useQuery, useMutation } from '@tanstack/react-query';

import {
  Button,
  Card,
  CardFooter,
  CardHeader,
  Divider,
  Image,
  Input,
  Spinner,
} from '@nextui-org/react';

import {
  getCurrentCustomer,
  updateCustomer,
} from 'src/hooks/customer/customerController';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import useAuth from 'src/hooks/useAuth';
import { updatePassword } from 'src/hooks/auth/authController';
import TopNavBar from 'src/components/TopNavBar';
import FilterBar from 'src/components/FilterBar';
import Datepicker from 'react-tailwindcss-datepicker';
import CardKamar from 'src/components/Card/CardKamarGroup';
import { fetchKamarTersedia } from 'src/hooks/booking/bookingController';
import DefaultLayout from 'src/layout/DefaultLayout';
import CardKamarGroup from 'src/components/Card/CardKamarGroup';

interface DatepickerProps {
  startDate: any;
  endDate: any;
}

interface DataSeason {
  nama_season: string;
  tanggal_mulai: string;
  tanggal_selesai: string;
}

const BrowseKamarGroup = () => {
  const navigate = useNavigate();
  const { auth } = useAuth();

  const today = new Date();
  const tommorow = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() + 1
  );
  const twoMonthsLater = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() - 1
  );

  const [value, setValue] = useState<DatepickerProps>({
    startDate: today,
    endDate: tommorow,
  });
  const [filterValue, setFilterValue] = React.useState('');

  const handleValueChange = (newValue: any) => {
    console.log('newValue:', newValue);
    setValue(newValue);
    handleChange('tanggal_mulai', newValue.startDate);
    handleChange('tanggal_selesai', newValue.endDate);
  };

  const onClear = React.useCallback(() => {
    setFilterValue('');
  }, []);

  const onSearchChange = React.useCallback((value?: string) => {
    if (value) {
      setFilterValue(value);
      console.log(value);
    } else {
      setFilterValue('');
    }
  }, []);

  const {
    status,
    data: dataKamar,
    error,
    isFetching,
    isPreviousData,
    refetch,
    isLoading,
  } = useQuery(
    ['listKamarTersedia', value.startDate, filterValue], // Memasukkan filterValue sebagai bagian dari query key
    () => fetchKamarTersedia(100, value.startDate,value.endDate, filterValue),
    {
      keepPreviousData: true,
      staleTime: 5000,
    }
  );

  const [data, setData] = useState<DataSeason>({
    nama_season: '',
    tanggal_mulai: '',
    tanggal_selesai: '',
  });

  const handleChange = (key: any, value: any) => {
    console.log(key, value);
    setData((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  };

  // const { status: statusCustomer, data: dataCustomer } = useQuery(
  //   ['detailCustomer'],
  //   () => getCurrentCustomer(auth.token),
  //   {
  //     keepPreviousData: true,
  //   }
  // );

  // useEffect(() => {
  //   if (statusCustomer === 'success' && dataCustomer) {
  //   }

  //   if (statusCustomer === 'error') {
  //     toast.error('Data Customer tidak ditemukan');
  //     navigate('/auth/signin');
  //   }
  // }, [statusCustomer, dataCustomer]);

  return (
    <DefaultLayout>
      <section>
        <Toaster />
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className=" border-gray-800  ">
            <div className="mx-auto max-w-6xl px-4 sm:px-6">
              <div className=" rounded-sm border border-stroke bg-white px-4 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-6">
                <div className="px-4 py-5  lg:pb-8 xl:pb-11.5">
                  <div className="mt-4">
                    <div className="px-3 py-6 ">
                      <div className="flex">
                        <div className="w-1/2 pr-2 ">
                          <span className="text-black dark:text-white">
                            Masukkan range tangga menginap:
                          </span>
                          <Datepicker
                            classNames={{
                              input: () =>
                                'relative bg-slate-50 transition-all duration-300 py-2.5 pl-4 pr-14 w-full border-gray-300 dark:bg-slate-800 dark:text-white/80 dark:border-slate-600 rounded-lg tracking-wide font-light text-sm placeholder-gray-400 bg-white focus:ring disabled:opacity-40 disabled:cursor-not-allowed focus:border-blue-500 focus:ring-blue-500/20',
                            }}
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
                        <div className="w-1/2 pl-2">
                          <span className="text-black dark:text-white ">
                            Cari: {dataKamar?.paging.total_item || 0}
                          </span>
                          <Input
                            isClearable
                            variant="bordered"
                            className="w-full text-black dark:text-white "
                            startContent={<Icon path={mdiMagnify} size={1} />}
                            value={filterValue}
                            onClear={() => onClear()}
                            onValueChange={onSearchChange}
                          />
                        </div>
                      </div>
                    </div>

                    <h3 className="my-4 text-2xl font-semibold text-black dark:text-white">
                      Jenis Kamar yang Tersedia
                    </h3>

                    <div className="mt-3 grid grid-cols-1 gap-4 md:grid-cols-2">
                      {isLoading ? (
                        <Spinner /> // Ganti dengan komponen spinner yang sesuai
                      ) : (
                        dataKamar?.data.map((item: Kamar) => (
                          <div key={item.id_jenis_kamar}>
                            <CardKamarGroup
                              dataKamar={item}
                              tanggal_check_in={value.startDate}
                              tanggal_check_out={value.endDate}
                            />
                          </div>
                        ))
                      )}
                    </div>
                    <div className="mt-3 flex w-full flex-wrap justify-start gap-4 md:flex-nowrap"></div>
                    <div className="mt-3 flex w-full flex-wrap justify-start gap-4 md:flex-nowrap"></div>
                    <div className="mt-5 flex w-full flex-wrap justify-end gap-4 md:flex-nowrap"></div>

                    <div className="mt-3 flex w-full flex-wrap justify-start gap-4 md:flex-nowrap"></div>
                    <div className="mt-5 flex w-full flex-wrap justify-end gap-4 md:flex-nowrap"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </DefaultLayout>
  );
};

export default BrowseKamarGroup;
