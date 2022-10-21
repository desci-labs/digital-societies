import { ErrorIcon } from "assets/svg";
import Button from "components/UI/Button/Index";

export default function AppFallback({ error, resetErrorBoundary }: any) {
  return (
    <div
      role="alert"
      className="h-screen w-full mx-5 md:mx-0 flex flex-col items-center justify-center"
    >
      <div className="w-full relative flex justify-center items-center">
          <ErrorIcon />
      </div>
      <h1 className="text-2xl mt-20 text-crimson">
        The app crashed due to errors on our end, Please report this error to us so we can fix it.
      </h1>
      <Button className="app-text bg-states-error mt-5" onClick={resetErrorBoundary}>
        Reset App
      </Button>
    </div>
  );
}
