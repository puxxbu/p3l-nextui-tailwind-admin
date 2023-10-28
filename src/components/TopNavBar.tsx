import React from 'react';
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
} from '@nextui-org/react';
import DarkModeSwitcher from './DarkModeSwitcher';
import useAuth from 'src/hooks/useAuth';
import DropdownUser from './DropdownUser';
import DropdownCustomer from './DropdownCustomer';

const TopNavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const { auth } = useAuth();

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

  return (
    <Navbar position="sticky" onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          className="sm:hidden"
        />
        <NavbarBrand>
          <p className="font-bold text-inherit">Grand Atma Hotel</p>
        </NavbarBrand>
      </NavbarContent>

      {/* <NavbarContent className="hidden gap-4 sm:flex" justify="center">
        <NavbarItem>
          <Link color="foreground" href="#">
            Features
          </Link>
        </NavbarItem>
        <NavbarItem isActive>
          <Link href="#" aria-current="page">
            Customers
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#">
            Integrations
          </Link>
        </NavbarItem>
      </NavbarContent> */}
      <NavbarContent justify="end">
        <DarkModeSwitcher />

        {auth.token === undefined ? (
          <>
            <NavbarItem className="lg:flex">
              <Link className="font-bold" href="/auth/signin">
                Login
              </Link>
            </NavbarItem>
            <NavbarItem>
              <Button
                as={Link}
                color="primary"
                href="/auth/signup"
                variant="flat"
                className="font-bold"
              >
                Sign Up
              </Button>
            </NavbarItem>
          </>
        ) : (
          <>
            <DropdownCustomer />
            {/* <NavbarItem>
              <Button
                as={Link}
                color="danger"
                href="/auth/signin"
                variant="flat"
                className="font-bold text-red-500 "
              >
                Sign Out
              </Button>
            </NavbarItem> */}
          </>
        )}
      </NavbarContent>
      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              color={
                index === 2
                  ? 'primary'
                  : index === menuItems.length - 1
                  ? 'danger'
                  : 'foreground'
              }
              className="w-full"
              href="#"
              size="lg"
            >
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
};

export default TopNavBar;
