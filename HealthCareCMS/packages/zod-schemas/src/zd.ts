import { z } from 'zod';

export const PatientSignUpSchema = z.object({
  fullName: z.string().min(1, 'Full name is required'),
  phone: z.string().length(10, 'Phone number must be 10 digits'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export type PatientSignUpType = z.infer<typeof PatientSignUpSchema>;

