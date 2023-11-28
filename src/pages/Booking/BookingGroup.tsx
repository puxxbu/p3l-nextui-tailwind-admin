import {
  useDisclosure,
  Selection,
  Input,
  Button,
  Select,
  SelectItem,
  SelectedItems,
} from '@nextui-org/react';
import { useEffect, useState } from 'react';
import useAuth from 'src/hooks/useAuth';
import toast, { Toaster } from 'react-hot-toast';
import { MyModal } from 'src/components';
import { useNavigate } from 'react-router-dom';
import MainLayout from 'src/layout/MainLayout';
import {
  capitalizeFirstLetter,
  formatDate,
  formatDateWithTime,
} from 'src/utils';
import { useQuery } from '@tanstack/react-query';
import {
  fetchCustomerGroup,
  getCurrentCustomer,
} from 'src/hooks/customer/customerController';
import Icon from '@mdi/react';
import { mdiMinusCircle, mdiPlusCircle, mdiTrashCan } from '@mdi/js';
import {
  fetchFasilitas,
  fetchFasilitasSize,
} from 'src/hooks/fasilitas/fasilitasController';
import { createBooking } from 'src/hooks/booking/bookingController';
import DefaultLayout from 'src/layout/DefaultLayout';

interface KeyValues {
  [key: number]: number;
}

interface BookingData {
  booking: Booking;
  detail_booking: DetailBookingKamar[];
  fasilitas: DetailFasilitas[];
}

interface Booking {
  id_customer: number;
  tanggal_booking: string;
  tanggal_check_in: string;
  tanggal_check_out: string;
  tamu_dewasa: number;
  tamu_anak: number;
  tanggal_pembayaran?: string | null; // Tanggal pembayaran dapat kosong
  jenis_booking: string;
  status_booking: string;
  id_pegawai_fo?: number | null; // Id pegawai FO dapat kosong
  no_rekening?: string;
}

interface DetailBookingKamar {
  id_jenis_kamar: number;
  jumlah: number;
  sub_total: number;
}

interface DetailFasilitas {
  id_fasilitas: number;
  nama_fasilitas: string;
  jumlah: number;
  sub_total: number;
}

const BookingGroup = () => {
  const { auth } = useAuth();

  const [value, setValue] = useState<Selection>(new Set([]));
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [error, setError] = useState('');
  const [modalTitle, setModalTitle] = useState('');
  const navigate = useNavigate();

  const [customerGroup, setCustomerGroup] = useState<Customer[]>([]);
  const [selectJK, setSelectJK] = useState<Selection>(new Set([]));
  const [idCustomer, setidCustomer] = useState(0);
  const [nama, setNama] = useState('');
  const [alamat, setAlamat] = useState('');

  const [listKamar, setListKamar] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [keyValueList, setKeyValueList] = useState<KeyValues>({});
  const [layananList, setLayananList] = useState<KeyValues>({});
  const [nomorRekening, setNomorRekening] = useState('');

  const [tamuAnak, setTamuAnak] = useState(0);
  const [tamuDewasa, setTamuDewasa] = useState(0);
  const [total, setTotal] = useState(0);

  const { status, data, refetch, isLoading } = useQuery(
    ['fasilitas'], // Memasukkan filterValue sebagai bagian dari query key
    () => fetchFasilitasSize(100, '', auth.token),
    { enabled: false } // Menambahkan opsi enabled: false
  );

  const handleChange = (event: any) => {
    const inputValue = event.target.value;
    setNomorRekening(inputValue);
    setError('');
  };

  const handleDeleteKamar = (index: any) => {
    const updatedList = [...listKamar];
    const kamarToRemove: Kamar = updatedList[index];
    const updatedKeyValueList = { ...keyValueList };
    updatedList.splice(index, 1);

    setListKamar(updatedList);
    localStorage.setItem('listKamar', JSON.stringify(updatedList));
    delete updatedKeyValueList[kamarToRemove.id_jenis_kamar];
    setKeyValueList(updatedKeyValueList);
    localStorage.setItem('keyValueList', JSON.stringify(updatedKeyValueList));
  };

  useEffect(() => {
    refetch();
  }, []);

  const handleIncrement = (key: number) => {
    setKeyValueList((prevState) => ({
      ...prevState,
      [key]: prevState[key] + 1,
    }));
  };

  const handleDecrement = (key: number) => {
    if (keyValueList[key] > 0) {
      setKeyValueList((prevState) => ({
        ...prevState,
        [key]: prevState[key] - 1,
      }));
    }
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

  const incrementTamuAnak = () => {
    setTamuAnak((prevTamuAnak) => prevTamuAnak + 1);
  };

  const decrementTamuAnak = () => {
    if (tamuAnak > 0) {
      setTamuAnak((prevTamuAnak) => prevTamuAnak - 1);
    }
  };

  const incrementTamuDewasa = () => {
    setTamuDewasa((prevTamuDewasa) => prevTamuDewasa + 1);
  };

  const decrementTamuDewasa = () => {
    if (tamuDewasa > 0) {
      setTamuDewasa((prevTamuDewasa) => prevTamuDewasa - 1);
    }
  };

  //   const { status: statusCustomer, data: dataCustomer } = useQuery(
  //     ['detailCustomer'],
  //     () => getCurrentCustomer(auth.token),
  //     {
  //       keepPreviousData: true,
  //     }
  //   );

  useEffect(() => {
    const dataKamar = localStorage.getItem('listKamar');
    const countKamar = localStorage.getItem('keyValueList');
    const tanggal_check_in = localStorage.getItem('tanggal_check_in');
    const tanggal_check_out = localStorage.getItem('tanggal_check_out');

    if (!dataKamar || !countKamar || !tanggal_check_in || !tanggal_check_out) {
      toast.error(
        'Silahkan isi kamar yang ingin dipesan dulu pada browse kamar'
      );
    } else {
      const parsedDataKamar = JSON.parse(dataKamar);
      setStartDate(tanggal_check_in || '');
      setEndDate(tanggal_check_out || '');
      setListKamar(parsedDataKamar);
      setKeyValueList(JSON.parse(countKamar));

      console.log(parsedDataKamar);
      console.log(countKamar);
    }
  }, []);

  useEffect(() => {
    refetch();
    console.log(status);
    if (status === 'success') {
      console.log(data.data.length);
      const layananKeyValue: KeyValues = {};
      data.data.forEach((item: any) => {
        layananKeyValue[item.id_fasilitas] = 0;
      });
      setLayananList(layananKeyValue);
    }
  }, [data]);

  const handleJenisKamar = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectJK(new Set([e.target.value]));
    // handleChangeData('id_jenis_kamar', e.target.value);
    setidCustomer(parseInt(e.target.value));

    dataCustomer?.data.map((item: Customer) => {
      if (item.id_customer === parseInt(e.target.value)) {
        setNama(item.nama);
        setAlamat(item.alamat);
      }
    });

    console.log(e.target.value);
  };

  useEffect(() => {
    let total = 0;

    listKamar.forEach((item: Kamar, index) => {
      let harga = 0;

      if (item.tarif.length > 0) {
        harga = item.tarif[0].harga;
      } else {
        harga = item.base_harga;
      }

      total = total + harga * keyValueList[item.id_jenis_kamar];
    });

    setTotal(total);
  }, [keyValueList]);

  const handleBook = () => {
    const regex = /^\d{8}$/;
    // if (!regex.test(nomorRekening)) {
    //   toast.error('Nomor rekening harus terdiri dari 8 digit angka');
    //   return;
    // }
    const isValueZero = Object.values(keyValueList).some(
      (value) => value === 0
    );

    if (Object.keys(keyValueList).length === 0) {
      toast.error('Kamar harus diisi');
      return;
    }

    if (tamuAnak === 0 && tamuDewasa === 0) {
      toast.error('Tamu dewasa atau anak harus diisi');
      return;
    }

    if (isValueZero) {
      toast.error('Jumlah kamar tidak boleh kosong');
      return;
    }

    const dataBooking: Booking = {
      id_customer: idCustomer,
      tanggal_booking: formatDate(new Date().toString()),
      tanggal_check_in: formatDateWithTime(startDate),
      tanggal_check_out: formatDateWithTime(endDate),
      tamu_dewasa: tamuDewasa,
      tamu_anak: tamuAnak,
      jenis_booking: 'Group',
      status_booking: 'Booked',
    };
    const detailBookingKamar: DetailBookingKamar[] = [];
    const detailFasilitas: DetailFasilitas[] = [];

    listKamar.forEach((item: Kamar, index) => {
      let harga = 0;

      if (item.tarif.length > 0) {
        harga = item.tarif[0].harga;
      } else {
        harga = item.base_harga;
      }
      detailBookingKamar.push({
        id_jenis_kamar: item.id_jenis_kamar,
        jumlah: keyValueList[item.id_jenis_kamar],
        sub_total: harga * keyValueList[item.id_jenis_kamar],
      });
    });

    data?.data.forEach((item: any) => {
      if (layananList[item.id_fasilitas] > 0) {
        detailFasilitas.push({
          id_fasilitas: item.id_fasilitas,
          nama_fasilitas: item.nama_fasilitas,
          jumlah: layananList[item.id_fasilitas],
          sub_total: item.harga * layananList[item.id_fasilitas],
        });
      }
    });

    const bookingData: BookingData = {
      booking: dataBooking,
      detail_booking: detailBookingKamar,
      fasilitas: detailFasilitas,
    };

    localStorage.setItem('bookingData', JSON.stringify(bookingData));

    createBooking(bookingData, auth.token, (data, error) => {
      if (error) {
        toast.error(error);
      } else {
        toast.success('Berhasil membuat booking');
        console.log(data);
        localStorage.removeItem('listKamar');
        localStorage.removeItem('keyValueList');
        localStorage.removeItem('tanggal_check_in');
        localStorage.removeItem('tanggal_check_out');

        setTimeout(() => {
          navigate(`/data/user/detail-history/${data?.data.id_booking}`);
        }, 1000);
      }
    });

    console.log(bookingData);
    console.log(detailFasilitas);
    setNomorRekening('');
  };

  const { status: statusCustomer, data: dataCustomer } = useQuery(
    ['dataCustomer'],
    () => fetchCustomerGroup(100, auth.token),
    {
      keepPreviousData: true,
    }
  );

  useEffect(() => {
    if (statusCustomer === 'success' && dataCustomer) {
      setCustomerGroup(dataCustomer.data);
    }
  }, [dataCustomer]);
  const handleButtonClick = () => {
    navigate('/booking/group/browse');
  };

  return (
    <DefaultLayout>
      <Toaster />
      <MyModal
        isOpen={isOpen}
        onOpen={onOpen}
        onOpenChange={onOpenChange}
        title={modalTitle}
        content={error}
      />
      <div className="mx-auto my-5 max-w-5xl">
        <Button color="primary" onClick={handleButtonClick}>
          Pesan Kamar Lagi
        </Button>
      </div>

      <div className="mx-auto max-w-5xl rounded-lg bg-white px-8 py-10 shadow-lg dark:bg-boxdark">
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center">
            <img
              src="https://cdn.discordapp.com/attachments/170900821200994304/1173526610239029279/3_2--removebg-preview.png?ex=656446d2&is=6551d1d2&hm=d0bb91fb104875c9f3e2eba1e80d298d243759f869acb3c1d3e710f78b950f06&"
              alt="Logo Hotel"
              className="h-auto w-32"
            />
          </div>
          {/* <div className="text-gray-700 dark:text-white">
            <div className="mb-2 text-xl font-bold">Detail Booking</div>
            <div className="text-sm">Date:</div>
            <div className="text-sm">Front Office:</div>
          </div> */}
        </div>
        <div className="mb-8 border-b-2 border-gray-300 pb-8 text-gray-700 dark:text-white">
          <h2 className="mb-4 text-2xl font-bold">Pemesanan Kamar</h2>
          <Select
            isRequired
            label="Customer Group"
            items={customerGroup}
            placeholder="Pilih Nama Customer"
            selectedKeys={selectJK}
            classNames={{
              trigger: 'h-14',
            }}
            onChange={handleJenisKamar}
            renderValue={(items: SelectedItems<Customer>) => {
              return items.map((item) => (
                <div key={item.key} className="flex items-center gap-2">
                  <div className="flex flex-col">
                    <span>{item.data?.nama}</span>
                  </div>
                </div>
              ));
            }}
          >
            {(customerGroup) => (
              <SelectItem
                key={customerGroup.id_customer}
                textValue={customerGroup.nama}
              >
                <div className="flex items-center gap-2">
                  <div className="flex  flex-col dark:text-white">
                    <span className="text-small">
                      {`${customerGroup.nama} 
                      `}
                    </span>
                  </div>
                </div>
              </SelectItem>
            )}
          </Select>
          <div className="mb-2 ">Nama : {nama} </div>
          <div className="mb-2 ">Alamat : {alamat} </div>
          <div className="mb-2 ">
            Check-in :{formatDate(startDate)} - Check-out :{' '}
            {formatDate(endDate)}
          </div>
          <div className="mb-2">
            <div className="flex items-center">
              <div className="mr-2">Tamu anak:</div>
              <div className="flex items-center">
                <button onClick={decrementTamuAnak} className="p-1">
                  <Icon path={mdiMinusCircle} size={1} />
                </button>
                <span className="mx-2">{tamuAnak}</span>

                <button onClick={incrementTamuAnak} className="p-1">
                  <Icon path={mdiPlusCircle} size={1} />
                </button>
              </div>
            </div>
          </div>

          <div className="mb-2">
            <div className="flex items-center">
              <div className="mr-2">Tamu dewasa:</div>
              <div className="flex items-center">
                <button onClick={decrementTamuDewasa} className="p-1">
                  <Icon path={mdiMinusCircle} size={1} />
                </button>
                <span className="mx-2">{tamuDewasa}</span>

                <button onClick={incrementTamuDewasa} className="p-1">
                  <Icon path={mdiPlusCircle} size={1} />
                </button>
              </div>
            </div>
            {/* <Input
              isRequired
              className="mt-4 w-100"
              type="text"
              value={nomorRekening}
              onChange={handleChange}
              label="Nomor Rekening"
              placeholder="Masukkan Nomor Rekening"
            /> */}
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
            {listKamar.map((item: Kamar, index) => {
              let harga = 0;

              if (item.tarif.length > 0) {
                harga = item.tarif[0].harga;
              } else {
                harga = item.base_harga;
              }
              return (
                <tr key={index}>
                  <td className="py-4">{item.jenis_kamar}</td>
                  <td className="py-4">
                    {capitalizeFirstLetter(item.jenis_bed)}
                  </td>
                  <td className="py-4">
                    <div className="flex items-center">
                      <button
                        onClick={() => handleDecrement(item.id_jenis_kamar)}
                        className="p-1"
                      >
                        <Icon path={mdiMinusCircle} size={1} />
                      </button>
                      <span className="mx-2">
                        {keyValueList[item.id_jenis_kamar]}
                      </span>
                      <button
                        onClick={() => handleIncrement(item.id_jenis_kamar)}
                        className="p-1"
                      >
                        <Icon path={mdiPlusCircle} size={1} />
                      </button>
                    </div>
                  </td>
                  <td className="py-4">Rp{harga}</td>
                  <td className="py-4">
                    Rp{keyValueList[item.id_jenis_kamar] * harga}
                  </td>
                  <td className="py-4">
                    <button onClick={() => handleDeleteKamar(index)}>
                      <Icon path={mdiTrashCan} size={1} />
                    </button>
                  </td>
                </tr>
              );
            })}
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
            {data?.data.map((item, index) => {
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
          </tbody>
        </table>

        <div className="mb-8 flex justify-end text-gray-700 dark:text-white">
          <div className="mr-2 ">Total:</div>
          <div className="text-xl font-bold ">Rp{total}</div>
        </div>

        <Button
          className="w-full"
          onClick={handleBook}
          size="lg"
          color="primary"
        >
          Pesan Sekarang
        </Button>

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

export default BookingGroup;
