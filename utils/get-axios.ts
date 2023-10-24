import axios from 'axios';

const HOST = process.env.REACT_APP_GROGU_RIDE || 'http://localhost:8080/';

const instance = axios.create({
    baseURL: `${HOST}`,
    timeout: 2000,
  });

export const getAxios:any = () => instance;