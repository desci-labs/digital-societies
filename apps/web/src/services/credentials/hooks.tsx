import { useGetter } from "store/accessors";

export function useGetCredentialState() {
  const state = useGetter(state => state.credential);
  return state;
}

export function useGetCredentials(address: string) {
  const { credentials } = useGetter(state => state.credential);
  return credentials[address] ?? [];
}

export function useGetCredential(address: string, id: number) {
  const credentials = useGetCredentials(address);
  return credentials.find((credential) => credential.id === id);
}

export function useGetTokens(address: string) {
  const { tokens } = useGetCredentialState();
  return tokens[address] ?? [];
}

export function useGetCredentialTokens(address: string, credential: number) {
  const tokens = useGetTokens(address);
  return tokens.filter((token) => token.credential === credential);
}
