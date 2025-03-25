import { CircleCheck, CircleX } from 'lucide-react';

// Define the types for the validation keys
type PasswordValidKey =
  | 'length'
  | 'lowercase'
  | 'uppercase'
  | 'number'
  | 'special';

interface PasswordStrengthIndicatorProps {
  passwordValid: Record<PasswordValidKey, boolean>;
}

const validationRules: { label: string; key: PasswordValidKey }[] = [
  { label: 'Over 8 characters', key: 'length' },
  { label: 'Contains lowercase letter', key: 'lowercase' },
  { label: 'Contains uppercase letter', key: 'uppercase' },
  { label: 'Contains a number', key: 'number' },
  { label: 'Contains a special character', key: 'special' },
];

export function PasswordStrengthIndicator({
  passwordValid,
}: PasswordStrengthIndicatorProps) {
  return (
    <>
      {validationRules.map(({ label, key }) => (
        <p
          key={key}
          className={`text-sm flex items-center gap-2 text ${
            passwordValid[key] ? 'text-green-600' : 'text-muted-foreground'
          }`}
        >
          {passwordValid[key] ? (
            <CircleCheck size={16} />
          ) : (
            <CircleX size={16} />
          )}
          {label}
        </p>
      ))}
    </>
  );
}
