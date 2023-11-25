import {
  Button,
  Select,
  SelectItem,
  SelectedItems,
  Selection,
} from '@nextui-org/react';
import { useQuery } from '@tanstack/react-query';
import { ApexOptions } from 'apexcharts';
import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { useNavigate } from 'react-router-dom';
import { fetchLaporanTiga } from 'src/hooks/laporan/laporanController';
import useAuth from 'src/hooks/useAuth';

const namaBulan = [
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
];

// const options: ApexOptions = {
//   colors: ['#3C50E0', '#80CAEE', '#C71585'],
//   chart: {
//     fontFamily: 'Satoshi, sans-serif',
//     type: 'bar',
//     height: 350,
//     stacked: false,
//     toolbar: {
//       show: false,
//     },
//     zoom: {
//       enabled: false,
//     },
//   },

//   responsive: [
//     {
//       breakpoint: 1536,
//       options: {
//         plotOptions: {
//           bar: {
//             horizontal: false,
//             columnWidth: '55%',
//             endingShape: 'rounded',
//           },
//         },
//       },
//     },
//   ],
//   plotOptions: {
//     bar: {
//       horizontal: false,
//       borderRadius: 0,
//       columnWidth: '25%',
//       borderRadiusApplication: 'end',
//       borderRadiusWhenStacked: 'last',
//     },
//   },
//   dataLabels: {
//     enabled: false,
//   },

//   xaxis: {
//     categories: [
//       'Januari',
//       'Februari',
//       'Maret',
//       'April',
//       'Mei',
//       'Juni',
//       'Juli',
//       'Agustus',
//       'September',
//       'Oktober',
//       'November',
//       'Desember',
//     ],
//   },
//   legend: {
//     position: 'top',
//     horizontalAlign: 'left',
//     fontFamily: 'Satoshi',
//     fontWeight: 500,
//     fontSize: '14px',

//     markers: {
//       radius: 99,
//     },
//   },
//   fill: {
//     opacity: 1,
//   },
// };

interface ChartTwoState {
  series: {
    name: string;
    data: number[];
  }[];
}

function convertTahunToInt(data: any): number {
  const selectTahunArray = Array.from(data);
  const selectTahunInt = parseInt(selectTahunArray[0] as string);
  return selectTahunInt;
}
function converBulantToInt(data: any): number {
  const selectBulanArray = Array.from(data);
  const selectBulanInt = parseInt(selectBulanArray[0] as string);
  return selectBulanInt + 1;
}

const ChartLaporanTiga: React.FC = () => {
  const { auth } = useAuth();
  const [selectTahun, setSelectTahun] = useState<Selection>(new Set(['2023']));
  const [selectBulan, setSelectBulan] = useState<Selection>(new Set(['10']));
  const [options, setOptions] = useState<ApexOptions>({
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
  });

  const updateXAxis = (newXAxis: Partial<ApexXAxis>) => {
    setOptions((prevOptions) => ({
      ...prevOptions,
      xaxis: {
        ...prevOptions.xaxis,
        ...newXAxis,
      },
    }));
  };

  const navigate = useNavigate();
  const { status, data, error, refetch, isLoading } = useQuery(
    ['laporanTiga', selectTahun, selectBulan], // Memasukkan filterValue sebagai bagian dari query key
    () =>
      fetchLaporanTiga(
        convertTahunToInt(selectTahun),
        converBulantToInt(selectBulan),
        auth.token
      ),
    {
      keepPreviousData: true,
      staleTime: 5000,
    }
  );

  useEffect(() => {
    console.log(convertTahunToInt(selectTahun));
    refetch();
  }, [selectTahun, selectBulan, refetch]);

  const [state, setState] = useState<ChartTwoState>({
    series: [
      {
        name: 'Group',
        data: [44, 55, 41, 67, 22, 43, 65],
      },
      {
        name: 'Personal',
        data: [13, 23, 20, 8, 13, 27, 15],
      },
      {
        name: 'Total',
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
      const dataJenisKamar: string[] = [];

      data.data.laporan.forEach((item) => {
        dataJenisKamar.push(item.jenis_kamar);
        dataPersonal.push(item.Personal);
        dataGroup.push(item.Group);
        dataTotal.push(item.total);
      });

      updateXAxis({
        categories: dataJenisKamar,
      });

      setState({
        series: [
          {
            name: 'Group',
            data: dataGroup,
          },
          {
            name: 'Personal',
            data: dataPersonal,
          },
          {
            name: 'Total',
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
  };

  const handleBulan = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectBulan(new Set([e.target.value]));
  };

  return (
    <div>
      <div className="flex justify-end">
        <Button
          className="m-3"
          color="primary"
          onClick={() =>
            navigate(
              `/laporan/jumlah-tamu/print/${convertTahunToInt(
                selectTahun
              )}/${converBulantToInt(selectBulan)}`
            )
          }
        >
          Cetak Laporan Tiga
        </Button>
      </div>
      <div className="col-span-12 rounded-sm border border-stroke bg-white p-7.5 shadow-default dark:border-strokedark dark:bg-boxdark xl:col-span-4">
        <div className="mb-4 justify-between gap-4 sm:flex">
          <div>
            <h4 className="text-xl font-semibold text-black dark:text-white">
              Laporan Pendapat Bulanan
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
              <Select
                variant="bordered"
                label="Bulan"
                placeholder="Pilih Range Bulan"
                selectedKeys={selectBulan}
                className="relative z-20 inline-flex w-50 py-1 pl-3 pr-8 text-sm font-medium outline-none"
                onChange={handleBulan}
              >
                {namaBulan.map((item, index) => (
                  <SelectItem key={index} value={index}>
                    {item}
                  </SelectItem>
                ))}
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

export default ChartLaporanTiga;
