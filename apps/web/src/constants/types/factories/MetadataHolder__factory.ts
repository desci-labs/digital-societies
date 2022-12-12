/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../common";
import type {
  MetadataHolder,
  MetadataHolderInterface,
} from "../MetadataHolder";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_factoryAddress",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "society",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "admin",
        type: "address",
      },
    ],
    name: "AdminUpdated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "society",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "attestationId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "string",
        name: "uri",
        type: "string",
      },
    ],
    name: "AttestationUpdated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "society",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "attestationId",
        type: "uint256",
      },
    ],
    name: "DelegatesUpdated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "society",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "recipient",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "issuedBy",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "attestationId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Issued",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "attestationId",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "revokedBy",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "_owner",
        type: "address",
      },
    ],
    name: "Revoked",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "society",
        type: "address",
      },
      {
        indexed: false,
        internalType: "string",
        name: "uri",
        type: "string",
      },
    ],
    name: "SocietyUpdated",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "society",
        type: "address",
      },
      {
        internalType: "string",
        name: "uri",
        type: "string",
      },
    ],
    name: "addSociety",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    name: "attestations",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "factoryAddress",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "society",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "attestationId",
        type: "uint256",
      },
    ],
    name: "isValidAttestation",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "society",
        type: "address",
      },
    ],
    name: "isValidSociety",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "attestationId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "recipient",
        type: "address",
      },
      {
        internalType: "address",
        name: "issuedBy",
        type: "address",
      },
    ],
    name: "issueAttestation",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "attestationId",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "_owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "revokedby",
        type: "address",
      },
    ],
    name: "revokeToken",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "factory",
        type: "address",
      },
    ],
    name: "setFactoryAddress",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "societies",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes4",
        name: "interfaceId",
        type: "bytes4",
      },
    ],
    name: "supportsInterface",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "admin",
        type: "address",
      },
    ],
    name: "updateAdmin",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "attestationId",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "uri",
        type: "string",
      },
    ],
    name: "updateAttestation",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "attestationId",
        type: "uint256",
      },
    ],
    name: "updateDelegate",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "uri",
        type: "string",
      },
    ],
    name: "updateSociety",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x608060405234801561001057600080fd5b50604051610c77380380610c7783398101604081905261002f916100ad565b6100383361005d565b600180546001600160a01b0319166001600160a01b03929092169190911790556100dd565b600080546001600160a01b038381166001600160a01b0319831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b6000602082840312156100bf57600080fd5b81516001600160a01b03811681146100d657600080fd5b9392505050565b610b8b806100ec6000396000f3fe608060405234801561001057600080fd5b506004361061010b5760003560e01c80638da5cb5b116100a2578063c0f6ad5c11610071578063c0f6ad5c14610233578063c67d234f1461025f578063da55fcf914610282578063e2f273bd14610295578063f2fde38b146102a857600080fd5b80638da5cb5b146101c5578063940992a3146101ea578063966dae0e1461020d578063a326424f1461022057600080fd5b80636b1ae3ff116100de5780636b1ae3ff1461018457806370d894cd14610197578063715018a6146101aa57806383c17c55146101b257600080fd5b806301ffc9a71461011057806318f002a5146101495780631c392fb81461015e578063251acc6e14610171575b600080fd5b61013461011e366004610893565b6001600160e01b031916637c026df360e11b1490565b60405190151581526020015b60405180910390f35b61015c61015736600461090d565b6102bb565b005b61015c61016c366004610975565b610393565b61015c61017f366004610975565b61040d565b61015c6101923660046109bb565b6104e6565b61015c6101a53660046109fd565b610554565b61015c6105c0565b61015c6101c0366004610a16565b6105d4565b6000546001600160a01b03165b6040516001600160a01b039091168152602001610140565b6101346101f83660046109fd565b60036020526000908152604090205460ff1681565b6001546101d2906001600160a01b031681565b61015c61022e366004610a31565b6105fe565b610134610241366004610a16565b6001600160a01b031660009081526002602052604090205460ff1690565b61013461026d366004610a16565b60026020526000908152604090205460ff1681565b610134610290366004610a6b565b6106b8565b61015c6102a3366004610a16565b610703565b61015c6102b6366004610a16565b610770565b3360009081526002602052604090205460ff166102f35760405162461bcd60e51b81526004016102ea90610a95565b60405180910390fd5b6102fd33846106b8565b61035157600033604080516001600160a01b039092166020830152810185905260600160408051601f198184030181529181528151602092830120600090815260039092529020805460ff19166001179055505b7f87d1d332fa682bc0d7366d6bdefcb48e65cc8e3400de4dd45d4b16aa40df8b6e338484846040516103869493929190610af5565b60405180910390a1505050565b3360009081526002602052604090205460ff166103c25760405162461bcd60e51b81526004016102ea90610a95565b6040516001600160a01b038381168252821690849086907f9226ca493d710956f38c62a37de1e8f82e67eb3103eca97a15810f5432cc47de906020015b60405180910390a450505050565b3360009081526002602052604090205460ff1661043c5760405162461bcd60e51b81526004016102ea90610a95565b61044633856106b8565b6104885760405162461bcd60e51b815260206004820152601360248201527224b73b30b634b21030ba3a32b9ba30ba34b7b760691b60448201526064016102ea565b806001600160a01b0316826001600160a01b03166104a33390565b6001600160a01b03167f50c6e2a1fd0ccc6a98cbb481eada0947feebce4aa3309d6e1351c85a68bcfa9c87876040516103ff929190918252602082015260400190565b3360009081526002602052604090205460ff166105155760405162461bcd60e51b81526004016102ea90610a95565b7fbe6bd5626f2e9940c870f7268d73a3d3b95c6b6d4e0206923e999bba01fbb4ea33838360405161054893929190610b27565b60405180910390a15050565b3360009081526002602052604090205460ff166105835760405162461bcd60e51b81526004016102ea90610a95565b60408051338152602081018390527fdab2189a7186519686c44e5dc1bc034f86436268026773004b86d3963291db5391015b60405180910390a150565b6105c86107e9565b6105d26000610843565b565b6105dc6107e9565b600180546001600160a01b0319166001600160a01b0392909216919091179055565b6001546001600160a01b0316336001600160a01b0316146106615760405162461bcd60e51b815260206004820152601a60248201527f756e617574686f72697a65643a20666163746f7279206f6e6c7900000000000060448201526064016102ea565b6001600160a01b03831660009081526002602052604090819020805460ff19166001179055517fbe6bd5626f2e9940c870f7268d73a3d3b95c6b6d4e0206923e999bba01fbb4ea9061038690859085908590610b27565b604080516001600160a01b0393909316602080850191909152838201929092528051808403820181526060909301815282519282019290922060009081526003909152205460ff1690565b3360009081526002602052604090205460ff166107325760405162461bcd60e51b81526004016102ea90610a95565b604080513381526001600160a01b03831660208201527f101b8081ff3b56bbf45deb824d86a3b0fd38b7e3dd42421105cf8abe9106db0b91016105b5565b6107786107e9565b6001600160a01b0381166107dd5760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201526564647265737360d01b60648201526084016102ea565b6107e681610843565b50565b6000546001600160a01b031633146105d25760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e657260448201526064016102ea565b600080546001600160a01b038381166001600160a01b0319831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b6000602082840312156108a557600080fd5b81356001600160e01b0319811681146108bd57600080fd5b9392505050565b60008083601f8401126108d657600080fd5b50813567ffffffffffffffff8111156108ee57600080fd5b60208301915083602082850101111561090657600080fd5b9250929050565b60008060006040848603121561092257600080fd5b83359250602084013567ffffffffffffffff81111561094057600080fd5b61094c868287016108c4565b9497909650939450505050565b80356001600160a01b038116811461097057600080fd5b919050565b6000806000806080858703121561098b57600080fd5b84359350602085013592506109a260408601610959565b91506109b060608601610959565b905092959194509250565b600080602083850312156109ce57600080fd5b823567ffffffffffffffff8111156109e557600080fd5b6109f1858286016108c4565b90969095509350505050565b600060208284031215610a0f57600080fd5b5035919050565b600060208284031215610a2857600080fd5b6108bd82610959565b600080600060408486031215610a4657600080fd5b610a4f84610959565b9250602084013567ffffffffffffffff81111561094057600080fd5b60008060408385031215610a7e57600080fd5b610a8783610959565b946020939093013593505050565b60208082526018908201527f756e617574686f72697a65643a206465736f63206f6e6c790000000000000000604082015260600190565b81835281816020850137506000828201602090810191909152601f909101601f19169091010190565b60018060a01b0385168152836020820152606060408201526000610b1d606083018486610acc565b9695505050505050565b6001600160a01b0384168152604060208201819052600090610b4c9083018486610acc565b9594505050505056fea2646970667358221220cea4782fe98d5ec9ff0d543faa2aba178dcb338cec8fa97ec940b47e5b9a51f364736f6c63430008110033";

type MetadataHolderConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: MetadataHolderConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class MetadataHolder__factory extends ContractFactory {
  constructor(...args: MetadataHolderConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    _factoryAddress: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<MetadataHolder> {
    return super.deploy(
      _factoryAddress,
      overrides || {}
    ) as Promise<MetadataHolder>;
  }
  override getDeployTransaction(
    _factoryAddress: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(_factoryAddress, overrides || {});
  }
  override attach(address: string): MetadataHolder {
    return super.attach(address) as MetadataHolder;
  }
  override connect(signer: Signer): MetadataHolder__factory {
    return super.connect(signer) as MetadataHolder__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): MetadataHolderInterface {
    return new utils.Interface(_abi) as MetadataHolderInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): MetadataHolder {
    return new Contract(address, _abi, signerOrProvider) as MetadataHolder;
  }
}
