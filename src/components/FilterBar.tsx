import React, { useState } from 'react';
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
  Input,
} from '@nextui-org/react';
import DarkModeSwitcher from './DarkModeSwitcher';
import useAuth from 'src/hooks/useAuth';
import DropdownUser from './DropdownUser';
import DropdownCustomer from './DropdownCustomer';
import Datepicker from 'react-tailwindcss-datepicker';
import Icon from '@mdi/react';
import { mdiMagnify } from '@mdi/js';

interface DatepickerProps {
  startDate: any;
  endDate: any;
}

interface DataSeason {
  nama_season: string;
  tanggal_mulai: string;
  tanggal_selesai: string;
}

const FilterBar = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const { auth } = useAuth();

  const [value, setValue] = useState<DatepickerProps>({
    startDate: null,
    endDate: null,
  });

  const menuItems = [
    'Profile',
    'Dashboard',
    'Activity',
    'Analytics',
    'System',
    'Deployments',
    'My Settings',
    'Team Settings',
    'Help & Feedback',
    'Log Out',
  ];

  const today = new Date();
  const twoMonthsLater = new Date(
    today.getFullYear(),
    today.getMonth() + 2,
    today.getDate()
  );

  const handleValueChange = (newValue: any) => {
    console.log('newValue:', newValue);
    setValue(newValue);
    handleChange('tanggal_mulai', newValue.startDate);
    handleChange('tanggal_selesai', newValue.endDate);
  };

  const [data, setData] = useState<DataSeason>({
    nama_season: '',
    tanggal_mulai: '',
    tanggal_selesai: '',
  });

  const handleChange = (key: any, value: any) => {
    console.log(key, value);
    setData((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  };

  return (
    <Navbar position="sticky" onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          className="sm:hidden"
        />
        <NavbarBrand>
          <Datepicker
            classNames={{
              input: () =>
                'relative bg-slate-50 transition-all duration-300 py-2.5 pl-4 pr-14 w-full border-gray-300 dark:bg-slate-800 dark:text-white/80 dark:border-slate-600 rounded-lg tracking-wide font-light text-sm placeholder-gray-400 bg-white focus:ring disabled:opacity-40 disabled:cursor-not-allowed focus:border-blue-500 focus:ring-blue-500/20',
            }}
            disabledDates={[
              {
                startDate: '2000-02-02',
                endDate: twoMonthsLater,
              },
            ]}
            value={value}
            onChange={handleValueChange}
          />
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent justify="end">
        <Input
          classNames={{
            base: 'max-w-full sm:max-w-[20rem] h-10',
            mainWrapper: 'h-full',
            input: 'text-small',
            inputWrapper:
              'h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20',
          }}
          placeholder="Type to search..."
          size="sm"
          startContent={<Icon path={mdiMagnify} size={1} />}
          type="search"
        />
      </NavbarContent>
    </Navbar>
  );
};

export default FilterBar;
