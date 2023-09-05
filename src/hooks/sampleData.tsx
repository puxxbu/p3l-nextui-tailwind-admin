import { useQuery, useMutation } from '@tanstack/react-query';
import { columns, users, statusOptions } from '../data/data';

function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const dataUsers = () => {
  return useQuery({
    queryKey: ['users'],
    queryFn: () => wait(2000).then(() => [...users]),
  });
};
