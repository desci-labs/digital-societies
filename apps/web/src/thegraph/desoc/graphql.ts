/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };

function fetcher<TData, TVariables>(
  endpoint: string,
  requestInit: RequestInit,
  query: string,
  variables?: TVariables
) {
  return async (): Promise<TData> => {
    const res = await fetch(endpoint, {
      method: "POST",
      ...requestInit,
      body: JSON.stringify({ query, variables }),
    });

    const json = await res.json();

    if (json.errors) {
      const { message } = json.errors[0];

      throw new Error(message);
    }

    return json.data;
  };
}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  BigDecimal: any;
  BigInt: any;
  Bytes: any;
};

export type Attestation = {
  __typename?: 'Attestation';
  createdAt?: Maybe<Scalars['BigInt']>;
  id: Scalars['ID'];
  metadataUri: Scalars['String'];
  recipients: Array<Token>;
  society: Society;
  updatedAt?: Maybe<Scalars['BigInt']>;
};


export type AttestationRecipientsArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Token_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<Token_Filter>;
};

export type Attestation_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  createdAt?: InputMaybe<Scalars['BigInt']>;
  createdAt_gt?: InputMaybe<Scalars['BigInt']>;
  createdAt_gte?: InputMaybe<Scalars['BigInt']>;
  createdAt_in?: InputMaybe<Array<Scalars['BigInt']>>;
  createdAt_lt?: InputMaybe<Scalars['BigInt']>;
  createdAt_lte?: InputMaybe<Scalars['BigInt']>;
  createdAt_not?: InputMaybe<Scalars['BigInt']>;
  createdAt_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  metadataUri?: InputMaybe<Scalars['String']>;
  metadataUri_contains?: InputMaybe<Scalars['String']>;
  metadataUri_contains_nocase?: InputMaybe<Scalars['String']>;
  metadataUri_ends_with?: InputMaybe<Scalars['String']>;
  metadataUri_ends_with_nocase?: InputMaybe<Scalars['String']>;
  metadataUri_gt?: InputMaybe<Scalars['String']>;
  metadataUri_gte?: InputMaybe<Scalars['String']>;
  metadataUri_in?: InputMaybe<Array<Scalars['String']>>;
  metadataUri_lt?: InputMaybe<Scalars['String']>;
  metadataUri_lte?: InputMaybe<Scalars['String']>;
  metadataUri_not?: InputMaybe<Scalars['String']>;
  metadataUri_not_contains?: InputMaybe<Scalars['String']>;
  metadataUri_not_contains_nocase?: InputMaybe<Scalars['String']>;
  metadataUri_not_ends_with?: InputMaybe<Scalars['String']>;
  metadataUri_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  metadataUri_not_in?: InputMaybe<Array<Scalars['String']>>;
  metadataUri_not_starts_with?: InputMaybe<Scalars['String']>;
  metadataUri_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  metadataUri_starts_with?: InputMaybe<Scalars['String']>;
  metadataUri_starts_with_nocase?: InputMaybe<Scalars['String']>;
  recipients_?: InputMaybe<Token_Filter>;
  society?: InputMaybe<Scalars['String']>;
  society_?: InputMaybe<Society_Filter>;
  society_contains?: InputMaybe<Scalars['String']>;
  society_contains_nocase?: InputMaybe<Scalars['String']>;
  society_ends_with?: InputMaybe<Scalars['String']>;
  society_ends_with_nocase?: InputMaybe<Scalars['String']>;
  society_gt?: InputMaybe<Scalars['String']>;
  society_gte?: InputMaybe<Scalars['String']>;
  society_in?: InputMaybe<Array<Scalars['String']>>;
  society_lt?: InputMaybe<Scalars['String']>;
  society_lte?: InputMaybe<Scalars['String']>;
  society_not?: InputMaybe<Scalars['String']>;
  society_not_contains?: InputMaybe<Scalars['String']>;
  society_not_contains_nocase?: InputMaybe<Scalars['String']>;
  society_not_ends_with?: InputMaybe<Scalars['String']>;
  society_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  society_not_in?: InputMaybe<Array<Scalars['String']>>;
  society_not_starts_with?: InputMaybe<Scalars['String']>;
  society_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  society_starts_with?: InputMaybe<Scalars['String']>;
  society_starts_with_nocase?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['BigInt']>;
  updatedAt_gt?: InputMaybe<Scalars['BigInt']>;
  updatedAt_gte?: InputMaybe<Scalars['BigInt']>;
  updatedAt_in?: InputMaybe<Array<Scalars['BigInt']>>;
  updatedAt_lt?: InputMaybe<Scalars['BigInt']>;
  updatedAt_lte?: InputMaybe<Scalars['BigInt']>;
  updatedAt_not?: InputMaybe<Scalars['BigInt']>;
  updatedAt_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
};

export enum Attestation_OrderBy {
  CreatedAt = 'createdAt',
  Id = 'id',
  MetadataUri = 'metadataUri',
  Recipients = 'recipients',
  Society = 'society',
  UpdatedAt = 'updatedAt'
}

export type BlockChangedFilter = {
  number_gte: Scalars['Int'];
};

export type Block_Height = {
  hash?: InputMaybe<Scalars['Bytes']>;
  number?: InputMaybe<Scalars['Int']>;
  number_gte?: InputMaybe<Scalars['Int']>;
};

/** Defines the order direction, either ascending or descending */
export enum OrderDirection {
  Asc = 'asc',
  Desc = 'desc'
}

export type Query = {
  __typename?: 'Query';
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>;
  attestation?: Maybe<Attestation>;
  attestations: Array<Attestation>;
  societies: Array<Society>;
  society?: Maybe<Society>;
  token?: Maybe<Token>;
  tokens: Array<Token>;
  user?: Maybe<User>;
  users: Array<User>;
};


export type Query_MetaArgs = {
  block?: InputMaybe<Block_Height>;
};


export type QueryAttestationArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryAttestationsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Attestation_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Attestation_Filter>;
};


export type QuerySocietiesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Society_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Society_Filter>;
};


export type QuerySocietyArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryTokenArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryTokensArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Token_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Token_Filter>;
};


export type QueryUserArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryUsersArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<User_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<User_Filter>;
};

export type Society = {
  __typename?: 'Society';
  admin?: Maybe<Scalars['Bytes']>;
  attestations: Array<Attestation>;
  createdAt?: Maybe<Scalars['BigInt']>;
  delegateRoleId?: Maybe<Scalars['ID']>;
  id: Scalars['Bytes'];
  metadataUri: Scalars['String'];
  transactionHash?: Maybe<Scalars['Bytes']>;
  updatedAt?: Maybe<Scalars['BigInt']>;
  verified?: Maybe<Scalars['Boolean']>;
};


export type SocietyAttestationsArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Attestation_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<Attestation_Filter>;
};

export type Society_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  admin?: InputMaybe<Scalars['Bytes']>;
  admin_contains?: InputMaybe<Scalars['Bytes']>;
  admin_in?: InputMaybe<Array<Scalars['Bytes']>>;
  admin_not?: InputMaybe<Scalars['Bytes']>;
  admin_not_contains?: InputMaybe<Scalars['Bytes']>;
  admin_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  attestations_?: InputMaybe<Attestation_Filter>;
  createdAt?: InputMaybe<Scalars['BigInt']>;
  createdAt_gt?: InputMaybe<Scalars['BigInt']>;
  createdAt_gte?: InputMaybe<Scalars['BigInt']>;
  createdAt_in?: InputMaybe<Array<Scalars['BigInt']>>;
  createdAt_lt?: InputMaybe<Scalars['BigInt']>;
  createdAt_lte?: InputMaybe<Scalars['BigInt']>;
  createdAt_not?: InputMaybe<Scalars['BigInt']>;
  createdAt_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  delegateRoleId?: InputMaybe<Scalars['ID']>;
  delegateRoleId_gt?: InputMaybe<Scalars['ID']>;
  delegateRoleId_gte?: InputMaybe<Scalars['ID']>;
  delegateRoleId_in?: InputMaybe<Array<Scalars['ID']>>;
  delegateRoleId_lt?: InputMaybe<Scalars['ID']>;
  delegateRoleId_lte?: InputMaybe<Scalars['ID']>;
  delegateRoleId_not?: InputMaybe<Scalars['ID']>;
  delegateRoleId_not_in?: InputMaybe<Array<Scalars['ID']>>;
  id?: InputMaybe<Scalars['Bytes']>;
  id_contains?: InputMaybe<Scalars['Bytes']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']>>;
  id_not?: InputMaybe<Scalars['Bytes']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  metadataUri?: InputMaybe<Scalars['String']>;
  metadataUri_contains?: InputMaybe<Scalars['String']>;
  metadataUri_contains_nocase?: InputMaybe<Scalars['String']>;
  metadataUri_ends_with?: InputMaybe<Scalars['String']>;
  metadataUri_ends_with_nocase?: InputMaybe<Scalars['String']>;
  metadataUri_gt?: InputMaybe<Scalars['String']>;
  metadataUri_gte?: InputMaybe<Scalars['String']>;
  metadataUri_in?: InputMaybe<Array<Scalars['String']>>;
  metadataUri_lt?: InputMaybe<Scalars['String']>;
  metadataUri_lte?: InputMaybe<Scalars['String']>;
  metadataUri_not?: InputMaybe<Scalars['String']>;
  metadataUri_not_contains?: InputMaybe<Scalars['String']>;
  metadataUri_not_contains_nocase?: InputMaybe<Scalars['String']>;
  metadataUri_not_ends_with?: InputMaybe<Scalars['String']>;
  metadataUri_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  metadataUri_not_in?: InputMaybe<Array<Scalars['String']>>;
  metadataUri_not_starts_with?: InputMaybe<Scalars['String']>;
  metadataUri_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  metadataUri_starts_with?: InputMaybe<Scalars['String']>;
  metadataUri_starts_with_nocase?: InputMaybe<Scalars['String']>;
  transactionHash?: InputMaybe<Scalars['Bytes']>;
  transactionHash_contains?: InputMaybe<Scalars['Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['Bytes']>>;
  transactionHash_not?: InputMaybe<Scalars['Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['Bytes']>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  updatedAt?: InputMaybe<Scalars['BigInt']>;
  updatedAt_gt?: InputMaybe<Scalars['BigInt']>;
  updatedAt_gte?: InputMaybe<Scalars['BigInt']>;
  updatedAt_in?: InputMaybe<Array<Scalars['BigInt']>>;
  updatedAt_lt?: InputMaybe<Scalars['BigInt']>;
  updatedAt_lte?: InputMaybe<Scalars['BigInt']>;
  updatedAt_not?: InputMaybe<Scalars['BigInt']>;
  updatedAt_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  verified?: InputMaybe<Scalars['Boolean']>;
  verified_in?: InputMaybe<Array<Scalars['Boolean']>>;
  verified_not?: InputMaybe<Scalars['Boolean']>;
  verified_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
};

export enum Society_OrderBy {
  Admin = 'admin',
  Attestations = 'attestations',
  CreatedAt = 'createdAt',
  DelegateRoleId = 'delegateRoleId',
  Id = 'id',
  MetadataUri = 'metadataUri',
  TransactionHash = 'transactionHash',
  UpdatedAt = 'updatedAt',
  Verified = 'verified'
}

export type Subscription = {
  __typename?: 'Subscription';
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>;
  attestation?: Maybe<Attestation>;
  attestations: Array<Attestation>;
  societies: Array<Society>;
  society?: Maybe<Society>;
  token?: Maybe<Token>;
  tokens: Array<Token>;
  user?: Maybe<User>;
  users: Array<User>;
};


export type Subscription_MetaArgs = {
  block?: InputMaybe<Block_Height>;
};


export type SubscriptionAttestationArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionAttestationsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Attestation_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Attestation_Filter>;
};


export type SubscriptionSocietiesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Society_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Society_Filter>;
};


export type SubscriptionSocietyArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionTokenArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionTokensArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Token_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Token_Filter>;
};


export type SubscriptionUserArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionUsersArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<User_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<User_Filter>;
};

export type Token = {
  __typename?: 'Token';
  active?: Maybe<Scalars['Boolean']>;
  attestation: Attestation;
  id: Scalars['ID'];
  issuedAt?: Maybe<Scalars['BigInt']>;
  issuedBy?: Maybe<Scalars['Bytes']>;
  owner: User;
  revokedAt?: Maybe<Scalars['BigInt']>;
  revokedBy?: Maybe<Scalars['Bytes']>;
  society: Society;
  tokenId?: Maybe<Scalars['BigInt']>;
};

export type Token_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  active?: InputMaybe<Scalars['Boolean']>;
  active_in?: InputMaybe<Array<Scalars['Boolean']>>;
  active_not?: InputMaybe<Scalars['Boolean']>;
  active_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  attestation?: InputMaybe<Scalars['String']>;
  attestation_?: InputMaybe<Attestation_Filter>;
  attestation_contains?: InputMaybe<Scalars['String']>;
  attestation_contains_nocase?: InputMaybe<Scalars['String']>;
  attestation_ends_with?: InputMaybe<Scalars['String']>;
  attestation_ends_with_nocase?: InputMaybe<Scalars['String']>;
  attestation_gt?: InputMaybe<Scalars['String']>;
  attestation_gte?: InputMaybe<Scalars['String']>;
  attestation_in?: InputMaybe<Array<Scalars['String']>>;
  attestation_lt?: InputMaybe<Scalars['String']>;
  attestation_lte?: InputMaybe<Scalars['String']>;
  attestation_not?: InputMaybe<Scalars['String']>;
  attestation_not_contains?: InputMaybe<Scalars['String']>;
  attestation_not_contains_nocase?: InputMaybe<Scalars['String']>;
  attestation_not_ends_with?: InputMaybe<Scalars['String']>;
  attestation_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  attestation_not_in?: InputMaybe<Array<Scalars['String']>>;
  attestation_not_starts_with?: InputMaybe<Scalars['String']>;
  attestation_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  attestation_starts_with?: InputMaybe<Scalars['String']>;
  attestation_starts_with_nocase?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  issuedAt?: InputMaybe<Scalars['BigInt']>;
  issuedAt_gt?: InputMaybe<Scalars['BigInt']>;
  issuedAt_gte?: InputMaybe<Scalars['BigInt']>;
  issuedAt_in?: InputMaybe<Array<Scalars['BigInt']>>;
  issuedAt_lt?: InputMaybe<Scalars['BigInt']>;
  issuedAt_lte?: InputMaybe<Scalars['BigInt']>;
  issuedAt_not?: InputMaybe<Scalars['BigInt']>;
  issuedAt_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  issuedBy?: InputMaybe<Scalars['Bytes']>;
  issuedBy_contains?: InputMaybe<Scalars['Bytes']>;
  issuedBy_in?: InputMaybe<Array<Scalars['Bytes']>>;
  issuedBy_not?: InputMaybe<Scalars['Bytes']>;
  issuedBy_not_contains?: InputMaybe<Scalars['Bytes']>;
  issuedBy_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  owner?: InputMaybe<Scalars['String']>;
  owner_?: InputMaybe<User_Filter>;
  owner_contains?: InputMaybe<Scalars['String']>;
  owner_contains_nocase?: InputMaybe<Scalars['String']>;
  owner_ends_with?: InputMaybe<Scalars['String']>;
  owner_ends_with_nocase?: InputMaybe<Scalars['String']>;
  owner_gt?: InputMaybe<Scalars['String']>;
  owner_gte?: InputMaybe<Scalars['String']>;
  owner_in?: InputMaybe<Array<Scalars['String']>>;
  owner_lt?: InputMaybe<Scalars['String']>;
  owner_lte?: InputMaybe<Scalars['String']>;
  owner_not?: InputMaybe<Scalars['String']>;
  owner_not_contains?: InputMaybe<Scalars['String']>;
  owner_not_contains_nocase?: InputMaybe<Scalars['String']>;
  owner_not_ends_with?: InputMaybe<Scalars['String']>;
  owner_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  owner_not_in?: InputMaybe<Array<Scalars['String']>>;
  owner_not_starts_with?: InputMaybe<Scalars['String']>;
  owner_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  owner_starts_with?: InputMaybe<Scalars['String']>;
  owner_starts_with_nocase?: InputMaybe<Scalars['String']>;
  revokedAt?: InputMaybe<Scalars['BigInt']>;
  revokedAt_gt?: InputMaybe<Scalars['BigInt']>;
  revokedAt_gte?: InputMaybe<Scalars['BigInt']>;
  revokedAt_in?: InputMaybe<Array<Scalars['BigInt']>>;
  revokedAt_lt?: InputMaybe<Scalars['BigInt']>;
  revokedAt_lte?: InputMaybe<Scalars['BigInt']>;
  revokedAt_not?: InputMaybe<Scalars['BigInt']>;
  revokedAt_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  revokedBy?: InputMaybe<Scalars['Bytes']>;
  revokedBy_contains?: InputMaybe<Scalars['Bytes']>;
  revokedBy_in?: InputMaybe<Array<Scalars['Bytes']>>;
  revokedBy_not?: InputMaybe<Scalars['Bytes']>;
  revokedBy_not_contains?: InputMaybe<Scalars['Bytes']>;
  revokedBy_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  society?: InputMaybe<Scalars['String']>;
  society_?: InputMaybe<Society_Filter>;
  society_contains?: InputMaybe<Scalars['String']>;
  society_contains_nocase?: InputMaybe<Scalars['String']>;
  society_ends_with?: InputMaybe<Scalars['String']>;
  society_ends_with_nocase?: InputMaybe<Scalars['String']>;
  society_gt?: InputMaybe<Scalars['String']>;
  society_gte?: InputMaybe<Scalars['String']>;
  society_in?: InputMaybe<Array<Scalars['String']>>;
  society_lt?: InputMaybe<Scalars['String']>;
  society_lte?: InputMaybe<Scalars['String']>;
  society_not?: InputMaybe<Scalars['String']>;
  society_not_contains?: InputMaybe<Scalars['String']>;
  society_not_contains_nocase?: InputMaybe<Scalars['String']>;
  society_not_ends_with?: InputMaybe<Scalars['String']>;
  society_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  society_not_in?: InputMaybe<Array<Scalars['String']>>;
  society_not_starts_with?: InputMaybe<Scalars['String']>;
  society_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  society_starts_with?: InputMaybe<Scalars['String']>;
  society_starts_with_nocase?: InputMaybe<Scalars['String']>;
  tokenId?: InputMaybe<Scalars['BigInt']>;
  tokenId_gt?: InputMaybe<Scalars['BigInt']>;
  tokenId_gte?: InputMaybe<Scalars['BigInt']>;
  tokenId_in?: InputMaybe<Array<Scalars['BigInt']>>;
  tokenId_lt?: InputMaybe<Scalars['BigInt']>;
  tokenId_lte?: InputMaybe<Scalars['BigInt']>;
  tokenId_not?: InputMaybe<Scalars['BigInt']>;
  tokenId_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
};

export enum Token_OrderBy {
  Active = 'active',
  Attestation = 'attestation',
  Id = 'id',
  IssuedAt = 'issuedAt',
  IssuedBy = 'issuedBy',
  Owner = 'owner',
  RevokedAt = 'revokedAt',
  RevokedBy = 'revokedBy',
  Society = 'society',
  TokenId = 'tokenId'
}

export type User = {
  __typename?: 'User';
  id: Scalars['Bytes'];
  tokens: Array<Token>;
};


export type UserTokensArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Token_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<Token_Filter>;
};

export type User_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  id?: InputMaybe<Scalars['Bytes']>;
  id_contains?: InputMaybe<Scalars['Bytes']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']>>;
  id_not?: InputMaybe<Scalars['Bytes']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  tokens_?: InputMaybe<Token_Filter>;
};

export enum User_OrderBy {
  Id = 'id',
  Tokens = 'tokens'
}

export type _Block_ = {
  __typename?: '_Block_';
  /** The hash of the block */
  hash?: Maybe<Scalars['Bytes']>;
  /** The block number */
  number: Scalars['Int'];
  /** Integer representation of the timestamp stored in blocks for the chain */
  timestamp?: Maybe<Scalars['Int']>;
};

/** The type for the top-level _meta field */
export type _Meta_ = {
  __typename?: '_Meta_';
  /**
   * Information about a specific subgraph block. The hash of the block
   * will be null if the _meta field has a block constraint that asks for
   * a block number. It will be filled if the _meta field has no block constraint
   * and therefore asks for the latest  block
   *
   */
  block: _Block_;
  /** The deployment ID */
  deployment: Scalars['String'];
  /** If `true`, the subgraph encountered indexing errors at some past block */
  hasIndexingErrors: Scalars['Boolean'];
};

export enum _SubgraphErrorPolicy_ {
  /** Data will be returned even if the subgraph has indexing errors */
  Allow = 'allow',
  /** If the subgraph has indexing errors, data will be omitted. The default. */
  Deny = 'deny'
}

export type GetSocietiesQueryVariables = Exact<{ [key: string]: never }>;

export type GetSocietiesQuery = {
  __typename?: "Query";
  societies: Array<{
    __typename?: "Society";
    admin?: any | null;
    delegateRoleId?: string | null;
    id: any;
    metadataUri: string;
    verified?: boolean | null;
    attestations: Array<{
      __typename?: "Attestation";
      metadataUri: string;
      id: string;
    }>;
  }>;
};

export const GetSocietiesDocument = `
    query getSocieties {
  societies {
    admin
    attestations {
      metadataUri
      id
    }
    delegateRoleId
    id
    metadataUri
    verified
  }
}
    `;
export const useGetSocietiesQuery = <
  TData = GetSocietiesQuery,
  TError = unknown
>(
  dataSource: { endpoint: string; fetchParams?: RequestInit },
  variables?: GetSocietiesQueryVariables,
  options?: UseQueryOptions<GetSocietiesQuery, TError, TData>
) =>
  useQuery<GetSocietiesQuery, TError, TData>(
    variables === undefined ? ["getSocieties"] : ["getSocieties", variables],
    fetcher<GetSocietiesQuery, GetSocietiesQueryVariables>(
      dataSource.endpoint,
      dataSource.fetchParams || {},
      GetSocietiesDocument,
      variables
    ),
    options
  );