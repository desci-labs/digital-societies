import { maskAddress, shortenAddress, shortenText } from "helper";

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
});
