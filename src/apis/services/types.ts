interface ListOfServiceIds {
  readonly services: readonly string[];
}

interface AvailableBed {
  readonly id: string;
  readonly total: number;
}

interface SearchCityOrZip {
  readonly keyword?: string;
}

export {
  ListOfServiceIds,
  AvailableBed,
  SearchCityOrZip,
};
