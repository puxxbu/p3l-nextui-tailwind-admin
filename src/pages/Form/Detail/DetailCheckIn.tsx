import { mdiMinusCircle, mdiPlusCircle } from '@mdi/js';
import Icon from '@mdi/react';
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Selection,
  useDisclosure,
} from '@nextui-org/react';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
import {
  cancelBooking,
  changeStatusBooking,
  createInvoice,
  updateNoRekening,
} from 'src/hooks/booking/bookingController';
import { fetchFasilitasSize } from 'src/hooks/fasilitas/fasilitasController';
import {
  fetchDetailBooking,
  getCurrentPegawai,
  getCurrentUser,
} from 'src/hooks/sampleData';
import useAuth from 'src/hooks/useAuth';
import { formatDate } from 'src/utils';
import Breadcrumb from '../../../components/Breadcrumb';
import LogoGah from '../../../images/logo/logo-gah2.png';
import DefaultLayout from '../../../layout/DefaultLayout';

interface KeyValues {
  [key: number]: number;
}

const DetailCheckIn = () => {
  const { auth } = useAuth();

  const { id } = useParams<{ id: string }>();

  const [value, setValue] = useState<Selection>(new Set([]));
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const {
    isOpen: isCancelModalOpen,
    onOpen: onCancelOpen,
    onOpenChange: onCancelOpenChange,
    onClose: onCloseCancel,
  } = useDisclosure();
  const [error, setError] = useState('');
  const [modalTitle, setModalTitle] = useState('');
  const [dataKamar, setDataKamar] = useState<any[]>([]);
  const [nomorRekening, setNomorRekening] = useState('');

  const [keyValueList, setKeyValueList] = useState<KeyValues>({});
  const [layananList, setLayananList] = useState<KeyValues>({});

  const [pajak, setPajak] = useState(0);

  const navigate = useNavigate();
  const [total, setTotal] = useState(0);
  const [totalHargaFasilitas, setTotalHargaFasilitas] = useState(0);
  const [overAllTotal, setOverAllTotal] = useState(0);

  const [pegawaiID, setPegawaiID] = useState(0);

  const handleChange = (event: any) => {
    const inputValue = event.target.value;
    setNomorRekening(inputValue);
    setError('');
  };

  getCurrentPegawai(auth.token, (data, error) => {
    if (error) {
      console.log('data :' + error);
    } else {
      console.log(data?.data.id_pegawai);
      setPegawaiID(data?.data.id_pegawai || 0);
    }
  });

  const { status: statusBooking, data: dataBooking } = useQuery(
    ['detailBooking'],
    () => fetchDetailBooking(id || '0', auth.token)
  );

  const {
    status,
    data: dataFasilitas,
    refetch,
    isLoading,
  } = useQuery(
    ['fasilitasSize'], // Memasukkan filterValue sebagai bagian dari query key
    () => fetchFasilitasSize(100, '', auth.token)
    // Menambahkan opsi enabled: false
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

  const handleCheckOut = async () => {
    const detailFasilitas: DetailFasilitas[] = [];

    dataFasilitas?.data.forEach((item: any) => {
      if (layananList[item.id_fasilitas] > 0) {
        detailFasilitas.push({
          id_fasilitas: item.id_fasilitas,
          jumlah: layananList[item.id_fasilitas],
          sub_total: item.harga * layananList[item.id_fasilitas],
        });
      }
    });

    console.log(pegawaiID);

    createInvoice(
      dataBooking?.data.id_booking || '0',
      pegawaiID,
      detailFasilitas,
      auth.token,
      (data, error) => {
        if (error) {
          toast.error(error || 'Terjadi kesalahan');
        } else {
          console.log(data);
          navigate(`/data/user/detail-history/${id}`);
        }
      }
    );
  };

  const handleCancelBooking = async () => {
    cancelBooking(
      dataBooking?.data.id_booking || '0',
      auth.token,
      (data, error) => {
        if (error) {
          toast.error(error || 'Terjadi kesalahan');
        } else {
          toast.success('Berhasil membatalkan booking');
        }
      }
    );
  };

  const handleIncrementLayanan = (key: number) => {
    setLayananList((prevState) => ({
      ...prevState,
      [key]: prevState[key] + 1,
    }));
    console.log(layananList);
  };

  const handleDecrementLayanan = (key: number) => {
    if (layananList[key] > 0) {
      setLayananList((prevState) => ({
        ...prevState,
        [key]: prevState[key] - 1,
      }));
    }
  };

  useEffect(() => {
    if (statusBooking === 'success' && dataBooking) {
      // setData(dataBooking.data);
      setDataKamar([]);
      let total = 0;
      dataBooking.data.detail_booking_kamar.map((item: any) => {
        total += item.sub_total;

        item.detail_ketersediaan_kamar.map((item2: any) => {
          console.log(item2);
          setDataKamar((prevDataKamar) => [...prevDataKamar, item2]);
        });
      });
      if (dataBooking.data.status_booking === 'Sudah 50% Dibayar') {
        total = total / 2;
      }

      const jumlah = dataBooking.data.detail_booking_layanan.find(
        (item2: any) => item2.layanan.id_fasilitas === 1
      )?.jumlah;
      console.log(jumlah);
      setTotal(total);

      const layananKeyValue: KeyValues = {};
      dataFasilitas?.data.forEach((item: any) => {
        const jumlah =
          dataBooking.data.detail_booking_layanan.find(
            (item2: any) => item2.layanan.id_fasilitas === item.id_fasilitas
          )?.jumlah || 0;

        console.log(jumlah);
        if (jumlah > 0) {
          layananKeyValue[item.id_fasilitas] = jumlah;
        } else {
          layananKeyValue[item.id_fasilitas] = 0;
        }
      });

      setLayananList(layananKeyValue);

      console.log(layananKeyValue['1']);
    }
    if (statusBooking === 'error') {
      toast.error('Data Booking tidak ditemukan');
      navigate('/admin');
    }
  }, [statusBooking, dataBooking]);

  let totalPajak = 0;
  let totalFasilitas = 0;
  useEffect(() => {
    setPajak(totalFasilitas * 0.1);
    setTotalHargaFasilitas(totalFasilitas);
    setOverAllTotal(total + totalPajak + totalFasilitas);
  });

  const shouldHideButton =
    dataBooking?.data.status_booking === 'Dibatalkan' ||
    dataBooking?.data.status_booking === 'Dibatalkan (Uang Kembali)';
  const showDPButton =
    dataBooking?.data.status_booking === 'Booked' &&
    dataBooking?.data.jenis_booking === 'Group';
  const showLunasButton =
    dataBooking?.data.status_booking === 'Booked' ||
    dataBooking?.data.status_booking === 'Sudah 50% Dibayar';

  console.log(
    `${dataBooking?.data.jenis_booking} ${dataBooking?.data.status_booking}`
  );
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Data Customer" />
      <Toaster />
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Check Out
              </ModalHeader>
              <ModalBody>
                <p>
                  Apakah Anda yakin ingin melakukan check-out pada booking ini?
                </p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button
                  color="primary"
                  variant="light"
                  onPress={handleCheckOut}
                >
                  Check-out
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      <Modal isOpen={isCancelModalOpen} onOpenChange={onCancelOpenChange}>
        <ModalContent>
          {(onCloseCancel) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Pelunasan Booking
              </ModalHeader>
              <ModalBody>
                <p>Apakah Anda yakin ingin membatalkan booking ini?</p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onCloseCancel}>
                  Close
                </Button>
                <Button
                  color="primary"
                  variant="light"
                  onPress={handleCancelBooking}
                >
                  Cancel Booking
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      <div className="mx-auto max-w-5xl rounded-lg bg-white px-8 py-10 shadow-lg dark:bg-boxdark">
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center">
            <img src={LogoGah} alt="Logo Hotel" className="h-auto w-32" />
          </div>
          <>
            <div>
              <Button className="mx-2 mt-4" color="primary" onClick={onOpen}>
                Check-out
              </Button>
              {!shouldHideButton && (
                <Button className="mt-4" color="danger" onClick={onCancelOpen}>
                  Cancel Booking
                </Button>
              )}
            </div>
          </>
        </div>
        {dataBooking?.data.pegawai_2 !== null && (
          <div className="mb-4 border-b-2 border-gray-300 pb-4 text-gray-700 dark:text-white">
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

          {showLunasButton && (
            <Button className="mt-4" color="primary" onClick={() => onOpen()}>
              Lunasi Booking
            </Button>
          )}
          {showDPButton && (
            <Button
              className="ml-3 mt-4"
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
              </tr>
            ))}
            <tr>
              <td className="py-4"></td>
              <td className="py-4"></td>
              <td className="py-4"></td>
              <td className="py-4 font-bold">
                {dataBooking?.data.jenis_booking === 'Group'
                  ? 'Jumlah Jaminan'
                  : 'Subtotal'}
              </td>
              <td className="py-4">Rp{total}</td>
            </tr>
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
              <th className="py-2 font-bold uppercase ">Jumlah</th>
              <th className="py-2 font-bold uppercase ">Harga</th>
              <th className="py-2 font-bold uppercase ">Sub Total</th>
            </tr>
          </thead>
          <tbody>
            {dataFasilitas?.data.map((item, index) => {
              totalFasilitas += item.harga * layananList[item.id_fasilitas];
              return (
                <tr key={index}>
                  <td className="py-4">{item.nama_layanan}</td>
                  <td className="py-4">
                    <div className="flex items-center">
                      <button
                        onClick={() =>
                          handleDecrementLayanan(item.id_fasilitas)
                        }
                        className="p-1"
                      >
                        <Icon path={mdiMinusCircle} size={1} />
                      </button>
                      <span className="mx-2">
                        {layananList[item.id_fasilitas]}
                      </span>
                      <button
                        onClick={() =>
                          handleIncrementLayanan(item.id_fasilitas)
                        }
                        className="p-1"
                      >
                        <Icon path={mdiPlusCircle} size={1} />
                      </button>
                    </div>
                  </td>
                  <td className="py-4">Rp{item.harga}</td>
                  <td className="py-4">
                    Rp{item.harga * layananList[item.id_fasilitas]}
                  </td>
                </tr>
              );
            })}
            <tr>
              <td className="py-4"></td>
              <td className="py-4"></td>
              <td className="py-4"></td>
              <td className="py-4">Rp{totalFasilitas}</td>
            </tr>
          </tbody>
        </table>
        <div className="mb-8 flex justify-end text-2xl text-gray-700 dark:text-white">
          <div className="mr-2 font-bold">Pajak:</div>
          <div className="">Rp {pajak}</div>
        </div>

        <div className="mb-8 flex justify-end text-2xl text-gray-700 dark:text-white">
          <div className="mr-2 font-bold">TOTAL:</div>
          <div className="">Rp {overAllTotal}</div>
        </div>

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

export default DetailCheckIn;
