import axios, { AxiosRequestConfig, AxiosPromise } from 'axios';
import { Config } from './config';

export class MrsServer {
  //
  public static getEvents(): Promise<any> {
    return axios.get(Config.MRS_SERVER_URL + '/api/events');
  }
}
