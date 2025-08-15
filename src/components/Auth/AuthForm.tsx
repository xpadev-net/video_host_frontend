import Link from "next/link";
import type { ReactNode } from "react";

import { Button } from "@/components/ui/button";

interface AuthFormProps {
  onSubmit: (e: React.FormEvent) => void;
  submitText: string;
  submitTextLoading: string;
  isLoading: boolean;
  isDisabled: boolean;
  linkText: string;
  linkHref: string;
  linkLabel: string;
  children: ReactNode;
  error?: string;
}

export function AuthForm({
  onSubmit,
  submitText,
  submitTextLoading,
  isLoading,
  isDisabled,
  linkText,
  linkHref,
  linkLabel,
  children,
  error,
}: AuthFormProps) {
  return (
    <>
      {error && (
        <div className="p-3 text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-md">
          {error}
        </div>
      )}
      <form onSubmit={onSubmit} className="space-y-4">
        {children}
        <Button type="submit" className="w-full" disabled={isDisabled}>
          {isLoading ? submitTextLoading : submitText}
        </Button>
      </form>
      <div className="text-center text-sm">
        <span className="text-muted-foreground">{linkText} </span>
        <Link href={linkHref} className="text-primary hover:underline">
          {linkLabel}
        </Link>
      </div>
    </>
  );
}
