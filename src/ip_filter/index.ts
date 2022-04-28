import {NextFunction, Request, Response} from "express";
import getClientIP from "./client_ip";

/**
 * Option for IP Filter
 */
type Option = {
    /**
     * Allow IP list.
     */
    allowsIPs: string[]

    /**
     * Response status in case of error.
     */
    errStatusCode: number

    /**
     * Response message in case of error.
     */
    errMessage: string
};

/**
 * Get the IP Filter middleware.
 * @param {Option} option - option for IP filter
 * @return {RequestHandler} - middleware
 */
const ipFilterMiddleware = (option: Option) => {
    const {
        allowsIPs = [],
        errStatusCode = 401,
        errMessage = 'Unauthorized',
    } = option;

    return (req: Request, res: Response, next: NextFunction) => {
        const clientIP = getClientIP(req);
        if (!clientIP || !allowsIPs.includes(clientIP)) {
            res.status(errStatusCode).send(errMessage);
            return;
        }
        next();
    };
};

export default ipFilterMiddleware;
export {Option};
