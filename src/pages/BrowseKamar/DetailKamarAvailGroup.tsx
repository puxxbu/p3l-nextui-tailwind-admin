import { useEffect, useState } from 'react';

import MainLayout from 'src/layout/MainLayout';

import {
  mdiBed,
  mdiFood,
  mdiGlassCocktail,
  mdiParking,
  mdiPool,
  mdiWifi,
} from '@mdi/js';
import Icon from '@mdi/react';

import { useQuery } from '@tanstack/react-query';

import toast, { Toaster } from 'react-hot-toast';
import { useLocation, useNavigate } from 'react-router-dom';
import useAuth from 'src/hooks/useAuth';
import { formatJenisKamar } from 'src/utils';
import { getKamarStatus } from 'src/hooks/booking/bookingController';
import DefaultLayout from 'src/layout/DefaultLayout';

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

interface KeyValues {
  [key: number]: number;
}

const DetailKamarAvailGroup = () => {
  const [users, setUsers] = useState();
  const navigate = useNavigate();
  const { auth } = useAuth();

  const [value, setValue] = useState<DatepickerProps>({
    startDate: null,
    endDate: null,
  });
  const [keyValueList, setKeyValueList] = useState<KeyValues>({});

  const [listKamar, setListKamar] = useState<Kamar[]>([]);

  const bookKamar = (dataKamar: Kamar) => {
    // Cek apakah data kamar sudah ada dalam listKamar
    const isDuplicate = listKamar.some(
      (kamar) => kamar.id_jenis_kamar === dataKamar.id_jenis_kamar
    );

    if (isDuplicate) {
      console.log('Kamar already exists');
      toast.error('Kamar sudah ada dalam list');
      return;
    }

    const updatedList = [...listKamar, dataKamar];
    setListKamar(updatedList);
    localStorage.setItem('listKamar', JSON.stringify(updatedList));

    const updatedKeyValueList = {
      ...keyValueList,
      [dataKamar.id_jenis_kamar]: 0,
    };
    setKeyValueList(updatedKeyValueList);
    localStorage.setItem('keyValueList', JSON.stringify(updatedKeyValueList));
    navigate('/booking/group');
  };

  useEffect(() => {
    const storedListKamar = localStorage.getItem('listKamar');
    const storedKeyValueList = localStorage.getItem('keyValueList');

    if (storedListKamar) {
      setListKamar(JSON.parse(storedListKamar));
    }

    if (storedKeyValueList) {
      setKeyValueList(JSON.parse(storedKeyValueList));
    }
  }, []);

  const location = useLocation();
  const { dataKamar, tanggal_check_in, tanggal_check_out } = location.state;

  useEffect(() => {
    if (tanggal_check_in && tanggal_check_out) {
      localStorage.setItem('tanggal_check_in', tanggal_check_in);
      localStorage.setItem('tanggal_check_out', tanggal_check_out);
    }
  }, []);
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
    <DefaultLayout>
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
                            <button
                              className="w-full rounded-full bg-gray-900 px-4 py-2 font-bold text-white hover:bg-gray-800 dark:bg-gray-600 dark:hover:bg-gray-700"
                              onClick={() => {
                                // Memanggil fungsi bookKamar dengan data kamar yang ingin dimasukkan ke dalam list
                                bookKamar(dataKamar);
                              }}
                              disabled={auth.token === undefined}
                            >
                              Booking Kamar
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="w-85 px-4 md:flex-1">
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
                            <span className="text-2xl font-bold text-gray-700 dark:text-gray-300">
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
                            Fasilitas yang didapat:
                          </span>
                          <div className="mt-2 flex items-center">
                            <div className="mx-2 flex w-40 flex-col items-center rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-slate-900 dark:text-gray-400 md:p-5">
                              <Icon path={mdiWifi} size={1} />
                              <span className="mt-2">Wifi</span>
                            </div>
                            <div className="mx-2 flex w-40 flex-col items-center rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-slate-900 dark:text-gray-400 md:p-5">
                              <Icon path={mdiPool} size={1} />
                              <span className="mt-2">Kolam Renang</span>
                            </div>
                            <div className="mx-2 flex w-40 flex-col items-center rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-slate-900 dark:text-gray-400 md:p-5">
                              <Icon path={mdiParking} size={1} />
                              <span className="mt-2">Parkir Gratis</span>
                            </div>
                          </div>
                          <div className="mt-2 flex items-center">
                            <div className="mx-2 flex w-40 flex-col items-center rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-slate-900 dark:text-gray-400 md:p-5">
                              <Icon path={mdiGlassCocktail} size={1} />
                              <span className="mt-2">Minibar</span>
                            </div>
                            <div className="mx-2 flex w-40 flex-col items-center rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-slate-900 dark:text-gray-400 md:p-5">
                              <Icon path={mdiBed} size={1} />
                              <span className="mt-2">
                                Kapasitas {dataKamar.kapasitas}
                              </span>
                            </div>
                            <div className="mx-2 flex w-40 flex-col items-center rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-slate-900 dark:text-gray-400 md:p-5">
                              <Icon path={mdiFood} size={1} />
                              <span className="mt-2">Sarapan</span>
                            </div>
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
    </DefaultLayout>
  );
};

export default DetailKamarAvailGroup;
