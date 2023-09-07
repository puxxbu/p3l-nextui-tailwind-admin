import { Link } from 'react-router-dom';

import LogoDark from 'Images/logo/logo-dark.svg';
import Logo from 'Images/logo/logo.svg';
import SigninLogo from 'Images/auth/welcome-signin.svg';
import Icon from '@mdi/react';
import { mdiEmailOutline, mdiLock } from '@mdi/js';

import { Input, useDisclosure, Button } from '@nextui-org/react';
import React from 'react';

import { registerUser } from 'Hooks/sampleData';
import { MyModal } from 'Components';

interface DataLogin {
  username?: string | null;
  email?: string | null;
  password?: string | null;
}
const SignIn = () => {
  const [data, setData] = React.useState<DataLogin>({
    username: '',
    email: '',
    password: '',
  });

  const [errData, setErrData] = React.useState<DataLogin>({
    username: '',
    email: '',
    password: '',
  });

  const [error, setError] = React.useState('');

  const [loading, setLoading] = React.useState(false);

  // const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const validateEmail = (value: string) =>
    value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);

  const validationState = React.useMemo(() => {
    if (data.email === '') return undefined;

    return validateEmail(data.email || '') ? 'valid' : 'invalid';
  }, [data.email]);

  const handleChange = (key: any, value: any) => {
    setData((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  };

  const handleEmailChange = (value: string) => {
    handleChange('email', value);
  };

  return (
    <div className="h-screen rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark  dark:bg-boxdark ">
      <div className="flex h-screen flex-wrap items-center  ">
        <div className="hidden w-full xl:block xl:w-1/2">
          <div className="px-26 py-17.5 text-center">
            <Link className="mb-5.5 inline-block" to="/">
              <img className="hidden dark:block" src={Logo} alt="Logo" />
              <img className="dark:hidden" src={LogoDark} alt="Logo" />
            </Link>

            <p className="2xl:px-20">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit
              suspendisse.
            </p>

            <span className="mt-15 inline-block">
              <img src={SigninLogo} alt="Logo" />
            </span>
          </div>
        </div>

        <div className="w-full max-w-screen-lg border-stroke dark:border-strokedark xl:w-1/2 xl:border-l-2">
          <div className="w-full p-4 sm:p-12.5 xl:p-17.5">
            <span className="mb-1.5 block font-medium">Start for free</span>
            <h2 className="mb-9 text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
              Sign In to TailAdmin
            </h2>

            <form>
              <div className="mb-4">
                <div className="relative">
                  <Input
                    size="lg"
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

              <div className="mb-6">
                <label className="mb-2.5 block font-medium text-black dark:text-white">
                  Re-type Password
                </label>
                <div className="relative">
                  <input
                    type="password"
                    placeholder="6+ Characters, 1 Capital letter"
                    className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />

                  <span className="absolute right-4 top-4">
                    <Icon path={mdiLock} size={1} />
                  </span>
                </div>
              </div>

              <div className="mb-5">
                <input
                  type="submit"
                  value="Sign In"
                  className="w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90"
                />
              </div>

              {/* <button className="flex w-full items-center justify-center gap-3.5 rounded-lg border border-stroke bg-gray p-4 hover:bg-opacity-50 dark:border-strokedark dark:bg-meta-4 dark:hover:bg-opacity-50">
                <span></span>
                Sign in with Google
              </button> */}

              <div className="mt-6 text-center">
                <p>
                  Don’t have any account?{' '}
                  <Link to="/auth/signup" className="text-primary">
                    Sign Up
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

export default SignIn;
