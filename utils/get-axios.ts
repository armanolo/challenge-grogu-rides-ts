import axios from 'axios';

const localhostEnv = 'http://localhost:8080/'

let HOST = localhostEnv
try {
  HOST = process.env.REACT_APP_GROGU_RIDE || localhostEnv
} catch (error) {}

const instance = axios.create({
    baseURL: `${HOST}`,
    timeout: 2000,
  });

export const getAxios:any = () => instance;