pragma solidity >=0.8.0 <0.9.0;
//SPDX-License-Identifier: MIT

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/AccessControlEnumerable.sol";
import "./base64-sol/base64.sol";

interface ISBT {
    function initialize(
        string memory name_,
        string memory symbol_,
        address[] memory _initial,
        address admin_
    ) external;
}

// implement admin delegation using oz access control
contract SBToken is ERC721, AccessControlEnumerable {
    uint256 public totalSupply;

    address private factory;

    string public SBTMetadata;
    mapping(uint256 => string) public metadata;
    mapping(uint256 => address) public tokenToMinter;

    bytes32 public constant DELEGATE_ROLE = keccak256("DELEGATES");

    event Mint(address to, uint256 tokenId, address mintedBy);
    event MetadataAdded(string metadata);
    event Revoked(address revokedBy, uint256 tokenId);

    constructor(
        string memory _name,
        string memory _symbol,
        address[] memory _initial,
        address _admin
    ) ERC721(_name, _symbol) {
        factory = msg.sender;
        
        // setup access control 
        _setRoleAdmin(DEFAULT_ADMIN_ROLE, keccak256(abi.encodePacked(_admin)));
        _setRoleAdmin(DELEGATE_ROLE, keccak256(abi.encodePacked(_admin)));

        for (uint256 i; i < _initial.length; i++) {
            totalSupply++;
            _mint(_initial[i], totalSupply);
        }
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

    //@notice Mints a new token to the given address, can only be called by admins of this SBT or the admin of the contract
    function mint(address _to) public onlyRole(DELEGATE_ROLE) {
        // why is this so? shouldn't this be restricted to admins/delegate
        require(
            balanceOf(msg.sender) > 0,
            "Only admins of an SBT can mint tokens."
        );
        totalSupply++;
        _mint(_to, totalSupply);
        tokenToMinter[totalSupply] = msg.sender;
        emit Mint(_to, totalSupply, msg.sender);
    }

    //@notice Function to fetch the metadata of a token
    function getMetadata(uint256 _tokenId)
        public
        view
        returns (string memory _metadata)
    {
        _metadata = string(Base64.decode(metadata[_tokenId]));
    }

    //@notice Function to fetch the metadata of a token
    function getSBTMetadata() public view returns (string memory _metadata) {
        _metadata = string(Base64.decode(SBTMetadata));
    }

    //@notice Function to add or update metadata of a token
    function setTokenMetadata(uint256 _tokenId, string memory _metadata)
        public
    {
        require(
            tokenToMinter[_tokenId] == msg.sender,
            "Only the minter of a token can set their metadata."
        );
        metadata[_tokenId] = Base64.encode(bytes(_metadata));
    }

    //@notice Function to add or update metadata of a token
    function setSBTMetadata(string memory _metadata) public onlyRole(DEFAULT_ADMIN_ROLE) {
        // require(
        //     admin == msg.sender,
        //     "Only an admin or authorized delegate can set contract metadata."
        // );
        SBTMetadata = Base64.encode(bytes(_metadata));
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

    function burn(uint256 _tokenId) public {
        require(
            ownerOf(_tokenId) == msg.sender,
            "Only the owner can burn their token"
        );
        _burn(_tokenId);
        emit Revoked(msg.sender, _tokenId);
    }
}
