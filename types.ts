import { z } from 'zod';

export type Page = 'home' | 'signup' | 'success';

export const SignupSchema = z.object({
  email: z.string().email("Invalid email address"),
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  streetAddress: z.string().min(1, "Street address is required"),
  officeSuite: z.string().optional(), // Optional in UI, z.string() allows empty string
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  zip: z.string().regex(/^\d{5}$/, "Zip code must be exactly 5 digits"),
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