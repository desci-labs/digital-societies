import { Metadata } from "components/Transactors/types";
import useLocalStorageState from "hooks/useLocalStorageState";
import { createContext, useContext } from "react";
import { useAccount } from "wagmi";
import FactoryUpdater from "./updater";

export type Revoked = { tokenId: string; revokedBy: string; owner: string; timestamp: number }
export type Org = { cid: string; metadata: Metadata; address: string, owner: string, dateCreated: number, delegates: string[], revocations: Revoked[], admin: string };
export type FactoryState = { data: Org[], isLoading: boolean };

const initialState: FactoryState = { data: [], isLoading: true };

export const getContext = createContext<FactoryState>(initialState);
export const setContext = createContext({
  setOrgs: (_value: Org[]) => { },
});

export default function FactoryProvider({ children }: any) {
  const [state, setState] = useLocalStorageState<FactoryState>(
    `DESCILabs_factory_orgs`,
    initialState
  );

  const setOrgs = (payload: Org[]) => {
    setState(() => ({ data: payload, isLoading: false }));
  };

  return (
    <getContext.Provider value={state}>
      <setContext.Provider value={{ setOrgs }}>
        <FactoryUpdater />
        {children}
      </setContext.Provider>
    </getContext.Provider>
  );
}

export const useGetOrgs = () => useContext(getContext);
export const useSetOrgs = () => useContext(setContext);

export function useGetOrg(address: string) {
  const { data } = useGetOrgs();
  return data.find(org => org.address === address);
}

export function useIsAdmin(address: string, user: string) {
  const org = useGetOrg(address);
  return org?.admin === user
}

export function useIsDelegate(address: string, user: string) {
  const org = useGetOrg(address);
  return !!org?.delegates.some(member => member === user);
}

export function useCanMutateOrg(address: string) {
  const account = useAccount();
  const isAdmin = useIsAdmin(address, account.address ?? '');
  const isDelegate = useIsDelegate(address, account.address ?? '');
  return isAdmin || isDelegate;
}