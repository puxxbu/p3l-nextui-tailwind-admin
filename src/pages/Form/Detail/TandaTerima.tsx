import Breadcrumb from '../../../components/Breadcrumb';
import DefaultLayout from '../../../layout/DefaultLayout';

import LogoGah from '../../../images/logo/logo-gah2.png'

import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Selection,
  useDisclosure
} from '@nextui-org/react';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useRef, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
import { cancelBooking, changeStatusBooking, updateNoRekening } from 'src/hooks/booking/bookingController';
import { fetchDetailBooking } from 'src/hooks/sampleData';
import useAuth from 'src/hooks/useAuth';
import { formatDate } from 'src/utils';

import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import DarkModeSwitcher from 'src/components/DarkModeSwitcher';

import {useReactToPrint} from 'react-to-print';

interface dataBooking {
  nama: string;
  nomor_identitas: string;
  nomor_telepon: string;
  email: string;
  alamat: string;
  tanggal_dibuat: string;
  nama_institusi: string;
}

const TandaTerima = () => {
  const { auth } = useAuth();

  const { id } = useParams<{ id: string }>();

  const pdfRef = useRef<HTMLDivElement | null>(null);

  const [value, setValue] = useState<Selection>(new Set([]));
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [error, setError] = useState('');
  const [modalTitle, setModalTitle] = useState('');
  const [dataKamar, setDataKamar] = useState<any[]>([]);
  const [nomorRekening, setNomorRekening] = useState('');

  const navigate = useNavigate();

  const handleChange = (event: any) => {
    const inputValue = event.target.value;
    setNomorRekening(inputValue);
    setError('');
  };

  // const downloadPdf = () => {
  //   if (pdfRef.current) {
  //     const input = pdfRef.current;
  //     html2canvas(input).then((canvas) => {
  //       const imgData = canvas.toDataURL('image/png');
  //       const pdf = new jsPDF('p', 'mm', 'a4');
  
  //       // Mengubah warna latar belakang PDF

  //       pdf.setFillColor(255, 255, 255);
  //        // Ubah nilai RGB sesuai dengan warna yang Anda inginkan
  //       pdf.rect(0, 0, pdf.internal.pageSize.getWidth(), pdf.internal.pageSize.getHeight(), 'F');
  
  //       const imgProps = pdf.getImageProperties(imgData);
  //       const pdfWidth = pdf.internal.pageSize.getWidth();
  //       const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
  //       pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
  //       pdf.save('tanda-terima.pdf');
  //     });
  //   }
  // }
  const downloadPdf = useReactToPrint({
    content: () => pdfRef.current,
  })

  const { status: statusBooking, data: dataBooking } = useQuery(
    ['detailBooking'],
    () => fetchDetailBooking(id || '0', auth.token)
  );

  let isRefundable = false;
  const tanggalCheckIn = dataBooking?.data.tanggal_check_in;

  if (tanggalCheckIn) {
    const checkInDate = new Date(tanggalCheckIn);

    // Mendapatkan tanggal hari ini
    const hariIni = new Date();

    // Menghitung selisih antara tanggal check-in dan hari ini dalam milisekon
    const selisihWaktu = checkInDate.getTime() - hariIni.getTime();

    // Mengubah selisih waktu menjadi jumlah hari
    const selisihHari = selisihWaktu / (1000 * 3600 * 24);

    // Jika selisih hari kurang dari 7 (seminggu), maka tidak refundable
    if (selisihHari < 7) {
      isRefundable = false;
    } else {
      isRefundable = true;
    }
  }
  

  const handleChangeStatus = async () => {


    if (dataBooking?.data.no_rekening === '' || dataBooking?.data.no_rekening === null ) {
      const regex = /^\d{8}$/;
      if (!regex.test(nomorRekening)) {
        toast.error('Nomor rekening harus terdiri dari 8 digit angka');
      }else{
        updateNoRekening('Jaminan Sudah Dibayar',dataBooking?.data.id_booking || '0',nomorRekening,auth.token,(data, error) => {
          if (error) {
            toast.error(error || 'Terjadi kesalahan');
          } else {
            toast.success('Berhasil mengubah status booking');
            onClose();
          }
        })
      }
    }else{
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
      onClose();
    }
    

    
    
  }

  const handleCancelBooking = async () => {

    cancelBooking(dataBooking?.data.id_booking || '0', auth.token, (data, error) => { 
      if(error){
        toast.error(error || 'Terjadi kesalahan');
      }else{
        toast.success('Berhasil membatalkan booking');
      }
    })
  }

  useEffect(() => {
    if (statusBooking === 'success' && dataBooking) {
      // setData(dataBooking.data);
      setDataKamar([]);
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

  const shouldHideButton = dataBooking?.data.status_booking === 'Dibatalkan' || dataBooking?.data.status_booking === 'Dibatalkan (Uang Kembali)';
  const showDPButton = dataBooking?.data.status_booking === 'Booked' && dataBooking?.data.jenis_booking === 'Group'; 
  const showLunasButton = dataBooking?.data.status_booking === 'Booked' || dataBooking?.data.status_booking === 'Sudah 50% Dibayar';

  console.log(`${dataBooking?.data.jenis_booking} ${dataBooking?.data.status_booking}`);
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Data Customer" />
      <div className="flex justify-end">
      <Button className="m-3" color="primary" onClick={downloadPdf} >
              Cetak PDF
            </Button>
    </div>
      
      <Toaster />
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Pelunasan Booking</ModalHeader>
              <ModalBody>
               <p>Apakah Anda yakin ingin melunasi booking ini?</p>
               {dataBooking?.data.no_rekening === '' || dataBooking?.data.no_rekening === null  && (
                <Input
                isRequired
                className="mt-4 w-100"
                type="text"
                value={nomorRekening}
                onChange={handleChange}
                label="Nomor Rekening"
                placeholder="Masukkan Nomor Rekening"
              />
               )}
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" variant="light" onPress={handleChangeStatus}>
                  Lunasi Booking
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      <div  className="mx-auto max-w-5xl  bg-white px-8 py-10 shadow-lg dark:bg-boxdark" ref={pdfRef}>
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center">
          <img
              src={LogoGah}
              alt="Logo Hotel"
              className="h-auto w-32"
            />
            
          </div>
          <>
          
          {/* {!shouldHideButton && (
            <Button className="mt-4" color="danger" onClick={handleCancelBooking} >
              Cancel Booking
            </Button>
          )} */}
          </>
          
        </div>
        {dataBooking?.data.pegawai_2 !== null && (
            <div className="text-gray-700 dark:text-white mb-4 border-b-2 pb-4 border-gray-300">
              <div className="mb-2 text-xl font-bold">Detail Booking</div>
              <div className="text-sm">
              Date: {formatDate(dataBooking?.data.tanggal_booking || '')}
              </div>
              <div className="text-sm">
                PIC: {dataBooking?.data.pegawai_1?.nama_pegawai || ''}
              </div>
            </div>
          )}
        
        <div className="mb-8 border-b-2 border-gray-300 pb-8 text-gray-700 dark:text-white">
          <h2 className="mb-4 text-2xl font-bold">
            ID Booking : {dataBooking?.data.id_booking}
          </h2>
          <div className="mb-2 ">Nama : {dataBooking?.data.customer.nama}</div>
          <div className="mb-2 ">
            Alamat : {dataBooking?.data.customer.alamat}
          </div>
          <div className="mb-2 ">
            Mendapat Refund? : {isRefundable ? 'Ya' : 'Tidak'}
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

          {/* {showLunasButton && (
            <Button
              className="mt-4"
              color="primary"
              onClick={() =>
                onOpen()
              }
            >
              Lunasi Booking
            </Button>
          )}
          {showDPButton && (
            <Button
              className="mt-4 ml-3"
              color="primary"
              onClick={() =>
                changeStatusBooking(
                  'Sudah 50% Dibayar',
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
              {dataBooking?.data.customer.jenis_customer === 'Group'
                ? 'Bayar DP'
                : 'Lunasi Booking'}
            </Button>
          )} */}
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
    </DefaultLayout>
  );
};

export default TandaTerima;
