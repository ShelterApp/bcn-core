enum RegionType {
  StateWide = 'Statewide',
  Region1 = 'Region 1',
  Region2 = 'Region 2',
  Region3 = 'Region 3',
  Region4 = 'Region 4',
  Region5 = 'Region 5',
  Region6 = 'Region 6',
  Region7 = 'Region 7',
  Region8 = 'Region 8',
}
interface Region {
  readonly _id?: string;
  readonly id?: string;

  readonly name?: string;
  readonly website?: string;
  readonly counties?: string;

  readonly createdAt?: Date;
  readonly updatedAt?: Date;
}

export {
  Region,
  RegionType,
};
