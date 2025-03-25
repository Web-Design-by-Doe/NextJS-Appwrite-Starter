import { AuthContainer, ForgotPasswordForm } from '@/app/(auth)/components';

export default function ForgotPassword() {
  return (
    <AuthContainer>
      <div className="flex flex-col gap-10">
        <h1 className="text-3xl font-bold">Forgot Password</h1>
        <ForgotPasswordForm />
      </div>
    </AuthContainer>
  );
}
