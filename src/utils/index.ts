import React from 'react';
import moment from 'moment';
export function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function formatDate(date: string) {
  return moment(date).locale('id').format('D MMMM YYYY');
}

export function rangeDate(start: string, end: string) {
  return `( ${formatDate(start)} - ${formatDate(end)} )`;
}

export function capitalizeFirstLetter(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function formatJenisKamar(jenis_kamar: string, jenis_bed: string) {
  return `${jenis_kamar} (${capitalizeFirstLetter(jenis_bed)})`;
}
