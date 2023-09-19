import { Link, useNavigate, useLocation } from 'react-router-dom';

import LogoDark from 'Images/logo/logo-dark.svg';
import Logo from 'Images/logo/logo.svg';
import SigninLogo from 'Images/auth/welcome-signin.svg';
import Icon from '@mdi/react';
import { mdiEmailOutline, mdiLock } from '@mdi/js';

import { Input, useDisclosure, Button } from '@nextui-org/react';
import React from 'react';

import { loginUser } from 'Hooks/sampleData';
import { MyModal } from 'Components';
import AuthContext from 'Contexts/AuthProvider';

interface DataLogin {
  username?: string | null;
  password?: string | null;
}
const SignIn = () => {
  const [data, setData] = React.useState<DataLogin>({
    username: '',
    password: '',
  });

  const [errData, setErrData] = React.useState<DataLogin>({
    username: '',
    password: '',
  });

  const { setAuth } = React.useContext(AuthContext);
  const { auth } = React.useContext(AuthContext);
  const [error, setError] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const validateUsername = (value: string) => value.length !== 0;

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from.pathname || '/';

  const validationState = React.useMemo(() => {
    if (data.username === '') return undefined;

    return validateUsername(data.username || '') ? 'valid' : 'invalid';
  }, [data.username]);

  const handleChange = (key: any, value: any) => {
    setData((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  };

  const handleUsernameChange = (value: string) => {
    handleChange('username', value);
  };

  const handlePasswordChange = (value: string) => {
    handleChange('password', value);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    console.log('Auth Context. Data:', auth);

    if (validationState === 'invalid') {
      setLoading(false);
      return;
    }

    loginUser(data.username || '', data.password || '', (data, error) => {
      if (error) {
        console.log('Error:', error);
        setError(error);
        setLoading(false);
        onOpen();
      } else {
        setLoading(false);
        setAuth(data?.data);
        localStorage.setItem('token', JSON.stringify(data?.data) || '');
        console.log('Auth Context. Data:', data);
        navigate(from, { replace: true });
        console.log(
          'Registration successful. Data:',
          JSON.stringify(data?.data)
        );
      }
    });
  };

  return (
    <div className="h-screen rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark  dark:bg-boxdark ">
      <MyModal
        isOpen={isOpen}
        onOpen={onOpen}
        onOpenChange={onOpenChange}
        text={error}
      />
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
              Sign In to
            </h2>

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <div className="relative">
                  <Input
                    size="lg"
                    value={data.username || ''}
                    type="username"
                    label="Username"
                    variant="bordered"
                    onValueChange={handleUsernameChange}
                    className="w-full "
                  />

                  <span className="absolute right-4 top-5">
                    <Icon path={mdiEmailOutline} size={1} />
                  </span>
                </div>
              </div>

              <div className="mb-6">
                <div className="relative">
                  <Input
                    size="lg"
                    value={data.password || ''}
                    type="password"
                    label="Password"
                    variant="bordered"
                    color={validationState === 'invalid' ? 'danger' : undefined}
                    errorMessage={
                      validationState === 'invalid' && 'Input masih kosong!'
                    }
                    validationState={validationState}
                    onValueChange={handlePasswordChange}
                    className="w-full "
                  />

                  <span className="absolute right-4 top-5">
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
