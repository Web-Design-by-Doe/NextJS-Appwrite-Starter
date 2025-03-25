import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

import { passwordRegex } from './schemas/passwordSchema';

interface ParsedError {
  message: string;
  code?: string;
  status?: number;
  stack?: string;
}

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

function generateAbsolutePath(path: string) {
  return `${process.env.PUBLIC_URL}${path}`;
}

function parseError(error: unknown): ParsedError {
  if (error instanceof Error) {
    console.error('error is instance of Error:', error);
    return {
      message: error.message,
      code: error.name,
      stack: error.stack,
    } as ParsedError;
  }

  if (typeof error === 'string') {
    console.error('error is string:', error);
    return { message: error } as ParsedError;
  }

  if (typeof error === 'object' && error !== null) {
    console.error('error is object:', error);
    return {
      message:
        (error as { message?: string }).message ?? 'An unknown error occurred',
      code: (error as { code?: string }).code,
      status: (error as { status?: number }).status,
    } as ParsedError;
  }

  return { message: 'An unknown error occurred' };
}

function validatePasswordStrength(password: string) {
  const length = password.length >= 8;
  const lowercase = passwordRegex.lowercase.test(password);
  const uppercase = passwordRegex.uppercase.test(password);
  const number = passwordRegex.number.test(password);
  const special = passwordRegex.special.test(password);

  return {
    length,
    lowercase,
    uppercase,
    number,
    special,
  };
}

function isDateExpired(date: string) {
  return new Date(date) < new Date();
}

export {
  type ParsedError,
  cn,
  generateAbsolutePath,
  parseError,
  validatePasswordStrength,
  isDateExpired,
};
