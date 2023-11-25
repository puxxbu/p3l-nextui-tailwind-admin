import Breadcrumb from '../../components/Breadcrumb';
import DefaultLayout from '../../layout/DefaultLayout';

import LogoGah from '../../images/logo/logo-gah2.png';

import { Button } from '@nextui-org/react';
import { useRef } from 'react';
import { Toaster } from 'react-hot-toast';
import { useParams } from 'react-router-dom';
import useAuth from 'src/hooks/useAuth';

import { useReactToPrint } from 'react-to-print';
import {
  fetchLaporanDua,
  fetchLaporanTiga,
} from 'src/hooks/laporan/laporanController';
import { useQuery } from '@tanstack/react-query';

const namaBulan = [
  'Januari',
  'Februari',
  'Maret',
  'April',
  'Mei',
  'Juni',
  'Juli',
  'Agustus',
  'September',
  'Oktober',
  'November',
  'Desember',
];

const CetakLaporanTiga = () => {
  const { auth } = useAuth();

  const { tahun } = useParams<{ tahun: string }>();
  const { bulan } = useParams<{ bulan: string }>();

  const pdfRef = useRef<HTMLDivElement | null>(null);

  const { status, data, error, refetch, isLoading } = useQuery(
    ['laporanDuaCetak'], // Memasukkan filterValue sebagai bagian dari query key
    () =>
      fetchLaporanTiga(
        parseInt(tahun || '2023'),
        parseInt(bulan || '11'),
        auth.token
      ),
    {
      keepPreviousData: true,
      staleTime: 5000,
    }
  );

  const downloadPdf = useReactToPrint({
    content: () => pdfRef.current,
  });

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Laporan Pendapatan Bulanan" />
      <div className="flex justify-end">
        <Button className="m-3" color="primary" onClick={downloadPdf}>
          Cetak PDF
        </Button>
      </div>

      <Toaster />

      <div
        className="mx-auto max-w-5xl  bg-white px-8 py-10 shadow-lg dark:bg-boxdark"
        ref={pdfRef}
      >
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center">
            <img src={LogoGah} alt="Logo Hotel" className="h-auto w-32" />
          </div>
          <>
            {/* {!shouldHideButton && (
            <Button className="mt-4" color="danger" onClick={handleCancelBooking} >
              Cancel Booking
            </Button>
          )} */}
          </>
        </div>

        <div className="mb-8 border-b-2 border-black pb-8 text-gray-700 dark:border-gray-300  dark:text-white">
          <h2 className="mb-4 text-2xl font-bold">
            Laporan Pendapatan Bulanan
          </h2>
          <div className="mb-2 ">Tahun : {tahun}</div>
          <div className="mb-2 ">
            Bulan : {namaBulan[parseInt(bulan || '0') - 1]}
          </div>
          <div className="mb-2 ">
            Dicetak tanggal : {new Date().toLocaleDateString('id-ID')}
          </div>
        </div>

        {/* <h3 className="py-2 text-center text-xl font-bold uppercase text-gray-700 dark:text-white ">
          Kamar
        </h3> */}
        <table className="mb-8 w-full  border-black text-left  text-gray-700 dark:border-gray-300 dark:text-white">
          <thead>
            <tr>
              <th className="border-2 border-black px-2 py-3 font-bold uppercase dark:border-gray-300  ">
                No
              </th>
              <th className="border-2 border-black px-2 py-3 font-bold uppercase dark:border-gray-300  ">
                Jenis Kamar
              </th>
              <th className="border-2 border-black px-2 py-3 font-bold uppercase dark:border-gray-300  ">
                Grup
              </th>
              <th className="border-2 border-black px-2 py-3 font-bold uppercase dark:border-gray-300  ">
                Personal
              </th>
              <th className="border-2 border-black px-2 py-3 font-bold uppercase dark:border-gray-300  ">
                Total
              </th>
            </tr>
          </thead>
          <tbody>
            {data?.data.laporan.map((item: any, index: any) => (
              <tr key={index}>
                <td className="border-2 border-black  px-2 py-3 font-semibold dark:border-gray-300">
                  {index + 1}
                </td>
                <td className="border-2 border-black px-2 py-3 font-semibold dark:border-gray-300">
                  {item.jenis_kamar}
                </td>
                <td className="border-2 border-black px-2 py-3 font-semibold dark:border-gray-300">
                  {item.Group}
                </td>
                <td className="border-2 border-black px-2 py-3 font-semibold dark:border-gray-300">
                  {item.Personal}
                </td>
                <td className="border-2 border-black px-2 py-3 font-semibold dark:border-gray-300">
                  {item.Total}
                </td>
              </tr>
            ))}
            <tr>
              <td className=" px-2 py-3 "></td>
              <td className=" px-2 py-3 "></td>
              <td className=" px-2 py-3 "></td>
              <td className="border-2 border-black px-2 py-3 font-semibold dark:border-gray-300">
                Total
              </td>
              <td className="border-2 border-black px-2 py-3 font-semibold dark:border-gray-300">
                {data?.data.total.toLocaleString('id-ID')}
              </td>
            </tr>

            {/* {dataBooking?.data.detail_booking_kamar.map((item: any, index) => (
              <tr key={index}>
                <td className="py-3">{item.jenis_kamar.jenis_kamar}</td>
                <td className="py-3">{item.jenis_kamar.jenis_bed}</td>
                <td className="py-3">{item.jumlah}</td>
                <td className="py-3">Rp{item.sub_total / item.jumlah}</td>
                <td className="py-3">Rp{item.sub_total}</td>
              </tr>
            ))} */}
          </tbody>
        </table>
      </div>
    </DefaultLayout>
  );
};

export default CetakLaporanTiga;
