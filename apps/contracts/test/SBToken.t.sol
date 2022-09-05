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
        address[] memory users = new address[](4);
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
        string memory name = "Desci Labs";
        string memory symbol = "DSI";

        address deployed = this.deployToken(name, symbol);
        sbt = SBToken(deployed);

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
        uint16 _type = _mintTokenType();
        console.log("type", _type);
        sbt.mint(alice, _type);
        string memory tokenUri = sbt.tokenURI(1);
        string memory typeUri = sbt.typeURI(_type);
        assertTrue(keccak256(abi.encodePacked(tokenUri)) == keccak256(abi.encodePacked(typeUri)));
    }

    function testMint() public {
        uint16 _type = _mintTokenType();
        sbt.mint(alice, _type);

        assertEq(sbt.balanceOf(alice), 1);
        assertEq(sbt.ownerOf(1), alice);
        assertEq(sbt.tokenToMinter(1), admin);
    }
    function testAdminRevokeSBToken() public {
        uint16 _type = _mintTokenType();
        sbt.mint(alice, _type);

        assertEq(sbt.balanceOf(alice), 1);
        assertEq(sbt.ownerOf(1), alice);
        assertEq(sbt.tokenToMinter(1), admin);

        sbt.revoke(1);

        assertEq(sbt.balanceOf(alice), 0);
        assertEq(sbt.tokenToMinter(1), address(0));
    }

    function testBatchMint() public {
        uint16 _tokenType = _mintTokenType();
        address[] memory users = new address[](10);
        users = utils.createUsers(10);

        sbt.batchMint(users, _tokenType);

        assertEq(sbt.totalSupply(), 10);

        for (uint i = 0; i < users.length; i++) {
            assertEq(sbt.balanceOf(users[i]), 1);
            assertEq(sbt.ownerOf(i + 1), users[i]);
            assertEq(sbt.tokenToMinter(i + 1), admin);
        }
    }

    function testBatchRevoke() public {
        uint16 _tokenType = _mintTokenType();
        address[] memory users = new address[](10);
        users = utils.createUsers(10);

        sbt.batchMint(users, _tokenType);
        uint len = sbt.totalSupply();

        assertEq(users.length, len);
        
        uint[] memory tokens = new uint[](len);
        for (uint i = 0; i < len; i++) {
            tokens[i] = i + 1;
        }
        emit log_named_array("tokens: ", tokens);
        sbt.batchRevoke(tokens);

        for (uint i = 0; i < users.length; i++) {
            assertEq(sbt.balanceOf(users[i]), 0);
            assertEq(sbt.tokenToMinter(i + 1), address(0));
        }
    }

    function testDelegateMintSBToken() public {
        sbt.grantRole(sbt.DELEGATE_ROLE(), sina);
        
        changePrank(sina);

        uint16 _type = _mintTokenType();
        sbt.mint(alice, _type);

        assertEq(sbt.balanceOf(alice), 1);
        assertEq(sbt.ownerOf(1), alice);
        assertEq(sbt.tokenToMinter(1), sina);
    }

    function testDelegateRevokeSBToken() public {
        sbt.grantRole(sbt.DELEGATE_ROLE(), sina);
        
        changePrank(sina);
        uint16 _type = _mintTokenType();
        sbt.mint(alice, _type);

        assertEq(sbt.balanceOf(alice), 1);
        assertEq(sbt.ownerOf(1), alice);
        assertEq(sbt.tokenToMinter(1), sina);

        sbt.revoke(1);

        assertEq(sbt.balanceOf(alice), 0);
        assertEq(sbt.tokenToMinter(2), address(0));
    }

    function testCannotMintSBToken() public {
        uint16 _type = _mintTokenType();
        vm.stopPrank();(admin);
        vm.expectRevert(
            bytes(string(abi.encodePacked("AccessControl: account 0xb4c79dab8f259c7aee6e5b2aa729821864227e84 is missing role 0x663244bfd3de81cc055674c09ade24d4646b75863d5d9dd77d1544f2eb5acc26")))
        );
        
        sbt.mint(alice, _type);
    }
    function testCannotRevokeSBToken() public {
        uint16 _type = _mintTokenType();
        sbt.mint(alice, _type);

        changePrank(sina);

        vm.expectRevert(
            "AccessControl: account 0x075edf3ae919fbef9933f666bb0a95c6b80b04ed is missing role 0x663244bfd3de81cc055674c09ade24d4646b75863d5d9dd77d1544f2eb5acc26"
        );
        sbt.revoke(1);

    }

    function testUpdateTokenIdType() public {
        uint16 _type = _mintTokenType();
        uint16 _type2 = _mintTokenType();
        
        string memory meta = string(
            abi.encodePacked("UpdatedURI")
        );
        sbt.updateTypeURI(_type2, meta);
        
        sbt.mint(alice, _type);

        sbt.updateTokenIdType(1, _type2);

        assertEq(sbt.tokenURI(1), meta);
    }

    function testCannotUpdateTypeURI() public {
        uint16 _type = _mintTokenType();
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
        uint16 _tokenType = _mintTokenType();
        uint16 _tokenType2 = _mintTokenType();
        sbt.updateTypeURI(_tokenType, "qmYtuTFMfStDRDgiSGxNgUdRVxU4w8yora27JjpqV6kdZw");
        sbt.updateTypeURI(_tokenType2, "ipfshash2");
        assertTrue(keccak256(abi.encodePacked(sbt.typeURI(_tokenType))) == keccak256(abi.encodePacked("qmYtuTFMfStDRDgiSGxNgUdRVxU4w8yora27JjpqV6kdZw")));
        assertTrue(keccak256(abi.encodePacked(sbt.typeURI(_tokenType2))) == keccak256(abi.encodePacked("ipfshash2")));
    }

    function _mintTokenType() internal returns(uint16 _tokenType) {
        sbt.mintTokenType("QmYtuTFMfStDRDgiSGxNgUdRVxU4w8yora27JjpqV6kdZw");
        _tokenType = sbt.totalTypes();
        assertTrue(_tokenType > 0);
        assertTrue(keccak256(abi.encodePacked((sbt.typeURI(_tokenType)))) == keccak256(abi.encodePacked("QmYtuTFMfStDRDgiSGxNgUdRVxU4w8yora27JjpqV6kdZw")));

        _tokenType;
    }
}