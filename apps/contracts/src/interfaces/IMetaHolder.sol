pragma solidity 0.8.17;

//SPDX-License-Identifier: MIT

import "@openzeppelin/contracts/interfaces/IERC165.sol";

interface IMetaHolder is IERC165 {
    /**
     * @dev Emitted when a new attestation `attestationId` with uri `uri` is minted on Desoc `society`
     */
    event SocietyUpdated(address society, string uri);
   
    /**
     * @dev Emitted when a new admin `admin` is assigned on Desoc `society`
     */
    event AdminUpdated(address society, address admin);
    
    /**
     * @dev Emitted when an attestation of ID `attestationId` is marked as the delegate role attestation
     */
    event DelegatesUpdated(address society, uint16 attestationId);

    /**
     * @dev Emitted when a new attestation `attestationId` with uri `uri` is minted on Desoc `society`
     */
    event AttestationUpdated(address society, uint16 attestationId, string uri);

    /**
     * @dev Emitted when a new token `tokenId` is minted to attestation `attestationId`
     */
    event Issued(
        address indexed society,
        address indexed recipient,
        address indexed issuedBy,
        uint16 attestationId,
        uint256 tokenId
    );

    /**
     * @dev Emitted when `tokenId` token which belongs to `owner` is revoked by `revokedBy`.
     */
    event Revoked(
        uint256 indexed tokenId,
        address indexed owner,
        address indexed revokedBy
    );

    /**
     * @dev set the desoc manager/factory contract address
     */
    function setFactoryAddress(address factory) external;

    /**
     * @dev external function called by factory contract to add a newly deployed society
     */
    function addSociety(address society, string calldata uri) external;

    /**
     * @dev external function called by factory contract to add a newly deployed society
     */
    function updateSociety(string calldata uri) external;
   
    /**
     * @dev external function called by a Desoc contract log it's updated admin
     */
    function updateAdmin(address admin) external;
   
    /**
     * @dev external function called by a Desoc contract log it's updated delegate attestation
     */
    function updateDelegate(uint16 attestationId) external;

    /**
     * @dev update attestation token uri
     */
    function updateAttestation(uint16 attestationId, string calldata uri)
        external;

    /**
     * @dev issue a new attestation to `recipient`
     */
    function issueAttestation(
        uint16 attestationId,
        uint256 tokenId,
        address recipient,
        address issuedBy
    ) external;

    function revokeToken(
        uint256 tokenId,
        address _owner,
        address revokedBy
    ) external;
}
