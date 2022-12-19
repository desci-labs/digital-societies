// //SPDX-License-Identifier: MIT
// pragma solidity ^0.8.13;

// import "@opengsn/contracts/src/BasePaymaster.sol";

// // desoc paymaster
// // this paymaster accepts only request to authorized targets.
// //

// contract DesocPaymaster is BasePaymaster {
//     event TargetAdded(address indexed target);

//     mapping(address => bool) public targets;

//     function versionPaymaster() external view override virtual returns (string memory){
//         return "3.0.0-beta.0+opengsn.desoc.ipaymaster";
//     }

//     function addTargets(address[] memory _targets) external onlyOwner {
//         for (uint i = 0; i < _targets.length;) {
//             require(_targets[i] != address(0));
//             targets[_targets[i]] = true;
//             emit TargetAdded(_targets[i]);
//             unchecked {
//                 i++;
//             }
//         }
//     }
//     function removeTargets(address[] memory _targets) external onlyOwner {
//         for (uint i = 0; i < _targets.length;) {
//             targets[_targets[i]] = false;
//             unchecked {
//                 i++;
//             }
//         }
//     }

//     function _preRelayedCall(
//         GsnTypes.RelayRequest calldata relayRequest,
//         bytes calldata signature,
//         bytes calldata approvalData,
//         uint256 maxPossibleGas
//     )
//     internal
//     override
//     virtual
//     returns (bytes memory context, bool revertOnRecipientRevert) {
//         (relayRequest, signature, approvalData, maxPossibleGas);
//         require(targets[relayRequest.request.to], "UnAuthorized target");
//         return ("", false);
//     }

//     function _postRelayedCall(
//         bytes calldata context,
//         bool success,
//         uint256 gasUseWithoutPost,
//         GsnTypes.RelayData calldata relayData
//     )
//     internal
//     override
//     virtual {
//         (context, success, gasUseWithoutPost, relayData);
//     }

//     function deposit() public payable {
//         require(address(relayHub) != address(0), "relay hub address not set");
//         relayHub.depositFor{value:msg.value}(address(this));
//     }

//     function withdrawAll(address payable destination) public {
//         uint256 amount = relayHub.balanceOf(address(this));
//         withdrawRelayHubDepositTo(amount, destination);
//     }

// }
