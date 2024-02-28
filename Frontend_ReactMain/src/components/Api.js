import axios from 'axios';
import { BackendDomain } from '../config/constants';

const Api = axios.create({
    baseURL: BackendDomain,
});

export default Api;
