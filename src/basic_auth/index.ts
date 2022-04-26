import * as expressBasicAuth from "express-basic-auth";

export type Option = {
    users: User[]
};

export type User = {
    username: string
    password: string
};

const createUsersObject = (users: User[]) => {
    const result: {[key: string]: string} = {};
    for (const user of users) {
        result[user.username] = user.password;
    }
    return result;
};

const basicAuth = (option: Option) => {
    return expressBasicAuth({
        challenge: true,
        users: createUsersObject(option.users),
    });
};

export default basicAuth;
