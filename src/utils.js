import data from './data.json';

export const getDefaultFields = (type) => 
  data[type.toLowerCase()].map((item) => ({
    name: item.label,
    value: item.value,
  }));