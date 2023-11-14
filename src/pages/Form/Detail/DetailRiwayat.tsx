import Breadcrumb from '../../../components/Breadcrumb';
import DefaultLayout from '../../../layout/DefaultLayout';

import {
  Input,
  Select,
  SelectItem,
  useDisclosure,
  Selection,
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

interface dataBooking {
  nama: string;
  nomor_identitas: string;
  nomor_telepon: string;
  email: string;
  alamat: string;
  tanggal_dibuat: string;
  nama_institusi: string;
}

const DetailRiwayat = () => {
  const { auth } = useAuth();

  const { id } = useParams<{ id: string }>();

  const [value, setValue] = useState<Selection>(new Set([]));
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [error, setError] = useState('');
  const [modalTitle, setModalTitle] = useState('');
  const navigate = useNavigate();

  const { status: statusBooking, data: dataBooking } = useQuery(
    ['detailBooking'],
    () => fetchDetailBooking(id || '0', auth.token),
    {
      keepPreviousData: true,
    }
  );

  useEffect(() => {
    if (statusBooking === 'success' && dataBooking) {
      // setData(dataBooking.data);
    }

    if (statusBooking === 'error') {
      toast.error('Data Booking tidak ditemukan');
      navigate('/admin');
    }
  }, [statusBooking, dataBooking]);

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Data Customer" />
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
          <div className="text-gray-700 dark:text-white">
            <div className="mb-2 text-xl font-bold">Detail Booking</div>
            <div className="text-sm">
              Date: {formatDate(dataBooking?.data.tanggal_pembayaran || '')}
            </div>
            <div className="text-sm">
              Front Office: {dataBooking?.data.pegawai_2.nama_pegawai || ''}
            </div>
          </div>
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
            Check-in : {formatDate(dataBooking?.data.tanggal_check_in || '')} -
            Check-out : {formatDate(dataBooking?.data.tanggal_check_out || '')}
          </div>
          <div className="mb-2 ">Tamu anak : {dataBooking?.data.tamu_anak}</div>
          <div className="mb-2 ">
            Tamu dewasa : {dataBooking?.data.tamu_dewasa}
          </div>
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
            {dataBooking?.data.detail_booking_kamar.map((item, index) => (
              <tr key={index}>
                <td className="py-4">{item.jenis_kamar.jenis_kamar}</td>
                <td className="py-4">{item.jenis_kamar.jenis_bed}</td>
                <td className="py-4">{item.jumlah}</td>
                <td className="py-4">Rp{item.sub_total / item.jumlah}</td>
                <td className="py-4">Rp{item.sub_total}</td>
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
    </DefaultLayout>
  );
};

export default DetailRiwayat;
