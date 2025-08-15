export interface ValidationResult {
  isValid: boolean;
  error?: string;
}

export function validatePassword(password: string): ValidationResult {
  if (password.length < 6) {
    return {
      isValid: false,
      error: "パスワードは6文字以上で入力してください",
    };
  }
  return { isValid: true };
}

export function validatePasswordMatch(
  password: string,
  confirmPassword: string,
): ValidationResult {
  if (password !== confirmPassword) {
    return {
      isValid: false,
      error: "パスワードが一致しません",
    };
  }
  return { isValid: true };
}

export function validateRequiredFields(
  fields: Record<string, string>,
): ValidationResult {
  for (const [fieldName, value] of Object.entries(fields)) {
    if (!value.trim()) {
      return {
        isValid: false,
        error: `${fieldName}は必須です`,
      };
    }
  }
  return { isValid: true };
}
