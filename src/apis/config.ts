interface Config {
    readonly bcnApiUrl?: string;
    readonly token?: string;
}

let __BCN_API_CONFIG__: Config = {}; // tslint:disable-line: no-let

function getConfig() {
    return { ...__BCN_API_CONFIG__ };
}

function setConfig(cfg: Config = {}) {
    __BCN_API_CONFIG__ = { ...cfg };
}

export { Config, getConfig, setConfig };
