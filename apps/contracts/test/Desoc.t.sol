// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Test.sol";
import {Factory} from "src/Factory.sol";
import {Desoc} from "src/Desoc.sol";
import {console} from "forge-std/console.sol";
import {Utils} from "./Utils/Utils.sol";
import {MetadataHolder} from "src/MetadataHolder.sol";

contract DesocTest is Test {
    Desoc sbt;
    Factory factory;
    Utils internal utils;
    address private metadataHolderAddress;
    address internal admin;
    address internal alice;
    address internal sina;
    address internal delegate1;
    address internal delegate2;

    address internal _forwarder = 0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9;

    string public metadataURI =
        "https://w3s.link/ipfs/bafkreifdry6syjhedfl2xgjhyy62lsvhgy5tls4cmxtfn6rv7j6gz5455y";
    string public metadataURI2 =
        "https://w3s.link/ipfs/bafkreidszg5xvxxkhen4nyfyhz6ooueohcyo2yfgysi4ccqmxgioys65dy";

    function setUp() public {
        utils = new Utils();
        address[] memory users = new address[](5);
        users = utils.createUsers(5);

        admin = users[0];
        alice = users[1];
        sina = users[2];
        delegate1 = users[3];
        delegate2 = users[4];
        vm.label(admin, "Admin");
        vm.label(alice, "Alice");
        vm.label(sina, "Sina");
        vm.label(delegate1, "delegate1");
        vm.label(delegate2, "delegate2");

        factory = new Factory(_forwarder);
        MetadataHolder meta = new MetadataHolder(address(factory));
        metadataHolderAddress = address(meta);
        factory.setMetaAddress(metadataHolderAddress);
        deploySBT();
    }

    function deploySBT() internal {
        string memory name = "Desci Labs";
        string memory symbol = "DSI";

        address deployed = factory.deployToken(name, symbol, metadataURI);
        sbt = Desoc(deployed);

        assertEq(sbt.name(), name);
        assertEq(sbt.symbol(), symbol);
        assertEq(sbt.owner(), address(this));
    }

    function testTransferOwnership() public {
        sbt.transferOwnership(admin);
        assertEq(sbt.owner(), admin);
    }

    function testFailTransferOwnership() public {
        vm.startPrank(admin);
        sbt.transferOwnership(admin);
        assertEq(sbt.owner(), address(this));
    }

    function testCreateDelegateAttestation() public {
        uint16 roleId = _createDelegateSbt();
        assertEq(sbt.delegateRoleId(), roleId);
    }

    function testUpdateDelegateRoleId() public {
        uint16 roleId = _createDelegateSbt();
        assertEq(sbt.delegateRoleId(), roleId);
        uint16 attestationId = _createAttestation();
        sbt.setDelegateRole(attestationId);
        assertEq(sbt.delegateRoleId(), attestationId);
        assertEq(sbt.totalTypes(), 2);
    }

    function testRemoveDelegateRole() public {
        uint16 roleId = _createDelegateSbt();
        sbt.removeDelegateRole();
        assertEq(sbt.delegateRoleId(), 0);
    }

    function testFailUpdateDelegateRole() public {
        uint16 roleId = _createDelegateSbt();
        assertEq(sbt.delegateRoleId(), roleId);
        uint16 attestationId = _createAttestation();
        vm.startPrank(admin);
        sbt.setDelegateRole(attestationId);
        assertEq(sbt.delegateRoleId(), roleId);
    }

    function testFailDelegatesUpdateDelegateRole() public {
        _createDelegate();
        vm.startPrank(delegate1);
        uint16 id = _createAttestation();
        sbt.setDelegateRole(id);
    }

    function testDelegateCreateAttestation() public {
        _createDelegate();
        vm.startPrank(delegate1);
        _createAttestation();
    }

    function testDelegateIssueSbt() public {
        _createDelegate();
        vm.startPrank(delegate1);
        uint16 attestationId = _createAttestation();
        sbt.mint(sina, attestationId);
        assertEq(sbt.balanceOf(sina), 1);
        assertEq(sbt.tokenIdToType(2), attestationId);
    }

    function testDelegateRevokeSbt() public {
        _createDelegate();
        vm.startPrank(delegate1);
        sbt.mint(sina, sbt.delegateRoleId());
        sbt.mint(alice, sbt.delegateRoleId());
        sbt.revoke(2);
        sbt.revoke(3);
        assertEq(sbt.balanceOf(sina), 0);
        assertEq(sbt.balanceOf(alice), 0);
    }

    function testTokenUriIsAttestationURI() public {
        uint16 _type = _createAttestation();
        sbt.mint(alice, _type);
        string memory tokenUri = sbt.tokenURI(1);
        string memory typeUri = sbt.typeURI(_type);
        assertTrue(
            keccak256(abi.encodePacked(tokenUri)) ==
                keccak256(abi.encodePacked(typeUri))
        );
    }

    function testMint() public {
        uint16 _type = _createAttestation();
        sbt.mint(alice, _type);

        assertEq(sbt.balanceOf(alice), 1);
        assertEq(sbt.ownerOf(1), alice);
    }

    function tesCannotIssueCredentialTwice() public {
        uint16 _type = _createAttestation();
        sbt.mint(alice, _type);
        vm.expectRevert(
            bytes(string(abi.encodePacked("Duplicate credential")))
        );
        sbt.mint(alice, _type);
    }

    function testAdminRevokeSBToken() public {
        uint16 _type = _createAttestation();
        sbt.mint(alice, _type);

        assertEq(sbt.balanceOf(alice), 1);
        assertEq(sbt.ownerOf(1), alice);

        sbt.revoke(1);

        assertEq(sbt.balanceOf(alice), 0);
    }

    function testBatchMint() public {
        uint16 _tokenType = _createAttestation();
        address[] memory users = new address[](10);
        users = utils.createUsers(10);

        sbt.batchMint(users, _tokenType);

        assertEq(sbt.totalSupply(), 10);

        for (uint256 i = 0; i < users.length; i++) {
            assertEq(sbt.balanceOf(users[i]), 1);
            assertEq(sbt.ownerOf(i + 1), users[i]);
        }
    }

    function testBatchRevoke() public {
        uint16 _tokenType = _createAttestation();
        address[] memory users = new address[](10);
        users = utils.createUsers(10);

        sbt.batchMint(users, _tokenType);
        uint256 len = sbt.totalSupply();

        assertEq(users.length, len);

        uint256[] memory tokens = new uint256[](len);
        for (uint256 i = 0; i < len; i++) {
            tokens[i] = i + 1;
        }
        emit log_named_array("tokens: ", tokens);
        sbt.batchRevoke(tokens);

        for (uint256 i = 0; i < users.length; i++) {
            assertEq(sbt.balanceOf(users[i]), 0);
        }
    }

    function testFailMintSBToken() public {
        uint16 _type = _createAttestation();
        vm.startPrank(admin);
        sbt.mint(alice, _type);
        vm.stopPrank();
        (admin);
    }

    function testFailRevokeSBToken() public {
        uint16 _type = _createAttestation();
        sbt.mint(alice, _type);

        // switch signer to sina
        changePrank(sina);

        sbt.revoke(1);
    }

    function testFailUpdateAttestationURI() public {
        uint16 _type = _createAttestation();
        sbt.mint(alice, _type);

        // switch signer to admin address
        changePrank(admin);

        sbt.updateAttestationURI(_type, metadataURI);
    }

    function testCannotSetInvalidTypeURI() public {
        uint16 _type = _createAttestation();
        sbt.mint(alice, _type);

        vm.expectRevert("Invalid typeURI");
        sbt.updateAttestationURI(_type, "");
    }

    function testSetContractURI() public {
        sbt.setContractURI(metadataURI);
        assertEq(sbt.contractURI(), metadataURI);
    }

    function testFailSetContractURI() public {
        changePrank(sina);
        sbt.setContractURI(metadataURI);
    }

    function testUpdateTokenType() public {
        uint16 _tokenType = _createAttestation();
        uint16 _tokenType2 = _createAttestation();
        sbt.updateAttestationURI(_tokenType2, metadataURI2);
        assertTrue(
            keccak256(abi.encodePacked(sbt.typeURI(_tokenType))) ==
                keccak256(abi.encodePacked(metadataURI))
        );
        assertTrue(
            keccak256(abi.encodePacked(sbt.typeURI(_tokenType2))) ==
                keccak256(abi.encodePacked(metadataURI2))
        );
    }

    function _createAttestation() internal returns (uint16 _tokenType) {
        sbt.createAttestation(metadataURI, false);
        _tokenType = sbt.totalTypes();
        assertTrue(_tokenType > 0);
        assertTrue(
            keccak256(abi.encodePacked((sbt.typeURI(_tokenType)))) ==
                keccak256(abi.encodePacked(metadataURI))
        );
        return _tokenType;
    }

    function _createDelegateSbt() internal returns (uint16 attestationId) {
        sbt.createAttestation(metadataURI, true);
        uint16 attestationId = sbt.totalTypes();
        return attestationId;
    }

    function _createDelegate() internal returns (address delegate) {
        uint16 delegateRoleId = _createDelegateSbt();
        sbt.mint(delegate1, delegateRoleId);
        return delegate1;
    }

    function _AddDelegate(address delegate) internal {
        sbt.mint(delegate1, sbt.delegateRoleId());
    }
}
