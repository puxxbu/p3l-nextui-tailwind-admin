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
  useDisclosure,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from '@nextui-org/react';

import { useQuery, useMutation } from '@tanstack/react-query';
import useAuth from 'src/hooks/useAuth';
import Error from '../Error/Error';
import Icon from '@mdi/react';
import { mdiDotsVertical, mdiMagnify, mdiPlus } from '@mdi/js';
import { useNavigate } from 'react-router-dom';

import toast, { Toaster } from 'react-hot-toast';
import { deleteSeason, fetchSeason } from 'src/hooks/season/seasonController';
import { formatDate } from 'src/utils';
import { deleteFasilitas, fetchFasilitas } from 'src/hooks/fasilitas/fasilitasController';

export default function App() {
  const [page, setPage] = React.useState(1);
  const [items, setItems] = React.useState<Fasilitas[]>([]);
  const { auth } = useAuth();
  const [idKamar, setIdKamar] = React.useState("");
  const [selectedKeys, setSelectedKeys] = React.useState(new Set([]));
  const [filterValue, setFilterValue] = React.useState('');

  const navigate = useNavigate();

  const { status, data, error, refetch, isLoading } = useQuery(
    ['fasilitas', page, filterValue], // Memasukkan filterValue sebagai bagian dari query key
    () => fetchFasilitas(page, filterValue, auth.token),
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


  const handleDeleteKamar = async () => {
    deleteFasilitas(idKamar, auth.token, (data, error) => {
      if (error) {
        console.log(error);
      } else {
        refetch();
        toast.success('Data Season berhasil dihapus');
        console.log(data);
      }
    });

    onClose();
    setIdKamar('');
  }

  const rowsPerPage = 10;

  const pages = data?.paging.total_page || 1;

  function switchAction(key: any, id: string) {
    switch (key) {
      case 'view':
        navigate(`/forms/fasilitas/${id}`);
        break;
      case 'delete':
        onOpen();
        setIdKamar(id);

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
                onClick={() => navigate('/forms/fasilitas')}
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
              <TableColumn key="id_fasilitas">ID Fasilitas</TableColumn>
              <TableColumn key="nama_layanan">Nama Fasilitas</TableColumn>
              <TableColumn key="harga">Harga</TableColumn>

              <TableColumn key="action">Actions</TableColumn>
            </TableHeader>
            <TableBody items={items}>
              {(item) => (
                <TableRow key={item.id_fasilitas}>
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
                                      getKeyValue(item, 'id_fasilitas')
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
