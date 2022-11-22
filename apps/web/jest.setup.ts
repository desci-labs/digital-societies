import "@testing-library/jest-dom/extend-expect";
import "whatwg-fetch";

/**
 * NOTE: We use this to mock window.watchMedia on jest
 * docs: https://www.npmjs.com/package/mock-match-media#jest
 * */
import "mock-match-media/jest-setup";

/**
 * Mock rainbowkit
 * see here: https://github.com/rainbow-me/rainbowkit/issues/461#issuecomment-1190043830
 */
jest.setTimeout(10000);
jest.mock("@rainbow-me/rainbowkit", () => ({
  ConnectButton: {
    Custom: jest.fn(),
  },
  RainbowKitProvider: jest.fn(),
  lightTheme: jest.fn(),
  darkTheme: jest.fn(),
  useConnectModal: () => ({
    openConnectModal: jest.fn(),
  }),
  getDefaultWallets: jest.fn(() => ({})),
}));

jest.mock("multiformats/cid", () => ({
  parse: jest.fn(),
}));

jest.mock("@opengsn/provider/dist/WrapContract", () => ({
  wrapContract: jest.fn(),
}));
