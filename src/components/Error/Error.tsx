import { mdiAlert } from '@mdi/js';
import Icon from '@mdi/react';
import React from 'react';

export default function Error() {
  return (
    <div className="flex  flex-col items-center justify-center">
      <Icon path={mdiAlert} size={8} color="red" />
      <p className="text-xl text-red-500">Gagal Memuat Data</p>
    </div>
  );
}
