pragma solidity 0.8.13;
//SPDX-License-Identifier: MIT

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";

interface IDesoc is IERC721 {
    /**
     * @dev Emitted when `tokenId` token which belongs to `owner` is revoked by `revokedBy`.
     */
    event Revoked(
        address indexed revokedBy,
        address indexed owner,
        uint256 indexed tokenId
    );

    /**
     * @dev Emitted when `tokenId` token of type `tokenType` is minted by `mintedBy` to `to`.
     */
    event Mint(
        address indexed mintedBy,
        address indexed to,
        uint256 indexed tokenId,
        uint16 tokenType
    );

    /**
     * @dev Emitted when type `tokenType` is created by `createdBy` with a typeURI of `uri`.
     */
    event TypeCreated(uint16 tokenType, address indexed createdBy, string uri);

    /**
     * @dev Emitted when type `tokenType` is updated to a typeURI of `uri``.
     */
    event TypeUpdated(uint16 tokenType, string uri);

    /**
     * @dev Emitted when token id `tokenId` is updated to type `_tokenType`.
     */
    event TokenIdTypeUpdated(uint256 tokenId, uint16 _tokenType);

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
    function mintTokenType(string memory typeURI_) external;

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
    function updateTypeURI(uint16 _tokenType, string memory _typeURI_)
        external;

    /**
     * @dev Update the token type assigned to a tokenId
     */
    function updateTokenIdType(uint256 _tokenId, uint16 _tokenType) external;

    /**
     * @dev update the metadata uri for this contract
     */
    function setContractURI(string memory contractURI_) external;
}
