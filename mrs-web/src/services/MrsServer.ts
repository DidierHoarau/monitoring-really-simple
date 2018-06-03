import axios, { AxiosRequestConfig, AxiosPromise } from 'axios';
import { Config } from './config';

export class MrsServer {
  //
  public static getEventsNoAck(): Promise<any> {
    return axios({
      headers: { Authorization: localStorage.getItem('API_TOKEN') },
      method: 'get',
      url: Config.MRS_SERVER_URL + '/events/no-ack',
    });
  }

  public static postEventsAck(id: string): Promise<any> {
    return axios({
      headers: { Authorization: localStorage.getItem('API_TOKEN') },
      method: 'post',
      url: Config.MRS_SERVER_URL + '/events/' + id + '/ack',
    });
  }
}
