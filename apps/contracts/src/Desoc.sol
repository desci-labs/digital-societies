pragma solidity 0.8.17;
//SPDX-License-Identifier: MIT

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "./interfaces/IDesoc.sol";
import "./interfaces/IMetaHolder.sol";

/// @title An experimental implementation of a soul-bound token (SBT) smart contract
/// @author DeSoc OSS collective
/// @notice You can use this contract to issue soul-bound credentials to users or other smart contracts
/// @dev All functions are subject to changes in the future.
/// @custom:experimental This is an experimental contract.
contract Desoc is IDesoc, Ownable, ERC721 {
    uint256 public totalTypes;
    uint256 public delegateRoleId;
    uint256 public totalSupply;
    address private factory;
    IMetaHolder private metadataHolder;

    string private _contractURI;

    mapping(uint256 => bool) public attestations;
    mapping(uint256 => string) public attestationMeta;
    mapping(uint256 => uint256) public tokenIdToAttestation;
    mapping(uint256 => mapping(address => bool)) public attestationHolder;

    constructor(
        string memory _name,
        string memory _symbol,
        string memory _metadata,
        address _owner,
        address _metadataHolderAddress
    ) ERC721(_name, _symbol) {
        factory = msg.sender;
        _contractURI = _metadata;
        metadataHolder = IMetaHolder(_metadataHolderAddress);
        _transferOwnership(_owner);
    }

    modifier onlyDelegates() {
        require(
            _msgSender() == owner() || _hasType(_msgSender(), delegateRoleId)
        );
        _;
    }

    /// @notice Update the attestation dedicated to Desoc delegates
    /// @dev update the delegate role ID and notifies the MetadataHolder
    /// @param attestationId token type ID to get to set as delegateRoleId
    function setDelegateRole(uint256 attestationId) external onlyOwner {
        require(_typeExists(attestationId), "Invalid attestation");
        delegateRoleId = attestationId;
        metadataHolder.updateDelegate(attestationId);
    }

    /// @notice Remove the delegate role attestation
    /// @dev Reset the delegateRoleId to zero and notifies the MetadataHolder
    function removeDelegateRole() external onlyOwner {
        delegateRoleId = 0;
        metadataHolder.updateDelegate(0);
    }

    /// @notice Return the content identify for user's credential
    /// @dev Returns the cid of the contract metatdata stored on ipfs
    /// @return returns _contractURI of this SBT contract
    function contractURI() external view returns (string memory) {
        return _contractURI;
    }

    /// @notice Mint a new credential type(SBT) for this organisation
    /// @dev Mints a new token type that can be issued to users
    /// @dev The new type is linked to a new ipfs hash linked to it's metadata
    /// @param uri is the uri (ipfs hash) of the metadata associated to this mint
    function createAttestation(string calldata uri, bool isDelegateRole)
        external
        onlyDelegates
    {
        require(bytes(uri).length > 0, "Invalid attestationURI");
        totalTypes++;
        uint256 attestationId = uint256(
            keccak256(abi.encode(address(this), totalTypes))
        );
        attestations[attestationId] = true;
        attestationMeta[attestationId] = uri;
        metadataHolder.updateAttestation(attestationId, uri);
        if (isDelegateRole == true) {
            delegateRoleId = attestationId;
            metadataHolder.updateDelegate(attestationId);
        }
    }

    /// @notice Issue a credential (SBT) to multiple users in a single call
    /// @dev Mints a new token or issue a token type to multiple wallet addresses
    /// @param _to an array of address to receive minted tokens
    /// @param _tokenType token type to be issued for this mint
    function batchMint(address[] memory _to, uint256 _tokenType)
        external
        onlyDelegates
    {
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
        address _owner = ownerOf(_tokenId);
        require(_owner == msg.sender, "Only the owner can burn their token");
        _burn(_tokenId);
        uint256 attestationId = tokenIdToAttestation[_tokenId];
        attestationHolder[attestationId][_owner] = false;
        delete tokenIdToAttestation[_tokenId];
        metadataHolder.revokeToken(_tokenId, attestationId,  _owner, msg.sender);
    }

    /// @notice This function allows the admin or delegates to revoke a multiple user's credential
    /// @dev Admin and delegate can revoke ownership of tokens in a single transaction
    /// @param _tokenIds an array of Ids of the tokens to be revoked
    function batchRevoke(uint256[] memory _tokenIds) external onlyDelegates {
        for (uint256 i = 0; i < _tokenIds.length; ) {
            revoke(_tokenIds[i]);
            unchecked {
                i++;
            }
        }
    }

    /// @notice Only admin or delegates can update a credential's data
    /// @dev DELEGATE_ROLE can update the ipfs of a token type
    /// @param attestationId token type to update
    /// @param uri new ipfs hash or uri to be set for attestationId
    function updateAttestationURI(uint256 attestationId, string memory uri)
        external
        onlyDelegates
    {
        require(_typeExists(attestationId), "Invalid SB type");
        require(bytes(uri).length > 0, "empty uri");
        attestationMeta[attestationId] = uri;
        metadataHolder.updateAttestation(attestationId, uri);
    }

    /// @notice set a new metadata uri for this contract (organisation)
    /// @dev update the metadata uri for this contract
    /// @param uri ipfs hash or URI of the new metadata
    function setContractURI(string calldata uri) external onlyDelegates {
        _contractURI = uri;
        metadataHolder.updateSociety(uri);
    }

    /// @notice Issue a credential (SBT) to a user
    /// @dev Mints a new token or issue a token type to a wallet addresses
    /// @param _to address to receive minted tokens
    /// @param attestationId token type to be issued for this mint
    function mint(address _to, uint256 attestationId) public onlyDelegates {
        require(_typeExists(attestationId), "Invalid SB type");
        require(!_hasType(_to, attestationId), "Duplicate credential");
        totalSupply++;
        _safeMint(_to, totalSupply);
        tokenIdToAttestation[totalSupply] = attestationId;
        attestationHolder[attestationId][_to] = true;
        metadataHolder.issueAttestation(
            attestationId,
            totalSupply,
            _to,
            msg.sender
        );
    }

    /// @notice This function allows the admin or delegates to revoke a user's credential or revoke their ownership
    /// @dev Admin and delegate can revoke ownership of token
    /// @param _tokenId Id of the token to be revoked
    function revoke(uint256 _tokenId) public onlyDelegates {
        _revoke(_tokenId);
    }

    /// @notice Return the content identify for user's credential
    /// @dev Returns the type uri of the input tokenId's credential or type
    /// @param _tokenId token id to get type cid
    /// @return ipfs hash of the token type associated to the input tokenId
    function tokenURI(uint256 _tokenId)
        public
        view
        override
        returns (string memory)
    {
        return attestationMeta[tokenIdToAttestation[_tokenId]];
    }

    /// @inheritdoc IERC165
    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, IERC165)
        returns (bool)
    {
        return
            interfaceId == type(IDesoc).interfaceId ||
            super.supportsInterface(interfaceId);
    }

    function _revoke(uint256 _tokenId) internal {
        address _owner = ownerOf(_tokenId);
        _burn(_tokenId);
        uint256 attestationId = tokenIdToAttestation[_tokenId];
        attestationHolder[attestationId][_owner] = false;
        delete tokenIdToAttestation[_tokenId];
        metadataHolder.revokeToken(_tokenId, attestationId,  _owner, msg.sender);
    }

    /// @inheritdoc Ownable
    function transferOwnership(address newOwner) public override onlyOwner {
        require(
            newOwner != address(0),
            "Ownable: new owner is the zero address"
        );
        _transferOwnership(newOwner);
        metadataHolder.updateAdmin(newOwner);
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

    function _typeExists(uint256 attestationId) internal view returns (bool) {
        return attestations[attestationId];
    }

    function _hasType(address _owner, uint256 tokenType)
        internal
        view
        returns (bool)
    {
        return attestationHolder[tokenType][_owner] == true;
    }
}
