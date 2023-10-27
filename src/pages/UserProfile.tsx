import React, { useState } from 'react';
import Breadcrumb from '../components/Breadcrumb';
import CoverOne from '../images/cover/cover-01.png';
import userSix from '../images/user/user-06.png';
import DefaultLayout from '../layout/DefaultLayout';
import MainLayout from 'src/layout/MainLayout';

import { mdiCamera } from '@mdi/js';
import Icon from '@mdi/react';

import { useQuery, useMutation } from '@tanstack/react-query';

import AuthContext from 'Contexts/AuthProvider';
import { Divider, Input } from '@nextui-org/react';

const UserProfile = () => {
  const [users, setUsers] = useState();

  interface UserResponse {
    data: {
      username: string;
      name: string;
      role: {
        id: number;
        name: string;
      };
    };
  }

  // const userData = useQuery({
  //   queryKey: ['profile'],
  //   queryFn: () => fetchUsers(),
  //   keepPreviousData: true,
  //   staleTime: 5000,
  // });

  return (
    <MainLayout>
      <section>
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
                        type="email"
                        label="Email"
                        labelPlacement="outside"
                        placeholder="Email user"
                      />
                      <Input
                        type="email"
                        label="Email"
                        labelPlacement="outside"
                        placeholder="Email user"
                      />
                    </div>
                    <div className="mt-3 flex w-full flex-wrap justify-start gap-4 md:flex-nowrap">
                      <Input
                        type="email"
                        label="Email"
                        labelPlacement="outside"
                        placeholder="Email user"
                      />
                      <Input
                        type="email"
                        label="Email"
                        labelPlacement="outside"
                        placeholder="Email user"
                      />
                    </div>
                    <div className="mt-3 flex w-full flex-wrap justify-start gap-4 md:flex-nowrap">
                      <Input
                        type="email"
                        label="Email"
                        labelPlacement="outside"
                        placeholder="Email user"
                      />
                      <Input
                        type="email"
                        label="Email"
                        labelPlacement="outside"
                        placeholder="Email user"
                      />
                    </div>
                    <Divider className="my-4" />
                    <h3 className="my-4 text-2xl font-semibold text-black dark:text-white">
                      Ubah Password
                    </h3>
                    <div className="mt-3 flex w-full flex-wrap justify-start gap-4 md:flex-nowrap">
                      <Input
                        type="email"
                        label="Email"
                        labelPlacement="outside"
                        placeholder="Email user"
                      />
                      <Input
                        type="email"
                        label="Email"
                        labelPlacement="outside"
                        placeholder="Email user"
                      />
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
