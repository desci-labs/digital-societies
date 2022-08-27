pragma solidity >=0.8.0 <0.9.0;
//SPDX-License-Identifier: MIT

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "base64-sol/base64.sol";

interface ISBT {
    function initialize(string memory name_, string memory symbol_, address[] memory _initial, address admin_) external;
}

// implement admin delegation using oz access control
contract SBToken is ERC721 {
  uint private required;
  uint public totalSupply;

  // Token name
  string private _name;

  // Token symbol
  string private _symbol;

  address private admin;
  address private factory;
  
  string public SBTMetadata;
  mapping (uint => string) public metadata;
  mapping (uint => address) public tokenToMinter;

  event Mint(address mintedTo, uint256 tokenId, address mintedBy);
  event MetadataAdded(string metadata);
  event Revoked(address revokedBy, uint256 tokenId);

  constructor() ERC721("", "") {
    factory = msg.sender;
  }

  function initialize(string memory name_, string memory symbol_, address[] memory _initial, address admin_) external {
    require(required == 0, "Initializer: REQUIRED");
    require(msg.sender == factory, "Initializer: FACTORY");

    required = 1;
    _name = name_;
    _symbol = symbol_;
    admin = admin_;
    
    for(uint i; i < _initial.length; i++){
      totalSupply++;
      _mint(_initial[i], totalSupply);
    }
  }

  //@notice Mints a new token to the given address, can only be called by admins of this SBT or the admin of the contract
  function mint(address _to) public {
    require(balanceOf(msg.sender) > 0, "Only admins of an SBT can mint tokens.");
    totalSupply++;
    _mint(_to, totalSupply);
    tokenToMinter[totalSupply] = msg.sender;
    emit Mint(_to, totalSupply, msg.sender);
  }

  //@notice Function to fetch the metadata of a token
  function getMetadata(uint256 _tokenId) public view returns (string memory _metadata) {
    _metadata = string(Base64.decode(metadata[_tokenId]));
  }

  //@notice Function to add or update metadata of a token
  function setTokenMetadata(uint256 _tokenId, string memory _metadata) public {
      require(tokenToMinter[_tokenId] == msg.sender, "Only the minter of a token can set their metadata.");
    metadata[_tokenId] = Base64.encode(bytes(_metadata));
  }
  
  //@notice Function to add or update metadata of a token
  function setSbtMetadata(string memory _metadata) public {
    require(admin == msg.sender, "Only an admin or authorized delegate can set contract metadata.");
    SBTMetadata = Base64.encode(bytes(_metadata));
  }

  //@notice a function that gets called before any token is transferred. Forces the owner to only be able to revoke the token.
  function _beforeTokenTransfer(address from, address to, uint256 tokenId) internal pure override {
    require(to == address(0) || from == address(0), "This token can only be burned");
  }

  function burn(uint256 _tokenId) public {
    require(ownerOf(_tokenId) == msg.sender, "Only the owner can burn their token");
    _burn(_tokenId);
    emit Revoked(msg.sender, _tokenId);
  }
}