import { z } from "zod";

// base schema
export const GrantSchema = z.object({
  userSubId: z.uuid(),
  grantId: z.uuid(),
  status: z.enum([
    "Pending",
    "Applied",
    "Approved",
    "Rejected",
    "Reasearching",
  ]),
  category: z.string(),
  expirationDate: z.iso.datetime(),
  notes: z.string().max(2000),
  sourceUrl: z.url(),
  title: z.string(),
});

export type Grant = z.infer<typeof GrantSchema>;

// partial for updates in db
export const GrantUpdateSchema = GrantSchema.partial();
export type GrantUpdate = z.infer<typeof GrantUpdateSchema>;

// remove userSubId from items returned from db
export type PublicGrant = Omit<Grant, "userSubId">;
