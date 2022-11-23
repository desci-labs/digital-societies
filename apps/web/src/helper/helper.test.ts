import { W3S_IPFS_GATEWAY } from "api/constants";
import { getImageURL, maskAddress, shortenAddress, shortenText } from "helper";

describe("Helper functions", () => {
  describe("shorten text and address", () => {
    const text =
      "We are an Open Source collective building tools to foster a vibrant future for decentralised societies and digital democracies. ";
    const address = "0xe861856C961F853DC47e5F2aD1fa2b9eA20e4E88";

    it("shortens text after 100 characters", () => {
      const text100 =
        "We are an Open Source collective building tools to foster a vibrant future for decentralised societi...";
      const shortened = shortenText(text);
      expect(shortened).toEqual(text100);
    });

    it("shortens text after 50 characters", () => {
      const text50 = "We are an Open Source collective building tools to...";
      const shortened = shortenText(text, 50);
      expect(shortened).toEqual(text50);
    });

    it("shortens address after 10 characters", () => {
      const address10 = "0xe861856C...";
      const shortened = shortenAddress(address);
      expect(shortened).toEqual(address10);
    });

    it("masks address", () => {
      const masked = "0xe8...4E88";
      const shortened = maskAddress(address);
      expect(shortened).toEqual(masked);
    });
  });

  describe("Resolve Image url", () => {
    const cid = "bafkreiay36go5cuxpoitjjxwlauiyf6rygk5d544z7noapqfwwb3yyuyyy";
    const w3sImageUrl = "";

    it("Resolves empty string", () => {
      const result = getImageURL("");
      expect(result).toEqual("");
    });

    it("Resolves CID string", () => {
      const result = getImageURL(cid);
      console.log(result);
      expect(result).toEqual(`${W3S_IPFS_GATEWAY}${cid}`);
    });
  });
});
