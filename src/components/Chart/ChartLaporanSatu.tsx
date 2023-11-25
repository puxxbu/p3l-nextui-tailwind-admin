import { Button, Select, SelectItem, Selection } from '@nextui-org/react';
import { useQuery } from '@tanstack/react-query';
import { ApexOptions } from 'apexcharts';
import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import {
  fetchLaporanDua,
  fetchLaporanSatu,
} from 'src/hooks/laporan/laporanController';
import useAuth from 'src/hooks/useAuth';
import ChartLaporanDua from './ChartLaporanDua';
import { useNavigate } from 'react-router-dom';

const options: ApexOptions = {
  colors: ['#3C50E0', '#80CAEE', '#C71585'],
  chart: {
    fontFamily: 'Satoshi, sans-serif',
    type: 'bar',
    height: 350,
    stacked: false,
    toolbar: {
      show: false,
    },
    zoom: {
      enabled: false,
    },
  },

  responsive: [
    {
      breakpoint: 1536,
      options: {
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: '55%',
            endingShape: 'rounded',
          },
        },
      },
    },
  ],
  plotOptions: {
    bar: {
      horizontal: false,
      borderRadius: 0,
      columnWidth: '25%',
      borderRadiusApplication: 'end',
      borderRadiusWhenStacked: 'last',
    },
  },
  dataLabels: {
    enabled: false,
  },

  xaxis: {
    categories: [
      'Januari',
      'Februari',
      'Maret',
      'April',
      'Mei',
      'Juni',
      'Juli',
      'Agustus',
      'September',
      'Oktober',
      'November',
      'Desember',
    ],
  },
  legend: {
    position: 'top',
    horizontalAlign: 'left',
    fontFamily: 'Satoshi',
    fontWeight: 500,
    fontSize: '14px',

    markers: {
      radius: 99,
    },
  },
  fill: {
    opacity: 1,
  },
};

interface ChartTwoState {
  series: {
    name: string;
    data: number[];
  }[];
}

function convertToInt(data: any): number {
  const selectTahunArray = Array.from(data);
  const selectTahunInt = parseInt(selectTahunArray[0] as string);
  return selectTahunInt;
}

const ChartLaporanSatu: React.FC = () => {
  const { auth } = useAuth();
  const [selectTahun, setSelectTahun] = useState<Selection>(new Set(['2023']));
  const navigate = useNavigate();

  const { status, data, error, refetch, isLoading } = useQuery(
    ['laporanSatu', selectTahun], // Memasukkan filterValue sebagai bagian dari query key
    () => fetchLaporanSatu(convertToInt(selectTahun), auth.token),
    {
      keepPreviousData: true,
      staleTime: 5000,
    }
  );

  useEffect(() => {
    console.log(convertToInt(selectTahun));
    refetch();
  }, [selectTahun, refetch]);

  const [state, setState] = useState<ChartTwoState>({
    series: [
      {
        name: 'Customer Baru',
        data: [13, 23, 20, 8, 13, 27, 15],
      },
    ],
  });

  useEffect(() => {
    console.log(selectTahun);
    if (status === 'success' && data) {
      const dataPersonal: number[] = [];
      const dataGroup: number[] = [];
      const dataTotal: number[] = [];

      data.data.laporan.forEach((item) => {
        dataTotal.push(item.customer_baru);
      });

      setState({
        series: [
          {
            name: 'Customer Baru',
            data: dataTotal,
          },
        ],
      });
    }
  }, [data, refetch]);

  // useEffect(() => {

  // }, [selectTahun]);

  const handleTahun = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectTahun(new Set([e.target.value]));

    // handleChangeData('id_jenis_kamar', e.target.value);
  };

  return (
    <div>
      <div className="flex justify-end">
        <Button
          className="m-3"
          color="primary"
          onClick={() =>
            navigate(
              `/laporan/customer-baru/print/${convertToInt(selectTahun)}`
            )
          }
        >
          Cetak Laporan Satu
        </Button>
      </div>

      <div className="col-span-12 rounded-sm border border-stroke bg-white p-7.5 shadow-default dark:border-strokedark dark:bg-boxdark xl:col-span-4">
        <div className="mb-4 justify-between gap-4 sm:flex">
          <div>
            <h4 className="text-xl font-semibold text-black dark:text-white">
              Laporan Customer Baru
            </h4>
          </div>
          <div>
            <div className="relative z-20 inline-block">
              <Select
                variant="bordered"
                label="Tahun"
                placeholder="Pilih Range Tahun"
                selectedKeys={selectTahun}
                className="relative z-20 inline-flex w-50 py-1 pl-3 pr-8 text-sm font-medium outline-none"
                onChange={handleTahun}
              >
                <SelectItem key="2020" value="2020">
                  Tahun 2020
                </SelectItem>
                <SelectItem key="2021" value="2021">
                  Tahun 2021
                </SelectItem>
                <SelectItem key="2022" value="2022">
                  Tahun 2022
                </SelectItem>
                <SelectItem key="2023" value="2023">
                  Tahun 2023
                </SelectItem>
                <SelectItem key="2024" value="2024">
                  Tahun 2024
                </SelectItem>
                <SelectItem key="2025" value="2025">
                  Tahun 2025
                </SelectItem>
                <SelectItem key="2026" value="2026">
                  Tahun 2026
                </SelectItem>
              </Select>
            </div>
          </div>
        </div>

        <div>
          <div id="chartTwo" className="-mb-9 -ml-5">
            <ReactApexChart
              options={options}
              series={state.series}
              type="bar"
              height={350}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChartLaporanSatu;
