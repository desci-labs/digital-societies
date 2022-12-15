// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "forge-std/Test.sol";
import {Factory} from "src/Factory.sol";
import {Desoc} from "src/Desoc.sol";
import {console} from "forge-std/console.sol";
import {Utils} from "./Utils/Utils.sol";
import {MetadataHolder} from "src/MetadataHolder.sol";

contract BaseSetup is Test {
    Desoc sbt;
    Factory factory;
    MetadataHolder meta;
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

    function setUp() public virtual {
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
        meta = new MetadataHolder(address(factory));
        metadataHolderAddress = address(meta);
        factory.setMetaAddress(metadataHolderAddress);
        deploySBT();
    }

    function deploySBT() public {
        string memory name = "Desci Labs";
        string memory symbol = "DSI";

        address deployed = factory.deployToken(name, symbol, metadataURI);
        sbt = Desoc(deployed);
    }

    function createAttestation() internal returns (uint256 _tokenType) {
        sbt.createAttestation(metadataURI, false);
        _tokenType = uint256(
            keccak256(abi.encode(address(sbt), sbt.totalTypes()))
        );
        return _tokenType;
    }

    function createDelegateSbt() internal returns (uint256 attestationId) {
        sbt.createAttestation(metadataURI, true);
        attestationId = uint256(
            keccak256(abi.encode(address(sbt), sbt.totalTypes()))
        );
        return attestationId;
    }

    function createDelegate(address delegate) internal {
        uint256 delegateRoleId = createDelegateSbt();
        sbt.mint(delegate, delegateRoleId);
    }

    function AddDelegate(address delegate) internal {
        sbt.mint(delegate, sbt.delegateRoleId());
    }
}

contract MetadataHolderTest is BaseSetup {
    function setUp() public override {
        BaseSetup.setUp();
    }

    function testMetadataHolderInit() public {
        assertEq(meta.factoryAddress(), address(factory));
        assertEq(meta.societies(address(sbt)), true);
        // assert no attestation has been added to meta contract
        bytes32 id = keccak256(abi.encode(address(sbt), 1));
        assertEq(meta.attestations(id), false);
    }

    function testSetNewFactory() public {
        Factory newFactory = new Factory(_forwarder);
        meta.setFactoryAddress(address(newFactory));
    }

    function testFailSetNewFactory() public {
        Factory newFactory = new Factory(_forwarder);
        vm.startPrank(admin);
        meta.setFactoryAddress(address(newFactory));
    }

    function testAddNewSociety() public {
        string memory name = "Desci Labs2";
        string memory symbol = "DSI";
        // address expectedSbtAddress = 0x9C41ba32F3833a15279BA86d7E46B607d5103476;
        address token = factory.deployToken(name, symbol, metadataURI);
        // console.log("society:", token);
        assertTrue(token != address(0));
        // assertEq(meta.societies(expectedSbtAddress), true);
    }

    function testFailAddNewSociety() public {
        string memory name = "Desci Labs2";
        string memory symbol = "DSI";
        Desoc society = new Desoc(
            name,
            symbol,
            metadataURI,
            address(this),
            address(meta)
        );
        meta.addSociety(address(society), metadataURI);
    }

    function testSetDelegateRole() public {
        uint256 expectedId = uint256(
            keccak256(abi.encode(address(sbt), 1))
        );
        vm.expectCall(address(meta), abi.encodeCall(meta.updateDelegate, (expectedId)));
        uint256 roleId = createDelegateSbt();
        console.log("roleId", roleId);
        bytes32 id = keccak256(abi.encode(address(sbt), roleId));
        assertEq(meta.attestations(id), true);
    }

    function testFailSetDelegateRole() public {
        meta.updateDelegate(1);
    }

    function testUpdateAdmin() public {
        vm.expectCall(address(meta), abi.encodeCall(meta.updateAdmin, (admin)));
        sbt.transferOwnership(admin);
    }

    function testFailUpdateAdmin() public {
        vm.startPrank(admin);
        meta.updateAdmin(admin);
    }

    function testUpdateAttestation() public {
        uint256 attestationId = createAttestation();
        bytes32 id = keccak256(abi.encode(address(sbt), attestationId));
        assertEq(meta.attestations(id), true);
        vm.expectCall(
            address(meta),
            abi.encodeCall(
                meta.updateAttestation,
                (attestationId, metadataURI2)
            )
        );
        sbt.updateAttestationURI(attestationId, metadataURI2);
    }

    function testFailUpdateAttestation() public {
        uint256 attestationId = createAttestation();
        bytes32 id = keccak256(abi.encode(address(sbt), attestationId));
        assertEq(meta.attestations(id), true);
        vm.expectCall(
            address(meta),
            abi.encodeCall(
                meta.updateAttestation,
                (attestationId, metadataURI2)
            )
        );
        meta.updateAttestation(attestationId, metadataURI2);
    }

    function testIssueSbt() public {
        uint256 attestationId = createAttestation();
        vm.expectCall(
            address(meta),
            abi.encodeCall(
                meta.issueAttestation,
                (attestationId, 1, alice, address(this))
            )
        );
        sbt.mint(alice, attestationId);
    }

    function testFailIssueSbt() public {
        uint256 attestationId = createAttestation();
        vm.expectCall(
            address(meta),
            abi.encodeCall(
                meta.issueAttestation,
                (attestationId, 1, alice, address(this))
            )
        );
        meta.issueAttestation(attestationId, 1, alice, address(this));
    }

    function testRevokeSbt() public {
        uint256 attestationId = createAttestation();
        sbt.mint(alice, attestationId);
        vm.expectCall(
            address(meta),
            abi.encodeCall(
                meta.revokeToken,
                (1, attestationId, alice, address(this))
            )
        );
        sbt.revoke(1);
    }

    function testFailRevokeSbt() public {
        uint256 attestationId = createAttestation();
        sbt.mint(alice, attestationId);
        vm.expectCall(
            address(meta),
            abi.encodeCall(
                meta.revokeToken,
                (1, attestationId, alice, address(this))
            )
        );
        meta.revokeToken(1, attestationId, alice, address(this));
    }
}
