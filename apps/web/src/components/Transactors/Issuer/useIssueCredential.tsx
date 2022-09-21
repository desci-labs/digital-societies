import { useModalContext } from "components/Modal/Modal";
import ErrorView from "components/ModalViews/Error";
import Processing from "components/ModalViews/Processing";
import Success from "components/ModalViews/Success";
import { useSetTx } from "context/useTx";
import { useSBTContractFactory } from "hooks/useContract";
import { useDispatch } from "react-redux";
import { setToken } from "services/credentials/credentialSlice";
import { CredentialToken } from "services/credentials/types";
import { useAccount, useContractWrite } from "wagmi";
import { IssuerValues } from "../types";

export default function useIssueCredential(address: string) {
  const { showModal } = useModalContext();
  const { setTx, reset } = useSetTx();
  const getContract = useSBTContractFactory();
  const { address: account } = useAccount();
  const tokenContract = getContract(address);
  const dispatch = useDispatch();
  const { isLoading, isSuccess, writeAsync } = useContractWrite({
    mode: "recklesslyUnprepared",
    addressOrName: tokenContract.address!,
    contractInterface: tokenContract.interface!,
    functionName: "batchMint",
  });

  async function setTokens(addresses: string[], credential: number) {
    try {
      for (let owner of addresses) {
        const tokenId = await tokenContract.totalSupply();
        const token: CredentialToken = {
          org: address,
          tokenId: tokenId.toNumber() + 1,
          credential: credential,
          dateIssued: Date.now(),
          issuer: account!,
          owner: owner,
        };
        dispatch(setToken({ token, address }));
      }
    } catch (e) {}
  }

  async function issueCredential(metadata: IssuerValues) {
    try {
      reset();

      showModal(Processing, { message: "Confirming transaction..." });
      const args = [
        metadata.addresses.split(",").map((v) => v.trim()),
        metadata.credential,
      ];
      const tx = await writeAsync({
        recklesslySetUnpreparedArgs: args,
      });
      setTx({ txHash: tx.hash, message: "Issuing Credential..." });

      // preset issued tokens
      setTokens(metadata.addresses.split(",").map((v) => v.trim()), metadata.credential);
      await tx.wait();
      showModal(Success, { message: `Credential issued` });
    } catch (e: any) {
      console.log("Error ", e?.data?.message, e?.message);
      showModal(ErrorView, { message: "Error processing transaction" });
    }
  }
  return { issueCredential, isLoading, isSuccess };
}
