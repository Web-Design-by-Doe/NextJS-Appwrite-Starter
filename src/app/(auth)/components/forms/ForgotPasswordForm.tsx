'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { toast } from 'sonner';
import { z } from 'zod';

import {
  Button,
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  Input,
} from '@/components';

import { forgotPasswordSchema, sendPasswordResetLink } from '@/lib';

const initialState = {
  email: '',
};

export function ForgotPasswordForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof forgotPasswordSchema>>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      ...initialState,
    },
  });

  async function onSubmit(data: z.infer<typeof forgotPasswordSchema>) {
    setLoading(true);
    const response = await sendPasswordResetLink(data);

    if (!response.ok) {
      setLoading(false);

      setError(response.message);
      return toast.error(response.message);
    }

    setLoading(false);
    toast.success(response.message);
    return form.reset();
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
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Your Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter the email associated with your account"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full">
            {loading ? 'Sending...' : 'Send Reset Link'}
          </Button>
        </form>
      </Form>
    </div>
  );
}
