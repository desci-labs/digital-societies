pragma solidity 0.8.17;
//SPDX-License-Identifier: MIT

import "./interfaces/IMetaHolder.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/// @title An experimental implementation of an event logging smart contract for Desoc Oss Protocol
/// @author DeSoc OSS collective
/// @notice This contract is linked to the factory and other sbt contracts for the purpose of event logging
/// @dev All functions are subject to changes in the future.
/// @custom:experimental This is an experimental contract.
contract MetadataHolder is IMetaHolder, Ownable {
    address private factoryAddress;
    mapping(address => bool) private _societies;
    mapping(bytes32 => bool) private _attestations;

    modifier onlyFactoryContract() {
        require(_msgSender() == factoryAddress, "unauthorized");
        _;
    }

    modifier onlyValidSociety() {
        require(_societies[_msgSender()], "unauthorized");
        _;
    }

    constructor(address _factoryAddress) Ownable() {
        factoryAddress = _factoryAddress;
    }

    /**
     * @dev set the desoc manager/factory contract address
     */
    function setFactoryAddress(address factory) external onlyOwner {
        factoryAddress = factory;
    }

    /**
     * @dev external function called by factory contract to add a newly deployed society
     */
    function addSociety(address society, string calldata uri)
        external
        onlyFactoryContract
    {
        _societies[society] = true;
        emit SocietyUpdated(society, uri);
    }

    /// @inheritdoc IMetaHolder
    function updateAdmin(address admin) external onlyValidSociety {
        emit AdminUpdated(_msgSender(), admin);
    }

    /// @inheritdoc IMetaHolder
    function updateDelegate(uint16 attestationId) external onlyValidSociety {
        emit DelegatesUpdated(_msgSender(), attestationId);
    }

    /// @inheritdoc IMetaHolder
    function updateSociety(string calldata uri) external onlyValidSociety {
        emit SocietyUpdated(_msgSender(), uri);
    }

    /// @inheritdoc IMetaHolder
    function updateAttestation(uint16 attestationId, string calldata uri)
        external
        onlyValidSociety
    {
        if (!isValidAttestation(_msgSender(), attestationId)) {
            bytes32 id = keccak256(abi.encode(_msgSender(), attestationId));
            _attestations[id] = true;
        }
        emit AttestationUpdated(_msgSender(), attestationId, uri);
    }

    /// @inheritdoc IMetaHolder
    function issueAttestation(
        uint16 attestationId,
        uint256 tokenId,
        address recipient,
        address issuedBy
    ) external onlyValidSociety {
        require(
            isValidAttestation(_msgSender(), attestationId),
            "Invalid attestation"
        );
        emit Issued(_msgSender(), recipient, issuedBy, attestationId, tokenId);
    }

    /// @inheritdoc IMetaHolder
    function revokeToken(
        uint256 tokenId,
        address _owner,
        address revokedby
    ) external onlyValidSociety {
        emit Revoked(tokenId, _owner, revokedby);
    }

    /// @inheritdoc IERC165
    function supportsInterface(bytes4 interfaceId)
        public
        pure
        override(IERC165)
        returns (bool)
    {
        return interfaceId == type(IMetaHolder).interfaceId;
    }

    function isValidSociety(address society) public view returns (bool) {
        return _societies[society];
    }

    function isValidAttestation(address society, uint16 attestationId)
        public
        view
        returns (bool)
    {
        bytes32 id = keccak256(abi.encode(society, attestationId));
        return _attestations[id];
    }
}
