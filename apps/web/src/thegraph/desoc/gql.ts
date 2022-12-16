/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel-plugin for production.
 */
const documents = {
    "query getSocieties {\n  societies {\n    admin\n    attestations {\n      metadataUri\n      id\n    }\n    delegateRoleId\n    id\n    metadataUri\n    verified\n  }\n}\n\nquery AllAttestations {\n  attestations {\n    id\n    recipients {\n      id\n      owner {\n        id\n      }\n      tokenId\n      active\n      issuedBy\n      issuedAt\n      attestation {\n        id\n      }\n      society {\n        id\n      }\n    }\n    metadataUri\n  }\n}\n\nquery getDesocAttestations($society: String!) {\n  attestations(where: {society: $society}) {\n    id\n    metadataUri\n    createdAt\n    updatedAt\n    recipients {\n      id\n      owner {\n        id\n      }\n      tokenId\n      active\n      issuedBy\n      issuedAt\n      attestation {\n        id\n      }\n      society {\n        id\n      }\n    }\n  }\n}": types.GetSocietiesDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query getSocieties {\n  societies {\n    admin\n    attestations {\n      metadataUri\n      id\n    }\n    delegateRoleId\n    id\n    metadataUri\n    verified\n  }\n}\n\nquery AllAttestations {\n  attestations {\n    id\n    recipients {\n      id\n      owner {\n        id\n      }\n      tokenId\n      active\n      issuedBy\n      issuedAt\n      attestation {\n        id\n      }\n      society {\n        id\n      }\n    }\n    metadataUri\n  }\n}\n\nquery getDesocAttestations($society: String!) {\n  attestations(where: {society: $society}) {\n    id\n    metadataUri\n    createdAt\n    updatedAt\n    recipients {\n      id\n      owner {\n        id\n      }\n      tokenId\n      active\n      issuedBy\n      issuedAt\n      attestation {\n        id\n      }\n      society {\n        id\n      }\n    }\n  }\n}"): (typeof documents)["query getSocieties {\n  societies {\n    admin\n    attestations {\n      metadataUri\n      id\n    }\n    delegateRoleId\n    id\n    metadataUri\n    verified\n  }\n}\n\nquery AllAttestations {\n  attestations {\n    id\n    recipients {\n      id\n      owner {\n        id\n      }\n      tokenId\n      active\n      issuedBy\n      issuedAt\n      attestation {\n        id\n      }\n      society {\n        id\n      }\n    }\n    metadataUri\n  }\n}\n\nquery getDesocAttestations($society: String!) {\n  attestations(where: {society: $society}) {\n    id\n    metadataUri\n    createdAt\n    updatedAt\n    recipients {\n      id\n      owner {\n        id\n      }\n      tokenId\n      active\n      issuedBy\n      issuedAt\n      attestation {\n        id\n      }\n      society {\n        id\n      }\n    }\n  }\n}"];

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
**/
export function graphql(source: string): unknown;

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;