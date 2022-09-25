pragma solidity 0.8.13;
//SPDX-License-Identifier: MIT

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/AccessControlEnumerable.sol";

/// @title An experimental implementation of a soul-bound token (SBT) smart contract
/// @author Oloyede Shadrach Temitayo (@oloyedeshadrach)
/// @notice You can use this contract to issue soul-bound credentials to users or other smart contracts
/// @dev All functions are subject to changes in the future.
/// @custom:experimental This is an experimental contract.
contract SBToken is ERC721, AccessControlEnumerable {
    uint256 public totalSupply;
    uint16 public totalTypes;
    address private factory;

    bytes private _contractURI;
    bytes32 public constant DELEGATE_ROLE = keccak256("DELEGATES");

    mapping(uint16 => bytes) private typeToURI;
    mapping(uint256 => address) public tokenToMinter;
    mapping(uint256 => uint16) public tokenIdToType;
    mapping(uint16 => mapping(address => bool)) public typeToSoul;

    event Revoked(
        address indexed revokedBy,
        address indexed owner,
        uint256 tokenId
    );
    event BatchRevoked(
        address indexed revokedBy,
        address[] owners,
        uint256[] tokenIds
    );
    event Mint(
        address indexed mintedBy,
        address indexed to,
        uint256 tokenId,
        uint16 tokenType
    );
    event TypeCreated(uint16 tokenType, address indexed createdBy, bytes uri);
    event TypeUpdated(uint16 tokenType, bytes uri);
    event TokenIdTypeUpdated(uint256 tokenId, uint16 _tokenType);

    constructor(
        string memory _name,
        string memory _symbol,
        bytes memory _metadata,
        address _admin
    ) ERC721(_name, _symbol) {
        factory = msg.sender;
        _contractURI = _metadata;
        _setRoleAdmin(DELEGATE_ROLE, DEFAULT_ADMIN_ROLE);
        _grantRole(DELEGATE_ROLE, _admin);
        _grantRole(DEFAULT_ADMIN_ROLE, _admin);
    }

    /// @notice Mint a new credential type(SBT) for this organisation
    /// @dev Mints a new token type that can be issued to users
    /// @dev The new type is linked to a new ipfs hash linked to it's metadata
    /// @param typeURI_ is the uri (ipfs hash) of the metadata associated to this mint
    function mintTokenType(bytes calldata typeURI_)
        external
        onlyRole(DELEGATE_ROLE)
    {
        require(typeURI_.length > 0, "Invalid typeURI");
        totalTypes++;
        typeToURI[totalTypes] = typeURI_;
        emit TypeCreated(totalTypes, msg.sender, typeURI_);
    }

    /// @notice Issue a credential (SBT) to multiple users in a single call
    /// @dev Mints a new token or issue a token type to multiple wallet addresses
    /// @param _to an array of address to receive minted tokens
    /// @param _tokenType token type to be issued for this mint
    function batchMint(address[] memory _to, uint16 _tokenType)
        external
        onlyRole(DELEGATE_ROLE)
    {
        require(_typeExists(_tokenType), "Invalid SB type");
        for (uint256 i = 0; i < _to.length; ) {
            mint(_to[i], _tokenType);

            unchecked {
                i++;
            }
        }
    }

    /// @notice Allow credential holders to destroy their tokens and revoke their ownership
    /// @dev This function allows wallet address to burn their tokens
    /// @param _tokenId Id of the token to be burnt
    function burn(uint256 _tokenId) external {
        address owner = ownerOf(_tokenId);
        require(owner == msg.sender, "Only the owner can burn their token");
        _burn(_tokenId);
        tokenToMinter[_tokenId] = address(0);
        typeToSoul[tokenIdToType[_tokenId]][msg.sender] = false;
        tokenIdToType[_tokenId] = 0;
        emit Revoked(msg.sender, owner, _tokenId);
    }

    /// @notice This function allows the admin or delegates to revoke a user's credential or revoke their ownership
    /// @dev Admin and delegate can revoke ownership of token
    /// @param _tokenId Id of the token to be revoked
    function revoke(uint256 _tokenId) external onlyRole(DELEGATE_ROLE) {
        address owner = ownerOf(_tokenId);
        _burn(_tokenId);
        typeToSoul[tokenIdToType[_tokenId]][owner] = false;
        tokenToMinter[_tokenId] = address(0);
        // tokenIdToType[_tokenId] = 0;
        emit Revoked(msg.sender, owner, _tokenId);
    }

    /// @notice This function allows the admin or delegates to revoke a multiple user's credential
    /// @dev Admin and delegate can revoke ownership of tokens in a single transaction
    /// @param _tokenIds an array of Ids of the tokens to be revoked
    function batchRevoke(uint256[] memory _tokenIds)
        external
        onlyRole(DELEGATE_ROLE)
    {
        address[] memory owners = new address[](_tokenIds.length);
        for (uint256 i = 0; i < _tokenIds.length; ) {
            // address owner = ownerOf(_tokenIds[i]);
            owners[i] = ownerOf(_tokenIds[i]);
            _burn(_tokenIds[i]);
            tokenToMinter[_tokenIds[i]] = address(0);
            // tokenIdToType[_tokenIds[i]] = 0;
            // emit Revoked(owner, msg.sender, _tokenIds[i]);

            unchecked {
                i++;
            }
        }
        emit BatchRevoked(msg.sender, owners, _tokenIds);
    }

    /// @notice Only admin can update a credential's data
    /// @dev DEFAULT_ADMIN_ROLE can update the ipfs of a token type
    /// @param _tokenType token type to update
    /// @param _typeURI_ new ipfs hash or uri to be set for _tokenType
    function updateTypeURI(uint16 _tokenType, bytes calldata _typeURI_)
        external
        onlyRole(DEFAULT_ADMIN_ROLE)
    {
        require(_typeExists(_tokenType), "Invalid SB type");
        require(_typeURI_.length > 0, "Invalid typeURI");
        typeToURI[_tokenType] = _typeURI_;
        emit TypeUpdated(_tokenType, _typeURI_);
    }

    /// @notice Admin or Delegates can re-assign a new credential to a user
    /// @dev Update the token type assigned to a tokenId
    /// @param _tokenId token Id to be updated
    /// @param _tokenType new token type to be assigned
    function updateTokenIdType(uint256 _tokenId, uint16 _tokenType)
        external
        onlyRole(DELEGATE_ROLE)
    {
        require(_typeExists(_tokenType), "Invalid SB type");
        require(_exists(_tokenId), "FORBIDDEN: Invalid tokenId");

        tokenIdToType[_tokenId] = _tokenType;
        emit TokenIdTypeUpdated(_tokenId, _tokenType);
    }

    /// @notice set a new metadata uri for this contract (organisation)
    /// @dev update the metadata uri for this contract
    /// @param contractURI_ ipfs hash or URI of the new metadata
    function setContractURI(bytes calldata contractURI_)
        external
        onlyRole(DEFAULT_ADMIN_ROLE)
    {
        _contractURI = contractURI_;
    }

    /// @notice Return the content identify for user's credential
    /// @dev Returns the type uri of the input tokenId's credential or type
    /// @param _tokenId token id to get type cid
    /// @return ipfs hash of the token type associated to the input tokenId
    function tokenCID(uint256 _tokenId) external view returns (bytes memory) {
        return typeToURI[tokenIdToType[_tokenId]];
    }

    /// @notice Issue a credential (SBT) to a user
    /// @dev Mints a new token or issue a token type to a wallet addresses
    /// @param _to address to receive minted tokens
    /// @param _tokenType token type to be issued for this mint
    function mint(address _to, uint16 _tokenType)
        public
        onlyRole(DELEGATE_ROLE)
    {
        require(_typeExists(_tokenType), "Invalid SB type");
        require(!_hasType(_to, _tokenType), "Duplicate credential");
        totalSupply++;
        _safeMint(_to, totalSupply);
        tokenToMinter[totalSupply] = msg.sender;
        tokenIdToType[totalSupply] = _tokenType;
        typeToSoul[_tokenType][_to] = true;
        emit Mint(msg.sender, _to, totalSupply, _tokenType);
    }

    /// @notice Return the content identify for a credential
    /// @dev Returns the type uri of the input credential or sbt type
    /// @param _type token type ID to get type cid
    /// @return ipfs cid of the token type
    function typeURI(uint16 _type) public view returns (bytes memory) {
        return typeToURI[_type];
    }

    /// @notice Return the content identify for user's credential
    /// @dev Returns the cid of the contract metatdata stored on ipfs
    /// @return returns _contractURI of this SBT contract
    function contractURI() public view returns (bytes memory) {
        return _contractURI;
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(AccessControlEnumerable, ERC721)
        returns (bool)
    {
        return
            interfaceId == type(IAccessControlEnumerable).interfaceId ||
            super.supportsInterface(interfaceId);
    }

    //@notice a function that gets called before any token is transferred. Forces the owner to only be able to revoke the token.
    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 tokenId
    ) internal pure override {
        require(
            to == address(0) || from == address(0),
            "This token can only be burned"
        );
    }

    function _typeExists(uint16 _type) internal view returns (bool exists) {
        exists = _type > 0 && _type < totalTypes + 1;
    }

    function _hasType(address owner, uint16 tokenType)
        internal
        view
        returns (bool)
    {
        return typeToSoul[tokenType][owner] == true;
    }
}
