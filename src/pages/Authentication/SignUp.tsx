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
  username?: string | null;
  email?: string | null;
  password?: string | null;
  confirmPassword?: string | null;
}

const SignUp = () => {
  const [data, setData] = React.useState<DataRegister>({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [errData, setErrData] = React.useState<DataRegister>({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [error, setError] = React.useState('');

  const [loading, setLoading] = React.useState(false);

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

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

    registerUser(
      data.username || '',
      data.password || '',
      data.email || '',
      (data, error) => {
        if (error) {
          console.log('Error:', error);
          setError(error);
          setLoading(false);
          onOpen();
        } else {
          setLoading(false);
          console.log('Registration successful. Data:', data);
        }
      }
    );
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
            {/* <Button onPress={onOpen} className="max-w-fit">
              Open Modal
            </Button> */}
            <p className="2xl:px-20">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit
              suspendisse.
            </p>

            <span className="mt-15 inline-block">
              <img src={SigninLogo} alt="Logo" />
            </span>
          </div>
        </div>

        <div className="w-full border-stroke dark:border-strokedark xl:w-1/2 xl:border-l-2">
          <div className="w-full p-4 sm:p-12.5 xl:p-17.5">
            <span className="mb-1.5 block font-medium">Start for free</span>
            <h2 className="mb-9 text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
              Sign Up to TailAdmin
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
                    <Icon path={mdiAccount} size={1} />
                  </span>
                </div>
              </div>

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

              <div className="mb-4">
                <div className="relative">
                  <Input
                    size="lg"
                    value={data.password || ''}
                    type="password"
                    label="Password"
                    variant="bordered"
                    color={validationState === 'invalid' ? 'danger' : undefined}
                    errorMessage={
                      validationState === 'invalid' &&
                      'Please enter a valid email'
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

              <div className="mb-6">
                <div className="relative">
                  <Input
                    size="lg"
                    value={data.confirmPassword || ''}
                    type="password"
                    label="Confirm Password"
                    variant="bordered"
                    color={validationState === 'invalid' ? 'danger' : undefined}
                    errorMessage={
                      validationState === 'invalid' &&
                      'Please enter a valid email'
                    }
                    validationState={validationState}
                    onValueChange={handleConfirmPasswordChange}
                    className="w-full "
                  />

                  <span className="absolute right-4 top-5">
                    <Icon path={mdiLockCheck} size={1} />
                  </span>
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
