import { CardContainer } from "components/UI/Index";
import useAdmin from "hooks/useAdmin";
import { PropsWithChildren } from "react";

export default function AdminGuard(props: PropsWithChildren) {
  const isAdmin = useAdmin();

  if (!isAdmin)
    return (
      <div className="h-104 w-full flex justify-center items-center">
        <CardContainer className="flex flex-col justify-center items-center gap-5 shadow-none w-88 py-10">
          <p>You have no access to this page 🚫 </p>
        </CardContainer>
      </div>
    );

  return <>{props.children}</>;
}
