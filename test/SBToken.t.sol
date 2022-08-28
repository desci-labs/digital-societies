// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Test.sol";
import {console} from "forge-std/console.sol";
import "src/SBFactory.sol";
import {Utils} from "./Utils/Utils.sol";

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

    function testAdminRole() public {
        uint256 delegateRoleCount = sbt.getRoleMemberCount(sbt.DELEGATE_ROLE());
        uint256 adminRoleCount = sbt.getRoleMemberCount(
            sbt.DEFAULT_ADMIN_ROLE()
        );
        
        assertTrue(adminRoleCount == 1);
        assertTrue(delegateRoleCount == 1);
        assertEq(sbt.hasRole(sbt.DELEGATE_ROLE(), admin), true);
        assertEq(sbt.hasRole(sbt.DEFAULT_ADMIN_ROLE(), admin), true);
    }

    function testAddDelegates() public {
        vm.startPrank(admin);
        sbt.grantRole(sbt.DELEGATE_ROLE(), alice);
        sbt.grantRole(sbt.DELEGATE_ROLE(), sina);
        vm.stopPrank();(admin);

        uint256 delegateRoleCount = sbt.getRoleMemberCount(sbt.DELEGATE_ROLE());
        
        console.log("delegate count: ", delegateRoleCount);
        assertEq(delegateRoleCount, 3);
        assertEq(sbt.hasRole(sbt.DELEGATE_ROLE(), sina), true);
        assertEq(sbt.hasRole(sbt.DELEGATE_ROLE(), alice), true);
    }
    function testRemoveDelegates() public {
        vm.startPrank(admin);
        sbt.grantRole(sbt.DELEGATE_ROLE(), alice);
        sbt.grantRole(sbt.DELEGATE_ROLE(), sina);
        vm.stopPrank();(admin);

        uint256 delegateRoleCount = sbt.getRoleMemberCount(sbt.DELEGATE_ROLE());
        
        console.log("delegate count: ", delegateRoleCount);
        assertEq(delegateRoleCount, 3);
        assertEq(sbt.hasRole(sbt.DELEGATE_ROLE(), sina), true);
        assertEq(sbt.hasRole(sbt.DELEGATE_ROLE(), alice), true);

        vm.startPrank(admin);
        sbt.revokeRole(sbt.DELEGATE_ROLE(), alice);
        sbt.revokeRole(sbt.DELEGATE_ROLE(), sina);
        vm.stopPrank();(admin);

        delegateRoleCount = sbt.getRoleMemberCount(sbt.DELEGATE_ROLE());
        
        console.log("delegate count: ", delegateRoleCount);
        assertEq(delegateRoleCount, 1);
        assertEq(sbt.hasRole(sbt.DELEGATE_ROLE(), sina), false);
        assertEq(sbt.hasRole(sbt.DELEGATE_ROLE(), alice), false);
    }
    
    function testAdminMintSBToken() public {
        vm.startPrank(admin);

        sbt.mint(alice);

        vm.stopPrank();(admin);

        assertEq(sbt.balanceOf(alice), 1);
        assertEq(sbt.ownerOf(2), alice);
        assertEq(sbt.tokenToMinter(2), admin);
    }
    function testAdminRevokeSBToken() public {
        vm.startPrank(admin);

        sbt.mint(alice);

        vm.stopPrank();(admin);

        assertEq(sbt.balanceOf(alice), 1);
        assertEq(sbt.ownerOf(2), alice);
        assertEq(sbt.tokenToMinter(2), admin);

        vm.startPrank(admin);

        sbt.revoke(2);

        vm.stopPrank();(admin);

        assertEq(sbt.balanceOf(alice), 0);
        assertEq(sbt.tokenToMinter(2), address(0));
    }

    function testDelegateMintSBToken() public {
        vm.startPrank(admin);
        sbt.grantRole(sbt.DELEGATE_ROLE(), sina);
        vm.stopPrank();(admin);
        
        vm.startPrank(sina);
        sbt.mint(alice);
        vm.stopPrank();(sina);

        assertEq(sbt.balanceOf(alice), 1);
        assertEq(sbt.ownerOf(2), alice);
        assertEq(sbt.tokenToMinter(2), sina);
    }

    function testDelegateRevokeSBToken() public {
        vm.startPrank(admin);
        sbt.grantRole(sbt.DELEGATE_ROLE(), sina);
        vm.stopPrank();(admin);
        
        vm.startPrank(sina);
        sbt.mint(alice);
        vm.stopPrank();(sina);

        assertEq(sbt.balanceOf(alice), 1);
        assertEq(sbt.ownerOf(2), alice);
        assertEq(sbt.tokenToMinter(2), sina);

        vm.startPrank(sina);

        sbt.revoke(2);

        vm.stopPrank();(sina);

        assertEq(sbt.balanceOf(alice), 0);
        assertEq(sbt.tokenToMinter(2), address(0));
    }

    function testCannotMintSBToken() public {
        vm.startPrank(sina);
        
         vm.expectRevert(
            "AccessControl: account 0x075edf3ae919fbef9933f666bb0a95c6b80b04ed is missing role 0x663244bfd3de81cc055674c09ade24d4646b75863d5d9dd77d1544f2eb5acc26"
        );
        sbt.mint(alice);

        vm.stopPrank();(sina);
    }
    function testCannotRevokeSBToken() public {
        vm.startPrank(admin);
        sbt.mint(alice);
        vm.stopPrank();(admin);

        vm.startPrank(sina);

         vm.expectRevert(
            "AccessControl: account 0x075edf3ae919fbef9933f666bb0a95c6b80b04ed is missing role 0x663244bfd3de81cc055674c09ade24d4646b75863d5d9dd77d1544f2eb5acc26"
        );
        sbt.revoke(2);

        vm.stopPrank();(sina);
    }

    function testSetTokenMetadata() public {
        vm.startPrank(admin);

        sbt.mint(alice);
        string memory meta = string(
            abi.encodePacked("QmYtuTFMfStDRDgiSGxNgUdRVxU4w8yora27JjpqV6kdZw")
        );
        sbt.setTokenMetadata(2, meta);
        assertEq(sbt.getMetadata(2), meta);

        vm.stopPrank();(admin);
    }

    function testCannotSetTokenMetadata() public {
        vm.startPrank(admin);
        sbt.mint(alice);
        vm.stopPrank();(admin);

        vm.startPrank(alice);

        string memory meta = string(
            abi.encodePacked("QmYtuTFMfStDRDgiSGxNgUdRVxU4w8yora27JjpqV6kdZw")
        );
        vm.expectRevert("Only the minter of a token can set their metadata.");

        sbt.setTokenMetadata(2, meta);

        vm.stopPrank();(alice);
    }

    function testSetSBTMetadata() public {
        vm.startPrank(admin);

        string memory meta = string(
            abi.encodePacked("QmYtuTFMfStDRDgiSGxNgUdRVxU4w8yora27JjpqV6kdZw")
        );
        sbt.setSBTMetadata(meta);

        assertEq(sbt.getSBTMetadata(), meta);

        vm.stopPrank();(admin);
    }

    function testCannotSetSBTMetadata() public {
        string memory meta = string(
            abi.encodePacked("QmYtuTFMfStDRDgiSGxNgUdRVxU4w8yora27JjpqV6kdZw")
        );
        vm.expectRevert(
            "AccessControl: account 0xb4c79dab8f259c7aee6e5b2aa729821864227e84 is missing role 0x0000000000000000000000000000000000000000000000000000000000000000"
        );

        sbt.setSBTMetadata(meta);
    }
}
