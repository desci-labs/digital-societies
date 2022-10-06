/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import type {
  FunctionFragment,
  Result,
  EventFragment,
} from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
  PromiseOrValue,
} from "./common";

export interface DesocManagerInterface extends utils.Interface {
  functions: {
    "deployToken(string,string,bytes)": FunctionFragment;
    "getTrustedForwarder()": FunctionFragment;
    "isTrustedForwarder(address)": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "deployToken"
      | "getTrustedForwarder"
      | "isTrustedForwarder"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "deployToken",
    values: [
      PromiseOrValue<string>,
      PromiseOrValue<string>,
      PromiseOrValue<BytesLike>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "getTrustedForwarder",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "isTrustedForwarder",
    values: [PromiseOrValue<string>]
  ): string;

  decodeFunctionResult(
    functionFragment: "deployToken",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getTrustedForwarder",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "isTrustedForwarder",
    data: BytesLike
  ): Result;

  events: {
    "TokenCreated(address,address)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "TokenCreated"): EventFragment;
}

export interface TokenCreatedEventObject {
  token: string;
  owner: string;
}
export type TokenCreatedEvent = TypedEvent<
  [string, string],
  TokenCreatedEventObject
>;

export type TokenCreatedEventFilter = TypedEventFilter<TokenCreatedEvent>;

export interface DesocManager extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: DesocManagerInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    deployToken(
      _name: PromiseOrValue<string>,
      _symbol: PromiseOrValue<string>,
      _metadata: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    getTrustedForwarder(
      overrides?: CallOverrides
    ): Promise<[string] & { forwarder: string }>;

    isTrustedForwarder(
      forwarder: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[boolean]>;
  };

  deployToken(
    _name: PromiseOrValue<string>,
    _symbol: PromiseOrValue<string>,
    _metadata: PromiseOrValue<BytesLike>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  getTrustedForwarder(overrides?: CallOverrides): Promise<string>;

  isTrustedForwarder(
    forwarder: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<boolean>;

  callStatic: {
    deployToken(
      _name: PromiseOrValue<string>,
      _symbol: PromiseOrValue<string>,
      _metadata: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<string>;

    getTrustedForwarder(overrides?: CallOverrides): Promise<string>;

    isTrustedForwarder(
      forwarder: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<boolean>;
  };

  filters: {
    "TokenCreated(address,address)"(
      token?: PromiseOrValue<string> | null,
      owner?: PromiseOrValue<string> | null
    ): TokenCreatedEventFilter;
    TokenCreated(
      token?: PromiseOrValue<string> | null,
      owner?: PromiseOrValue<string> | null
    ): TokenCreatedEventFilter;
  };

  estimateGas: {
    deployToken(
      _name: PromiseOrValue<string>,
      _symbol: PromiseOrValue<string>,
      _metadata: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    getTrustedForwarder(overrides?: CallOverrides): Promise<BigNumber>;

    isTrustedForwarder(
      forwarder: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    deployToken(
      _name: PromiseOrValue<string>,
      _symbol: PromiseOrValue<string>,
      _metadata: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    getTrustedForwarder(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    isTrustedForwarder(
      forwarder: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
  };
}