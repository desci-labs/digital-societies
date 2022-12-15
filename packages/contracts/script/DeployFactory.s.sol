// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Script.sol";
import {Factory} from "src/Factory.sol";
import {MetadataHolder} from "src/MetadataHolder.sol";

contract FactoryScript is Script {
    // forwarder contract address on goerli
    // address public forwarder = 0x7A95fA73250dc53556d264522150A940d4C50238;
    function setUp() public {}

    function run() public {
        vm.broadcast();
        address forwarder = vm.envAddress("FORWARDER");
        require(
            forwarder != address(0),
            "Please set the forwarder contract address in you .env file"
        );
        Factory factory = new Factory(forwarder);
        console.log("factory:", address(factory));
        vm.stopBroadcast();
    }
}

contract MetadataScript is Script {
    // address factory = vm.envAddress("Factory");
    function setUp() public {}

    function run() public {
         vm.broadcast();
        // address factory = vm.envAddress("Factory");
        // console.log("factory:", factory);
        MetadataHolder meta = new MetadataHolder(address(0x69301853f23a924258Db97A955454ac71d07e528));
        console.log("meta:", address(meta));
        vm.stopBroadcast();
    }
}
