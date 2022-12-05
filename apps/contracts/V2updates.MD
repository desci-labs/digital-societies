# V2 smart contract upgrade specifications
## DESOC MANAGER
- emit token address, uri, and sender on deployment
- make contract pausable, only owner can deploy org when paused
- add the desoc address to the MetaHolder contract

## Desoc contract
- when attestation is minted/updated -> set the id & uri metaHolder with contract
- when a token is issued/minted/burned/revoked/ -> update this action on the metaHolder contract
- delegates can disable an attestation
- delegates can enable an attestation
- has a function isAttestationValid

## MetaHolder contract
This contract holds all desoc and attestation details flowing within the protocol
 - initiated with the factory address
### features
- holds a mapping of recognized desoc (added by factory contract on deployment)
- holds a mapping of attestations ``mapping(hash => uri)`` where hash = uint(desocAddress + attestationId)
- has a setAttestation(attestationId, uri)
- setDelegate(delegate)
- removeDelegate(delegate)
- issueAttestation(attestationId, tokenId) -> emits an event
- issueAttestations(attestationId, tokenIds[]) -> emits an event
- revokeAttestation(attestationId, tokenId) -> emits an event
- revokeAttestations(attestationId, tokenIds[]) -> emits an event

_______
**Metadata Schema**

**society** - address, uri, admin, delegates, attestations, recipients
**attestations** - id, uri, society, recipients
*recipient* - tokenId, attestationId, tokenUri, society, address
_______

## Proposed delegates role solution
- admin can create an attestation anything after deployment and mark it as the delegate role type
- once marked, all holders of that attestation become delegates and can perform actions on behalf of the admin.
- if no attestation is marked as delegate, the check passes only if msg.sender is the admin
