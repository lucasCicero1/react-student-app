"use client";

import { Link } from "@heroui/react";

import { Card } from "@/src/components/Card";

export default function ConfirmClient({ email }: { email: string | null }) {
  const headerSuccess = (
    <h1 className="text-xl font-bold mb-2">Email confirmed successfully !</h1>
  );

  const footerSuccess = (
    <Link isExternal showAnchorIcon href="/login">
      Go to Login
    </Link>
  );

  const headerError = (
    <h1 className="text-xl font-bold text-red-600 mb-2">
      Email not confirmed !
    </h1>
  );

  const footerError = (
    <Link isExternal showAnchorIcon href="/register">
      Go to Sign Up
    </Link>
  );

  return (
    <div className="flex h-screen w-screen items-center justify-center">
      {email ? (
        <Card footer={footerSuccess} header={headerSuccess}>
          <p className="text-gray-800 dark:text-gray-400">
            User <b>{email}</b> validated successfully!
          </p>
        </Card>
      ) : (
        <Card footer={footerError} header={headerError}>
          <p className="text-gray-800 dark:text-gray-400">
            Was not possible confirm the email. Invalid or expired token.
          </p>
        </Card>
      )}
    </div>
  );
}
