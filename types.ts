import { z } from 'zod';

export const SignupSchema = z.object({
  email: z.string().email("Invalid email address"),
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  // Address fields removed
  paymentCard: z.string().regex(/^\d{16}$/, "Card number must be exactly 16 digits"),
  expiryMMYY: z.string().regex(/^(0[1-9]|1[0-2])\/\d{2}$/, "Expiry must be in MM/YY format"),
  cvv: z.string().regex(/^\d{3}$/, "CVV must be exactly 3 digits"),
  promoCode: z.string().optional(),
  radioTechnology: z.enum(['2G', '4G-LTE', 'CAT-M'], {
    error: () => ({ message: "Please select a radio technology" })
  }),
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