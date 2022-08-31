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

        vm.startPrank(admin);
        deploySBT();
    }

    function deploySBT() internal {
        // vm.startPrank(admin);
        string memory name = "Desci Labs";
        string memory symbol = "DSI";

        address deployed = this.deployToken(name, symbol);
        sbt = SBToken(deployed);
        // vm.stopPrank();(admin);

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
        // vm.startPrank(admin);
        sbt.grantRole(sbt.DELEGATE_ROLE(), alice);
        sbt.grantRole(sbt.DELEGATE_ROLE(), sina);
        // vm.stopPrank();(admin);

        uint256 delegateRoleCount = sbt.getRoleMemberCount(sbt.DELEGATE_ROLE());
        
        assertEq(delegateRoleCount, 3);
        assertEq(sbt.hasRole(sbt.DELEGATE_ROLE(), sina), true);
        assertEq(sbt.hasRole(sbt.DELEGATE_ROLE(), alice), true);
    }
    
    function testRemoveDelegates() public {
        // vm.startPrank(admin);
        sbt.grantRole(sbt.DELEGATE_ROLE(), alice);
        sbt.grantRole(sbt.DELEGATE_ROLE(), sina);
        // vm.stopPrank();(admin);

        uint256 delegateRoleCount = sbt.getRoleMemberCount(sbt.DELEGATE_ROLE());
        
        assertEq(delegateRoleCount, 3);
        assertEq(sbt.hasRole(sbt.DELEGATE_ROLE(), sina), true);
        assertEq(sbt.hasRole(sbt.DELEGATE_ROLE(), alice), true);

        // vm.startPrank(admin);
        sbt.revokeRole(sbt.DELEGATE_ROLE(), alice);
        sbt.revokeRole(sbt.DELEGATE_ROLE(), sina);
        // vm.stopPrank();(admin);

        delegateRoleCount = sbt.getRoleMemberCount(sbt.DELEGATE_ROLE());
        
        assertEq(delegateRoleCount, 1);
        assertEq(sbt.hasRole(sbt.DELEGATE_ROLE(), sina), false);
        assertEq(sbt.hasRole(sbt.DELEGATE_ROLE(), alice), false);
    }

    function testTokenUriIsTypeURI() public {
        // vm.startPrank(admin);
        string memory _type = _addTokenType("type1");
        sbt.mint(alice, _type);
        // vm.stopPrank();(admin);
        string memory tokenUri = sbt.tokenURI(1);
        string memory typeUri = sbt.typeURI(_type);
        emit log_named_string("token", tokenUri);
        emit log_named_string("type", typeUri);
        console.log("isEqual", keccak256(abi.encodePacked(tokenUri)) == keccak256(abi.encodePacked(typeUri)));
        assertTrue(keccak256(abi.encodePacked(tokenUri)) == keccak256(abi.encodePacked(typeUri)));
    }

    function testAdminMintSBToken() public {
        string memory _type = _addTokenType("type1");
        sbt.mint(alice, _type);

        assertEq(sbt.balanceOf(alice), 1);
        assertEq(sbt.ownerOf(1), alice);
        assertEq(sbt.tokenToMinter(1), admin);
    }
    function testAdminRevokeSBToken() public {
        string memory _type = _addTokenType("type1");
        sbt.mint(alice, _type);

        assertEq(sbt.balanceOf(alice), 1);
        assertEq(sbt.ownerOf(1), alice);
        assertEq(sbt.tokenToMinter(1), admin);

        sbt.revoke(1);

        assertEq(sbt.balanceOf(alice), 0);
        assertEq(sbt.tokenToMinter(1), address(0));
    }

    function testDelegateMintSBToken() public {
        sbt.grantRole(sbt.DELEGATE_ROLE(), sina);
        
        changePrank(sina);

        string memory _type = _addTokenType("type1");
        sbt.mint(alice, _type);

        assertEq(sbt.balanceOf(alice), 1);
        assertEq(sbt.ownerOf(1), alice);
        assertEq(sbt.tokenToMinter(1), sina);
    }

    function testDelegateRevokeSBToken() public {
        sbt.grantRole(sbt.DELEGATE_ROLE(), sina);
        
        changePrank(sina);
        string memory _type = _addTokenType("type1");
        sbt.mint(alice, _type);

        assertEq(sbt.balanceOf(alice), 1);
        assertEq(sbt.ownerOf(1), alice);
        assertEq(sbt.tokenToMinter(1), sina);

        sbt.revoke(1);

        assertEq(sbt.balanceOf(alice), 0);
        assertEq(sbt.tokenToMinter(2), address(0));
    }

    function testCannotMintSBToken() public {
        string memory _type = _addTokenType("type1");
        vm.stopPrank();(admin);
        vm.expectRevert(
            bytes(string(abi.encodePacked("AccessControl: account 0xb4c79dab8f259c7aee6e5b2aa729821864227e84 is missing role 0x663244bfd3de81cc055674c09ade24d4646b75863d5d9dd77d1544f2eb5acc26")))
        );
        
        sbt.mint(alice, _type);
    }
    function testCannotRevokeSBToken() public {
        string memory _type = _addTokenType("type1");
        sbt.mint(alice, _type);

        changePrank(sina);

        vm.expectRevert(
            "AccessControl: account 0x075edf3ae919fbef9933f666bb0a95c6b80b04ed is missing role 0x663244bfd3de81cc055674c09ade24d4646b75863d5d9dd77d1544f2eb5acc26"
        );
        sbt.revoke(1);

    }

    function testUpdateTokenIdType() public {
        string memory _type = _addTokenType("type1");
        string memory _type2 = _addTokenType("type2");
        
        string memory meta = string(
            abi.encodePacked("UpdatedURI")
        );
        sbt.updateTypeURI(_type2, meta);
        
        sbt.mint(alice, _type);

        sbt.updateTokenIdType(1, _type2);

        assertEq(sbt.tokenURI(1), meta);
    }

    function testCannotUpdateTypeURI() public {
        string memory _type = _addTokenType("type1");
        sbt.mint(alice, _type);
        
        vm.stopPrank();(admin);

        string memory meta = string(
            abi.encodePacked("updatedtypeuri")
        );
        vm.expectRevert("AccessControl: account 0xb4c79dab8f259c7aee6e5b2aa729821864227e84 is missing role 0x0000000000000000000000000000000000000000000000000000000000000000");

        sbt.updateTypeURI(_type, meta);
    }

    function testSetContractURI() public {
        string memory meta = string(
            abi.encodePacked("QmYtuTFMfStDRDgiSGxNgUdRVxU4w8yora27JjpqV6kdZw")
        );

        sbt.setContractURI(meta);

        assertEq(sbt.contractURI(), meta);
    }

    function testCannotSetContractURI() public {
        changePrank(sina);
        string memory meta = string("QmYtuTFMfStDRDgiSGxNgUdRVxU4w8yora27JjpqV6kdZw");
        vm.expectRevert(
            "AccessControl: account 0x075edf3ae919fbef9933f666bb0a95c6b80b04ed is missing role 0x0000000000000000000000000000000000000000000000000000000000000000"
        );

        sbt.setContractURI(meta);
    }

    function testUpdateTokenType() public {
        string memory _type = "type1";
        sbt.createTokenType(_type, "QmYtuTFMfStDRDgiSGxNgUdRVxU4w8yora27JjpqV6kdZw");

        assertTrue(sbt.tokenTypes(_type) == true);
        assertTrue(keccak256(abi.encodePacked((sbt.typeURI(_type)))) == keccak256(abi.encodePacked("QmYtuTFMfStDRDgiSGxNgUdRVxU4w8yora27JjpqV6kdZw")));

        sbt.updateTypeURI(_type, "qmYtuTFMfStDRDgiSGxNgUdRVxU4w8yora27JjpqV6kdZw");
        assertTrue(keccak256(abi.encodePacked(sbt.typeURI(_type))) == keccak256(abi.encodePacked("qmYtuTFMfStDRDgiSGxNgUdRVxU4w8yora27JjpqV6kdZw")));
    }

    function _addTokenType(string memory _type) internal returns(string memory) {
        sbt.createTokenType(_type, "QmYtuTFMfStDRDgiSGxNgUdRVxU4w8yora27JjpqV6kdZw");
        assertTrue(sbt.tokenTypes(_type) == true);
        assertTrue(keccak256(abi.encodePacked((sbt.typeURI(_type)))) == keccak256(abi.encodePacked("QmYtuTFMfStDRDgiSGxNgUdRVxU4w8yora27JjpqV6kdZw")));

        return _type;
    }
}
