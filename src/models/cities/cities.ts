interface CityLocation {
  readonly type?: string;
  readonly coordinates?: readonly [number, number];
}

interface City {
  readonly _id?: string;
  readonly id?: string;
  readonly name?: string;
  readonly state?: string;
  readonly search?: string;
  readonly location?: CityLocation;
  readonly createdAt?: Date;
  readonly updatedAt?: Date;
}

export {
  City,
};
