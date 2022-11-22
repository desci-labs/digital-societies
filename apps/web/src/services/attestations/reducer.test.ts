import { configureStore, Store } from "@reduxjs/toolkit";
import reducer, {
  removeTokens,
  setAttestation,
  setAttestations,
  setIsLoading,
  setTokens,
  updateTokens,
} from "./reducer";
import {
  Attestation,
  AttestationMap,
  AttestationState,
  AttestationToTokenMap,
  RevokedAttestationToken,
} from "./types";
import mockAttestations from "test/data/attestations.json";
import mockTokens from "test/data/tokens.json";

const mockAttestation: Attestation = {
  id: 2,
  metadata: {
    name: "new attestation",
    description:
      "We are building tools to enable scientists to form Autonomous Research Communities (ARCs) that operate on the Ledger of Scientific Record.\n\nARCs select, validate, and curate promising scientific discoveries. Each step of the process is recorded on-chain, creating an immutable and permanent public record.",
    attestationType: "Achievement",
    image:
      "https://w3s.link/ipfs/bafkreihgkhxi6umjfu34jrkxcqbvumb7lqgdskb6lhenerukalhtespnwm",
    external_link: "https://desci.com",
  },
  mintedBy: "0x114EA4c82a0B5d54Ce5697272a2De2e4a14D654C",
  cid: "https://w3s.link/ipfs/bafkreibiaufpjgatkxajg56xjy6kwsglq2vdmxryjsppbb2qmoafusrxny",
  dateCreated: 1666533876000,
  address: "0x780E037a5B1d87E99cbBA0d0D3961fC61510Ecbd",
};

const initialState: AttestationState = {
  attestations: {},
  tokens: {},
  isLoading: true,
};

describe("Attestation reducer", () => {
  let store: Store<AttestationState>;
  const attestations = mockAttestations as AttestationMap;
  const tokens = mockTokens as AttestationToTokenMap;
  beforeEach(() => {
    store = configureStore({ reducer: reducer });
  });

  describe("Valid initial state", () => {
    it("has a valid initial state", () => {
      expect(store.getState()).toEqual(initialState);
    });
  });

  describe("setIsLoading", () => {
    it("Set Loading state", () => {
      store.dispatch(setIsLoading(true));
      const state = store.getState();
      expect(state.isLoading).toEqual(true);
    });
  });

  describe("setAttestations", () => {
    it("set attestations action", () => {
      store.dispatch(setAttestations(attestations));
      const state = store.getState();
      expect(state.attestations).toEqual(attestations);
    });
  });

  describe("setAttestation", () => {
    beforeEach(() => {
      store.dispatch(setAttestations(attestations));
    });

    it("set attestation action", () => {
      const org = "0x780E037a5B1d87E99cbBA0d0D3961fC61510Ecbd";
      const prevState = store.getState().attestations[org];
      store.dispatch(
        setAttestation({
          address: org,
          attestation: mockAttestation,
        })
      );
      const state = store.getState();
      expect(state.attestations[org]).toEqual(
        prevState.concat(mockAttestation)
      );
    });
  });

  describe("setTokens", () => {
    it("set attestation tokens", () => {
      store.dispatch(setTokens(tokens));
      const state = store.getState();
      expect(state.tokens).toEqual(tokens);
    });
  });

  describe("Tokens update", () => {
    const org = "0x780E037a5B1d87E99cbBA0d0D3961fC61510Ecbd";
    beforeEach(() => {
      store.dispatch(setTokens(tokens));
    });

    it("Removes existing tokens of an attestation", () => {
      store.dispatch(removeTokens({ address: org, tokenIds: [1, 2, 3] }));
      const state = store.getState();
      expect(state.tokens[org]).toEqual(tokens[org].slice(3));
    });

    it("Update existing tokens of an attestation", () => {
      const org = "0x36C6a9b59dE798c354799f1E1E9646D8008A4FB6";
      const tokenToUpdate: RevokedAttestationToken = {
        org: "0x36C6a9b59dE798c354799f1E1E9646D8008A4FB6",
        tokenId: 1,
        owner: "0x855D6DB82BC9941731ef4c8f24EF8F8c2Ba70d57",
        active: false,
        issuer: "0x855D6DB82BC9941731ef4c8f24EF8F8c2Ba70d57",
        attestation: 1,
        revokedBy: "0xe861856C961F853DC47e5F2aD1fa2b9eA20e4E88",
        dateRevoked: 1667146668000,
      };

      store.dispatch(updateTokens({ address: org, tokens: [tokenToUpdate] }));
      const state = store.getState();
      expect(state.tokens[org]).toEqual([tokenToUpdate, mockTokens[org][1]]);
    });
  });
});
