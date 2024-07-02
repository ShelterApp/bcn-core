import { getConfig } from "../config";
import { $get } from "../base";

function getBaseUrl() {
    return `${getConfig().bcnApiUrl}/files`;
}

async function get(fileName: string): Promise<void> {
    return await $get({
        url: `${getBaseUrl()}/${fileName}`,
    });
}

export default {
    get,
};
export { get };
