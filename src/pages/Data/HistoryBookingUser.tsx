import Breadcrumb from '../../components/Breadcrumb';
import TableOne from '../../components/Table/TableOne';
import TableThree from '../../components/Table/TableThree';
import TableTwo from '../../components/Table/TableTwo';
import DefaultLayout from '../../layout/DefaultLayout';
import {
  DataTable,
  FetchCustomerTable,
  FetchHistoryBooking,
  FetchKamarTable,
} from 'Components';
import { Button } from '@nextui-org/react';
import MainLayout from 'src/layout/MainLayout';
const HistoryBookingUser = () => {
  return (
    <MainLayout>
      <Breadcrumb pageName="Booking History" />
      <div className="flex flex-col gap-10">
        <FetchHistoryBooking />
      </div>
    </MainLayout>
  );
};

export default HistoryBookingUser;
