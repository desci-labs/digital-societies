import { useRouter } from "next/router";
import Loader from "components/Loader";
import { useGetOrg } from "services/orgs/hooks";
import { useEffect, useState } from "react";
import DesocDetails from "components/UI/Desoc/DesocDetails";

export default function DesocDetailsPage() {
  const router = useRouter();
  const [{ address }, setRouterQuery] = useState({ address: '' });

  const org = useGetOrg(address as string);

  useEffect(() => {
    if (router.isReady) {
      const { address } = router.query;
      setRouterQuery({ address: address as string })
    }
  }, [router.isReady, router.query]);

  if (!org) return <Loader className="h-screen" />;
  
  return (
    <DesocDetails desoc={org} />
  );
}
