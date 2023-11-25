import Breadcrumb from '../../components/Breadcrumb';
import DefaultLayout from '../../layout/DefaultLayout';

import LogoGah from '../../images/logo/logo-gah2.png';

import { Button } from '@nextui-org/react';
import { useRef } from 'react';
import { Toaster } from 'react-hot-toast';
import { useParams } from 'react-router-dom';
import useAuth from 'src/hooks/useAuth';

import { useReactToPrint } from 'react-to-print';

interface dataBooking {
  nama: string;
  nomor_identitas: string;
  nomor_telepon: string;
  email: string;
  alamat: string;
  tanggal_dibuat: string;
  nama_institusi: string;
}

const CetakLaporanDua = () => {
  const { auth } = useAuth();

  const { id } = useParams<{ id: string }>();

  const pdfRef = useRef<HTMLDivElement | null>(null);

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

        <div className="mb-8 border-b-2 border-gray-300 pb-8 text-gray-700 dark:text-white">
          <h2 className="mb-4 text-2xl font-bold">
            Laporan Pendapatan Bulanan
          </h2>
          <div className="mb-2 ">Tahun :</div>
          <div className="mb-2 ">Bulan :</div>
        </div>

        <h3 className="py-2 text-center text-xl font-bold uppercase text-gray-700 dark:text-white ">
          Kamar
        </h3>
        <table className="mb-8 w-full border border-gray-300 text-left  text-gray-700 dark:text-white">
          <thead>
            <tr>
              <th className="border border-gray-300 py-2 font-bold uppercase  ">
                Jenis Kamar
              </th>
              <th className="border border-gray-300 py-2 font-bold uppercase ">
                Bed
              </th>
              <th className="border border-gray-300 py-2 font-bold uppercase ">
                Jumlah
              </th>
              <th className="border border-gray-300 py-2 font-bold uppercase ">
                Harga
              </th>
              <th className="border border-gray-300 py-2 font-bold uppercase ">
                Subtotal
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-300 py-4">Tes Tes</td>
              <td className="border border-gray-300 py-4">Tes Tes</td>
              <td className="border border-gray-300 py-4">Tes Tes</td>
              <td className="border border-gray-300 py-4">Tes Tes</td>
              <td className="border border-gray-300 py-4">Tes Tes</td>
            </tr>
            {/* {dataBooking?.data.detail_booking_kamar.map((item: any, index) => (
              <tr key={index}>
                <td className="py-4">{item.jenis_kamar.jenis_kamar}</td>
                <td className="py-4">{item.jenis_kamar.jenis_bed}</td>
                <td className="py-4">{item.jumlah}</td>
                <td className="py-4">Rp{item.sub_total / item.jumlah}</td>
                <td className="py-4">Rp{item.sub_total}</td>
              </tr>
            ))} */}
          </tbody>
        </table>
        <h3 className="py-2 text-center text-xl font-bold uppercase text-gray-700 dark:text-white ">
          Nomor Kamar
        </h3>
        <table className="mb-8 w-full text-left text-gray-700 dark:text-white">
          <thead>
            <tr>
              <th className="py-2 font-bold uppercase ">Jenis Kamar</th>
              <th className="py-2 font-bold uppercase ">Bed</th>
              <th className="py-2 font-bold uppercase ">Nomor Kamar</th>
            </tr>
          </thead>
          <tbody>
            {/* {dataKamar?.map((item: any, index: any) => (
              <tr key={index}>
                <td className="py-4">{item.kamar.jenis_kamar.jenis_kamar}</td>
                <td className="py-4">{item.kamar.jenis_kamar.jenis_bed}</td>
                <td className="py-4">{item.kamar.nomor_kamar}</td>
              </tr>
            ))} */}
          </tbody>
        </table>
        <h3 className="py-2 text-center text-xl font-bold uppercase text-gray-700 dark:text-white ">
          Layanan
        </h3>
        <table className="mb-8 w-full text-left text-gray-700 dark:text-white">
          <thead>
            <tr>
              <th className="py-2 font-bold uppercase ">Layanan</th>
              <th className="py-2 font-bold uppercase ">Tanggal</th>
              <th className="py-2 font-bold uppercase ">Jumlah</th>
              <th className="py-2 font-bold uppercase ">Harga</th>
              <th className="py-2 font-bold uppercase ">Sub Total</th>
            </tr>
          </thead>
          <tbody>
            {/* {dataBooking?.data.detail_booking_layanan.map((item, index) => {
              totalFasilitas += item.sub_total;
              return (
                <tr key={index}>
                  <td className="py-4">{item.layanan.nama_layanan}</td>
                  <td className="py-4">{formatDate(item.tanggal)}</td>
                  <td className="py-4">{item.jumlah}</td>
                  <td className="py-4">Rp{item.layanan.harga}</td>
                  <td className="py-4">Rp{item.sub_total}</td>
                </tr>
              );
            })} */}
            <tr>
              <td className="py-4"></td>
              <td className="py-4"></td>
              <td className="py-4"></td>
              <td className="py-4"></td>
              <td className="py-4 font-bold">Rp asdasdsa</td>
            </tr>
          </tbody>
        </table>
      </div>
    </DefaultLayout>
  );
};

export default CetakLaporanDua;
