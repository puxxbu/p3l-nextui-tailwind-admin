import Breadcrumb from '../../components/Breadcrumb';
import TableOne from '../../components/Table/TableOne';
import TableThree from '../../components/Table/TableThree';
import TableTwo from '../../components/Table/TableTwo';
import DefaultLayout from '../../layout/DefaultLayout';
import { DataTable, FetchAllBooking, FetchCustomerTable, FetchKamarTable } from 'Components';
import { Button } from '@nextui-org/react';
const TabelBookingFO = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Data Booking" />

      <div className="flex flex-col gap-10">
        <FetchAllBooking />
      </div>
    </DefaultLayout>
  );
};

export default TabelBookingFO;
