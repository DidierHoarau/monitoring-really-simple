import { NextFunction, Request, Response, Router } from 'express';
import * as _ from 'lodash';

export class AuthRequest {
  //
  public static isAuthenticated(req: Request): boolean {
    if (JSON.parse(JSON.stringify(req.headers)).authorization === process.env.API_TOKEN) {
      return true;
    } else {
      return false;
    }
  }
}
