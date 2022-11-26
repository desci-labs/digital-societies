import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { useFactoryContract } from "./useContract";

export default function useAdmin() {
  const { address: account } = useAccount();
  const desocManager = useFactoryContract();
  const [isAdmin, setIsAdmin] = useState(false);

  async function getAdmin() {
    const owner = await desocManager?.owner();
    setIsAdmin(owner === account);
  }

  useEffect(() => {
    if (!account || !desocManager) return;
    getAdmin();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account, desocManager]);
  return isAdmin;
}
