"use client";

import { FormError } from "@/components/form-error";
import { BeatLoader } from "react-spinners";
import { verifyEmail } from "@/actions/verify-email";
import { FormSuccess } from "@/components/form-success";
import { CardWrapper } from "@/components/auth/card-wrapper";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

export const VerifyEmailForm = () => {
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();

  const searchParams = useSearchParams();

  const token = searchParams.get("token");

  const onSubmit = useCallback(() => {
    if (success || error) {
      return;
    }

    if (!token) {
      setError("Token is required!");
      return;
    }

    verifyEmail(token)
      .then((data) => {
        setSuccess(data.success);
        setError(data.error);
      })
      .catch(() => {
        setError("Something went wrong!");
      });
  }, [token, success, error]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);

  return (
    <CardWrapper
      headerLabel="Verify your email address"
      backButtonLabel="Back to login"
      backButtonHref="/auth/login">
      <div className="flex items-center w-full justify-center">
        {!success && !error && <BeatLoader />}
        {/* {!success && !error && <p>Verifying...</p>} */}

        <FormSuccess message={success} />
        {!success && <FormError message={error} />}
      </div>
    </CardWrapper>
  );
};
