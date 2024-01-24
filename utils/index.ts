export function createCategoryObject(categoryName: string, uid: string) {
  return {
    uid,
    name: categoryName,
    subCategories: [],
    transactions: [],
  };
}
