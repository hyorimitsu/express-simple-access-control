import {NextFunction, Request, Response} from 'express';
import getClientIP from './client_ip';

/**
 * Option for IP Filter
 */
type Option = {
  /**
   * Allow IP list.
   */
  allowsIPs: string[];

  /**
   * Response status in case of error.
   */
  errStatusCode: number;

  /**
   * Response message in case of error.
   */
  errMessage: string;
};

/**
 * Verify that the request IP matches the defined IP.
 * @param {Request} req - request
 * @param {string[]} allowIPs - allow IP list
 * @return boolean - true if a matching IP exists, otherwise false
 */
const verify = (req: Request, allowIPs: string[]) => {
  const clientIP = getClientIP(req);
  return !!clientIP && allowIPs.includes(clientIP);
};

/**
 * Get the IP Filter middleware.
 * @param {Option} option - option for IP filter
 * @return {RequestHandler} - middleware
 */
const middleware = (option: Option) => {
  const {
    allowsIPs = [],
    errStatusCode = 401,
    errMessage = 'Unauthorized',
  } = option;

  return (req: Request, res: Response, next: NextFunction) => {
    if (verify(req, allowsIPs)) {
      next();
      return;
    }
    res.status(errStatusCode).send(errMessage);
  };
};

export default middleware;
export {verify, Option};
