import React, { useEffect, useMemo, useState } from 'react';
import Breadcrumb from '../components/Breadcrumb';
import CoverOne from '../images/cover/cover-01.png';
import userSix from '../images/user/user-06.png';
import DefaultLayout from '../layout/DefaultLayout';
import MainLayout from 'src/layout/MainLayout';

import { mdiCamera, mdiEye, mdiEyeOff } from '@mdi/js';
import Icon from '@mdi/react';

import { useQuery, useMutation } from '@tanstack/react-query';

import AuthContext from 'Contexts/AuthProvider';
import { Button, Divider, Input } from '@nextui-org/react';
import { getCurrentUser } from 'src/hooks/sampleData';
import {
  getCurrentCustomer,
  updateCustomer,
} from 'src/hooks/customer/customerController';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import useAuth from 'src/hooks/useAuth';
import { updatePassword } from 'src/hooks/auth/authController';

interface DataPassword {
  oldPassword: string;
  newPassword: string;
}

const UserProfile = () => {
  const [users, setUsers] = useState();
  const navigate = useNavigate();
  const { auth } = useAuth();
  const [data, setData] = useState<DataCustomerDetail>({
    id_customer: '',
    id_akun: '',
    jenis_customer: '',
    nama: '',
    nomor_identitas: '',
    nomor_telepon: '',
    email: '',
    alamat: '',
    tanggal_dibuat: '',
    nama_institusi: '',
  });

  const [isVisible, setIsVisible] = React.useState(false);
  const [isVisibleNew, setIsVisibleNew] = React.useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);
  const toggleVisibilityNew = () => setIsVisibleNew(!isVisibleNew);

  const [dataPassword, setDataPassword] = React.useState<DataPassword>({
    oldPassword: '',
    newPassword: '',
  });

  const handleChange = (key: any, value: any) => {
    console.log(key, value);
    setData((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  };
  const handleChangePassword = (key: any, value: any) => {
    console.log(key, value);
    setDataPassword((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  };

  const handleUpdate = async () => {
    updateCustomer(data, auth.token, (data, error) => {
      if (error) {
        toast.error('Gagal Update Customer (' + error + ')');
      } else {
        toast.success('Berhasil mengupdate customer');
      }
    });
  };
  const handleUpdatePassword = async () => {
    updatePassword(
      dataPassword.oldPassword,
      dataPassword.newPassword,
      auth.token,
      (data, error) => {
        if (error) {
          toast.error('Gagal Update Password (' + error + ')');
        } else {
          toast.success('Berhasil mengupdate password');
        }
        setDataPassword({
          oldPassword: '',
          newPassword: '',
        });
      }
    );
  };

  const { status: statusCustomer, data: dataCustomer } = useQuery(
    ['detailCustomer'],
    () => getCurrentCustomer(auth.token),
    {
      keepPreviousData: true,
    }
  );

  useEffect(() => {
    if (statusCustomer === 'success' && dataCustomer) {
      setData({
        id_customer: dataCustomer.data.id_customer.toString(),
        id_akun: dataCustomer.data.id_akun.toString(),
        jenis_customer: dataCustomer.data.jenis_customer,
        nama: dataCustomer.data.nama,
        nomor_identitas: dataCustomer.data.nomor_identitas,
        nomor_telepon: dataCustomer.data.nomor_telepon,
        email: dataCustomer.data.email,
        alamat: dataCustomer.data.alamat,
        tanggal_dibuat: dataCustomer.data.tanggal_dibuat,
        nama_institusi: dataCustomer.data.nama_institusi || '',
      });
    }

    if (statusCustomer === 'error') {
      toast.error('Data Customer tidak ditemukan');
      navigate('/auth/signin');
    }
  }, [statusCustomer, dataCustomer]);

  const validateNomor = (value: string) => value.match(/^\d+$/);

  const validNomorTelepon = useMemo(() => {
    if (data.nomor_telepon === '') return false;
    return validateNomor(data.nomor_telepon) ? false : true;
  }, [data.nomor_telepon]);
  const validNomorIdentitas = useMemo(() => {
    if (data.nomor_identitas === '') return false;
    return validateNomor(data.nomor_identitas) ? false : true;
  }, [data.nomor_identitas]);

  return (
    <MainLayout>
      <section>
        <Toaster />
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className=" border-gray-800  ">
            <div className="mx-auto max-w-6xl px-4 sm:px-6">
              <div className=" rounded-sm border border-stroke bg-white px-4 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-6">
                <div className="px-4 py-5  lg:pb-8 xl:pb-11.5">
                  <div className="relative  h-30 w-full max-w-30 rounded-full bg-white/20 p-1 backdrop-blur sm:h-44 sm:max-w-44 sm:p-3">
                    <div className="relative drop-shadow-2">
                      <img src={userSix} alt="profile" />
                      <label
                        htmlFor="profile"
                        className="absolute bottom-0 right-0 flex h-8.5 w-8.5 cursor-pointer items-center justify-center rounded-full bg-primary text-white hover:bg-opacity-90 sm:bottom-2 sm:right-2"
                      >
                        <Icon path={mdiCamera} size={0.7} />
                        <input
                          type="file"
                          name="profile"
                          id="profile"
                          className="sr-only"
                        />
                      </label>
                    </div>
                  </div>
                  <div className="mt-4">
                    <h3 className="my-4 text-2xl font-semibold text-black dark:text-white">
                      Profil Customer
                    </h3>
                    <div className="mt-3 flex w-full flex-wrap justify-start gap-4 md:flex-nowrap">
                      <Input
                        isRequired
                        type="text"
                        label="Nama"
                        value={data.nama}
                        onValueChange={(value) => handleChange('nama', value)}
                        placeholder="Masukkan Nama"
                      />
                      <Input
                        isRequired
                        type="text"
                        label="Nomor Identitas"
                        value={data.nomor_identitas}
                        isInvalid={validNomorIdentitas}
                        errorMessage={
                          validNomorIdentitas && 'Masukkan input yang valid'
                        }
                        onValueChange={(value) =>
                          handleChange('nomor_identitas', value)
                        }
                        placeholder="Masukkan Nomor Identitas"
                      />
                    </div>
                    <div className="mt-3 flex w-full flex-wrap justify-start gap-4 md:flex-nowrap">
                      <Input
                        isRequired
                        type="text"
                        label="Nomor Telepon"
                        value={data.nomor_telepon}
                        isInvalid={validNomorTelepon}
                        errorMessage={
                          validNomorTelepon && 'Masukkan input yang valid'
                        }
                        onValueChange={(value) =>
                          handleChange('nomor_telepon', value)
                        }
                        placeholder="Masukkan Nomor Telepon"
                      />
                      <Input
                        isRequired
                        type="email"
                        label="Email"
                        value={data.email}
                        onValueChange={(value) => handleChange('email', value)}
                        placeholder="Masukkan email"
                      />
                    </div>
                    <div className="mt-3 flex w-full flex-wrap justify-start gap-4 md:flex-nowrap">
                      <Input
                        isRequired
                        type="text"
                        label="Alamat"
                        value={data.alamat}
                        onValueChange={(value) => handleChange('alamat', value)}
                        placeholder="Masukkan Alamat"
                      />
                      <Input
                        isRequired
                        type="text"
                        label="Nama Institusi"
                        value={data.nama_institusi}
                        onValueChange={(value) =>
                          handleChange('nama_institusi', value)
                        }
                        placeholder="Masukkan Nama Institusi"
                      />
                    </div>
                    <div className="mt-5 flex w-full flex-wrap justify-end gap-4 md:flex-nowrap">
                      <Button color="primary" onClick={handleUpdate}>
                        Edit Profile
                      </Button>
                    </div>
                    <Divider className="my-4" />
                    <h3 className="my-4 text-2xl font-semibold text-black dark:text-white">
                      Ubah Password
                    </h3>
                    <div className="mt-3 flex w-full flex-wrap justify-start gap-4 md:flex-nowrap">
                      <Input
                        label="Password Lama"
                        variant="bordered"
                        value={dataPassword.oldPassword}
                        onValueChange={(value) =>
                          handleChangePassword('oldPassword', value)
                        }
                        placeholder="Masukkan Password Lama"
                        endContent={
                          <button
                            className="focus:outline-none"
                            type="button"
                            onClick={toggleVisibility}
                          >
                            {isVisible ? (
                              <Icon
                                className="pointer-events-none text-2xl text-default-400"
                                path={mdiEyeOff}
                                size={1}
                              />
                            ) : (
                              <Icon
                                className="pointer-events-none text-2xl text-default-400"
                                path={mdiEye}
                                size={1}
                              />
                            )}
                          </button>
                        }
                        type={isVisible ? 'text' : 'password'}
                      />
                      <Input
                        label="Password Baru"
                        variant="bordered"
                        placeholder="Masukkan Password Baru"
                        value={dataPassword.newPassword}
                        onValueChange={(value) =>
                          handleChangePassword('newPassword', value)
                        }
                        endContent={
                          <button
                            className="focus:outline-none"
                            type="button"
                            onClick={toggleVisibilityNew}
                          >
                            {isVisibleNew ? (
                              <Icon
                                className="pointer-events-none text-2xl text-default-400"
                                path={mdiEyeOff}
                                size={1}
                              />
                            ) : (
                              <Icon
                                className="pointer-events-none text-2xl text-default-400"
                                path={mdiEye}
                                size={1}
                              />
                            )}
                          </button>
                        }
                        type={isVisibleNew ? 'text' : 'password'}
                      />
                    </div>
                    <div className="mt-5 flex w-full flex-wrap justify-end gap-4 md:flex-nowrap">
                      <Button color="primary" onClick={handleUpdatePassword}>
                        Ubah Password
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default UserProfile;
