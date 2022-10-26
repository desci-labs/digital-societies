// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Script.sol";
import { DesocManager } from "src/DesocManager.sol";

contract FactoryScript is Script {
    // forwarder contract address on goerli
    // address public forwarder = 0x7A95fA73250dc53556d264522150A940d4C50238;
    function setUp() public {}

    function run() public {
        vm.broadcast();
        address forwarder = vm.envAddress("FORWARDER");
        require(forwarder != address(0), "Please set the forwarder contract address in you .env file");
        new DesocManager(forwarder);
        vm.stopBroadcast();
    }
}
