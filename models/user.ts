import { z } from "zod";

export const UserSchema = z.object({
  isLoggedIn: z.boolean().optional().default(false),
  uid: z.string(),
  username: z.string(),
  accessToken: z.string(),
  refreshToken: z.string(),
  currency: z.string().optional().default("INR"),
  email: z.string().email(),
  displayPicture: z.string().optional(),
  accounts: z.array(z.object({})).optional().default([]),
});

export type User = z.infer<typeof UserSchema>;
