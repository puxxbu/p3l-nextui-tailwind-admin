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
} from '@nextui-org/react';
import { users2 as users } from '../data/data';

import { fetchKamar } from 'Hooks/sampleData';

import { useQuery, useMutation } from '@tanstack/react-query';
import useAuth from 'src/hooks/useAuth';

export default function App() {
  const [page, setPage] = React.useState(1);
  const [items, setItems] = React.useState<Kamar[]>([]);
  const { auth } = useAuth();
  const {
    status,
    data,
    error,
    isFetching,
    isPreviousData,
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ['projects', page],
    queryFn: () => fetchKamar(page, auth.token),
    keepPreviousData: true,
    staleTime: 5000,
  });

  console.log(page);

  React.useEffect(() => {
    refetch();
  }, [page, refetch]);

  const rowsPerPage = 10;

  const pages = data?.paging.total_page || 1;

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
    return (
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
          <TableColumn key="id_kamar">NAME</TableColumn>
          <TableColumn key="id_jenis_kamar">FIRST NAME</TableColumn>
          <TableColumn key="nomor_kamar">LAST NAME</TableColumn>
        </TableHeader>
        <TableBody items={items}>
          {(item) => (
            <TableRow key={item.id_kamar}>
              {(columnKey) => (
                <TableCell>{getKeyValue(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    );
  }
}
