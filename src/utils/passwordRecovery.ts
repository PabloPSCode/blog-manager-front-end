const PASSWORD_RECOVERY_STORAGE_KEY = "password-recovery-context";

export type PasswordRecoveryContext = {
  domain: string;
  code: string;
};

export const savePasswordRecoveryContext = (
  context: PasswordRecoveryContext,
) => {
  if (typeof window === "undefined") {
    return;
  }

  window.sessionStorage.setItem(
    PASSWORD_RECOVERY_STORAGE_KEY,
    JSON.stringify(context),
  );
};

export const readPasswordRecoveryContext = (): PasswordRecoveryContext | null => {
  if (typeof window === "undefined") {
    return null;
  }

  const rawValue = window.sessionStorage.getItem(PASSWORD_RECOVERY_STORAGE_KEY);

  if (!rawValue) {
    return null;
  }

  try {
    const parsedValue = JSON.parse(rawValue) as Partial<PasswordRecoveryContext>;

    if (
      typeof parsedValue.domain !== "string" ||
      !parsedValue.domain.trim() ||
      typeof parsedValue.code !== "string" ||
      !/^\d{6}$/.test(parsedValue.code.trim())
    ) {
      return null;
    }

    return {
      domain: parsedValue.domain.trim(),
      code: parsedValue.code.trim(),
    };
  } catch {
    return null;
  }
};

export const clearPasswordRecoveryContext = () => {
  if (typeof window === "undefined") {
    return;
  }

  window.sessionStorage.removeItem(PASSWORD_RECOVERY_STORAGE_KEY);
};
