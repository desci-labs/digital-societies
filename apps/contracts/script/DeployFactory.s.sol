// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Script.sol";
import "src/DesocManager.sol";

contract FactoryScript is Script {
    // forwarder contract address on goerli
    address public forwarder = 0x7A95fA73250dc53556d264522150A940d4C50238;
    function setUp() public {}

    function run() public {
        vm.broadcast();
        new DesocManager(forwarder);
        vm.stopBroadcast();
    }
}
