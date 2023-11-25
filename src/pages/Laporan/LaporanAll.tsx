import {
  default as ChartLaporanDua,
  default as ChartTwo,
} from 'src/components/Chart/ChartLaporanDua';
import ChartLaporanTiga from 'src/components/Chart/ChartLaporanTiga';
import DefaultLayout from '../../layout/DefaultLayout';
import ChartLaporanSatu from 'src/components/Chart/ChartLaporanSatu';
const LaporanAll = () => {
  return (
    <DefaultLayout>
      <div className="">
        <h2 className="text-title-md2 font-semibold text-black dark:text-white">
          Laporan Customer Baru
        </h2>
        <div className="flex flex-col gap-10">
          <ChartLaporanSatu />
        </div>
      </div>
      <div className="mt-8">
        <h2 className="text-title-md2 font-semibold text-black dark:text-white">
          Laporan Pendapatan Perbulan
        </h2>
        <div className="flex flex-col gap-10">
          <ChartLaporanDua />
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
