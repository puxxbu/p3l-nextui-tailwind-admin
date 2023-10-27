import Breadcrumb from '../../components/Breadcrumb';

import DefaultLayout from '../../layout/DefaultLayout';
import { FetchTarifTable } from 'Components';

const TabelTarif = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Data Tarif" />

      <div className="flex flex-col gap-10">
        <FetchTarifTable />
      </div>
    </DefaultLayout>
  );
};

export default TabelTarif;
