import { BotQuery } from "./types";
declare function query(data: BotQuery): Promise<void>;
declare const _default: {
    query: typeof query;
};
export default _default;
export { query };
