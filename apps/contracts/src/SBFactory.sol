// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.8.0 <0.9.0;
import "src/SBToken.sol";

contract SBFactory {
    event TokenCreated(
        address indexed token,
        address indexed owner
    );

    function deployToken(
        string memory _name,
        string memory _symbol
    ) external returns (address token) {
        bytes memory code = abi.encodePacked(
            type(SBToken).creationCode,
            abi.encode(_name, _symbol, msg.sender)
        );
        bytes32 salt = keccak256(abi.encodePacked(msg.sender));
        assembly {
            token := create2(0, add(code, 0x20), mload(code), salt)
            if iszero(extcodesize(token)) { revert(0, 0) }
        }

        emit TokenCreated(token, msg.sender);
    }
}