import { newMockEvent } from "matchstick-as"
import { ethereum, Address } from "@graphprotocol/graph-ts"
import {
  Deployed,
  Paused,
  Refuted,
  Unpaused,
  Verified
} from "../generated/Factory/Factory"

export function createDeployedEvent(
  token: Address,
  owner: Address,
  contractUri: string
): Deployed {
  let deployedEvent = changetype<Deployed>(newMockEvent())

  deployedEvent.parameters = new Array()

  deployedEvent.parameters.push(
    new ethereum.EventParam("token", ethereum.Value.fromAddress(token))
  )
  deployedEvent.parameters.push(
    new ethereum.EventParam("owner", ethereum.Value.fromAddress(owner))
  )
  deployedEvent.parameters.push(
    new ethereum.EventParam(
      "contractUri",
      ethereum.Value.fromString(contractUri)
    )
  )

  return deployedEvent
}

export function createPausedEvent(account: Address): Paused {
  let pausedEvent = changetype<Paused>(newMockEvent())

  pausedEvent.parameters = new Array()

  pausedEvent.parameters.push(
    new ethereum.EventParam("account", ethereum.Value.fromAddress(account))
  )

  return pausedEvent
}

export function createRefutedEvent(org: Address): Refuted {
  let refutedEvent = changetype<Refuted>(newMockEvent())

  refutedEvent.parameters = new Array()

  refutedEvent.parameters.push(
    new ethereum.EventParam("org", ethereum.Value.fromAddress(org))
  )

  return refutedEvent
}

export function createUnpausedEvent(account: Address): Unpaused {
  let unpausedEvent = changetype<Unpaused>(newMockEvent())

  unpausedEvent.parameters = new Array()

  unpausedEvent.parameters.push(
    new ethereum.EventParam("account", ethereum.Value.fromAddress(account))
  )

  return unpausedEvent
}

export function createVerifiedEvent(org: Address): Verified {
  let verifiedEvent = changetype<Verified>(newMockEvent())

  verifiedEvent.parameters = new Array()

  verifiedEvent.parameters.push(
    new ethereum.EventParam("org", ethereum.Value.fromAddress(org))
  )

  return verifiedEvent
}
