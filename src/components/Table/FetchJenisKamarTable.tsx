import React from 'react';
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
  getKeyValue,
  Spinner,
  Button,
  Input,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from '@nextui-org/react';

import { useQuery } from '@tanstack/react-query';
import useAuth from 'src/hooks/useAuth';
import Error from '../Error/Error';
import Icon from '@mdi/react';
import { mdiDotsVertical, mdiMagnify, mdiPlus } from '@mdi/js';
import { useNavigate } from 'react-router-dom';

import {
  deleteJenisKamar,
  fetchJenisKamar,
} from 'src/hooks/jenisKamar/jenisKamarController';
import toast, { Toaster } from 'react-hot-toast';

export default function App() {
  const [page, setPage] = React.useState(1);
  const [items, setItems] = React.useState<JenisKamar[]>([]);
  const { auth } = useAuth();
  const [selectedKeys, setSelectedKeys] = React.useState(new Set([]));
  const [filterValue, setFilterValue] = React.useState('');
  const [idKamar, setIdKamar] = React.useState("");
  const navigate = useNavigate();

  const {
    status,
    data,
    error,
    isFetching,
    isPreviousData,
    refetch,
    isLoading,
  } = useQuery(
    ['jenisKamar', page, filterValue], // Memasukkan filterValue sebagai bagian dari query key
    () => fetchJenisKamar(page, filterValue, auth.token),
    {
      keepPreviousData: true,
      staleTime: 5000,
    }
  );

  const {isOpen, onOpen, onOpenChange, onClose} = useDisclosure();

  console.log(page);

  React.useEffect(() => {
    refetch();
  }, [page, filterValue, refetch]);

  const onClear = React.useCallback(() => {
    setFilterValue('');
    setPage(1);
  }, []);

  const onSearchChange = React.useCallback((value?: string) => {
    if (value) {
      setFilterValue(value);
      console.log(value);
      setPage(1);
    } else {
      setFilterValue('');
    }
  }, []);

  const rowsPerPage = 10;

  const handleDeleteKamar = async () => {
    deleteJenisKamar(idKamar, auth.token, (data, error) => {
      if (error) {
        console.log(error);
      } else {
        refetch();
        toast.success('Data Jenis Kamar berhasil dihapus');
        console.log(data);
      }
    });

    onClose();
    setIdKamar('');
  }

  const pages = data?.paging.total_page || 1;

  function switchAction(key: any, id: string) {
    switch (key) {
      case 'view':
        navigate(`/forms/jenis-kamar/${id}`);
        break;
      case 'delete':
        onOpen()
        setIdKamar(id)

        

        break;
      default:
        break;
    }
  }



  React.useEffect(() => {
    const start = 0;
    const end = start + rowsPerPage;

    if (data?.data) {
      setItems(data.data.slice(start, end));
    }
  }, [page, data?.data]);

  if (isLoading) {
    return <Spinner color="primary" />;
  } else {
    if (error) {
      return Error();
    } else {
      return (
        <div className="flex flex-col gap-4">
          <Toaster />
          <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Modal Title</ModalHeader>
              <ModalBody>
               <p>Apakah Anda ingin menghapus?</p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={handleDeleteKamar}>
                  Delete
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
          <div className="flex items-end justify-between gap-3">
            <Input
              isClearable
              variant="bordered"
              className="w-full sm:max-w-[44%]"
              placeholder="Search by name..."
              startContent={<Icon path={mdiMagnify} size={1} />}
              value={filterValue}
              onClear={() => onClear()}
              onValueChange={onSearchChange}
            />
            <div className="flex justify-end gap-3">
              <Button
                color="primary"
                endContent={<Icon path={mdiPlus} size={1} />}
                onClick={() => navigate('/forms/jenis-kamar')}
              >
                Add New
              </Button>
            </div>
          </div>
          <Table
            aria-label="Example table with client side pagination"
            bottomContent={
              <div className="flex w-full justify-center">
                <Pagination
                  isCompact
                  showControls
                  showShadow
                  color="secondary"
                  page={page}
                  total={pages}
                  onChange={(page) => setPage(page)}
                />
              </div>
            }
            classNames={{
              wrapper: 'min-h-[222px]',
            }}
          >
            <TableHeader>
              <TableColumn key="id_jenis_kamar">ID Jenis Kamar</TableColumn>
              <TableColumn key="jenis_kamar">Jenis Kamar</TableColumn>
              <TableColumn key="jenis_bed">Jenis Bed</TableColumn>
              <TableColumn key="jumlah_kasur">Jumlah Kasur</TableColumn>
              <TableColumn key="action">Actions</TableColumn>
            </TableHeader>
            <TableBody items={items}>
              {(item) => (
                <TableRow key={item.id_jenis_kamar}>
                  {(columnKey) => (
                    <TableCell>
                      {(() => {
                        switch (columnKey) {
                          case 'action':
                            return (
                              <Dropdown>
                                <DropdownTrigger>
                                  <Button isIconOnly size="sm" variant="light">
                                    <Icon path={mdiDotsVertical} size={1} />
                                  </Button>
                                </DropdownTrigger>
                                <DropdownMenu
                                  aria-label="Action event example"
                                  onAction={(key) =>
                                    switchAction(
                                      key,
                                      getKeyValue(item, 'id_jenis_kamar')
                                    )
                                  }
                                >
                                  <DropdownItem
                                    className="text-gray-700 dark:text-white"
                                    key="view"
                                  >
                                    View
                                  </DropdownItem>
                                  <DropdownItem className="text-gray-700 dark:text-white">
                                    Edit
                                  </DropdownItem>
                                  <DropdownItem
                                    key="delete"
                                    className="text-danger"
                                    color="danger"
                                  >
                                    Delete
                                  </DropdownItem>
                                </DropdownMenu>
                              </Dropdown>
                            );
                          default:
                            return getKeyValue(item, columnKey);
                        }
                      })()}
                    </TableCell>
                  )}
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      );
    }
  }
}
