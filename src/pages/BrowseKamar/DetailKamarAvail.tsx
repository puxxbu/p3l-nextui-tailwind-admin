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
} from '@nextui-org/react';

import {
  getCurrentCustomer,
  updateCustomer,
} from 'src/hooks/customer/customerController';
import toast, { Toaster } from 'react-hot-toast';
import { useLocation, useNavigate } from 'react-router-dom';
import useAuth from 'src/hooks/useAuth';
import { updatePassword } from 'src/hooks/auth/authController';
import TopNavBar from 'src/components/TopNavBar';
import FilterBar from 'src/components/FilterBar';
import Datepicker from 'react-tailwindcss-datepicker';
import CardKamar from 'src/components/Card/CardKamar';
import { formatJenisKamar } from 'src/utils';
import { getKamarStatus } from 'src/hooks/booking/bookingController';

interface DatepickerProps {
  startDate: any;
  endDate: any;
}

interface DataSeason {
  nama_season: string;
  tanggal_mulai: string;
  tanggal_selesai: string;
}

interface LocationState {
  dataKamar: Kamar;
}

const DetailKamarAvail = () => {
  const [users, setUsers] = useState();
  const navigate = useNavigate();
  const { auth } = useAuth();

  const [value, setValue] = useState<DatepickerProps>({
    startDate: null,
    endDate: null,
  });

  const location = useLocation();
  const { dataKamar, tanggal_check_in, tanggal_check_out } = location.state;

  let harga = 0;

  if (dataKamar.tarif.length > 0) {
    harga = dataKamar.tarif[0].harga;
  } else {
    harga = dataKamar.base_harga;
  }

  const today = new Date();
  const twoMonthsLater = new Date(
    today.getFullYear(),
    today.getMonth() + 2,
    today.getDate()
  );

  const handleValueChange = (newValue: any) => {
    console.log('newValue:', newValue);
    setValue(newValue);
    handleChange('tanggal_mulai', newValue.startDate);
    handleChange('tanggal_selesai', newValue.endDate);
  };

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

  const { data: kamarTersisa } = useQuery(
    ['kamarTersisa'],
    () =>
      getKamarStatus(
        dataKamar.id_jenis_kamar,
        tanggal_check_in,
        tanggal_check_out
      ),
    {
      keepPreviousData: true,
    }
  );

  // useEffect(() => {
  //   if (statusCustomer === 'success' && dataCustomer) {
  //   }

  //   if (statusCustomer === 'error') {
  //     toast.error('Data Customer tidak ditemukan');
  //     navigate('/auth/signin');
  //   }
  // }, [statusCustomer, dataCustomer]);

  return (
    <MainLayout>
      <section>
        <Toaster />
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className=" border-gray-800  ">
            <div className="mx-auto mt-5 max-w-6xl px-4 sm:px-6">
              <div className=" rounded-sm border border-stroke bg-white  shadow-default dark:border-strokedark dark:bg-boxdark ">
                <div className="bg-gray-100 py-8  dark:bg-gray-800">
                  <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                    <div className="-mx-4 flex flex-col md:flex-row">
                      <div className="px-4 md:flex-1">
                        <div className="mb-4 h-[460px] rounded-lg bg-gray-300 dark:bg-gray-700">
                          <img
                            className="h-full w-full object-cover"
                            src="https://id.marinabaysands.com/content/dam/marinabaysands/hotel/deluxe-room/deluxe-room-gallery-1-1920x1080.jpg"
                            alt="Product Image"
                          />
                        </div>
                        <div className="-mx-2 mb-4 flex">
                          <div className="w-full px-2">
                            <button className="w-full rounded-full bg-gray-900 px-4 py-2 font-bold text-white hover:bg-gray-800 dark:bg-gray-600 dark:hover:bg-gray-700">
                              Booking Kamar
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="px-4 md:flex-1">
                        <h2 className="mb-2 text-2xl font-bold text-gray-800 dark:text-white">
                          {formatJenisKamar(
                            dataKamar.jenis_kamar,
                            dataKamar.jenis_bed
                          )}
                        </h2>
                        <p className="mb-4 text-sm text-gray-600 dark:text-gray-300">
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit. Sed sed ante justo. Integer euismod libero id
                          mauris malesuada tincidunt.
                        </p>
                        <div className="mb-4 flex">
                          <div className="mr-4">
                            <span className="text-gray-600 dark:text-gray-300">
                              Rp. {harga} / Malam
                            </span>
                          </div>
                        </div>
                        <div className="mb-4 flex">
                          <div>
                            <span className="font-bold text-gray-700 dark:text-gray-300">
                              Availability: {kamarTersisa?.data || 0} Kamar
                              tersisa
                            </span>
                            <span className="text-gray-600 dark:text-gray-300"></span>
                          </div>
                        </div>

                        <div className="mb-4">
                          <span className="font-bold text-gray-700 dark:text-gray-300">
                            Select Size:
                          </span>
                          <div className="mt-2 flex items-center">
                            <button className="mr-2 rounded-full bg-gray-300 px-4 py-2 font-bold text-gray-700 hover:bg-gray-400 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600">
                              S
                            </button>
                            <button className="mr-2 rounded-full bg-gray-300 px-4 py-2 font-bold text-gray-700 hover:bg-gray-400 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600">
                              M
                            </button>
                            <button className="mr-2 rounded-full bg-gray-300 px-4 py-2 font-bold text-gray-700 hover:bg-gray-400 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600">
                              L
                            </button>
                            <button className="mr-2 rounded-full bg-gray-300 px-4 py-2 font-bold text-gray-700 hover:bg-gray-400 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600">
                              XL
                            </button>
                            <button className="mr-2 rounded-full bg-gray-300 px-4 py-2 font-bold text-gray-700 hover:bg-gray-400 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600">
                              XXL
                            </button>
                          </div>
                        </div>
                        <div>
                          <span className="font-bold text-gray-700 dark:text-gray-300">
                            Product Description:
                          </span>
                          <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit. Sed sed ante justo. Integer euismod libero id
                            mauris malesuada tincidunt. Vivamus commodo nulla ut
                            lorem rhoncus aliquet. Duis dapibus augue vel ipsum
                            pretium, et venenatis sem blandit. Quisque ut erat
                            vitae nisi ultrices placerat non eget velit. Integer
                            ornare mi sed ipsum lacinia, non sagittis mauris
                            blandit. Morbi fermentum libero vel nisl suscipit,
                            nec tincidunt mi consectetur.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default DetailKamarAvail;
