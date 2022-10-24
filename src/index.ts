import * as core from 'express-serve-static-core';
import basicAuthMiddleware, {Option as BasicAuthOption} from './basic_auth';
import ipFilterMiddleware, {Option as IPFilterOption} from './ip_filter';
import mixAuthMiddleware from './mix_auth';

/**
 * Option for express-simple-access-control
 */
type Option = {
  /**
   * Option for basic auth. Enabled if specified.
   */
  basicAuthOption: BasicAuthOption | undefined;

  /**
   * Option for ip filter. Enabled if specified.
   */
  ipFilterOption: IPFilterOption | undefined;
};

/**
 * Apply access restrictions.
 * @param {core.Express} app - express app
 * @param {Option} option - option for express-simple-access-control
 */
const useAccessControlMiddleware = (app: core.Express, option: Option) => {
  const {basicAuthOption, ipFilterOption} = option;

  if (ipFilterOption && basicAuthOption) {
    app.use(mixAuthMiddleware({basicAuthOption, ipFilterOption}));
  } else if (ipFilterOption) {
    app.use(ipFilterMiddleware(ipFilterOption));
  } else if (basicAuthOption) {
    app.use(basicAuthMiddleware(basicAuthOption));
  }
};

export default useAccessControlMiddleware;
export {Option};
