import {
  AdminUpdated as AdminUpdatedEvent,
  AttestationUpdated as AttestationUpdatedEvent,
  DelegatesUpdated as DelegatesUpdatedEvent,
  Issued as IssuedEvent,
  OwnershipTransferred as OwnershipTransferredEvent,
  Revoked as RevokedEvent,
  SocietyUpdated as SocietyUpdatedEvent
} from "../generated/MetadataHolder/MetadataHolder"
import {
  AdminUpdated,
  AttestationUpdated,
  DelegatesUpdated,
  Issued,
  OwnershipTransferred,
  Revoked,
  SocietyUpdated
} from "../generated/schema"

export function handleAdminUpdated(event: AdminUpdatedEvent): void {
  let entity = new AdminUpdated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.society = event.params.society
  entity.admin = event.params.admin

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleAttestationUpdated(event: AttestationUpdatedEvent): void {
  let entity = new AttestationUpdated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.society = event.params.society
  entity.attestationId = event.params.attestationId
  entity.uri = event.params.uri

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleDelegatesUpdated(event: DelegatesUpdatedEvent): void {
  let entity = new DelegatesUpdated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.society = event.params.society
  entity.attestationId = event.params.attestationId

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleIssued(event: IssuedEvent): void {
  let entity = new Issued(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.society = event.params.society
  entity.recipient = event.params.recipient
  entity.issuedBy = event.params.issuedBy
  entity.attestationId = event.params.attestationId
  entity.tokenId = event.params.tokenId

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleOwnershipTransferred(
  event: OwnershipTransferredEvent
): void {
  let entity = new OwnershipTransferred(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.previousOwner = event.params.previousOwner
  entity.newOwner = event.params.newOwner

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleRevoked(event: RevokedEvent): void {
  let entity = new Revoked(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.tokenId = event.params.tokenId
  entity.owner = event.params.owner
  entity.revokedBy = event.params.revokedBy

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleSocietyUpdated(event: SocietyUpdatedEvent): void {
  let entity = new SocietyUpdated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.society = event.params.society
  entity.uri = event.params.uri

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
