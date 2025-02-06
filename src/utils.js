import data from './data.json';
import { FIELD_TYPE } from './constants';

export const getDefaultFields = (type) => 
  data[type.toLowerCase()].map((item) => ({
    name: item.label,
    value: item.value || item?.options[0],
    type: item.type || FIELD_TYPE.INPUT,
    options: item.options ? item.options.map((option) => ({label: option, value: option})) : [],
  }));