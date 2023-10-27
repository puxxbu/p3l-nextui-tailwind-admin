import { ReactNode, useState } from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import { NextUIProvider } from '@nextui-org/react';
import TopNavBar from 'src/components/TopNavBar';
import PageIllustration from 'src/components/LandingPage/Page-Illustration';
import { ThemeProvider } from '@material-tailwind/react';

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <NextUIProvider>
      <ThemeProvider>
        <div className="h-screen dark:bg-boxdark-2 dark:text-bodydark">
          <TopNavBar />
          <div className="grow overflow-hidden ">
            <PageIllustration />
            {children}
          </div>
        </div>
      </ThemeProvider>
    </NextUIProvider>
  );
};

export default MainLayout;
