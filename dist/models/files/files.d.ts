interface File {
    readonly _id?: string;
    readonly id?: string;
    readonly name?: string;
    readonly type?: string;
    readonly size?: number;
    readonly content?: string;
    readonly contentType?: string;
    readonly url?: string;
    readonly createdAt?: Date;
    readonly updatedAt?: Date;
}
export { File, };
