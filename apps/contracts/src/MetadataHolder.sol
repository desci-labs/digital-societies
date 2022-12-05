pragma solidity 0.8.17;
//SPDX-License-Identifier: MIT

import "./interfaces/IMetaHolder.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

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

    /**
     * @dev external function called by factory contract to add a newly deployed society
     */
    function updateSociety(string calldata uri) external onlyValidSociety {
        emit SocietyUpdated(_msgSender(), uri);
    }

    /**
     * @dev update attestation token uri
     */
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

    /**
     * @dev issue a new attestation to `recipient`
     */
    function issueAttestation(
        uint16 attestationId,
        uint256 tokenId,
        address recipient
    ) external onlyValidSociety {
        require(
            isValidAttestation(_msgSender(), attestationId),
            "Invalid attestation"
        );
        emit Issued(_msgSender(), recipient, attestationId, tokenId);
    }

    /**
     * @dev revoke token of Id `tokenId`
     */
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
