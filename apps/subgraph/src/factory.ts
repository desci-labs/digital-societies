import {
  Deployed as DeployedEvent,
  Refuted as RefutedEvent,
  Verified as VerifiedEvent,
} from "../data/generated/Factory/Factory";
import { Society } from "../data/generated/schema";

export function handleDeployed(event: DeployedEvent): void {
  let entity = new Society(event.params.token);
  entity.admin = event.params.owner;
  entity.metadataUri = event.params.contractUri;
  entity.createdAt = event.block.timestamp;
  entity.updatedAt = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;
  entity.verified = false;
  entity.delegateRoleId = "";
  entity.save();
}

export function handleRefuted(event: RefutedEvent): void {
  let entity = Society.load(event.params.org);

  if (!entity) {
    return;
  }

  entity.verified = false;
  entity.updatedAt = event.block.timestamp;
  entity.save();
}

export function handleVerified(event: VerifiedEvent): void {
  let entity = Society.load(event.params.org);

  if (!entity) {
    return;
  }

  entity.verified = true;
  entity.updatedAt = event.block.timestamp;
  entity.save();
}
