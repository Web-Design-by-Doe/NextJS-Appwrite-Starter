import z from 'zod';

const passwordRegex = {
  uppercase: /[A-Z]/,
  lowercase: /[a-z]/,
  number: /[0-9]/,
  special: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/,
};

const passwordSchema = z
  .string()
  .min(8, { message: 'Password must be at least 8 characters' })
  .refine(password => passwordRegex.uppercase.test(password), {
    message: 'Password must contain at least one uppercase letter',
  })
  .refine(password => passwordRegex.lowercase.test(password), {
    message: 'Password must contain at least one lowercase letter',
  })
  .refine(password => passwordRegex.number.test(password), {
    message: 'Password must contain at least one number',
  })
  .refine(password => passwordRegex.special.test(password), {
    message: 'Password must contain at least one special character',
  });

export { passwordRegex, passwordSchema };
