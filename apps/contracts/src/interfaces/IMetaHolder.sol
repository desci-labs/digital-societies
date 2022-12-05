pragma solidity 0.8.17;

//SPDX-License-Identifier: MIT

interface IMetaHolder {
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
    event IssueAttestation(uint16 attestationId, uint256 tokenId);

    /**
     * @dev Emitted when a new tokens `tokenIds` is minted to attestation `attestationId`
     */
    event IssueAttestations(uint16 attestationId, uint256[] tokenIds);

    /**
     * @dev Emitted when token `tokenId` is revoked or burned
     */
    event RevokedToken(uint16 tokenId);

    /**
     * @dev Emitted when tokens `tokenId` are revoked or burned
     */
    event RevokedTokens(uint16[] tokenIds);
}
