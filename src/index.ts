import * as core from "express-serve-static-core";
import basicAuth, {Option as BasicAuthOption} from "./basic_auth";
import ipFilter, {Option as IPFilterOption} from "./ip_filter";

export type Option = {
    basicAuthOption: BasicAuthOption | undefined
    ipFilterOption: IPFilterOption | undefined
};

const accessControl = (app: core.Express, option: Option) => {
    const {
        basicAuthOption,
        ipFilterOption,
    } = option;

    if (ipFilterOption) app.use(ipFilter(ipFilterOption));
    if (basicAuthOption) app.use(basicAuth(basicAuthOption));

    return app;
};

export default accessControl;
