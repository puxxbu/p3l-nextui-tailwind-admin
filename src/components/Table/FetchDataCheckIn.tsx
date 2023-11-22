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
} from '@nextui-org/react';
import { users2 as users } from '../../data/data';

import { fetchKamar } from 'src/hooks/kamar/kamarController';

import { useQuery, useMutation } from '@tanstack/react-query';
import useAuth from 'src/hooks/useAuth';
import Error from '../Error/Error';
import Icon from '@mdi/react';
import { mdiChevronDown, mdiDotsVertical, mdiMagnify, mdiPlus } from '@mdi/js';
import { useNavigate, useParams } from 'react-router-dom';
import { deleteKamar } from 'src/hooks/kamar/kamarController';
import { fetchBookingHistory } from 'src/hooks/sampleData';
import { formatDate } from 'src/utils';
import { fetchAllBooking, fetchDataCheckIn } from 'src/hooks/booking/bookingController';

export default function App() {
  const [page, setPage] = React.useState(1);
  const [items, setItems] = React.useState<BookingItem[]>([]);
  const { auth } = useAuth();
  const [selectedKeys, setSelectedKeys] = React.useState(new Set([]));
  const [filterValue, setFilterValue] = React.useState('');

  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data, error, refetch, isLoading } = useQuery(
    ['bookHistory', page, filterValue], // Memasukkan filterValue sebagai bagian dari query key
    () => fetchDataCheckIn(page, filterValue, auth.token),
    {
      keepPreviousData: true,
      staleTime: 5000,
    }
  );

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

  const pages = data?.paging.total_page || 1;

  function switchAction(key: any, id: string) {
    switch (key) {
      case 'view':
        navigate(`/data/user/detail-history/${id}`);
        break;

      case 'check-in':
        navigate(`/fo/user/detail-booking/${id}`);
        break;

      case 'detail-check-in':
        navigate(`/fo/user/detail-booking/check-in/${id}`);
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
              <TableColumn key="id_booking">ID Booking</TableColumn>
              <TableColumn key="nama_pegawai_fo">Nama Customer</TableColumn>
              <TableColumn key="tanggal_check_in">Check-in</TableColumn>
              <TableColumn key="tanggal_check_out">Check-out</TableColumn>
              <TableColumn key="status_booking">Status Booking</TableColumn>
              <TableColumn key="action">Actions</TableColumn>
            </TableHeader>
            <TableBody items={items}>
              {(item) => (
                <TableRow key={item.id_booking}>
                  {(columnKey) => (
                    <TableCell>
                      {(() => {
                        switch (columnKey) {
                          case 'action':
                            if(item.status_booking === 'Check In'){
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
                                        getKeyValue(item, 'id_booking')
                                      )
                                    }
                                  >
                                    <DropdownItem
                                      className="text-gray-700 dark:text-white"
                                      key="view"
                                    >
                                      Lihat Detail
                                    </DropdownItem>
                                  
  
                                    <DropdownItem
                                      className="text-gray-700 dark:text-white"
                                      key="detail-check-in"
                                    >
                                      Detail Check-in 
                                    </DropdownItem>
                                  </DropdownMenu>
                                </Dropdown>
                              );
                            }else{
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
                                        getKeyValue(item, 'id_booking')
                                      )
                                    }
                                  >
                                    <DropdownItem
                                      className="text-gray-700 dark:text-white"
                                      key="view"
                                    >
                                      Lihat Detail
                                    </DropdownItem>
                                    <DropdownItem
                                      className="text-gray-700 dark:text-white"
                                      key="check-in"
                                    >
                                      Check-in
                                    </DropdownItem>
  
                                    
                                  </DropdownMenu>
                                </Dropdown>
                              );
                            }
                      

                          case 'nama_pegawai_fo':
                            return item.customer.nama

                          case 'tanggal_check_in':
                          case 'tanggal_check_out':
                            return formatDate(getKeyValue(item, columnKey));

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
