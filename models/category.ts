import { z } from "zod";

export const CategorySchema = z.object({
  id: z.string(),
  uid: z.string(),
  name: z.string(),
  icon: z.string().optional(),
  transactions: z.array(z.string()),
  subCategories: z.array(z.string()),
});

export type Category = z.infer<typeof CategorySchema>;

export const CategoriesSchema = z.object({
  categories: z.array(CategorySchema),
  categoriesById: z.record(z.string(), CategorySchema),
  categoriesByName: z.record(z.string(), CategorySchema),
});

export type Categories = z.infer<typeof CategoriesSchema>;
