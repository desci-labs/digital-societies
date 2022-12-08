import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt } from "@graphprotocol/graph-ts"
import {
  AdminUpdated,
  AttestationUpdated,
  DelegatesUpdated,
  Issued,
  OwnershipTransferred,
  Revoked,
  SocietyUpdated
} from "../generated/MetadataHolder/MetadataHolder"

export function createAdminUpdatedEvent(
  society: Address,
  admin: Address
): AdminUpdated {
  let adminUpdatedEvent = changetype<AdminUpdated>(newMockEvent())

  adminUpdatedEvent.parameters = new Array()

  adminUpdatedEvent.parameters.push(
    new ethereum.EventParam("society", ethereum.Value.fromAddress(society))
  )
  adminUpdatedEvent.parameters.push(
    new ethereum.EventParam("admin", ethereum.Value.fromAddress(admin))
  )

  return adminUpdatedEvent
}

export function createAttestationUpdatedEvent(
  society: Address,
  attestationId: i32,
  uri: string
): AttestationUpdated {
  let attestationUpdatedEvent = changetype<AttestationUpdated>(newMockEvent())

  attestationUpdatedEvent.parameters = new Array()

  attestationUpdatedEvent.parameters.push(
    new ethereum.EventParam("society", ethereum.Value.fromAddress(society))
  )
  attestationUpdatedEvent.parameters.push(
    new ethereum.EventParam(
      "attestationId",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(attestationId))
    )
  )
  attestationUpdatedEvent.parameters.push(
    new ethereum.EventParam("uri", ethereum.Value.fromString(uri))
  )

  return attestationUpdatedEvent
}

export function createDelegatesUpdatedEvent(
  society: Address,
  attestationId: i32
): DelegatesUpdated {
  let delegatesUpdatedEvent = changetype<DelegatesUpdated>(newMockEvent())

  delegatesUpdatedEvent.parameters = new Array()

  delegatesUpdatedEvent.parameters.push(
    new ethereum.EventParam("society", ethereum.Value.fromAddress(society))
  )
  delegatesUpdatedEvent.parameters.push(
    new ethereum.EventParam(
      "attestationId",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(attestationId))
    )
  )

  return delegatesUpdatedEvent
}

export function createIssuedEvent(
  society: Address,
  recipient: Address,
  issuedBy: Address,
  attestationId: i32,
  tokenId: BigInt
): Issued {
  let issuedEvent = changetype<Issued>(newMockEvent())

  issuedEvent.parameters = new Array()

  issuedEvent.parameters.push(
    new ethereum.EventParam("society", ethereum.Value.fromAddress(society))
  )
  issuedEvent.parameters.push(
    new ethereum.EventParam("recipient", ethereum.Value.fromAddress(recipient))
  )
  issuedEvent.parameters.push(
    new ethereum.EventParam("issuedBy", ethereum.Value.fromAddress(issuedBy))
  )
  issuedEvent.parameters.push(
    new ethereum.EventParam(
      "attestationId",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(attestationId))
    )
  )
  issuedEvent.parameters.push(
    new ethereum.EventParam(
      "tokenId",
      ethereum.Value.fromUnsignedBigInt(tokenId)
    )
  )

  return issuedEvent
}

export function createOwnershipTransferredEvent(
  previousOwner: Address,
  newOwner: Address
): OwnershipTransferred {
  let ownershipTransferredEvent = changetype<OwnershipTransferred>(
    newMockEvent()
  )

  ownershipTransferredEvent.parameters = new Array()

  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam(
      "previousOwner",
      ethereum.Value.fromAddress(previousOwner)
    )
  )
  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam("newOwner", ethereum.Value.fromAddress(newOwner))
  )

  return ownershipTransferredEvent
}

export function createRevokedEvent(
  tokenId: BigInt,
  owner: Address,
  revokedBy: Address
): Revoked {
  let revokedEvent = changetype<Revoked>(newMockEvent())

  revokedEvent.parameters = new Array()

  revokedEvent.parameters.push(
    new ethereum.EventParam(
      "tokenId",
      ethereum.Value.fromUnsignedBigInt(tokenId)
    )
  )
  revokedEvent.parameters.push(
    new ethereum.EventParam("owner", ethereum.Value.fromAddress(owner))
  )
  revokedEvent.parameters.push(
    new ethereum.EventParam("revokedBy", ethereum.Value.fromAddress(revokedBy))
  )

  return revokedEvent
}

export function createSocietyUpdatedEvent(
  society: Address,
  uri: string
): SocietyUpdated {
  let societyUpdatedEvent = changetype<SocietyUpdated>(newMockEvent())

  societyUpdatedEvent.parameters = new Array()

  societyUpdatedEvent.parameters.push(
    new ethereum.EventParam("society", ethereum.Value.fromAddress(society))
  )
  societyUpdatedEvent.parameters.push(
    new ethereum.EventParam("uri", ethereum.Value.fromString(uri))
  )

  return societyUpdatedEvent
}
