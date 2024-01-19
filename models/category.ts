import { z } from "zod";

export const CategorySchema = z.object({
  id: z.string(),
  uid: z.string(),
  icon: z.string().optional(),
  transactions: z.array(z.string()),
  subCategories: z.array(z.string()),
});

export type Category = z.infer<typeof CategorySchema>;
