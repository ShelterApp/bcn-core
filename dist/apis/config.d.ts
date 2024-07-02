interface Config {
    readonly bcnApiUrl?: string;
    readonly token?: string;
}
declare function getConfig(): {
    bcnApiUrl?: string | undefined;
    token?: string | undefined;
};
declare function setConfig(cfg?: Config): void;
export { Config, getConfig, setConfig };
