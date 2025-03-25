'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { toast } from 'sonner';
import Link from 'next/link';
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

import { loginSchema, createSession } from '@/lib';

const initialState = {
  email: '',
  password: '',
};

export function LoginForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      ...initialState,
    },
  });

  async function onSubmit(data: z.infer<typeof loginSchema>) {
    setLoading(true);
    const response = await createSession(data);

    if (response.message) {
      setLoading(false);

      setError(response.message);
      return toast.error(response.message);
    }
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
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="space-y-2">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <div className="flex justify-between">
                    <FormLabel>Password</FormLabel>
                    <Link
                      href="/account-recovery/forgot-password"
                      className="text-sm hover:underline"
                    >
                      Forgot Your Password?
                    </Link>
                  </div>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Enter your password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button type="submit" className="w-full">
            {loading ? 'Loading...' : 'Login'}
          </Button>
        </form>
      </Form>
    </div>
  );
}
