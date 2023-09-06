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
} from '@nextui-org/react';
import { users2 as users } from '../data/data';

import { fetchContacts } from 'Hooks/sampleData';

import { useQuery, useMutation } from '@tanstack/react-query';

interface Contact {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  username: string;
}
export default function App() {
  const [page, setPage] = React.useState(1);
  const [items, setItems] = React.useState<Contact[]>([]);
  const { status, data, error, isFetching, isPreviousData } = useQuery({
    queryKey: ['projects', page],
    queryFn: () => fetchContacts(page),
    keepPreviousData: true,
    staleTime: 5000,
  });

  const rowsPerPage = 10;

  const pages = data?.paging.total_page || 1;

  console.log(pages);

  React.useEffect(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    if (data?.data) {
      setItems(data.data.slice(start, end));
    }
  }, [page, data?.data]);

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
        <TableColumn key="id">NAME</TableColumn>
        <TableColumn key="role">ROLE</TableColumn>
        <TableColumn key="status">STATUS</TableColumn>
        <TableColumn key="status">STATUS</TableColumn>
        <TableColumn key="status">STATUS</TableColumn>
      </TableHeader>
      <TableBody items={items}>
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => (
              <TableCell>{getKeyValue(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
