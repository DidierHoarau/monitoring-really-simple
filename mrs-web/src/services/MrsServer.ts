import axios, { AxiosRequestConfig, AxiosPromise } from 'axios';
import { Config } from './config';

export class MrsServer {
  //
  public static getEventsNoAck(): Promise<any> {
    return axios.get(Config.MRS_SERVER_URL + '/events/no-ack');
  }

  public static postEventsAck(id: string): Promise<any> {
    return axios.post(Config.MRS_SERVER_URL + '/events/' + id + '/ack');
  }
}
