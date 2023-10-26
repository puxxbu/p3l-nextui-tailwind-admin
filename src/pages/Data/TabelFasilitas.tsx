import Breadcrumb from '../../components/Breadcrumb';

import DefaultLayout from '../../layout/DefaultLayout';
import { FetchFasilitasTable } from 'Components';

const TabelFasilitas = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Data Fasilitas" />

      <div className="flex flex-col gap-10">
        <FetchFasilitasTable />
      </div>
    </DefaultLayout>
  );
};

export default TabelFasilitas;
