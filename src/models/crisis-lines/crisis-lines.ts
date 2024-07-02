import { User } from '../users';

interface CirisLineLocation {
  readonly type?: string;
  readonly coordinates?: readonly [number, number];
}

interface CrisisLine {
  readonly _id?: string;
  readonly id?: string;
  readonly name?: string;
  readonly description?: string;
  readonly area?: string;
  readonly chatWebLink?: string;
  readonly time?: string;
  readonly phone?: string;
  readonly text?: string;
  readonly website?: string;
  readonly location?: CirisLineLocation;
  readonly user?: string | User;
  readonly ranking?: number;
  readonly createdAt?: Date;
  readonly updatedAt?: Date;
}

export {
  CrisisLine,
};
