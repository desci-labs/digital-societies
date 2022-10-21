import { Omit } from "@reduxjs/toolkit/dist/tsHelpers";
import { AttestationToken } from "services/attestations/types";

export type AttestationTokenRecipient = { address: string; is_added: boolean; is_deleted: boolean } // Pick<AttestationToken, "owner">; 