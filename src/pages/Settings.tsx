import React from 'react';
import Breadcrumb from '../components/Breadcrumb';
import userThree from '../images/user/user-03.png';
import { Button, Input } from '@nextui-org/react';
import DefaultLayout from '../layout/DefaultLayout';
import Icon from '@mdi/react';
import { mdiEye, mdiEyeOff } from '@mdi/js';
import useAuth from 'src/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { updatePassword } from 'src/hooks/auth/authController';
import toast, { Toaster } from 'react-hot-toast';

interface DataPassword {
  oldPassword: string;
  newPassword: string;
}

const Settings = () => {
  const { auth } = useAuth();
  const navigate = useNavigate();

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
    setDataPassword((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    console.log(dataPassword);

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
      }
    );
    // updateJenisKamar(
    //   id || '1',
    //   dataJenisKamar.jenis_kamar || '0',
    //   dataJenisKamar.jenis_bed || '0',
    //   dataJenisKamar.jumlah_kasur || '0',
    //   auth.token,
    //   (data, error) => {
    //     if (error) {
    //       setError(error);
    //     } else {
    //       toast.success('Berhasil mengupdate kamar');
    //     }
    //   }
    // );
  };

  return (
    <DefaultLayout>
      <div className="mx-auto max-w-270">
        <Breadcrumb pageName="Ubah Password" />
        <Toaster />
        <div className="grid grid-cols-5 gap-8">
          <div className="col-span-5 xl:col-span-3">
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke px-7 py-4 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                  Data User
                </h3>
              </div>
              <div className="p-7">
                <form onSubmit={handleSubmit}>
                  <div className="mb-5.5">
                    <Input
                      label="Password Lama"
                      variant="bordered"
                      value={dataPassword.oldPassword}
                      onValueChange={(value) =>
                        handleChange('oldPassword', value)
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
                  </div>
                  <div className="mb-5.5">
                    <Input
                      label="Password Baru"
                      variant="bordered"
                      placeholder="Masukkan Password Baru"
                      value={dataPassword.newPassword}
                      onValueChange={(value) =>
                        handleChange('newPassword', value)
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

                  <div className="flex justify-end gap-4.5">
                    <button className="flex  justify-center rounded-lg bg-primary p-3 font-medium text-white                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      ">
                      Ubah Pasword
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default Settings;
