interface ZipLocation {
    readonly type?: string;
    readonly coordinates?: readonly [number, number];
}
interface Zip {
    readonly _id?: string;
    readonly id?: string;
    readonly code?: string;
    readonly location?: ZipLocation;
    readonly createdAt?: Date;
    readonly updatedAt?: Date;
}
export { Zip, };
