// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Test.sol";
import { console } from "forge-std/console.sol";
import "src/SBFactory.sol";
import { Utils } from "./Utils/Utils.sol";

// test emiited events
// test token minting, transfer and burn
contract SBTokenTest is SBFactory, Test {
    SBToken sbt;
    Utils internal utils;
    
    address internal admin;
    address internal alice;
    address internal sina;
    address internal bob;
    
    function setUp() public {
        utils = new Utils();
        address payable[] memory users = new address payable[](4);
        users = utils.createUsers(4);

        admin = users[0];
        alice = users[1];
        bob = users[2];
        sina = users[3];
        vm.label(admin, "Admin");
        vm.label(alice, "Alice");
        vm.label(sina, "Sina");
        vm.label(bob, "Bob");

        deploySBT();
    }

   function deploySBT() internal {
        vm.startPrank(admin);
        string memory name = "Desci Labs";
        string memory symbol = "DSI";
        address[] memory initials = new address[](1);
        initials[0] = admin;
        
        address sbtAddress = this.deployToken(name, symbol, initials);
        sbt = SBToken(sbtAddress);
        vm.stopPrank();(admin);
        
        assertEq(sbt.name(), name);
        assertEq(sbt.symbol(), symbol);
    }

     function testMintToAlice() public {
        vm.startPrank(admin);
        
        sbt.mint(alice);
        
        vm.stopPrank();(admin);
        
        assertEq(sbt.balanceOf(alice), 1);
        assertEq(sbt.ownerOf(2), alice);
        assertEq(sbt.tokenToMinter(2), admin);
    }

    function testSetTokenMetadata() public {
        vm.startPrank(admin);
        
        sbt.mint(alice);
        string memory meta = string(abi.encodePacked("QmYtuTFMfStDRDgiSGxNgUdRVxU4w8yora27JjpqV6kdZw"));
        sbt.setTokenMetadata(2, meta);
        assertEq(sbt.getMetadata(2), meta);
        
        vm.stopPrank();(admin);
    }
    function testCannotSetTokenMetadata() public {    
        vm.startPrank(admin);

        sbt.mint(alice);
        vm.stopPrank();(admin);

        vm.startPrank(alice);

        string memory meta = string(abi.encodePacked("QmYtuTFMfStDRDgiSGxNgUdRVxU4w8yora27JjpqV6kdZw"));
        vm.expectRevert("Only the minter of a token can set their metadata.");
        sbt.setTokenMetadata(2, meta);

        vm.stopPrank();(alice);        
    }

    function testSetSBTMetadata() public {
        vm.startPrank(admin);
        
        string memory meta = string(abi.encodePacked("QmYtuTFMfStDRDgiSGxNgUdRVxU4w8yora27JjpqV6kdZw"));
        sbt.setSBTMetadata(meta);

        assertEq(sbt.getSBTMetadata(), meta);
        
        vm.stopPrank();(admin);
    }

    function testCannotSetSBTMetadata() public {    
        string memory meta = string(abi.encodePacked("QmYtuTFMfStDRDgiSGxNgUdRVxU4w8yora27JjpqV6kdZw"));
        vm.expectRevert("Only an admin or authorized delegate can set contract metadata.");
        sbt.setSBTMetadata(meta);
    }
}
