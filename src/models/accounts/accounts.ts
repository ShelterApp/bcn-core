import { User } from '../users';

enum RequestPasswordType {
  Web = 'WEB',
  Mobile = 'MOBILE',
  Default = Web,
}

enum AccountProvider {
  Local = 'LOCAL',
  Facebook = 'FACEBOOK',
  Google = 'GOOGLE',
  Instagram = 'INSTAGRAM',
  Twitter = 'TWITTER',
  Default = Local,
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

export {
  AccountProvider,
  Account,
  RequestPasswordType,
};
