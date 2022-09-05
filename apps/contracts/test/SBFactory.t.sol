// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Test.sol";
import { console } from "forge-std/console.sol";
import "src/SBFactory.sol";
import { Utils } from "./Utils/Utils.sol";

contract SBFactoryTest is SBFactory, Test {
    SBToken sbt;
    Utils internal utils;
    
    address internal admin;
    
    function setUp() public {
        utils = new Utils();
        address[] memory users = new address[](1);
        users = utils.createUsers(1);

        admin = users[0];
        vm.label(admin, "Admin");
    }

    function deploySBT() internal {
        vm.startPrank(admin);
        string memory name = "Desci Labs";
        string memory symbol = "DSI";
        
        address deployed = this.deployToken(name, symbol);
        sbt = SBToken(deployed);
        vm.stopPrank();(admin);
        
        assertEq(sbt.name(), name);
        assertEq(sbt.symbol(), symbol);
    }

    function testDeployedSBT() public {
        deploySBT();
        assertEq(sbt.totalSupply(), 0);
        assertEq(sbt.balanceOf(admin), 0);
        assertEq(sbt.hasRole(sbt.DEFAULT_ADMIN_ROLE(), admin), true);
    }

}
