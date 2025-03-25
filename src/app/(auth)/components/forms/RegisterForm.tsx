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
  PasswordStrengthIndicator,
} from '@/components';

import {
  createNewUser,
  registerNewUserSchema,
  validatePasswordStrength,
} from '@/lib';

const initialState = {
  first_name: '',
  last_name: '',
  email: '',
  password: '',
  confirm_password: '',
};

export function RegisterForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [passwordValid, setPasswordValid] = useState({
    length: false,
    lowercase: false,
    uppercase: false,
    number: false,
    special: false,
  });

  const form = useForm<z.infer<typeof registerNewUserSchema>>({
    resolver: zodResolver(registerNewUserSchema),
    defaultValues: {
      ...initialState,
    },
  });

  async function onSubmit(data: z.infer<typeof registerNewUserSchema>) {
    setLoading(true);
    const response = await createNewUser(data);

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
          <div className="flex gap-4">
            <FormField
              control={form.control}
              name="first_name"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your first name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="last_name"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your last name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

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

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>

                <FormControl>
                  <Input
                    type="password"
                    placeholder="Enter your password"
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
                    placeholder="Confirm your password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full">
            {loading ? 'Loading...' : 'Sign Up'}
          </Button>
        </form>
      </Form>
    </div>
  );
}
