import { useMemo } from "react";
import { useGetSelectedTokens } from "services/admin/hooks";
import { Attestation, PendingAttestation } from "services/attestations/types";
import { ClearSelection, RevokerAction, Updater } from "./Triggers";

export default function ToolBar(props: {
  attestation: Attestation | PendingAttestation;
}) {
  const selectedTokens = useGetSelectedTokens();
  const isDeletedMode = useMemo(
    () => selectedTokens.some((t) => t.is_deleted === true),
    [selectedTokens]
  );
  return (
    <div className="flex justify-between items-center mb-5 text-neutrals-gray-7">
      <h1 className="text-left heading-2 pl-2">Recipients</h1>
      <div className="flex gap-2">
        {!isDeletedMode && <Updater attestation={props.attestation} />}
        {isDeletedMode && <RevokerAction />}
        {selectedTokens.length > 0 && <ClearSelection />}
      </div>
    </div>
  );
}
