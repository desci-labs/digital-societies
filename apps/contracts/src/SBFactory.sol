// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.13;
import "src/SBToken.sol";

/// @title An experimental implementation of a soul-bound token (SBT) Factory smart contract
/// @author Oloyede Shadrach Temitayo (@oloyedeshadrach)
/// @notice You can use this contract to deploy a SBT contract for your organisation
/// @dev All functions are subject to changes in the future.
/// @custom:experimental This is an experimental contract for DeSci Labs (https://desci.com).
contract SBFactory {
    event TokenCreated(address indexed token, address indexed owner);

    /// @notice Deploy a new SBT contract to be associate to the Desci Labs factory contract
    /// @dev creates a new SBToken contract using the create2 opcode
    /// @param _name the name of the SBToken contract (passed to the constructor)
    /// @param _symbol the symbol of the SBToken contract (passed to the constructor)
    /// @param _metadata the cid of the metadata to be associated to the deployed SBToken contract
    function deployToken(
        string memory _name,
        string memory _symbol,
        bytes memory _metadata
    ) external returns (address token) {
        bytes memory code = abi.encodePacked(
            type(SBToken).creationCode,
            abi.encode(_name, _symbol, _metadata, msg.sender)
        );
        bytes32 salt = keccak256(abi.encodePacked(msg.sender));
        assembly {
            token := create2(0, add(code, 0x20), mload(code), salt)
            if iszero(extcodesize(token)) {
                revert(0, 0)
            }
        }
        emit TokenCreated(token, msg.sender);
    }
}
