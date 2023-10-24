import Breadcrumb from '../../components/Breadcrumb';
import TableOne from '../../components/Table/TableOne';
import TableThree from '../../components/Table/TableThree';
import TableTwo from '../../components/Table/TableTwo';
import DefaultLayout from '../../layout/DefaultLayout';
import { DataTable, FetchJenisKamarTable, FetchKamarTable } from 'Components';
import { Button } from '@nextui-org/react';
const TabelJenisKamar = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Tables" />

      <div className="flex flex-col gap-10">
        <FetchJenisKamarTable />
      </div>
    </DefaultLayout>
  );
};

export default TabelJenisKamar;
