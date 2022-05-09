import {NextFunction, Request, Response} from "express";
import {Option as BasicAuthOption, User, verify as verifyBasicAuth, setUnauthenticated} from "../basic_auth";
import {Option as IPFilterOption, verify as verifyIPFilter} from "../ip_filter";

/**
 * Option for IP Filter with Basic Auth.
 */
type IPFilterWithBasicAuthOption = {
    /**
     * Option for basic auth.
     */
    basicAuthOption: BasicAuthOption

    /**
     * Option for ip filter.
     */
    ipFilterOption: IPFilterOption
};

/**
 * Verify that the request IP or user matches the defined IP or user.
 * @param {Request} req - request
 * @param {string[]} allowIPs - allow IP list
 * @param {User[]} users - allow user list
 * @return boolean - true if a matching IP or user exists, otherwise false
 */
const verify = (req: Request, allowIPs: string[], users: User[]) => {
    if (verifyIPFilter(req, allowIPs)) return true;
    if (verifyBasicAuth(req, users)) return true;
    return false;
};

/**
 * Get the IP Filter with Basic Auth middleware.
 * @param {Option} option - option for IP filter with Basic Auth
 * @return {RequestHandler} - middleware
 */
const middleware = (option: IPFilterWithBasicAuthOption) => {
    const {
        basicAuthOption,
        ipFilterOption,
    } = option;

    return (req: Request, res: Response, next: NextFunction) => {
        if (verify(req, ipFilterOption.allowsIPs, basicAuthOption.users)) {
            next();
            return;
        }
        setUnauthenticated(res);
    };
};

export default middleware;
export {verify, IPFilterWithBasicAuthOption};
