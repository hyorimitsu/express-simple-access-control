import * as core from "express-serve-static-core";
import basicAuthMiddleware, {Option as BasicAuthOption, User} from "./basic_auth";
import ipFilterMiddleware, {Option as IPFilterOption} from "./ip_filter";

type Option = {
    basicAuthOption: BasicAuthOption | undefined
    ipFilterOption: IPFilterOption | undefined
};

const useAccessControlMiddleware = (app: core.Express, option: Option) => {
    const {
        basicAuthOption,
        ipFilterOption,
    } = option;

    if (ipFilterOption) app.use('*', ipFilterMiddleware(ipFilterOption));
    if (basicAuthOption) app.use('*', basicAuthMiddleware(basicAuthOption));
};

export default useAccessControlMiddleware;
export {basicAuthMiddleware, ipFilterMiddleware};
export {Option, BasicAuthOption, User, IPFilterOption};
