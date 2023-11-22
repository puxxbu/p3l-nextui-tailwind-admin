import React, { useEffect } from 'react';
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
import { useNavigate } from 'react-router-dom';

const TopNavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const navigate = useNavigate();

  const adminRoles = [1001,1002,1003,1004];

  const { auth } = useAuth();

 useEffect(() => {
  if(adminRoles.includes(auth.role.id_role)){
    navigate('/admin');
  }
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

  return (
    <Navbar position="sticky" onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          className="sm:hidden"
        />
        <NavbarBrand>
          
          <button onClick={() => navigate('/')}>
            <img
            src="https://cdn.discordapp.com/attachments/170900821200994304/1173526610239029279/3_2--removebg-preview.png?ex=656446d2&is=6551d1d2&hm=d0bb91fb104875c9f3e2eba1e80d298d243759f869acb3c1d3e710f78b950f06&"
            alt="Logo Hotel"
            className="h-auto w-32"
          />
          </button>
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
