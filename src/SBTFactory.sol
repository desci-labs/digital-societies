// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.8.0 <0.9.0;
import "src/SBToken.sol";

contract SBTFactory {
    address[] public allTokens;
    mapping(address => bool) public isValidToken;

    event TokenCreated(address indexed token, address indexed owner, uint index);

    function getTokensLength() external view returns(uint) {
        return allTokens.length;
    }

    // string memory _name, string memory _symbol, address[] memory _initial -> initdata
    function deployToken(string memory _name, string memory _symbol, address[] memory _initial) external returns(address token) {
        bytes memory code = type(SBToken).creationCode;
        bytes32 salt = keccak256(abi.encodePacked(msg.sender));
        assembly {
            token := create2(0, add(code, 0x20), mload(code), salt)
        }
        
        
        // bytes memory initdata = abi.encodeWithSignature("initialize(string,string,address[],address)", _name, _symbol, _initial, msg.sender);
        // (bool success,) = token.call(initdata);
        // require(success, "Failed to initialize SBT");
        ISBT(token).initialize(_name, _symbol, _initial, msg.sender);

        isValidToken[token] = true;
        allTokens.push(token);

        emit TokenCreated(token, msg.sender, allTokens.length);
    }
}