import axios from 'axios';
import { DOMAIN } from '../config';

export default axios.create({
  baseURL: `${DOMAIN}/api`,
  timetout: 10000,
  validateStatus: (status) => status >= 200 && status < 500,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});
