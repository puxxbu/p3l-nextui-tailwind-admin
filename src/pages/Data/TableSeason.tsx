import Breadcrumb from '../../components/Breadcrumb';

import DefaultLayout from '../../layout/DefaultLayout';
import { FetchSeasonTable } from 'Components';

const TabelSeason = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Data Jenis Kamar" />

      <div className="flex flex-col gap-10">
        <FetchSeasonTable />
      </div>
    </DefaultLayout>
  );
};

export default TabelSeason;
