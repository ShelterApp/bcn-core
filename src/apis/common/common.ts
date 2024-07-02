import { getConfig } from "../config";
import { $post } from "../base";

function getBaseUrl() {
    return `${getConfig().bcnApiUrl}/common/translate`;
}

async function translate(data: any): Promise<any> {
    return await $post({
        url: getBaseUrl(),
        body: data,
    });
}

export default {
    translate,
};
export { translate };
