export type RootStackParamList = {
  "(tabs)": undefined;
  "(category)": undefined;
  "(category)/categories": undefined;
  "(category)/edit": undefined;
  modal: undefined;
  "(auth)": undefined;
};

export type Category = {
  id: string;
  name: string;
  icon?: string;
  subCategories: string[];
  uid: string;
  transactions: string[];
};
