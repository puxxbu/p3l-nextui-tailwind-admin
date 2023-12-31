import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';

import SignIn from './pages/Authentication/SignIn';
import SignUp from './pages/Authentication/SignUp';
import Calendar from './pages/Calendar';
// import Chart from './pages/Chart';
import ECommerce from './pages/Dashboard/ECommerce';
import FormElements from './pages/Form/FormElements';
import FormLayout from './pages/Form/FormLayout';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Alerts from './pages/UiElements/Alerts';
import Buttons from './pages/UiElements/Buttons';
import RequireAuth from 'Components/RequireAuth';
import LandingPage from './pages/LandingPage/LandingPage';
import FormKamar from './pages/Form/FormKamar';
import DetailKamar from './pages/Form/Detail/DetailKamar';
import TabelKamar from './pages/Data/TabelKamar';
import { rolePegawai } from './utils/const';
import TabelJenisKamar from './pages/Data/TabelJenisKamar';
import FormJenisKamar from './pages/Form/FormJenisKamar';
import DetailJenisKamar from './pages/Form/Detail/DetailJenisKamar';
import TabelSeason from './pages/Data/TableSeason';
import FormSeason from './pages/Form/FormSeason';
import DetailSeason from './pages/Form/Detail/DetailSeason';
import TabelFasilitas from './pages/Data/TabelFasilitas';
import FormFasilitas from './pages/Form/FormFasilitas';
import DetailFasilitas from './pages/Form/Detail/DetailFasilitas';
import FormTarif from './pages/Form/FormTarif';
import UserProfile from './pages/UserProfile';
import DetailTarif from './pages/Form/Detail/DetailTarif';
import TabelTarif from './pages/Data/TabelTarif';
import TabelCustomer from './pages/Data/TabelCustomer';
import FormCustomer from './pages/Form/FormCustomer';
import DetailCustomer from './pages/Form/Detail/DetailCustomer';
import HistoryBooking from './pages/Data/HistoryBooking';
import DetailRiwayat from './pages/Form/Detail/DetailRiwayat';
import HistoryBookingUser from './pages/Data/HistoryBookingUser';
import DetailRiwayatUser from './pages/Form/Detail/DetailRiwayatUser';
import BrowseKamar from './pages/BrowseKamar/BrowseKamar';
import DetailKamarAvail from './pages/BrowseKamar/DetailKamarAvail';
import BookingUser from './pages/Booking/BookingUser';
import BrowseKamarGroup from './pages/BrowseKamar/BrowseKamarGroup';
import DetailKamarAvailGroup from './pages/BrowseKamar/DetailKamarAvailGroup';
import BookingGroup from './pages/Booking/BookingGroup';
import TabelBooking from './pages/Data/TabelBooking';
import TandaTerimaUser from './pages/Form/Detail/TandaTerimaUser';
import TandaTerima from './pages/Form/Detail/TandaTerima';
import TabelBookingFO from './pages/Data/TabelBookingFO';
import TabelCheckIn from './pages/Data/TabelCheckIn';
import DetailBooking from './pages/Form/Detail/DetailBooking';
import DetailCheckIn from './pages/Form/Detail/DetailCheckIn';
import LaporanDua from './pages/Laporan/LaporanAll';
import CetakLaporanDua from './pages/Laporan/CetakLaporanDua';
import CetakLaporanTiga from './pages/Laporan/CetakLaporanTiga';
import CetakLaporanSatu from './pages/Laporan/CetakLaporanSatu';
import CetakLaporanEmpat from './pages/Laporan/CetakLaporanEmpat';

function App() {
  const [loading, setLoading] = useState<boolean>(true);

  const preloader = document.getElementById('preloader');

  if (preloader) {
    setTimeout(() => {
      preloader.style.display = 'none';
      setLoading(false);
    }, 1000);
  }

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return loading ? (
    <p className=" text-center text-danger">Failed to lead app</p>
  ) : (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/browse-kamar" element={<BrowseKamar />} />
        <Route path="/browse-kamar/:id" element={<DetailKamarAvail />} />
        <Route element={<RequireAuth allowedRoles={[2001]} />}>
          <Route path="/user/profile" element={<UserProfile />} />
          <Route
            path="/user/booking-history/:id"
            element={<HistoryBookingUser />}
          />
          <Route
            path="/user/detail-history/:id"
            element={<DetailRiwayatUser />}
          />

          <Route
            path="/user/detail-invoice/:id"
            element={<DetailRiwayatUser />}
          />
          <Route path="/user/tanda-terima/:id" element={<TandaTerimaUser />} />
          <Route path="/booking" element={<BookingUser />} />
        </Route>
        //public routes //TODO add RequireAuth if user alr logged in
        <Route path="/auth/signin" element={<SignIn />} />
        <Route path="/auth/signup" element={<SignUp />} />
        <Route element={<RequireAuth allowedRoles={rolePegawai} />}>
          <Route element={<RequireAuth allowedRoles={[1001]} />}>
            <Route path="/forms/kamar" element={<FormKamar />} />
            <Route path="/forms/kamar/:id" element={<DetailKamar />} />
            <Route path="/forms/jenis-kamar" element={<FormJenisKamar />} />
            <Route
              path="/forms/jenis-kamar/:id"
              element={<DetailJenisKamar />}
            />
          </Route>
          <Route element={<RequireAuth allowedRoles={[1002]} />}>
            <Route path="/forms/season" element={<FormSeason />} />
            <Route path="/forms/season/:id" element={<DetailSeason />} />
            <Route path="/forms/fasilitas" element={<FormFasilitas />} />
            <Route path="/forms/fasilitas/:id" element={<DetailFasilitas />} />
            <Route path="/forms/tarif" element={<FormTarif />} />
            <Route path="/forms/tarif/:id" element={<DetailTarif />} />
            <Route path="/forms/customer" element={<FormCustomer />} />
            <Route path="/forms/customer/:id" element={<DetailCustomer />} />
          </Route>
          <Route path="/profile" element={<Profile />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/admin" element={<ECommerce />} />
        </Route>
        <Route element={<RequireAuth allowedRoles={rolePegawai} />}>
          <Route path="/tables" element={<TabelKamar />} />
          <Route element={<RequireAuth allowedRoles={[1001]} />}>
            <Route path="/data/kamar" element={<TabelKamar />} />
            <Route path="/data/jenis-kamar" element={<TabelJenisKamar />} />
          </Route>
          <Route
            element={
              <RequireAuth allowedRoles={[1001, 1002, 1003, 1004, 1005]} />
            }
          >
            <Route path="/data/season" element={<TabelSeason />} />
            <Route path="/data/fasilitas" element={<TabelFasilitas />} />
            <Route path="/data/customer" element={<TabelCustomer />} />
            <Route path="/data/booking" element={<TabelBooking />} />
            <Route path="/data/tarif" element={<TabelTarif />} />
            <Route
              path="/data/user/:id/booking-history"
              element={<HistoryBooking />}
            />
            <Route
              path="/data/user/detail-history/:id"
              element={<DetailRiwayat />}
            />

            <Route
              path="/data/user/tanda-terima/:id"
              element={<TandaTerima />}
            />
            <Route
              path="/booking/group/browse"
              element={<BrowseKamarGroup />}
            />
            <Route
              path="/booking/group/detail/:id"
              element={<DetailKamarAvailGroup />}
            />
            <Route path="/booking/group" element={<BookingGroup />} />
          </Route>
          <Route
            element={
              <RequireAuth allowedRoles={[1001, 1002, 1003, 1004, 1005]} />
            }
          >
            <Route path="/fo/booking" element={<TabelBookingFO />} />
            <Route path="/fo/list/check-in" element={<TabelCheckIn />} />
            <Route
              path="/fo/user/detail-booking/:id"
              element={<DetailBooking />}
            />
            <Route
              path="/fo/user/detail-booking/check-in/:id"
              element={<DetailCheckIn />}
            />
          </Route>

          <Route
            element={
              <RequireAuth allowedRoles={[1001, 1002, 1003, 1004, 1005]} />
            }
          >
            <Route path="/laporan/all" element={<LaporanDua />} />

            <Route
              path="/laporan/customer-baru/print/:tahun"
              element={<CetakLaporanSatu />}
            />
            <Route
              path="/laporan/pendapatan-bulanan/print/:tahun"
              element={<CetakLaporanDua />}
            />
            <Route
              path="/laporan/jumlah-tamu/print/:tahun/:bulan"
              element={<CetakLaporanTiga />}
            />

            <Route
              path="/laporan/top-customer/print/:tahun"
              element={<CetakLaporanEmpat />}
            />
          </Route>

          <Route path="/settings" element={<Settings />} />
          {/* <Route path="/chart" element={<Chart />} /> */}
          <Route path="/ui/alerts" element={<Alerts />} />
          <Route path="/ui/buttons" element={<Buttons />} />
        </Route>
        <Route
          path="/*"
          element={
            <section className="bg-white dark:bg-gray-900">
              <div className="mx-auto max-w-screen-xl px-4 py-8 lg:px-6 lg:py-16">
                <div className="mx-auto max-w-screen-sm text-center">
                  <h1 className="mb-4 text-7xl font-extrabold tracking-tight text-primary-600 dark:text-primary-500 lg:text-9xl">
                    404
                  </h1>
                  <p className="mb-4 text-3xl font-bold tracking-tight text-gray-900 dark:text-white md:text-4xl">
                    Something's missing.
                  </p>
                  <p className="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">
                    Sorry, we can't find that page. You'll find lots to explore
                    on the home page.{' '}
                  </p>
                  <a
                    href="/"
                    className="my-4 inline-flex rounded-lg bg-primary-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900"
                  >
                    Back to Homepage
                  </a>
                </div>
              </div>
            </section>
          }
        />
        <Route
          path="/error/forbidden"
          element={
            <section className="bg-white dark:bg-gray-900">
              <div className="mx-auto max-w-screen-xl px-4 py-8 lg:px-6 lg:py-16">
                <div className="mx-auto max-w-screen-sm text-center">
                  <h1 className="mb-4 text-7xl font-extrabold tracking-tight text-primary-600 dark:text-primary-500 lg:text-9xl">
                    404
                  </h1>
                  <p className="mb-4 text-3xl font-bold tracking-tight text-gray-900 dark:text-white md:text-4xl">
                    Something's missing.
                  </p>
                  <p className="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">
                    Sorry, we can't find that page. You'll find lots to explore
                    on the home page.{' '}
                  </p>
                  <a
                    href="#"
                    className="my-4 inline-flex rounded-lg bg-primary-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900"
                  >
                    Back to Homepage
                  </a>
                </div>
              </div>
            </section>
          }
        />
      </Routes>
    </>
  );
}

export default App;
