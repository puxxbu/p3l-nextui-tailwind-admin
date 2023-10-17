import Breadcrumb from '../components/Breadcrumb';
import TableOne from '../components/Table/TableOne';
import TableThree from '../components/Table/TableThree';
import TableTwo from '../components/Table/TableTwo';
import DefaultLayout from '../layout/DefaultLayout';
import { DataTable, TestFetchTable } from 'Components';
import { Button } from '@nextui-org/react';
const Tables = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Tables" />

      <div className="flex flex-col gap-10">
        {/* <TableOne />
        <TableTwo />
        <TableThree /> */}
        <TestFetchTable />
      </div>
    </DefaultLayout>
  );
};

export default Tables;
