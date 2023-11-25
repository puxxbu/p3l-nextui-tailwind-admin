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
import ChartLaporanTiga from 'src/components/Chart/ChartLaporanTiga';
const LaporanAll = () => {
  return (
    <DefaultLayout>
      <div className="">
        <h2 className="text-title-md2 font-semibold text-black dark:text-white">
          Laporan Customer Baru
        </h2>
        <div className="flex flex-col gap-10">
          <ChartTwo />
        </div>
      </div>
      <div className="mt-8">
        <h2 className="text-title-md2 font-semibold text-black dark:text-white">
          Laporan Pendapatan Perbulan
        </h2>
        <div className="flex flex-col gap-10">
          <ChartTwo />
        </div>
      </div>
      <div className="mt-8">
        <h2 className="text-title-md2 font-semibold text-black dark:text-white">
          Laporan Jumlah Tamu
        </h2>
        <div className="flex flex-col gap-10">
          <ChartLaporanTiga />
        </div>
      </div>
    </DefaultLayout>
  );
};

export default LaporanAll;
