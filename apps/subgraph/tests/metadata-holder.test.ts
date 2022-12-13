import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { Address, BigInt } from "@graphprotocol/graph-ts"
import { AdminUpdated } from "../generated/schema"
import { AdminUpdated as AdminUpdatedEvent } from "../generated/MetadataHolder/MetadataHolder"
import { handleAdminUpdated } from "../src/metadata-holder"
import { createAdminUpdatedEvent } from "./metadata-holder-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let society = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let admin = Address.fromString("0x0000000000000000000000000000000000000001")
    let newAdminUpdatedEvent = createAdminUpdatedEvent(society, admin)
    handleAdminUpdated(newAdminUpdatedEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("AdminUpdated created and stored", () => {
    assert.entityCount("AdminUpdated", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "AdminUpdated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "society",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "AdminUpdated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "admin",
      "0x0000000000000000000000000000000000000001"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
