// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Test.sol";
import {console} from "forge-std/console.sol";
import "src/DesocManager.sol";
import {Utils} from "./Utils/Utils.sol";

contract DesocManagerTest is Test {
    DesocManager dManager;
    Desoc sbt;
    Utils internal utils;

    address internal admin;
    
    address internal _forwarder = 0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9;
    string public ipfsURI = "https://w3s.link/ipfs/bafkreifdry6syjhedfl2xgjhyy62lsvhgy5tls4cmxtfn6rv7j6gz5455y";

    function setUp() public {
        utils = new Utils();
        address[] memory users = new address[](1);
        users = utils.createUsers(1);
        admin = users[0];
        vm.label(admin, "Admin");

        dManager = new DesocManager(_forwarder);
        deploySBT();
    }

    function deploySBT() internal {
        string memory name = "Desci Labs";
        string memory symbol = "DSI";

        address deployed = dManager.deployToken(
            name,
            symbol,
            ipfsURI
        );
        sbt = Desoc(deployed);

        assertEq(sbt.name(), name);
        assertEq(sbt.symbol(), symbol);
    }

    function testDeployedSBT() public {
        vm.startPrank(admin);
        deploySBT();
        assertEq(sbt.totalSupply(), 0);
        assertEq(sbt.balanceOf(admin), 0);
        assertEq(sbt.hasRole(sbt.DEFAULT_ADMIN_ROLE(), admin), true);
        assertEq(sbt.contractURI(), ipfsURI);
        vm.stopPrank();(admin);
    }
    
    function testVerifyDesoc() public {
        assertEq(dManager.verified(address(sbt)), false);
        dManager.verify(address(sbt));
        assertEq(dManager.verified(address(sbt)), true);
    }
    
    function testRefuteDesocVerification() public {
        assertEq(dManager.verified(address(sbt)), false);
        dManager.verify(address(sbt));
        assertEq(dManager.verified(address(sbt)), true);
        dManager.refute(address(sbt));
        assertEq(dManager.verified(address(sbt)), false);
    }
}
