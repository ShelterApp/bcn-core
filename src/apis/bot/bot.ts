import { getConfig } from "../config";
import { $post } from "../base";
import { BotQuery } from "./types";

function getBaseUrl() {
    return `${getConfig().bcnApiUrl}/bot`;
}

async function query(data: BotQuery): Promise<void> {
    return await $post({
        url: `${getBaseUrl()}/query`,
        body: data,
    });
}

export default {
    query,
};
export { query };
