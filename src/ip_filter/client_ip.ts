import {Request} from 'express';

/**
 * List of headers referenced to get IP address. In order of priority.
 */
const IP_HEADER_KEYS = [
  'x-client-ip',
  'x-forwarded-for',
  'cf-connecting-ip',
  'fastly-client-ip',
  'true-client-ip',
  'x-real-ip',
  'x-cluster-client-ip',
  'x-forwarded',
  'forwarded-for',
  'forwarded',
];

/**
 * Get the client IP address from Request Headers or other.
 * @param {Request} req - request
 * @return {string} - IP address
 */
const getClientIP = (req: Request) => {
  const requestHeaders = req.headers;

  for (const key of IP_HEADER_KEYS) {
    const value = requestHeaders[key];
    if (!value) continue;

    const parts = typeof value === 'string' ? value.split(/\s*,\s*/g) : value;

    return parts[0];
  }

  return req.socket.remoteAddress;
};

export default getClientIP;
