// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.13;
import "src/Desoc.sol";
import "gsn/packages/contracts/src/ERC2771Recipient.sol";
import "gsn/packages/contracts/src/forwarder/Forwarder.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/// @title An experimental implementation of a soul-bound token (SBT) Factory smart contract
/// @author Oloyede Shadrach Temitayo (@oloyedeshadrach)
/// @notice You can use this contract to deploy a SBT contract for your organisation
/// @dev All functions are subject to changes in the future.
/// @custom:experimental This is an experimental contract for DeSci Labs (https://desci.com).
contract DesocManager is ERC2771Recipient {
    address public owner;
    mapping (address => bool) public verified;
    
    event TokenCreated(address indexed token, address indexed owner);
    event Verified(address indexed org);
    event Refuted(address indexed org);

    constructor(address forwarder) {
        owner = _msgSender();
        _setTrustedForwarder(forwarder);
    }

    /// @notice Deploy a new SBT contract to be associate to the Desci Labs factory contract
    /// @dev creates a new Desoc contract using the create2 opcode
    /// @param _name the name of the Desoc contract (passed to the constructor)
    /// @param _symbol the symbol of the Desoc contract (passed to the constructor)
    /// @param _metadata the cid of the metadata to be associated to the deployed Desoc contract
    function deployToken(
        string memory _name,
        string memory _symbol,
        string memory _metadata
    ) external returns(address token) {
        bytes memory code = abi.encodePacked(
            type(Desoc).creationCode,
            abi.encode(_name, _symbol, _metadata, _msgSender())
        );
        bytes32 salt = keccak256(abi.encodePacked(_msgSender()));
        assembly {
            token := create2(0, add(code, 0x20), mload(code), salt)
            if iszero(extcodesize(token)) {
                revert(0, 0)
            }
        }
        emit TokenCreated(token, _msgSender());
    }

    /// @notice Verify an organisation
    /// @dev Add an organisation's Desoc contract to the verified mapping
    /// @param org address of the Desoc smart contract
    function verify(address org) external {
        require(IDesoc(org).supportsInterface(type(IDesoc).interfaceId) == true, "IDesoc interface not supported");
        require(_msgSender() == owner, "UnAuthorized");
        verified[org] = true;
        emit Verified(org);
    }
    
    /// @notice Refute an organisation's verification
    /// @dev Remove an organisation's Desoc contract to the verified mapping
    /// @param org address of the Desoc smart contract
    function refute(address org) external {
        require(_msgSender() == owner, "UnAuthorized");
        verified[org] = false;
        emit Refuted(org);
    }
}
