import { Link } from 'react-router-dom';
import LogoDark from '../../images/logo/logo-dark.svg';
import Logo from '../../images/logo/logo.svg';
import SigninLogo from '../../images/auth/welcome-signin.svg';

import { Input, useDisclosure, Button } from '@nextui-org/react';
import React from 'react';

import { registerUser } from 'Hooks/sampleData';
import { MyModal } from 'Components';

import Icon from '@mdi/react';
import { mdiAccount, mdiEmailOutline, mdiLock, mdiLockCheck } from '@mdi/js';

interface DataRegister {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  nama: string;
  nomor_identitas: string;
  nomor_telepon: string;
  alamat: string;
}

const SignUp = () => {
  const [data, setData] = React.useState<DataRegister>({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    nama: '',
    nomor_identitas: '',
    nomor_telepon: '',
    alamat: '',
  });

  const [errData, setErrData] = React.useState<DataRegister>({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    nama: '',
    nomor_identitas: '',
    nomor_telepon: '',
    alamat: '',
  });

  const [error, setError] = React.useState('');
  const [modalTitle, setModalTitle] = React.useState('');

  const [loading, setLoading] = React.useState(false);

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const validateEmail = (value: string) =>
    value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);

  const validationState = React.useMemo(() => {
    if (data.email === '') return undefined;

    return validateEmail(data.email || '') ? 'valid' : 'invalid';
  }, [data.email]);

  const validateNomor = (value: string) => value.match(/^\d+$/);

  const validNomorTelepon = React.useMemo(() => {
    if (data.nomor_telepon === '') return false;
    return validateNomor(data.nomor_telepon || '') ? false : true;
  }, [data.nomor_telepon]);
  const validNomorIdentitas = React.useMemo(() => {
    if (data.nomor_identitas === '') return false;
    return validateNomor(data.nomor_identitas || '') ? false : true;
  }, [data.nomor_identitas]);
  const handleChange = (key: any, value: any) => {
    setData((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  };

  const handleEmailChange = (value: string) => {
    handleChange('email', value);
  };
  const handleUsernameChange = (value: string) => {
    handleChange('username', value);
  };

  const handlePasswordChange = (value: string) => {
    handleChange('password', value);
  };

  const handleConfirmPasswordChange = (value: string) => {
    handleChange('confirmPassword', value);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    if (validationState === 'invalid') {
      setLoading(false);
      return;
    }

    registerUser(data, (data, error) => {
      if (error) {
        console.log('Error:', error);
        setModalTitle('Error');
        setError(error);
        setLoading(false);
        onOpen();
      } else {
        setLoading(false);
        console.log('Registration successful. Data:', data);
      }
    });
  };

  return (
    <div className="h-screen  rounded-sm   bg-white  dark:border-strokedark  dark:bg-boxdark ">
      <MyModal
        isOpen={isOpen}
        onOpen={onOpen}
        onOpenChange={onOpenChange}
        title={modalTitle}
        content={error}
      />
      <div className="flex h-screen flex-wrap items-center  ">
        <div className="hidden w-full xl:block xl:w-1/2">
          <div className="px-26 py-17.5 text-center">
            {/* <Button onPress={onOpen} className="max-w-fit">
              Open Modal
            </Button> */}
            <h2 className="text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
              Selamat Datang di Grand Atma Hotel
            </h2>

            <span className="mt-15 inline-block">
              <img src={SigninLogo} alt="Logo" />
            </span>
          </div>
        </div>

        <div className="h-full w-full border-stroke dark:border-strokedark xl:w-1/2 xl:border-l-2">
          <div className="w-full p-4 sm:p-12.5 xl:p-17.5">
            <span className="mb-1.5 block font-medium">Grand Atma Hotel</span>
            <h2 className="mb-9 text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
              Daftar Akun
            </h2>

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <div className="relative">
                  <Input
                    isRequired
                    size="md"
                    value={data.username || ''}
                    type="username"
                    label="Username"
                    variant="bordered"
                    onValueChange={handleUsernameChange}
                    className="w-full "
                  />

                  <span className="absolute right-4 top-5">
                    <Icon path={mdiAccount} size={1} />
                  </span>
                </div>
              </div>

              <div className="mb-4">
                <div className="relative">
                  <Input
                    size="md"
                    value={data.email || ''}
                    type="email"
                    label="Email"
                    variant="bordered"
                    color={validationState === 'invalid' ? 'danger' : undefined}
                    errorMessage={
                      validationState === 'invalid' &&
                      'Please enter a valid email'
                    }
                    validationState={validationState}
                    onValueChange={handleEmailChange}
                    className="w-full "
                  />

                  <span className="absolute right-4 top-5">
                    <Icon path={mdiEmailOutline} size={1} />
                  </span>
                </div>
              </div>

              <div className="mb-4">
                <div className="relative">
                  <Input
                    size="md"
                    value={data.password || ''}
                    type="password"
                    label="Password"
                    variant="bordered"
                    onValueChange={handlePasswordChange}
                    className="w-full "
                  />

                  <span className="absolute right-4 top-5">
                    <Icon path={mdiLock} size={1} />
                  </span>
                </div>
              </div>

              {/* <div className="mb-6">
                <div className="relative">
                  <Input
                    size="md"
                    value={data.confirmPassword || ''}
                    type="password"
                    label="Confirm Password"
                    variant="bordered"
                    onValueChange={handleConfirmPasswordChange}
                    className="w-full "
                  />

                  <span className="absolute right-4 top-5">
                    <Icon path={mdiLockCheck} size={1} />
                  </span>
                </div>
              </div> */}
              <div className="mb-4">
                <div className="relative">
                  <Input
                    size="md"
                    value={data.nama || ''}
                    type="text"
                    label="Nama"
                    variant="bordered"
                    onValueChange={(value) => handleChange('nama', value)}
                    className="w-full "
                  />
                </div>
              </div>

              <div className="mb-4">
                <div className="relative">
                  <Input
                    isRequired
                    size="md"
                    value={data.nomor_identitas || ''}
                    type="text"
                    label="Nomor Identitas"
                    variant="bordered"
                    isInvalid={validNomorIdentitas}
                    errorMessage={
                      validNomorIdentitas && 'Masukkan input yang valid'
                    }
                    onValueChange={(value) =>
                      handleChange('nomor_identitas', value)
                    }
                    className="w-full "
                  />
                </div>
              </div>

              <div className="mb-4">
                <div className="relative">
                  <Input
                    isRequired
                    size="md"
                    value={data.nomor_telepon || ''}
                    type="text"
                    label="Nomor Telepon"
                    variant="bordered"
                    isInvalid={validNomorTelepon}
                    errorMessage={
                      validNomorTelepon && 'Masukkan input yang valid'
                    }
                    onValueChange={(value) =>
                      handleChange('nomor_telepon', value)
                    }
                    className="w-full "
                  />
                </div>
              </div>

              <div className="mb-6">
                <div className="relative">
                  <Input
                    isRequired
                    size="md"
                    value={data.alamat || ''}
                    type="text"
                    label="Alamat"
                    variant="bordered"
                    onValueChange={(value) => handleChange('alamat', value)}
                    className="w-full "
                  />
                </div>
              </div>

              <div className="mb-5">
                <input
                  type="submit"
                  value="Create account"
                  className={
                    `w-full rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90` +
                    `${loading ? ' cursor-not-allowed' : ' cursor-pointer'} `
                  }
                />
              </div>

              <div className="mt-6 text-center">
                <p>
                  Already have an account?{' '}
                  <Link to="/auth/signin" className="text-primary">
                    Sign in
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
