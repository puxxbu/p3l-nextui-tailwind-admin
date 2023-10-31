import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';

import SignIn from './pages/Authentication/SignIn';
import SignUp from './pages/Authentication/SignUp';
import Calendar from './pages/Calendar';
import Chart from './pages/Chart';
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
        <Route element={<RequireAuth allowedRoles={[2001]} />}>
          <Route path="/user/profile" element={<UserProfile />} />
        </Route>
        //public routes //TODO add RequireAuth if user alr logged in
        <Route path="/auth/signin" element={<SignIn />} />
        <Route path="/auth/signup" element={<SignUp />} />
        <Route element={<RequireAuth allowedRoles={rolePegawai} />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/admin" element={<ECommerce />} />
          <Route path="/forms/form-elements" element={<FormElements />} />
          <Route path="/forms/form-layout" element={<FormLayout />} />
          <Route path="/forms/kamar" element={<FormKamar />} />
          <Route path="/forms/kamar/:id" element={<DetailKamar />} />
          <Route path="/forms/jenis-kamar" element={<FormJenisKamar />} />
          <Route path="/forms/jenis-kamar/:id" element={<DetailJenisKamar />} />
          <Route path="/forms/season" element={<FormSeason />} />
          <Route path="/forms/season/:id" element={<DetailSeason />} />
          <Route path="/forms/fasilitas" element={<FormFasilitas />} />
          <Route path="/forms/fasilitas/:id" element={<DetailFasilitas />} />
          <Route path="/forms/tarif" element={<FormTarif />} />
          <Route path="/forms/tarif/:id" element={<DetailTarif />} />
          <Route path="/forms/customer" element={<FormCustomer />} />
          <Route path="/forms/customer/:id" element={<DetailCustomer />} />
        </Route>
        <Route element={<RequireAuth allowedRoles={rolePegawai} />}>
          <Route path="/tables" element={<TabelKamar />} />
          <Route path="/data/kamar" element={<TabelKamar />} />
          <Route path="/data/jenis-kamar" element={<TabelJenisKamar />} />
          <Route path="/data/season" element={<TabelSeason />} />
          <Route path="/data/fasilitas" element={<TabelFasilitas />} />
          <Route path="/data/customer" element={<TabelCustomer />} />
          <Route path="/data/tarif" element={<TabelTarif />} />
          <Route
            path="/data/user/:id/booking-history"
            element={<HistoryBooking />}
          />

          <Route path="/settings" element={<Settings />} />
          <Route path="/chart" element={<Chart />} />
          <Route path="/ui/alerts" element={<Alerts />} />
          <Route path="/ui/buttons" element={<Buttons />} />
        </Route>
        <Route path="/*" element={<div> Not Found</div>} />
        <Route
          path="/error/forbidden"
          element={<div> Anda tidak memiliki akses kedalam sini</div>}
        />
      </Routes>
    </>
  );
}

export default App;
