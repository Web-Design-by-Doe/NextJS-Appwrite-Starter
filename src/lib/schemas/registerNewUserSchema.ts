import z from 'zod';

import { passwordSchema } from './passwordSchema';

export const registerNewUserSchema = z
  .object({
    email: z.string().email('Invalid email address'),
    first_name: z.string().min(2, 'First name must be at least 2 characters'),
    last_name: z.string().min(2, 'Last name must be at least 2 characters'),
    password: passwordSchema,
    confirm_password: z.string(),
  })
  .refine(data => data.password === data.confirm_password, {
    message: 'Passwords do not match',
    path: ['confirm_password'],
  });
