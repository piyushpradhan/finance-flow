export type RootStackParamList = {
  "(tabs)": undefined;
  "(category)": undefined;
  "(category)/categories": undefined;
  "(category)/edit": { category: Category };
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
  isSubcategory: boolean;
  type: "income" | "expense";
};

export type Categories = {
  categories: Array<Category>;
  categoriesById: { [categoryId: string]: Category };
  categoriesByName: { [categoryName: string]: Category };
};

export type Transaction = {
  id: string;
  timestamp: string;
  amount: number;
  user: string;
  account: string;
  category: string;
  note?: string;
  type: "income" | "expense" | "transfer" | "debt" | "receivable";
};
