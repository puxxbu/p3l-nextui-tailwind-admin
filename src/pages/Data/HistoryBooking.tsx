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
const HistoryBooking = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Booking History" />
      <div className="flex flex-col gap-10">
        <FetchHistoryBooking />
      </div>
    </DefaultLayout>
  );
};

export default HistoryBooking;
