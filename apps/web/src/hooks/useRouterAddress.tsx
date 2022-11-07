import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function useRouterAddress() {
  const router = useRouter();
  const [{ address }, setRouterQuery] = useState({ address: "" });

  useEffect(() => {
    if (router.isReady) {
      const { address } = router.query;
      setRouterQuery({ address: address as string });
    }
  }, [router.isReady, router.query]);

  return address;
}
