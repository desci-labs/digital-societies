pragma solidity 0.8.17;

//SPDX-License-Identifier: MIT

import "@openzeppelin/contracts/interfaces/IERC165.sol";


interface IMetaHolder is IERC165 {
    /**
     * @dev Emitted when a new attestation `attestationId` with uri `uri` is minted on Desoc `society`
     */
    event SocietyUpdated(address society, string uri);

    /**
     * @dev Emitted when a new attestation `attestationId` with uri `uri` is minted on Desoc `society`
     */
    event AttestationUpdated(address society, uint16 attestationId, string uri);

    /**
     * @dev Emitted when a new token `tokenId` is minted to attestation `attestationId`
     */
    event Issued(
        address society,
        address recipient,
        uint16 attestationId,
        uint256 tokenId
    );

    /**
     * @dev Emitted when a new tokens `tokenIds` is minted to attestation `attestationId`
     */
    // event IssueAttestations(
    //     address society,
    //     uint16 attestationId,
    //     uint256[] tokenIds
    // );

    /**
     * @dev Emitted when `tokenId` token which belongs to `owner` is revoked by `revokedBy`.
     */
    event Revoked(
        uint256 indexed tokenId,
        address indexed owner,
        address indexed revokedBy
    );

    /**
     * @dev Emitted when tokens `tokenId` are revoked or burned
     */
    event RevokedTokens(uint16[] tokenIds);

    // setFactoryAddress - only owner
    /**
     * @dev set the desoc manager/factory contract address
     */
    function setFactoryAddress(address factory) external;

    /**
     * @dev external function called by factory contract to add a newly deployed society
     */
    function addSociety(address society, string calldata uri) external;

    // updateSociety(uri) - isValidSociety
    /**
     * @dev external function called by factory contract to add a newly deployed society
     */
    function updateSociety(string calldata uri) external;

    // updateAttestation(uint16 type, string uri) -> isValidSociety
    /**
     * @dev update attestation token uri
     */
    function updateAttestation(uint16 attestationId, string calldata uri) external;

    // addRecipient(uint16 type, address recipient) -> isValidSociety
    /**
     * @dev issue a new attestation to `recipient`
     */
    function issueAttestation(
        uint16 attestationId,
        uint256 tokenId,
        address recipient
    ) external;

    // addRecipients(uint16 type, address[] recipients) -> isValidSociety
    /**
     * @dev Issue a new attestation `recipients`
     */
    // function addRecipients(uint16 attestationId, uint256[] tokenIds, address[] calldata recipients)
    //     external;

    // revokeToken(uint256 tokenId) -> isValidSociety
    /**
     * @dev revoke token of Id `tokenId`
     */
    function revokeToken(uint256 tokenId, address owner, address revokedBy) external;

    // revokeToken(uint256 tokenId[]) -> isValidSociety
    /**
     * @dev revoke tokens in the array of `tokenIds`
     */
    // function revokeTokens(uint256[] calldata tokenIds) external;
}
