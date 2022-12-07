pragma solidity 0.8.17;
//SPDX-License-Identifier: MIT

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";

interface IDesoc is IERC721 {
    /**
     *  @dev Returns the type uri of the input credential or sbt type
     */
    function typeURI(uint16 _type) external view returns (string memory);

    /**
     * @dev Returns the cid of the contract metatdata stored on ipfs
     */
    function contractURI() external view returns (string memory);

    /**
     *  @dev Returns the type uri of the input credential or sbt type
     */
    function createAttestation(string memory typeURI_, bool isDelegateRole) external;

    /**
     * @dev Mints a new token or issue a token type to multiple wallet addresses
     */
    function batchMint(address[] memory _to, uint16 _tokenType) external;

    /**
     * @dev Admin and delegate can revoke ownership of tokens in a single transaction
     */
    function batchRevoke(uint256[] memory _tokenIds) external;

    /**
     * @dev DEFAULT_ADMIN_ROLE can update the ipfs of a token type
     */
    function updateAttestationURI(uint16 attestationId, string memory uri) external;

    /**
     * @dev Update the token type assigned to a tokenId
     */
    // function updateTokenIdType(uint256 _tokenId, uint16 _tokenType) external;

    /**
     * @dev update the metadata uri for this contract
     */
    function setContractURI(string calldata uri) external;
}
