import {NextFunction, Request, Response} from "express";
import auth from "basic-auth";
import compare from "tsscmp";

/**
 * Option for Basic Auth
 */
type Option = {
    /**
     * Allow user list.
     */
    users: User[]
};

/**
 * User Info for Basic Auth
 */
type User = {
    username: string
    password: string
};

/**
 * Verify that the request user matches the defined user.
 * @param {Request} req - request
 * @param {User[]} users - allow user list
 * @return boolean - true if a matching user exists, otherwise false
 */
const verify = (req: Request, users: User[]) => {
    const reqUser = auth(req);
    if (!reqUser) return false;

    const defUser = users.find(user => user.username === reqUser.name);
    if (!defUser) return false;

    return compare(reqUser.name, defUser.username) && compare(reqUser.pass, defUser.password);
};

/**
 * Sets information for displaying a Basic Authentication popup in the response status and headers.
 * @param {Response} res - response
 */
const setUnauthenticated = (res: Response) => {
    res.statusCode = 401;
    res.setHeader('WWW-Authenticate', 'Basic realm="express-simple-access-control"');
    res.end();
};

/**
 * Get the Basic Auth middleware.
 * @param {Option} option - option for basic auth
 * @return {RequestHandler} - middleware
 */
const middleware = (option: Option) => {
    const {
        users,
    } = option;

    return (req: Request, res: Response, next: NextFunction) => {
        if (verify(req, users)) {
            next();
            return;
        }
        setUnauthenticated(res);
    };
};

export default middleware;
export {verify, setUnauthenticated, Option, User};
