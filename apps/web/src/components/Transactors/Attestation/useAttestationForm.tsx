/* eslint-disable @typescript-eslint/no-unused-vars */
import { useModalContext } from "components/Modal/Modal";
import TransactionPrompt from "components/TransactionStatus/TransactionPrompt";
import { BigNumber, utils } from "ethers";
import { pinAttestationMetadata } from "helper/web3";
import { useTokenContract } from "hooks/useContract";
import { useFormContext } from "react-hook-form";
import { useDispatch } from "react-redux";
import { setAttestation } from "services/attestations/reducer";
import { useGetAttestation } from "services/attestations/hooks";
import { PendingAttestation } from "services/attestations/types";
import { useGetTxState } from "services/transaction/hooks";
import { setFormError, setFormLoading } from "services/transaction/reducer";
import { Step } from "services/transaction/types";
import useTxUpdator from "services/transaction/updators";
import { useAccount } from "wagmi";
import { AttestationFormValues, LaunchMode } from "../types";

type Launcher = (metadata: AttestationFormValues) => Promise<void>;

export default function useAttestationForm(address: string, tokenType: string) {
  const dispatch = useDispatch();
  const { updateTx } = useTxUpdator();
  const { form_loading } = useGetTxState();
  const getContract = useTokenContract();
  const tokenContract = getContract(address);
  const attestation = useGetAttestation(address, tokenType);
  const { address: account } = useAccount();
  const { showModal } = useModalContext();
  const { watch } = useFormContext<AttestationFormValues>();
  const mode = watch("mode");

  async function launch(metadata: AttestationFormValues) {
    try {
      if (!account) throw Error("Check wallet connection and try again!!!");

      dispatch(setFormLoading(true));
      updateTx({ step: Step.submit, message: "Pinning Metadata to IPFS..." });

      const { mode, isDelegateRole, ...meta } = metadata;
      const { ipfsURL } = await pinAttestationMetadata(meta);

      updateTx({ step: Step.submit, message: "Confirming transaction..." });
      const tx = await tokenContract.createAttestation(
        ipfsURL,
        isDelegateRole == "true" ? true : false
      );
      const typeId = (await tokenContract?.totalTypes()) ?? 0;
      const attestationId = utils.keccak256(
        utils.defaultAbiCoder.encode(
          ["address", "uint"],
          [address, typeId.add(1)]
        )
      );
      const attestation: PendingAttestation = {
        id: attestationId.toString(),
        metadataUri: ipfsURL,
        metadata: meta,
        pending: true,
        createdAt: Date.now(),
        society: address,
      };
      dispatch(setAttestation({ address, attestation }));
      const previewLink = `/attestations/${attestationId}?address=${address}`;
      updateTx({
        step: Step.broadcast,
        txHash: tx.hash,
        message: `Deploying ${metadata.name} SBT type`,
        previewLink: { href: previewLink, caption: "Preview" },
      });
      showModal(TransactionPrompt, {});
      await tx.wait();

      dispatch(setFormLoading(false));
      updateTx({
        step: Step.success,
        message: "",
        txHash: tx.hash,
        previewLink: { href: previewLink, caption: "View" },
      });
    } catch (e: unknown) {
      updateTx({
        step: Step.error,
        message: "Error processing transaction!!!",
      });
      dispatch(setFormLoading(false));
      dispatch(
        setFormError({ title: `Error deploying ${metadata.name}`, details: "" })
      );
    }
  }

  async function update(metadata: AttestationFormValues) {
    try {
      if (!attestation) throw new Error("Attestation data not found");
      if (!account) throw Error("Check wallet connection and try again!!!");

      dispatch(setFormLoading(true));
      updateTx({ step: Step.submit, message: "Pinning update to IPFS..." });
      showModal(TransactionPrompt, {});

      const { mode, isDelegateRole, ...meta } = metadata;
      const { ipfsURL } = await pinAttestationMetadata(meta);
      const update = {
        ...attestation,
        metadataUri: ipfsURL,
        metadata: meta,
      } as PendingAttestation;
      dispatch(setAttestation({ address, attestation: update }));

      updateTx({ step: Step.submit, message: "Confirming transaction..." });

      const tx = await tokenContract.updateAttestationURI(
        BigNumber.from(tokenType).toString(),
        ipfsURL
      );

      updateTx({
        step: Step.broadcast,
        txHash: tx.hash,
        message: `Updating ${metadata.name} SBT type`,
      });

      await tx.wait();

      dispatch(setFormLoading(false));
      updateTx({ step: Step.success, message: "", txHash: tx.hash });
    } catch (e: unknown) {
      if (attestation)
        dispatch(setAttestation({ address, attestation: attestation }));
      updateTx({
        step: Step.error,
        message: `Error updating ${metadata.name}`,
      });
      dispatch(setFormLoading(false));
      dispatch(setFormError({ title: `Error updating ${metadata.name}` }));
    }
  }

  const lauchers: Record<LaunchMode, Launcher> = {
    create: launch,
    update: update,
  };

  return { launch: lauchers[mode], isLoading: form_loading };
}
