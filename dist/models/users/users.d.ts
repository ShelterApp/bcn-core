import { Service } from '../services';
import { PushPlatform } from '../push';
declare enum UserRole {
    User = "USER",
    Administrator = "ADMINISTRATOR",
    SupperUser = "SUPER USER",
    AutoUser = "AUTO USER",
    Default = "USER"
}
interface UserDevice {
    readonly platform: PushPlatform;
    readonly token: string;
    readonly link: string;
    readonly deviceId: string;
}
interface User {
    readonly _id?: string;
    readonly id?: string;
    readonly displayName?: string;
    readonly phone?: string;
    readonly email?: string;
    readonly roles?: readonly UserRole[];
    readonly devices?: readonly UserDevice[];
    readonly favoriteServices?: readonly string[] | readonly Service[];
    readonly imageUrl?: string;
    readonly imageBase64?: string;
    readonly lastMethod?: string;
    readonly lastSignedIn?: Date;
    readonly totalServices?: number;
    readonly createdAt?: Date;
    readonly updatedAt?: Date;
}
export { User, UserDevice, UserRole, };
