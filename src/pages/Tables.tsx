import Breadcrumb from '../components/Breadcrumb';
import TableOne from '../components/TableOne';
import TableThree from '../components/TableThree';
import TableTwo from '../components/TableTwo';
import DefaultLayout from '../layout/DefaultLayout';
import { DataTable, TestFetchTable } from 'Components';
import { Button } from '@nextui-org/react';
const Tables = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Tables" />
      <div className="flex items-center gap-4">
        <Button size="sm">Small</Button>
        <Button size="md">Medium</Button>
        <Button size="lg">Large</Button>
      </div>

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
