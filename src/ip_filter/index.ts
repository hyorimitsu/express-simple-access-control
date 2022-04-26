import {NextFunction, Request, Response} from "express";
import getClientIP from "./client_ip";

export type Option = {
    allowsIPs: string[]
    errStatusCode: number
    errMessage: string
};

const ipFilter = (option: Option) => {
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

export default ipFilter;
