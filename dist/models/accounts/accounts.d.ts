import { User } from '../users';
declare enum RequestPasswordType {
    Web = "WEB",
    Mobile = "MOBILE",
    Default = "WEB"
}
declare enum AccountProvider {
    Local = "LOCAL",
    Facebook = "FACEBOOK",
    Google = "GOOGLE",
    Instagram = "INSTAGRAM",
    Twitter = "TWITTER",
    Default = "LOCAL"
}
interface Account {
    readonly _id?: string;
    readonly id?: string;
    readonly user: string | User;
    readonly provider?: AccountProvider;
    readonly isFirebase?: boolean;
    readonly credentials?: any;
    readonly lastSignedIn?: Date;
    readonly createdAt?: Date;
    readonly updatedAt?: Date;
}
export { AccountProvider, Account, RequestPasswordType, };
