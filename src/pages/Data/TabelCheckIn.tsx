import Breadcrumb from '../../components/Breadcrumb';
import TableOne from '../../components/Table/TableOne';
import TableThree from '../../components/Table/TableThree';
import TableTwo from '../../components/Table/TableTwo';
import DefaultLayout from '../../layout/DefaultLayout';
import { DataTable, FetchAllBooking, FetchCustomerTable, FetchDataCheckIn, FetchKamarTable } from 'Components';
import { Button } from '@nextui-org/react';
const TabelCheckIn = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="List Check-in" />

      <div className="flex flex-col gap-10">
        <FetchDataCheckIn />
      </div>
    </DefaultLayout>
  );
};

export default TabelCheckIn;
