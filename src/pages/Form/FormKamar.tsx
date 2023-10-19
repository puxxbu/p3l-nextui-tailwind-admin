import Icon from '@mdi/react';
import Breadcrumb from '../../components/Breadcrumb';
import DefaultLayout from '../../layout/DefaultLayout';
import { mdiChevronDown } from '@mdi/js';
import { Input, Select, SelectItem, useDisclosure } from '@nextui-org/react';
import { useState } from 'react';
import useAuth from 'src/hooks/useAuth';
import { createKamar } from 'src/hooks/formController';

const jenisKamar = [
  {
    label: 'Superior (Double)',
    value: 1,
  },
  {
    label: 'Superior (Twin)',
    value: 2,
  },
  {
    label: 'Double Deluxe (Double)',
    value: 3,
  },
  {
    label: 'Double Deluxe (Twin)',
    value: 4,
  },
  {
    label: 'Junior Suite (King)',
    value: 5,
  },
  {
    label: 'Executive Deluxe (King)',
    value: 6,
  },
];

interface DataKamar {
  nomor_kamar?: string | null;
  id_jenis_kamar?: string | null;
}

const FormKamar = () => {
  const { auth } = useAuth();
  const [data, setData] = useState<DataKamar>({
    nomor_kamar: '',
    id_jenis_kamar: '',
  });
  //   const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [error, setError] = useState('');

  const handleChange = (key: any, value: any) => {
    console.log(key, value);
    setData((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    createKamar(
      data.nomor_kamar || '0',
      data.id_jenis_kamar || '0',
      auth.token,
      (data, error) => {
        if (error) {
          setError(error);
        } else {
          console.log(data);
        }
      }
    );
  };

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Create Kamar" />

      <div className="grid grid-cols-1 gap-9 ">
        <div className="flex flex-col gap-9">
          {/* <!-- Contact Form --> */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Contact Form
              </h3>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="p-6.5">
                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                  <div className="w-full xl:w-1/2">
                    <Input
                      isRequired
                      type="text"
                      label="Nomor Kamar"
                      value={data.nomor_kamar || ''}
                      onValueChange={(value) =>
                        handleChange('nomor_kamar', value)
                      }
                      placeholder="Masukkan Nomor Kamar"
                    />
                  </div>

                  <div className="w-full xl:w-1/2">
                    <div className="relative z-20 bg-transparent dark:bg-form-input">
                      <Select
                        isRequired
                        label="Pilih Jenis Kamar"
                        className="relative z-20 bg-transparent dark:bg-form-input"
                        selectedKeys={data.id_jenis_kamar || ''}
                        onChange={(selectedKeys) =>
                          handleChange(
                            'id_jenis_kamar',
                            selectedKeys.target.value
                          )
                        }
                      >
                        {jenisKamar.map((item) => (
                          <SelectItem key={item.value} value={item.value}>
                            {item.label}
                          </SelectItem>
                        ))}
                      </Select>
                    </div>
                  </div>
                </div>

                <button className="text-gray flex w-full justify-center rounded bg-primary p-3 font-medium dark:text-white                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     ">
                  Create Kamar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default FormKamar;
