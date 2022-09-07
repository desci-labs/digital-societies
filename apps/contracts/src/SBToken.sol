pragma solidity >=0.8.0 <0.9.0;
//SPDX-License-Identifier: MIT

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/AccessControlEnumerable.sol";
import "./base64-sol/base64.sol";

/**
 */

contract SBToken is ERC721, AccessControlEnumerable {
    uint256 public totalSupply;
    uint16 public totalTypes;
    address private factory;

    bytes private _contractURI;
    bytes32 public constant DELEGATE_ROLE = keccak256("DELEGATES");

    mapping(uint16 => bytes) private typeToURI;
    mapping(uint256 => address) public tokenToMinter;
    mapping(uint256 => uint16) public tokenIdToType;

    event Revoked(address revokedBy, uint256 tokenId);
    event BatchRevoked(address revokedBy, uint256[] tokenIds);
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

    function mintTokenType(bytes memory typeURI_)
        external
        onlyRole(DELEGATE_ROLE)
    {
        require(typeURI_.length > 0, "Invalid typeURI");
        totalTypes++;
        typeToURI[totalTypes] = typeURI_;
        emit TypeCreated(totalTypes, msg.sender, typeURI_);
    }

    //@notice Mints a new token to the given address,
    // can only be called by admins of this SBT or the admin of the contract
    function mint(address _to, uint16 _tokenType)
        public
        onlyRole(DELEGATE_ROLE)
    {
        require(_typeExists(_tokenType), "Invalid SB type");
        totalSupply++;
        _safeMint(_to, totalSupply);
        tokenToMinter[totalSupply] = msg.sender;
        tokenIdToType[totalSupply] = _tokenType;
        emit Mint(msg.sender, _to, totalSupply, _tokenType);
    }

    function batchMint(address[] memory _to, uint16 _tokenType)
        public
        onlyRole(DELEGATE_ROLE)
    {
        require(_typeExists(_tokenType), "Invalid SB type");
        for (uint256 i = 0; i < _to.length; ) {
            totalSupply++;
            _safeMint(_to[i], totalSupply);
            tokenToMinter[totalSupply] = msg.sender;
            tokenIdToType[totalSupply] = _tokenType;
            emit Mint(msg.sender, _to[i], totalSupply, _tokenType);

            unchecked {
                i++;
            }
        }
    }

    function burn(uint256 _tokenId) public {
        require(
            ownerOf(_tokenId) == msg.sender,
            "Only the owner can burn their token"
        );
        _burn(_tokenId);
        tokenToMinter[_tokenId] = address(0);
        tokenIdToType[_tokenId] = 0;
        emit Revoked(msg.sender, _tokenId);
    }

    function revoke(uint256 _tokenId) external onlyRole(DELEGATE_ROLE) {
        _burn(_tokenId);
        tokenToMinter[_tokenId] = address(0);
        tokenIdToType[_tokenId] = 0;
        emit Revoked(msg.sender, _tokenId);
    }

    function batchRevoke(uint256[] memory _tokenIds)
        external
        onlyRole(DELEGATE_ROLE)
    {
        for (uint256 i = 0; i < _tokenIds.length; ) {
            _burn(_tokenIds[i]);
            tokenToMinter[_tokenIds[i]] = address(0);
            tokenIdToType[_tokenIds[i]] = 0;
            emit Revoked(msg.sender, _tokenIds[i]);

            unchecked {
                i++;
            }
        }
    }

    //@notice Function to fetch the metadata of a token
    function tokenCID(uint256 _tokenId) public view returns (bytes memory) {
        return typeToURI[tokenIdToType[_tokenId]];
    }

    //@notice Function to fetch the metadata of a token
    function typeURI(uint16 _type) public view returns (bytes memory) {
        return typeToURI[_type];
    }

    //@notice Function to add or update metadata of a token
    function updateTokenIdType(uint256 _tokenId, uint16 _tokenType)
        external
        onlyRole(DELEGATE_ROLE)
    {
        require(_typeExists(_tokenType), "Invalid SB type");
        require(_exists(_tokenId), "FORBIDDEN: Invalid tokenId");
        
        tokenIdToType[_tokenId] = _tokenType;
        emit TokenIdTypeUpdated(_tokenId, _tokenType);
    }

    //@notice Function to fetch the metadata of a token
    function contractURI() public view returns (bytes memory) {
        return _contractURI;
    }

    //@notice Function to add or update contract metadata
    function setContractURI(bytes memory contractURI_)
        public
        onlyRole(DEFAULT_ADMIN_ROLE)
    {
        _contractURI = contractURI_; //  string(abi.encodePacked(contractURI_));
    }

    //@notice Function to add or update metadata of a SBT type
    function updateTypeURI(uint16 _tokenType, bytes memory _typeURI_)
        external
        onlyRole(DEFAULT_ADMIN_ROLE)
    {
        require(_typeExists(_tokenType), "Invalid SB type");
        require(_typeURI_.length > 0, "Invalid typeURI");
        typeToURI[_tokenType] = _typeURI_;
        emit TypeUpdated(_tokenType, _typeURI_);
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
}
