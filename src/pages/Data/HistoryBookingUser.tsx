import Breadcrumb from '../../components/Breadcrumb';
import TableOne from '../../components/Table/TableOne';
import TableThree from '../../components/Table/TableThree';
import TableTwo from '../../components/Table/TableTwo';
import DefaultLayout from '../../layout/DefaultLayout';
import {
  DataTable,
  FetchCustomerTable,
  FetchHistoryBooking,
  FetchHistoryBookingUser,
  FetchKamarTable,
} from 'Components';
import { Button } from '@nextui-org/react';
import MainLayout from 'src/layout/MainLayout';
const HistoryBookingUser = () => {
  return (
    <MainLayout>
      <section>
        <div className=" mx-auto mt-10 max-w-5xl justify-center ">
          <FetchHistoryBookingUser />
        </div>
      </section>
    </MainLayout>
  );
};

export default HistoryBookingUser;
