import { Bytes } from "@graphprotocol/graph-ts";
import {
  AdminUpdated as AdminUpdatedEvent,
  AttestationUpdated as AttestationUpdatedEvent,
  DelegatesUpdated as DelegatesUpdatedEvent,
  Issued as IssuedEvent,
  Revoked as RevokedEvent,
  SocietyUpdated as SocietyUpdatedEvent,
} from "../generated/MetadataHolder/MetadataHolder";
import { Attestation, Society, Token } from "../generated/schema";

export function handleAdminUpdated(event: AdminUpdatedEvent): void {
  let society = Society.load(event.params.society);
  if (!society) {
    society = new Society(event.params.society);
  }
  society.admin = event.params.admin;
  society.updatedAt = event.block.timestamp;
  society.save();
}

export function handleAttestationUpdated(event: AttestationUpdatedEvent): void {
  let entity = Attestation.load(Bytes.fromBigInt(event.params.attestationId));
  if (!entity) {
    entity = new Attestation(Bytes.fromBigInt(event.params.attestationId));
    entity.createdAt = event.block.timestamp;
  }
  entity.society = event.params.society;
  entity.metadataUri = event.params.uri;
  entity.updatedAt = event.block.timestamp;
  entity.save();
}

export function handleDelegatesUpdated(event: DelegatesUpdatedEvent): void {
  let entity = Society.load(event.params.society);
  if (!entity) return;
  entity.delegateRoleId = event.params.attestationId;
  entity.save();
}

export function handleIssued(event: IssuedEvent): void {
  let id = event.params.recipient
    .toHexString()
    .concat(
      event.params.attestationId
        .toString()
        .concat(event.params.tokenId.toString())
    );
  let entity = Token.load(id);
  if (!entity) {
    entity = new Token(id);
  }

  entity.society = event.params.society;
  entity.issuedBy = event.params.issuedBy;
  entity.attestation = Bytes.fromBigInt(event.params.attestationId);
  entity.tokenId = event.params.tokenId;
  entity.issuedAt = event.block.timestamp;
  entity.save();
}

export function handleRevoked(event: RevokedEvent): void {
  let id = event.params._owner
    .toHexString()
    .concat(
      event.params.attestationId
        .toString()
        .concat(event.params.tokenId.toString())
    );
  let entity = Token.load(id);
  if (!entity) return;
  entity.active = false;
  entity.attestation = Bytes.fromBigInt(event.params.attestationId);
  entity.revokedBy = event.params.revokedBy;
  entity.revokedAt = event.block.timestamp;
  entity.save();
}

export function handleSocietyUpdated(event: SocietyUpdatedEvent): void {
  let society = Society.load(event.params.society);
  if (!society) {
    society = new Society(event.params.society);
  }
  society.createdAt = event.block.timestamp;
  society.updatedAt = event.block.timestamp;
  society.metadataUri = event.params.uri;
  society.save();
}
