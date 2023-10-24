import Breadcrumb from '../../components/Breadcrumb';
import TableOne from '../../components/Table/TableOne';
import TableThree from '../../components/Table/TableThree';
import TableTwo from '../../components/Table/TableTwo';
import DefaultLayout from '../../layout/DefaultLayout';
import { DataTable, FetchKamarTable } from 'Components';
import { Button } from '@nextui-org/react';
const TabelKamar = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Data Kamar" />

      <div className="flex flex-col gap-10">
        <FetchKamarTable />
      </div>
    </DefaultLayout>
  );
};

export default TabelKamar;
