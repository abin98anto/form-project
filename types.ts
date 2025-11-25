import { z } from 'zod';

export const SignupSchema = z.object({
  email: z.string().email("Invalid email address"),
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  // Address fields removed
  // Payment fields removed
  promoCode: z.string().optional(),
  // Radio Technology removed
  dataUsage: z.enum(['0-50 MB', '50-250 MB', '250 MB-1 GB', '1 GB+'], {
    error: () => ({ message: "Please select data usage" })
  }),
  annoyingOffers: z.boolean().optional(),
});

export type SignupFormData = z.infer<typeof SignupSchema>;

export type User = SignupFormData & {
  id: string;
  joinedAt: Date;
};