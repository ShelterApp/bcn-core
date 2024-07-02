/**
 * Check if the current environment is development
 * @returns boolean
 */
declare const isDev: () => boolean;
declare const isTest: () => boolean;
declare const isStaging: () => boolean;
declare const isProduction: () => boolean;
export { isDev, isTest, isStaging, isProduction };
