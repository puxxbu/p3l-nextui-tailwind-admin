import Breadcrumb from '../../components/Breadcrumb';
import TableOne from '../../components/Table/TableOne';
import TableThree from '../../components/Table/TableThree';
import TableTwo from '../../components/Table/TableTwo';
import DefaultLayout from '../../layout/DefaultLayout';
import { DataTable, FetchAllBooking, FetchCustomerTable, FetchKamarTable } from 'Components';
import { Button } from '@nextui-org/react';
const TabelBooking = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Data Customer" />

      <div className="flex flex-col gap-10">
        <FetchAllBooking />
      </div>
    </DefaultLayout>
  );
};

export default TabelBooking;
