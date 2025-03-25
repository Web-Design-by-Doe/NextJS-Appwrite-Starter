import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { ID, OAuthProvider } from 'node-appwrite';
import { z } from 'zod';

import {
  createAdminClient,
  createSessionClient,
  registerNewUserSchema,
  loginSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  parseError,
  ProviderProps,
} from '@/lib';

class AuthService {
  async createSession(data: z.infer<typeof loginSchema>) {
    const safeParsedData = loginSchema.safeParse(data);

    if (!safeParsedData.success) {
      throw new Error('Invalid login details, please try again');
    }

    const { email, password } = safeParsedData.data;

    try {
      const { account } = await createAdminClient();

      const session = await account.createEmailPasswordSession(email, password);

      if (!session.secret) {
        throw new Error('Invalid session, please try again');
      }

      (await cookies()).set('auth-session', session.secret, {
        httpOnly: true,
        sameSite: 'lax',
        secure: true,
        expires: new Date(session.expire),
        path: '/',
      });
    } catch (error) {
      return {
        ...parseError(error),
      };
    }

    return redirect('/dashboard');
  }

  async createNewUser(data: z.infer<typeof registerNewUserSchema>) {
    const safeParsedData = registerNewUserSchema.safeParse(data);

    if (!safeParsedData.success) {
      throw new Error('Invalid registration details, please try again');
    }

    const { email, password, first_name, last_name } = safeParsedData.data;

    const fullName = `${first_name} ${last_name}`;

    try {
      const { account } = await createAdminClient();

      const newUser = await account.create(
        ID.unique(),
        email,
        password,
        fullName,
      );

      if (!newUser.$id) {
        throw new Error('Failed to create account , please try again');
      }

      const session = await account.createEmailPasswordSession(email, password);

      if (!session.secret) {
        throw new Error('Invalid session, please try again');
      }

      (await cookies()).set('auth-session', session.secret, {
        httpOnly: true,
        sameSite: 'lax',
        secure: true,
        expires: new Date(session.expire),
      });
    } catch (error) {
      return {
        ...parseError(error),
      };
    }

    return redirect('/dashboard');
  }

  async getUser() {
    const session = (await cookies()).get('auth-session')?.value;

    if (!session) {
      return {
        user: null,
        ok: false,
      };
    }

    try {
      const { account } = await createSessionClient();

      const user = await account.get();

      if (!user.$id) {
        return {
          user: null,
          ok: false,
        };
      }

      return {
        user,
        ok: true,
      };
    } catch (error) {
      return {
        ...parseError(error),
      };
    }
  }

  async sendVerificationEmail() {
    const redirectUrl = `${process.env.PUBLIC_URL}/api/auth/verify-email`;

    try {
      const { account } = await createSessionClient();

      const sendVerificationEmail = await account.createVerification(
        redirectUrl,
      );

      if (!sendVerificationEmail.$id) {
        throw new Error('Failed to send verification email, please try again');
      }

      return {
        message: 'Verification email sent successfully',
        ok: true,
      };
    } catch (error) {
      return {
        ...parseError(error),
      };
    }
  }

  async createOAuthSession(provider: ProviderProps['provider']) {
    const baseUrl = process.env.PUBLIC_URL!;

    let redirectUrl = '';
    try {
      const { account } = await createAdminClient();

      redirectUrl = await account.createOAuth2Token(
        OAuthProvider[provider],
        `${baseUrl}/api/auth/oauth/success`,
        `${baseUrl}/sign-up`,
      );
    } catch (error) {
      return {
        ...parseError(error),
      };
    }

    return redirect(redirectUrl);
  }

  async deleteSession() {
    try {
      const { account } = await createSessionClient();

      await account.deleteSession('current');
      (await cookies()).delete('auth-session');
    } catch (error) {
      return {
        ...parseError(error),
      };
    }

    return redirect('/login');
  }

  async sendPasswordResetLink(data: z.infer<typeof forgotPasswordSchema>) {
    const safeParsedData = forgotPasswordSchema.safeParse(data);

    if (!safeParsedData.success) {
      throw new Error('Invalid email, please try again');
    }

    const { email } = safeParsedData.data;

    try {
      const { account } = await createAdminClient();

      await account.createRecovery(
        email,

        `${process.env.PUBLIC_URL}/account-recovery/reset-password`,
      );

      return {
        message: 'A link to reset your password has been sent to your email.',
        ok: true,
      };
    } catch (error) {
      return {
        ...parseError(error),
      };
    }
  }

  async resetPassword(
    data: z.infer<typeof resetPasswordSchema>,
    userId: string,
    secret: string,
  ) {
    const safeParsedData = resetPasswordSchema.safeParse(data);

    if (!safeParsedData.success) {
      throw new Error('Invalid password, please try again');
    }

    const { password } = safeParsedData.data;

    try {
      const { account } = await createAdminClient();

      await account.updateRecovery(userId, secret, password);

      return {
        message: 'Your password has been reset successfully!',
        ok: true,
      };
    } catch (error) {
      return {
        ...parseError(error),
      };
    }
  }
}

export const auth = new AuthService();
