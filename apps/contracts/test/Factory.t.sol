// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Test.sol";
import {console} from "forge-std/console.sol";
import {Factory} from "src/Factory.sol";
import {Desoc} from "src/Desoc.sol";
import {MetadataHolder} from "src/MetadataHolder.sol";
import {Utils} from "./Utils/Utils.sol";

contract FactoryTest is Test {
    Factory factory;
    MetadataHolder metaHolder;
    Desoc sbt;
    Utils internal utils;

    address internal admin;
    address internal user1;
    
    address internal _forwarder = 0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9;
    string public ipfsURI = "https://w3s.link/ipfs/bafkreifdry6syjhedfl2xgjhyy62lsvhgy5tls4cmxtfn6rv7j6gz5455y";

    function setUp() public {
        utils = new Utils();
        address[] memory users = new address[](2);
        users = utils.createUsers(2);
        admin = users[0];
        user1 = users[1];
        vm.label(admin, "Admin");
        vm.label(user1, "User");

        factory = new Factory(_forwarder);
        metaHolder = new MetadataHolder(address(factory));
        factory.setMetaAddress(address(metaHolder));
        deploySBT();
    }

    function deploySBT() internal {
        string memory name = "Desci Labs";
        string memory symbol = "DSI";

        address deployed = factory.deployToken(
            name,
            symbol,
            ipfsURI
        );
        sbt = Desoc(deployed);

        assertEq(sbt.name(), name);
        assertEq(sbt.symbol(), symbol);
    }

    function testDeployedSBT() public {
        assertEq(sbt.totalSupply(), 0);
        assertEq(sbt.balanceOf(admin), 0);
        assertEq(sbt.owner(), address(this));
        assertEq(sbt.contractURI(), ipfsURI);
    }

    function testSetMetaHolderAddress() public {
        MetadataHolder meta2 = new MetadataHolder(address(factory));
        factory.setMetaAddress(address(meta2));
    }
    
    function testFailSetMetaHolderAddress() public {
        // set an address that isn't a MetadataHolder contract address
        factory.setMetaAddress(user1);
    }
    
    function testVerifyDesoc() public {
        assertEq(factory.verified(address(sbt)), false);
        factory.verify(address(sbt));
        assertEq(factory.verified(address(sbt)), true);
    }
    
    function testRefuteDesocVerification() public {
        assertEq(factory.verified(address(sbt)), false);
        factory.verify(address(sbt));
        assertEq(factory.verified(address(sbt)), true);
        factory.refute(address(sbt));
        assertEq(factory.verified(address(sbt)), false);
    }

    function testPauseFactory() public {
        factory.pause();
        assertEq(factory.paused(), true);
    }
   
    function testUnPauseFactory() public {
        factory.pause();
        assertEq(factory.paused(), true);
        factory.unpause();
        assertEq(factory.paused(), false);
    }
    
    function testAdminDeployWhenPaused() public {
        factory.pause();
        assertEq(factory.paused(), true);
        factory.deployToken(
            "Nemesis",
            "Nms",
            ipfsURI
        );
    }
    function testFailUserDeployWhenPaused() public {
        emit log_named_address("Factory Owner", factory.owner());
        factory.pause();
        assertEq(factory.paused(), true);
        vm.startPrank(user1);
        factory.deployToken(
            "Nemesis",
            "Nms",
            ipfsURI
        );
        vm.stopPrank();(user1);
    }
}
