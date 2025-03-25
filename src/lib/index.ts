// Actions
export {
  createSession,
  createNewUser,
  getUser,
  sendVerificationEmail,
  createOAuthSession,
  deleteSession,
  sendPasswordResetLink,
  resetPassword,
} from './actions/auth';
export {
  createDocument,
  listDocuments,
  getDocument,
  updateDocument,
  deleteDocument,
} from './actions/database';

// Utils
export {
  type ParsedError,
  cn,
  generateAbsolutePath,
  parseError,
  validatePasswordStrength,
  isDateExpired,
} from './utils';

// Appwrite
export {
  createAdminClient,
  createSessionClient,
} from './appwrite/appwrite.config';
export {
  type ProviderProps,
  type OAuthProviderProps,
  oAuthProviders,
} from './appwrite/oAuthProviders';

// Schemas
export { forgotPasswordSchema } from './schemas/forgotPasswordSchema';
export { loginSchema } from './schemas/loginSchema';
export { registerNewUserSchema } from './schemas/registerNewUserSchema';
export { resetPasswordSchema } from './schemas/resetPasswordSchema';
export { passwordRegex, passwordSchema } from './schemas/passwordSchema';
