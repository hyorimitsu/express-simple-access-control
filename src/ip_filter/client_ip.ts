import {Request} from "express";

const IP_HEADER_KEYS = [
    "x-client-ip",
    "x-forwarded-for",
    "cf-connecting-ip",
    "fastly-client-ip",
    "true-client-ip",
    "x-real-ip",
    "x-cluster-client-ip",
    "x-forwarded",
    "forwarded-for",
    "forwarded",
];

const getClientIP = (req: Request) => {
    const requestHeaders = req.headers;

    for (const key of IP_HEADER_KEYS) {
        const value = requestHeaders[key];
        if (!value) continue;

        const parts = typeof value === "string"
            ? value.split(/\s*,\s*/g)
            : value;

        return parts[0];
    }

    return req.socket.remoteAddress;
};

export default getClientIP;
