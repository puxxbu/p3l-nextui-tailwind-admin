import Breadcrumb from '../../../components/Breadcrumb';
import DefaultLayout from '../../../layout/DefaultLayout';

import {
  Input,
  Select,
  SelectItem,
  useDisclosure,
  Selection,
  Button,
} from '@nextui-org/react';
import { useEffect, useMemo, useState } from 'react';
import useAuth from 'src/hooks/useAuth';
import { createKamar } from 'src/hooks/kamar/kamarController';
import toast, { Toaster } from 'react-hot-toast';
import { MyModal } from 'src/components';
import { jenisKamar } from 'src/utils/const';
import {
  createCustomer,
  getCustomerById,
} from 'src/hooks/customer/customerController';
import { useQuery } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchDetailBooking } from 'src/hooks/sampleData';
import { formatDate } from 'src/utils';
import MainLayout from 'src/layout/MainLayout';
import { changeStatusBooking } from 'src/hooks/booking/bookingController';

interface dataBooking {
  nama: string;
  nomor_identitas: string;
  nomor_telepon: string;
  email: string;
  alamat: string;
  tanggal_dibuat: string;
  nama_institusi: string;
}

const DetailRiwayatUser = () => {
  const { auth } = useAuth();

  const { id } = useParams<{ id: string }>();

  const [value, setValue] = useState<Selection>(new Set([]));
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [error, setError] = useState('');
  const [modalTitle, setModalTitle] = useState('');
  const [dataKamar, setDataKamar] = useState<any[]>([]);
  const navigate = useNavigate();

  const { status: statusBooking, data: dataBooking } = useQuery(
    ['detailBookingUser'],
    () => fetchDetailBooking(id || '0', auth.token)
  );

  useEffect(() => {
    if (statusBooking === 'success' && dataBooking) {
      // setData(dataBooking.data);
      dataBooking.data.detail_booking_kamar.map((item: any) => {
        item.detail_ketersediaan_kamar.map((item2: any) => {
          console.log(item2);
          setDataKamar((prevDataKamar) => [...prevDataKamar, item2]);
        });
      });
      console.log(dataKamar);
    }

    if (statusBooking === 'error') {
      toast.error('Data Booking tidak ditemukan');
      navigate('/admin');
    }
  }, [statusBooking, dataBooking]);

  return (
    <MainLayout>
      <Toaster />
      <MyModal
        isOpen={isOpen}
        onOpen={onOpen}
        onOpenChange={onOpenChange}
        title={modalTitle}
        content={error}
      />
      <div className="mx-auto max-w-5xl rounded-lg bg-white px-8 py-10 shadow-lg dark:bg-boxdark">
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center">
            <img
              className="mr-2 h-8 w-8"
              src="https://tailwindflex.com/public/images/logos/favicon-32x32.png"
              alt="Logo"
            />
            <div className="text-lg font-semibold text-gray-700 dark:text-white">
              Grand Atma Hotel
            </div>
          </div>
          {dataBooking?.data.pegawai_2 !== null && (
            <div className="text-gray-700 dark:text-white">
              <div className="mb-2 text-xl font-bold">Detail Booking</div>
              <div className="text-sm">
                Date: {formatDate(dataBooking?.data.tanggal_pembayaran || '')}
              </div>
              <div className="text-sm">
                Front Office: {dataBooking?.data.pegawai_2?.nama_pegawai || ''}
              </div>
            </div>
          )}
        </div>
        <div className="mb-8 border-b-2 border-gray-300 pb-8 text-gray-700 dark:text-white">
          <h2 className="mb-4 text-2xl font-bold">
            ID Booking : {dataBooking?.data.id_booking}
          </h2>
          <div className="mb-2 ">Nama : {dataBooking?.data.customer.nama}</div>
          <div className="mb-2 ">
            Alamat : {dataBooking?.data.customer.alamat}
          </div>
          <div className="mb-2 ">
            Nomor Rekening : {dataBooking?.data.no_rekening}
          </div>
          <div className="mb-2 ">
            Check-in : {formatDate(dataBooking?.data.tanggal_check_in || '')} -
            Check-out : {formatDate(dataBooking?.data.tanggal_check_out || '')}
          </div>
          <div className="mb-2 ">Tamu anak : {dataBooking?.data.tamu_anak}</div>
          <div className="mb-2 ">
            Tamu dewasa : {dataBooking?.data.tamu_dewasa}
          </div>
          <div className="mb-2 ">
            Status Booking : {dataBooking?.data.status_booking}
          </div>

          {dataBooking?.data.status_booking !== 'Jaminan Sudah Dibayar' && (
            <Button
              className="mt-4"
              color="primary"
              onClick={() =>
                changeStatusBooking(
                  'Jaminan Sudah Dibayar',
                  dataBooking?.data.id_booking || '0',
                  auth.token,
                  (data, error) => {
                    if (error) {
                      toast.error(error || 'Terjadi kesalahan');
                    } else {
                      toast.success('Berhasil mengubah status booking');
                    }
                  }
                )
              }
            >
              Lunasi Booking
            </Button>
          )}
        </div>
        <h3 className="py-2 text-center text-xl font-bold uppercase text-gray-700 dark:text-white ">
          Kamar
        </h3>
        <table className="mb-8 w-full text-left text-gray-700 dark:text-white">
          <thead>
            <tr>
              <th className="py-2 font-bold uppercase ">Jenis Kamar</th>
              <th className="py-2 font-bold uppercase ">Bed</th>
              <th className="py-2 font-bold uppercase ">Jumlah</th>
              <th className="py-2 font-bold uppercase ">Harga</th>
              <th className="py-2 font-bold uppercase ">Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {dataBooking?.data.detail_booking_kamar.map((item: any, index) => (
              <tr key={index}>
                <td className="py-4">{item.jenis_kamar.jenis_kamar}</td>
                <td className="py-4">{item.jenis_kamar.jenis_bed}</td>
                <td className="py-4">{item.jumlah}</td>
                <td className="py-4">Rp{item.sub_total / item.jumlah}</td>
                <td className="py-4">Rp{item.sub_total}</td>
                {/* {item.jenis_kamar.fasilitas.map((jenisKamar, jenisKamarIndex) => (
                  <td className="py-4">{item.jenis_kamar.jenis_kamar}</td>
                  <td className="py-4">{item.jenis_kamar.jenis_bed}</td>
                  <td className="py-4">{item.jumlah}</td>
                  <td className="py-4">Rp{item.sub_total / item.jumlah}</td>
                  <td className="py-4">Rp{item.sub_total}</td>
                ))} */}
              </tr>
            ))}
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
            {dataKamar?.map((item: any, index: any) => (
              <tr key={index}>
                <td className="py-4">{item.kamar.jenis_kamar.jenis_kamar}</td>
                <td className="py-4">{item.kamar.jenis_kamar.jenis_bed}</td>
                <td className="py-4">{item.kamar.nomor_kamar}</td>
              </tr>
            ))}
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
            {dataBooking?.data.detail_booking_layanan.map((item, index) => (
              <tr key={index}>
                <td className="py-4">{item.layanan.nama_layanan}</td>
                <td className="py-4">{formatDate(item.tanggal)}</td>
                <td className="py-4">{item.jumlah}</td>
                <td className="py-4">Rp{item.layanan.harga}</td>
                <td className="py-4">Rp{item.sub_total}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {dataBooking?.data.invoice && dataBooking?.data.invoice.length > 0 && (
          <div className="mb-8 flex justify-end text-gray-700 dark:text-white">
            <div className="mr-2">Pajak:</div>
            <div className="">Rp{dataBooking?.data.invoice[0].total_pajak}</div>
          </div>
        )}

        {dataBooking?.data.invoice && dataBooking?.data.invoice.length > 0 && (
          <div className="mb-8 flex justify-end text-gray-700 dark:text-white">
            <div className="mr-2 ">Total:</div>
            <div className="text-xl font-bold ">
              Rp{dataBooking?.data.invoice[0].total_pembayaran}
            </div>
          </div>
        )}

        {/* <div className="mb-8 border-t-2 border-gray-300 pt-8">
          <div className="mb-2 text-gray-700 dark:text-white">
            Payment is due within 30 days. Late payments are subject to fees.
          </div>
          <div className="mb-2 text-gray-700 dark:text-white">
            Please make checks payable to Your Company Name and mail to:
          </div>
          <div className="text-gray-700 dark:text-white">
            123 Main St., Anytown, USA 12345
          </div>
        </div> */}
      </div>
    </MainLayout>
  );
};

export default DetailRiwayatUser;
