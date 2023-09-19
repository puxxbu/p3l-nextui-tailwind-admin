import { ReactNode, useState } from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import { NextUIProvider } from '@nextui-org/react';
import TopNavBar from 'src/components/TopNavBar';
import PageIllustration from 'src/components/LandingPage/Page-Illustration';

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <NextUIProvider>
      <TopNavBar />
      <main className="grow overflow-hidden">
        <PageIllustration />
        {children}
      </main>
    </NextUIProvider>
  );
};

export default MainLayout;
