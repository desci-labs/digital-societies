pragma solidity >=0.8.0 <0.9.0;
//SPDX-License-Identifier: MIT

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/AccessControlEnumerable.sol";
import "./base64-sol/base64.sol";

/**
  TODO: version 2
  1. map tokenType => CID
  2. map tokenId => tokenType
  3. gated setter for tokenType => CID
  4. accept tokenType in mint function to set tokenId type
  6. Gasless nft mint
 */

/** TOPICS FOR DISCUSSION
    - What format to use for tokenType [id -> number] | [name -> string]
*/

contract SBToken is ERC721, AccessControlEnumerable {
    uint256 public totalSupply;
    address private factory;

    string private _contractURI;
    bytes32 public constant DELEGATE_ROLE = keccak256("DELEGATES");

    mapping(string => bool) public tokenTypes;
    mapping(string => string) private typeToURI;
    mapping(uint256 => address) public tokenToMinter;
    mapping(uint256 => string) public tokenIdToType;

    event Revoked(address revokedBy, uint256 tokenId);
    event Mint(uint256 tokenId, string tokenType, address to, address mintedBy);
    event TypeCreated(string name, address indexed createdBy, string uri);
    event TypeUpdated(string name, string uri);
    event TokenIdTypeUpdated(uint256 tokenId, string _type);

    constructor(
        string memory _name,
        string memory _symbol,
        address _admin
    ) ERC721(_name, _symbol) {
        factory = msg.sender;

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

    function createTokenType(string memory _type, string memory typeURI_)
        external
        onlyRole(DELEGATE_ROLE)
    {
        require(tokenTypes[_type] == false, "Type already exisits");
        require(bytes(_type).length % 4 != 0, "Invalid data");
        require(
            keccak256(abi.encodePacked(typeURI_)) != keccak256(""),
            "Empty metadata URI"
        );
        require(
            keccak256(abi.encodePacked(_type)) != keccak256(""),
            "Invalid Type"
        );
        tokenTypes[_type] = true;
        typeToURI[_type] = string(abi.encodePacked(typeURI_));
        emit TypeCreated(_type, msg.sender, typeURI_);
    }

    //@notice Mints a new token to the given address,
    // can only be called by admins of this SBT or the admin of the contract
    function mint(address _to, string memory _tokenType)
        public
        onlyRole(DELEGATE_ROLE)
    {
        require(tokenTypes[_tokenType] == true);

        totalSupply++;
        _safeMint(_to, totalSupply);
        tokenToMinter[totalSupply] = msg.sender;
        tokenIdToType[totalSupply] = _tokenType;
        emit Mint(totalSupply, _tokenType, _to, msg.sender);
    }

    function batchMint(address[] memory _to, string[] memory _tokenTypes)
        public
        onlyRole(DELEGATE_ROLE)
    {
        require(_to.length == _tokenTypes.length);

        for (uint256 i = 0; i < _to.length; ) {
            require(tokenTypes[_tokenTypes[i]] == true);
            totalSupply++;
            _safeMint(_to[i], totalSupply);
            tokenToMinter[totalSupply] = msg.sender;
            tokenIdToType[totalSupply] = _tokenTypes[i];
            emit Mint(totalSupply, _tokenTypes[i], _to[i], msg.sender);

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
        tokenToMinter[totalSupply] = address(0);
        tokenIdToType[_tokenId] = string("");
        emit Revoked(msg.sender, _tokenId);
    }

    function revoke(uint256 _tokenId) external onlyRole(DELEGATE_ROLE) {
        _burn(_tokenId);
        tokenToMinter[totalSupply] = address(0);
        tokenIdToType[_tokenId] = "";
        emit Revoked(msg.sender, _tokenId);
    }

    function batchRevoke(uint256[] memory _tokenIds)
        external
        onlyRole(DELEGATE_ROLE)
    {
        for (uint256 i = 0; i < _tokenIds.length; ) {
            _burn(_tokenIds[i]);
            tokenToMinter[totalSupply] = address(0);
            tokenIdToType[_tokenIds[i]] = "";
            emit Revoked(msg.sender, _tokenIds[i]);

            unchecked {
                i++;
            }
        }
    }

    //@notice Function to fetch the metadata of a token
    function tokenURI(uint256 _tokenId)
        public
        view
        override
        returns (string memory _tokenURI)
    {
        _tokenURI = string(
            abi.encodePacked(typeToURI[tokenIdToType[_tokenId]])
        );
    }

    //@notice Function to fetch the metadata of a token
    function typeURI(string memory _type)
        public
        view
        returns (string memory _typeURI)
    {
        _typeURI = string(abi.encodePacked(typeToURI[_type]));
    }

    //@notice Function to add or update metadata of a token
    function updateTokenIdType(uint256 _tokenId, string memory _type)
        public
        onlyRole(DELEGATE_ROLE)
    {
        require(_exists(_tokenId), "FORBIDDEN: Invalid tokenId");
        // This restricts the operation to the issuer of this tokenID
        require(
            tokenToMinter[_tokenId] == msg.sender,
            "Only the minter of a token can set their metadata."
        );
        require(tokenTypes[_type] == true, "Invalid Token type");
        tokenIdToType[_tokenId] = _type;
        emit TokenIdTypeUpdated(_tokenId, _type);
    }

    //@notice Function to fetch the metadata of a token
    function contractURI() public view returns (string memory metadata) {
        metadata = string(abi.encodePacked(_contractURI));
    }

    //@notice Function to add or update contract metadata
    function setContractURI(string memory contractURI_)
        public
        onlyRole(DEFAULT_ADMIN_ROLE)
    {
        _contractURI = string(abi.encodePacked(contractURI_));
    }

    //@notice Function to add or update metadata of a SBT type
    function updateTypeURI(string memory _tokenType, string memory typeURI_)
        public
        onlyRole(DEFAULT_ADMIN_ROLE)
    {
        require(tokenTypes[_tokenType] == true, "Invalid type");
        require(
            keccak256(abi.encodePacked(typeURI_)) != keccak256(""),
            "Empty metadata URI"
        );
        typeToURI[_tokenType] = string(abi.encodePacked(typeURI_));
        emit TypeUpdated(_tokenType, typeURI_);
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
}
