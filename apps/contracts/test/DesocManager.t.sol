// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Test.sol";
import {console} from "forge-std/console.sol";
import "src/DesocManager.sol";
import {Utils} from "./Utils/Utils.sol";

contract DesocManagerTest is DesocManager, Test {
    Desoc sbt;
    Utils internal utils;

    address internal admin;
    
    address internal _forwarder = 0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9;

    constructor() DesocManager(_forwarder) {}
    function setUp() public {
        utils = new Utils();
        address[] memory users = new address[](1);
        users = utils.createUsers(1);

        admin = users[0];
        vm.label(admin, "Admin");
        vm.startPrank(admin);
    }

    function deploySBT() internal {
        string memory name = "Desci Labs";
        string memory symbol = "DSI";

        address deployed = this.deployToken(
            name,
            symbol,
            bytes("qmYtuTFMfStDRDgiSGxNgUdRVxU4w8yora27JjpqV6kdZw")
        );
        sbt = Desoc(deployed);

        assertEq(sbt.name(), name);
        assertEq(sbt.symbol(), symbol);
    }

    function testDeployedSBT() public {
        deploySBT();
        assertEq(sbt.totalSupply(), 0);
        assertEq(sbt.balanceOf(admin), 0);
        assertEq(sbt.hasRole(sbt.DEFAULT_ADMIN_ROLE(), admin), true);
        assertEq(sbt.contractURI(), bytes("qmYtuTFMfStDRDgiSGxNgUdRVxU4w8yora27JjpqV6kdZw"));
    }
}
