import React from 'react';
import moment from 'moment';
export function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function formatDate(date: string) {
  return moment(date).locale('id').format('D MMMM YYYY');
}
