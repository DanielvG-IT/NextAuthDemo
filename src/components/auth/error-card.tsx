import { CardWrapper } from "@/components/auth/card-wrapper";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

export const ErrorCard = () => {
  return (
    <CardWrapper
      headerLabel="Oops! Something went wrong"
      backButtonLabel="Back to login"
      backButtonHref="/auth/login">
      <div className="w-full flex flex-col items-center justify-center space-y-4 p-4">
        <ExclamationTriangleIcon className="text-destructive w-12 h-12" />
        <p className="text-center text-lg text-destructive">
          An unexpected error has occurred. Please try again later.
        </p>
      </div>
    </CardWrapper>
  );
};
