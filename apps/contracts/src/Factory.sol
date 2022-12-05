// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.17;
import "src/Desoc.sol";
import "gsn/packages/contracts/src/ERC2771Recipient.sol";
import "gsn/packages/contracts/src/forwarder/Forwarder.sol";

import "./interfaces/IMetaHolder.sol";

/// @title An experimental implementation of a soul-bound token (SBT) Factory smart contract
/// @author Oloyede Shadrach Temitayo (@oloyedeshadrach)
/// @notice You can use this contract to deploy a SBT contract for your organisation
/// @dev All functions are subject to changes in the future.
/// @custom:experimental This is an experimental contract for DeSci Labs (https://desci.com).
contract Factory is ERC2771Recipient {
    bool private _paused;
    address public owner;
    address private metadataHolderAddress;
    mapping(address => bool) public verified;

    event Deployed(
        address indexed token,
        address indexed owner,
        string contractUri
    );
    event Verified(address indexed org);
    event Refuted(address indexed org);
    /**
     * @dev Emitted when the pause is triggered by `account`.
     */
    event Paused(address account);

    /**
     * @dev Emitted when the pause is lifted by `account`.
     */
    event Unpaused(address account);

    constructor(address forwarder) {
        owner = _msgSender();
        _paused = false;
        _setTrustedForwarder(forwarder);
    }

    /**
     * @dev Modifier to make a function callable only when the contract is not paused.
     *
     * Requirements:
     *
     * - The contract must not be paused.
     */
    modifier whenNotPaused() {
        require(_paused == false, "Paused");
        _;
    }

    /**
     * @dev Modifier to make a function callable only when the contract is paused.
     *
     * Requirements:
     *
     * - The contract must be paused.
     */
    modifier whenPaused() {
        require(_paused == true, "Not paused");
        _;
    }

    function pause() external {
        require(_msgSender() == owner, "unauthorized");
        _paused = true;
        emit Paused(_msgSender());
    }

    function unpause() external {
        require(_msgSender() == owner, "unauthorized");
        _paused = false;
        emit Unpaused(_msgSender());
    }

    function setMetaAddress(address _metaAddress) external {
        require(_msgSender() == owner, "unauthorized");
        require(
            IMetaHolder(_metaAddress).supportsInterface(
                type(IMetaHolder).interfaceId
            ) == true,
            "IMetaHolder interface not supported"
        );
        metadataHolderAddress = _metaAddress;
    }

    /// @notice Deploy a new SBT contract to be associate to the Desci Labs factory contract
    /// @dev creates a new Desoc contract using the create2 opcode
    /// @param _name the name of the Desoc contract (passed to the constructor)
    /// @param _symbol the symbol of the Desoc contract (passed to the constructor)
    /// @param _contractUri the cid of the metadata to be associated to the deployed Desoc contract
    function deployToken(
        string memory _name,
        string memory _symbol,
        string memory _contractUri
    ) external returns (address token) {
        // only owner can deploy desoc when contract is paused
        require(msg.sender == owner || !paused(), "Paused!");
        bytes memory code = abi.encodePacked(
            type(Desoc).creationCode,
            abi.encode(_name, _symbol, _contractUri, _msgSender(), metadataHolderAddress)
        );
        bytes32 salt = keccak256(abi.encodePacked(_msgSender()));
        assembly {
            token := create2(0, add(code, 0x20), mload(code), salt)
            if iszero(extcodesize(token)) {
                revert(0, 0)
            }
        }
        emit Deployed(token, _msgSender(), _contractUri);
    }

    /// @notice Verify an organisation
    /// @dev Add an organisation's Desoc contract to the verified mapping
    /// @param org address of the Desoc smart contract
    function verify(address org) external {
        require(
            IDesoc(org).supportsInterface(type(IDesoc).interfaceId) == true,
            "IDesoc interface not supported"
        );
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

    /**
     * @dev Returns true if the contract is paused, and false otherwise.
     */
    function paused() public view returns (bool) {
        return _paused;
    }
}
