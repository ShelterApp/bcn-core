import { Region } from '../regions';

interface Coordinator {
  readonly displayName?: string;
  readonly title?: string;
  readonly email?: string;
  readonly officePhone?: string;
  readonly fax?: string;
  readonly mobile?: string;
  readonly extension?: string;
}

interface Unit {
  readonly _id?: string;
  readonly id?: string;
  readonly name?: string;
  readonly region?: string | Region;
  readonly coordinators: readonly Coordinator[];
  readonly createdAt?: Date;
  readonly updatedAt?: Date;
}

export {
  Unit,
};
