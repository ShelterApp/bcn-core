interface SignUp {
    readonly email: string;
    readonly password: string;
    readonly displayName: string;
    readonly phone: string;
}
interface SignIn {
    readonly email: string;
    readonly password: string;
}
interface RequestResetPassword {
    readonly email: string;
}
interface CreatePassword {
    readonly email: string;
    readonly password: string;
    readonly token: string;
    readonly displayName?: string;
}
interface VerifyAccessToken {
    readonly type: string;
    readonly accessToken: string;
    readonly email: string;
    readonly displayName: string;
    readonly phone?: string;
    readonly accessTokenSecret?: string;
}
interface UpdatePassword {
    readonly oldPassword: string;
    readonly newPassword: string;
}
interface Search {
    readonly value: string;
}
interface FavoriteService {
    readonly service: string;
}
export { SignUp, SignIn, RequestResetPassword, CreatePassword, UpdatePassword, Search, FavoriteService, VerifyAccessToken, };
