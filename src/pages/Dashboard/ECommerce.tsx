import CardFour from '../../components/Card/CardFour.tsx';
import CardOne from '../../components/Card/CardOne.tsx';
import CardThree from '../../components/Card/CardThree.tsx';
import CardTwo from '../../components/Card/CardTwo.tsx';
import ChartOne from '../../components/Chart/ChartOne.tsx';
import ChartThree from '../../components/Chart/ChartThree.tsx';
import ChartTwo from '../../components/Chart/ChartLaporanDua.tsx';
import ChatCard from '../../components/Chart/ChatCard.tsx';
import MapOne from '../../components/MapOne.tsx';
import TableOne from '../../components/Table/TableOne.tsx';
import DefaultLayout from '../../layout/DefaultLayout.tsx';

import MyModal from 'src/components/Modal.tsx';
import { useDisclosure } from '@nextui-org/react';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';

const ECommerce = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const location = useLocation();
  const message = location.state?.message || '';

  useEffect(() => {
    if (message !== '') onOpen();
  }, [message, onOpen]);

  return (
    <DefaultLayout>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        <CardOne />
        <CardTwo />
        <CardThree />
        <CardFour />
      </div>

      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        <ChartOne />
        <ChartTwo />
        <ChartThree />
        <MapOne />
        <div className="col-span-12 xl:col-span-8">
          <TableOne />
        </div>
        <ChatCard />
      </div>
    </DefaultLayout>
  );
};

export default ECommerce;
