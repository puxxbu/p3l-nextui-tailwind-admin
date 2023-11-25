import Breadcrumb from '../../components/Breadcrumb';
import TableOne from '../../components/Table/TableOne';
import TableThree from '../../components/Table/TableThree';
import TableTwo from '../../components/Table/TableTwo';
import DefaultLayout from '../../layout/DefaultLayout';
import {
  DataTable,
  FetchAllBooking,
  FetchCustomerTable,
  FetchKamarTable,
} from 'Components';
import { Button } from '@nextui-org/react';
import ChartOne from 'src/components/Chart/ChartOne';
import ChartTwo from 'src/components/Chart/ChartLaporanDua';
import { useNavigate } from 'react-router-dom';
const LaporanDua = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Laporan Pendapatan Bulanan" />

      <div className="flex flex-col gap-10">
        <ChartTwo />
      </div>
    </DefaultLayout>
  );
};

export default LaporanDua;
