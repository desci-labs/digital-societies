// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Script.sol";
import "src/SBFactory.sol";

contract FactoryScript is Script {
    function setUp() public {}

    function run() public {
        vm.broadcast();
        SBFactory factory = new SBFactory();
        vm.stopBroadcast();
    }
}
