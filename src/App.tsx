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
        <Route path="/admin" element={<ECommerce />} />
        //public routes //TODO add RequireAuth if user alr logged in
        <Route path="/auth/signin" element={<SignIn />} />
        <Route path="/auth/signup" element={<SignUp />} />
        <Route element={<RequireAuth allowedRoles={rolePegawai} />}>
          <Route path="/profile" element={<Profile />} />
        </Route>
        <Route element={<RequireAuth allowedRoles={rolePegawai} />}>
          <Route path="/calendar" element={<Calendar />} />
        </Route>
        <Route path="/forms/form-elements" element={<FormElements />} />
        <Route path="/forms/form-layout" element={<FormLayout />} />
        <Route element={<RequireAuth allowedRoles={rolePegawai} />}>
          <Route path="/forms/kamar" element={<FormKamar />} />
          <Route path="/forms/kamar/:id" element={<DetailKamar />} />
          <Route path="/forms/jenis-kamar" element={<FormJenisKamar />} />
          <Route path="/forms/jenis-kamar/:id" element={<DetailJenisKamar />} />
        </Route>
        <Route path="/tables" element={<TabelKamar />} />
        <Route element={<RequireAuth allowedRoles={rolePegawai} />}>
          <Route path="/data/kamar" element={<TabelKamar />} />
          <Route path="/data/jenis-kamar" element={<TabelJenisKamar />} />
          <Route path="/data/season" element={<FormKamar />} />
          <Route path="/data/fasilitas" element={<FormKamar />} />
          <Route path="/data/tarif" element={<FormKamar />} />
        </Route>
        <Route path="/settings" element={<Settings />} />
        <Route path="/chart" element={<Chart />} />
        <Route path="/ui/alerts" element={<Alerts />} />
        <Route path="/ui/buttons" element={<Buttons />} />
        <Route path="/*" element={<div> Not Found</div>} />
      </Routes>
    </>
  );
}

export default App;
