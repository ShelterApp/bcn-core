interface StaticPage {
  readonly _id?: string;
  readonly id?: string;
  readonly code?: string;
  readonly name?: string;
  readonly content?: string;
  readonly createdAt?: Date;
  readonly updatedAt?: Date;
}

export {
  StaticPage,
};
