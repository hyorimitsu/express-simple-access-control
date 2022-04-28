import * as expressBasicAuth from "express-basic-auth";

/**
 * Option for Basic Auth
 */
type Option = {
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
 * Convert {@link User} to an object where username is key and password is value.
 * @param {User[]} users - {@link User} array
 * @return {{[key: string]: string}} - an object where username is key and password is value
 */
const createUsersObject = (users: User[]) => {
    const result: { [key: string]: string } = {};
    for (const user of users) {
        result[user.username] = user.password;
    }
    return result;
};

/**
 * Get the Basic Auth middleware.
 * @param {Option} option - option for basic auth
 * @return {RequestHandler} - middleware
 */
const basicAuthMiddleware = (option: Option) => {
    return expressBasicAuth({
        challenge: true,
        users: createUsersObject(option.users),
    });
};

export default basicAuthMiddleware;
export {Option, User};
