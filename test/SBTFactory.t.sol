// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Test.sol";
import "src/SBTFactory.sol";

// test emiited events
// test token minting, transfer and burn
contract ContractTest is Test {
    address admin = 0x114EA4c82a0B5d54Ce5697272a2De2e4a14D654C;
    function setUp() public {}

    function testDeploySBT() public {
        vm.prank(admin);
        assertTrue(true);
        SBTFactory factory = new SBTFactory();

        string memory name = "Desci Labs";
        string memory symbol = "DSI";
        address[] memory initials;
        
        address sbtAddress = factory.deployToken(name, symbol, initials);
        SBToken sbt = SBToken(sbtAddress);
        
        assertTrue(factory.getTokensLength() == 1);
        assertTrue(factory.isValidToken(sbtAddress) == true);

        assertEq(sbt.totalSupply(), 0);

        emit log_named_string("Token name: ", sbt.name());
        emit log_named_string("Token symbol: ", sbt.symbol());
    }
}
