'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { toast } from 'sonner';
import { z } from 'zod';
import { useRouter } from 'next/navigation';

import {
  Button,
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  Input,
  PasswordStrengthIndicator,
} from '@/components';

import {
  resetPassword,
  resetPasswordSchema,
  validatePasswordStrength,
} from '@/lib';

const initialState = {
  password: '',
  confirm_password: '',
};

export function ResetPasswordForm({
  userId,
  secret,
}: {
  userId: string;
  secret: string;
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [passwordValid, setPasswordValid] = useState({
    length: false,
    lowercase: false,
    uppercase: false,
    number: false,
    special: false,
  });
  const router = useRouter();

  const form = useForm<z.infer<typeof resetPasswordSchema>>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      ...initialState,
    },
  });

  async function onSubmit(data: z.infer<typeof resetPasswordSchema>) {
    setLoading(true);
    const response = await resetPassword(data, userId, secret);

    if (!response.ok) {
      setLoading(false);

      setError(response.message);
      return toast.error(response.message);
    }

    setLoading(false);
    toast.success(response.message);

    form.reset();
    return router.push('/login');
  }

  return (
    <div className="space-y-4 w-full">
      {error && (
        <p className="text-destructive px-3 py-1 bg-destructive/10 rounded-md border border-destructive">
          {error}
        </p>
      )}
      <Form {...form}>
        <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>New Password</FormLabel>

                <FormControl>
                  <Input
                    type="password"
                    placeholder="Enter your new password"
                    {...field}
                    onChange={e => {
                      field.onChange(e);
                      const validatePassword = validatePasswordStrength(
                        e.target.value,
                      );
                      setPasswordValid(validatePassword);
                    }}
                  />
                </FormControl>
                <FormMessage />
                {form.getValues('password') && (
                  <PasswordStrengthIndicator passwordValid={passwordValid} />
                )}
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="confirm_password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>

                <FormControl>
                  <Input
                    type="password"
                    placeholder="Confirm your new password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full">
            {loading ? 'Resetting...' : 'Reset Password'}
          </Button>
        </form>
      </Form>
    </div>
  );
}
