/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../common";
import type { Factory, FactoryInterface } from "../Factory";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "forwarder",
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
        indexed: true,
        internalType: "address",
        name: "token",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: false,
        internalType: "string",
        name: "contractUri",
        type: "string",
      },
    ],
    name: "Deployed",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "Paused",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "org",
        type: "address",
      },
    ],
    name: "Refuted",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "Unpaused",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "org",
        type: "address",
      },
    ],
    name: "Verified",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_name",
        type: "string",
      },
      {
        internalType: "string",
        name: "_symbol",
        type: "string",
      },
      {
        internalType: "string",
        name: "_contractUri",
        type: "string",
      },
    ],
    name: "deployToken",
    outputs: [
      {
        internalType: "address",
        name: "token",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "getTrustedForwarder",
    outputs: [
      {
        internalType: "address",
        name: "forwarder",
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
        name: "forwarder",
        type: "address",
      },
    ],
    name: "isTrustedForwarder",
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
    name: "pause",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "paused",
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
        name: "org",
        type: "address",
      },
    ],
    name: "refute",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_metaAddress",
        type: "address",
      },
    ],
    name: "setMetaAddress",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "unpause",
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
    name: "verified",
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
        name: "org",
        type: "address",
      },
    ],
    name: "verify",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x608060405234801561001057600080fd5b506040516135e23803806135e283398101604081905261002f916100a4565b610037610070565b600180546001600160a01b0319166001600160a01b03928316179055600080546001600160a81b031916918316919091179055506100d4565b60006014361080159061008d57506000546001600160a01b031633145b1561009f575060131936013560601c90565b503390565b6000602082840312156100b657600080fd5b81516001600160a01b03811681146100cd57600080fd5b9392505050565b6134ff806100e36000396000f3fe60806040523480156200001157600080fd5b5060043610620000b75760003560e01c80635c975abb116200007a5780635c975abb146200016f57806363a9c3d714620001825780638456cb5914620001995780638da5cb5b14620001a3578063ce1b815f14620001b7578063dcbf6b1414620001c957600080fd5b80630db065f414620000bc5780631166b54b14620000f75780633f4ba83a1462000110578063457902d2146200011a578063572b6c05146200014a575b600080fd5b620000e2620000cd36600462000896565b60036020526000908152604090205460ff1681565b60405190151581526020015b60405180910390f35b6200010e6200010836600462000896565b620001e0565b005b6200010e6200031b565b620001316200012b36600462000973565b620003af565b6040516001600160a01b039091168152602001620000ee565b620000e26200015b36600462000896565b6000546001600160a01b0391821691161490565b600054600160a01b900460ff16620000e2565b6200010e6200019336600462000896565b620005c1565b6200010e6200072f565b60015462000131906001600160a01b031681565b6000546001600160a01b031662000131565b6200010e620001da36600462000896565b620007ac565b6001546001600160a01b0316620001f662000852565b6001600160a01b031614620002285760405162461bcd60e51b81526004016200021f9062000a05565b60405180910390fd5b6040516301ffc9a760e01b8152637c026df360e11b60048201526001600160a01b038216906301ffc9a790602401602060405180830381865afa15801562000274573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906200029a919062000a3c565b1515600114620002f95760405162461bcd60e51b815260206004820152602360248201527f494d657461486f6c64657220696e74657266616365206e6f7420737570706f726044820152621d195960ea1b60648201526084016200021f565b600280546001600160a01b0319166001600160a01b0392909216919091179055565b6001546001600160a01b03166200033162000852565b6001600160a01b0316146200035a5760405162461bcd60e51b81526004016200021f9062000a05565b6000805460ff60a01b191690557f5db9ee0a495bf2e6ff9c91a7834c1ba4fdd244a5e8aa4e537bd38aeae4b073aa6200039262000852565b6040516001600160a01b03909116815260200160405180910390a1565b6001546000906001600160a01b0316331480620003d65750600054600160a01b900460ff16155b6200040e5760405162461bcd60e51b81526020600482015260076024820152665061757365642160c81b60448201526064016200021f565b600060405180602001620004229062000888565b601f1982820381018352601f909101166040528585856200044262000852565b6002546040516200046495949392916001600160a01b03169060200162000ab4565b60408051601f198184030181529082905262000484929160200162000b19565b60405160208183030381529060405290506000620004a162000852565b604051602001620004ca919060609190911b6bffffffffffffffffffffffff1916815260140190565b604051602081830303815290604052805190602001209050808251602084016000f59250823b620004fa57600080fd5b60025460405163a326424f60e01b81526001600160a01b039091169063a326424f906200052e908690889060040162000b4c565b600060405180830381600087803b1580156200054957600080fd5b505af11580156200055e573d6000803e3d6000fd5b505050506200056c62000852565b6001600160a01b0316836001600160a01b03167f1b13dc64671b1e5cf76efe4493bf5ded8299383f3da8205d39f9eb9891c598e586604051620005b0919062000b7a565b60405180910390a350509392505050565b6040516301ffc9a760e01b815263545891bf60e01b60048201526001600160a01b038216906301ffc9a790602401602060405180830381865afa1580156200060d573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019062000633919062000a3c565b1515600114620006865760405162461bcd60e51b815260206004820152601e60248201527f494465736f6320696e74657266616365206e6f7420737570706f72746564000060448201526064016200021f565b6001546001600160a01b03166200069c62000852565b6001600160a01b031614620006e35760405162461bcd60e51b815260206004820152600c60248201526b155b905d5d1a1bdc9a5e995960a21b60448201526064016200021f565b6001600160a01b038116600081815260036020526040808220805460ff19166001179055517f6a6455914f452787eb3985452aceedc1000fb545e394eb3b370e3d08958e0a5b9190a250565b6001546001600160a01b03166200074562000852565b6001600160a01b0316146200076e5760405162461bcd60e51b81526004016200021f9062000a05565b6000805460ff60a01b1916600160a01b1790557f62e78cea01bee320cd4e420270b5ea74000d11b0c9f74754ebdbfc544b05a2586200039262000852565b6001546001600160a01b0316620007c262000852565b6001600160a01b031614620008095760405162461bcd60e51b815260206004820152600c60248201526b155b905d5d1a1bdc9a5e995960a21b60448201526064016200021f565b6001600160a01b038116600081815260036020526040808220805460ff19169055517f0447b747642c4670e25ad3282fd36423e06b0c46fb64bddad47ad787867802629190a250565b6000601436108015906200087057506000546001600160a01b031633145b1562000883575060131936013560601c90565b503390565b61293a8062000b9083390190565b600060208284031215620008a957600080fd5b81356001600160a01b0381168114620008c157600080fd5b9392505050565b634e487b7160e01b600052604160045260246000fd5b600082601f830112620008f057600080fd5b813567ffffffffffffffff808211156200090e576200090e620008c8565b604051601f8301601f19908116603f01168101908282118183101715620009395762000939620008c8565b816040528381528660208588010111156200095357600080fd5b836020870160208301376000602085830101528094505050505092915050565b6000806000606084860312156200098957600080fd5b833567ffffffffffffffff80821115620009a257600080fd5b620009b087838801620008de565b94506020860135915080821115620009c757600080fd5b620009d587838801620008de565b93506040860135915080821115620009ec57600080fd5b50620009fb86828701620008de565b9150509250925092565b60208082526018908201527f756e617574686f72697a65643a206f6e6c79206f776e65720000000000000000604082015260600190565b60006020828403121562000a4f57600080fd5b81518015158114620008c157600080fd5b60005b8381101562000a7d57818101518382015260200162000a63565b50506000910152565b6000815180845262000aa081602086016020860162000a60565b601f01601f19169290920160200192915050565b60a08152600062000ac960a083018862000a86565b828103602084015262000add818862000a86565b9050828103604084015262000af3818762000a86565b6001600160a01b0395861660608501529390941660809092019190915250949350505050565b6000835162000b2d81846020880162000a60565b83519083019062000b4381836020880162000a60565b01949350505050565b6001600160a01b038316815260406020820181905260009062000b729083018462000a86565b949350505050565b602081526000620008c1602083018462000a8656fe60806040523480156200001157600080fd5b506040516200293a3803806200293a8339810160408190526200003491620001e5565b84846200004133620000b3565b60016200004f83826200032b565b5060026200005e82826200032b565b5050600a80546001600160a01b0319163317905550600c6200008184826200032b565b50600b80546001600160a01b0319166001600160a01b038316179055620000a882620000b3565b5050505050620003f7565b600080546001600160a01b038381166001600160a01b0319831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b634e487b7160e01b600052604160045260246000fd5b600082601f8301126200012b57600080fd5b81516001600160401b038082111562000148576200014862000103565b604051601f8301601f19908116603f0116810190828211818310171562000173576200017362000103565b816040528381526020925086838588010111156200019057600080fd5b600091505b83821015620001b4578582018301518183018401529082019062000195565b600093810190920192909252949350505050565b80516001600160a01b0381168114620001e057600080fd5b919050565b600080600080600060a08688031215620001fe57600080fd5b85516001600160401b03808211156200021657600080fd5b6200022489838a0162000119565b965060208801519150808211156200023b57600080fd5b6200024989838a0162000119565b955060408801519150808211156200026057600080fd5b506200026f8882890162000119565b9350506200028060608701620001c8565b91506200029060808701620001c8565b90509295509295909350565b600181811c90821680620002b157607f821691505b602082108103620002d257634e487b7160e01b600052602260045260246000fd5b50919050565b601f8211156200032657600081815260208120601f850160051c81016020861015620003015750805b601f850160051c820191505b8181101562000322578281556001016200030d565b5050505b505050565b81516001600160401b0381111562000347576200034762000103565b6200035f816200035884546200029c565b84620002d8565b602080601f8311600181146200039757600084156200037e5750858301515b600019600386901b1c1916600185901b17855562000322565b600085815260208120601f198616915b82811015620003c857888601518255948401946001909101908401620003a7565b5085821015620003e75787850151600019600388901b60f8161c191681555b5050505050600190811b01905550565b61253380620004076000396000f3fe608060405234801561001057600080fd5b50600436106102065760003560e01c806383b74baa1161011a578063c87b56dd116100ad578063e985e9c51161007c578063e985e9c51461045a578063f004407114610496578063f15df2e5146104b6578063f2fde38b146104bf578063fdcff274146104d257600080fd5b8063c87b56dd1461042e578063dd7d82c914610441578063e2079d6a14610449578063e8a3d4851461045257600080fd5b80639bd4158f116100e95780639bd4158f146103e2578063a22cb465146103f5578063ae387ee514610408578063b88d4fde1461041b57600080fd5b806383b74baa146103a35780638da5cb5b146103b6578063938e3d7b146103c757806395d89b41146103da57600080fd5b806323b872dd1161019d57806342966c681161016c57806342966c6814610334578063443fdd94146103475780636352211e1461037557806370a0823114610388578063715018a61461039b57600080fd5b806323b872dd146102e85780632b148f18146102fb57806340c10f191461030e57806342842e0e1461032157600080fd5b8063095ea7b3116101d9578063095ea7b31461029657806318160ddd146102ab5780631c02a97c146102c257806320c5429b146102d557600080fd5b806301daf26b1461020b57806301ffc9a71461024357806306fdde0314610256578063081812fc1461026b575b600080fd5b61022e610219366004611b83565b600d6020526000908152604090205460ff1681565b60405190151581526020015b60405180910390f35b61022e610251366004611bb2565b6104e5565b61025e610510565b60405161023a9190611c1c565b61027e610279366004611b83565b6105a2565b6040516001600160a01b03909116815260200161023a565b6102a96102a4366004611c4b565b6105c9565b005b6102b460095481565b60405190815260200161023a565b6102a96102d0366004611ce0565b6106e3565b6102a96102e3366004611b83565b610773565b6102a96102f6366004611d76565b6107a5565b6102a9610309366004611e0a565b6107d6565b6102a961031c366004611c4b565b61090a565b6102a961032f366004611d76565b610a93565b6102a9610342366004611b83565b610aae565b61022e610355366004611e65565b601060209081526000928352604080842090915290825290205460ff1681565b61027e610383366004611b83565b610bda565b6102b4610396366004611e91565b610c3a565b6102a9610cc0565b6102a96103b1366004611eac565b610cd4565b6000546001600160a01b031661027e565b6102a96103d5366004611f93565b610d31565b61025e610d97565b6102a96103f0366004611fe5565b610da6565b6102a9610403366004612039565b610f60565b61025e610416366004611b83565b610f6b565b6102a9610429366004612063565b611005565b61025e61043c366004611b83565b611037565b6102a96110e6565b6102b460085481565b61025e61114e565b61022e6104683660046120df565b6001600160a01b03918216600090815260066020908152604080832093909416825291909152205460ff1690565b6102b46104a4366004611b83565b600f6020526000908152604090205481565b6102b460075481565b6102a96104cd366004611e91565b61115d565b6102a96104e0366004611b83565b611236565b60006001600160e01b0319821663545891bf60e01b148061050a575061050a826112c8565b92915050565b60606001805461051f90612109565b80601f016020809104026020016040519081016040528092919081815260200182805461054b90612109565b80156105985780601f1061056d57610100808354040283529160200191610598565b820191906000526020600020905b81548152906001019060200180831161057b57829003601f168201915b5050505050905090565b60006105ad82611318565b506000908152600560205260409020546001600160a01b031690565b60006105d482610bda565b9050806001600160a01b0316836001600160a01b0316036106465760405162461bcd60e51b815260206004820152602160248201527f4552433732313a20617070726f76616c20746f2063757272656e74206f776e656044820152603960f91b60648201526084015b60405180910390fd5b336001600160a01b038216148061066257506106628133610468565b6106d45760405162461bcd60e51b815260206004820152603d60248201527f4552433732313a20617070726f76652063616c6c6572206973206e6f7420746f60448201527f6b656e206f776e6572206f7220617070726f76656420666f7220616c6c000000606482015260840161063d565b6106de8383611377565b505050565b6000546001600160a01b03163314806107305750610730335b60085460008181526010602090815260408083206001600160a01b038616845290915290205460ff16151560011492915050565b61073957600080fd5b60005b815181101561076f5761076782828151811061075a5761075a612143565b6020026020010151610773565b60010161073c565b5050565b6000546001600160a01b03163314806107905750610790336106fc565b61079957600080fd5b6107a2816113e5565b50565b6107af33826113fb565b6107cb5760405162461bcd60e51b815260040161063d90612159565b6106de83838361147a565b6000546001600160a01b03163314806107f357506107f3336106fc565b6107fc57600080fd5b6000828152600d602052604090205460ff1661084c5760405162461bcd60e51b815260206004820152600f60248201526e496e76616c6964205342207479706560881b604482015260640161063d565b60008151116108895760405162461bcd60e51b8152602060048201526009602482015268656d7074792075726960b81b604482015260640161063d565b6000828152600e602052604090206108a182826121ec565b50600b546040516318f002a560e01b81526001600160a01b03909116906318f002a5906108d490859085906004016122ac565b600060405180830381600087803b1580156108ee57600080fd5b505af1158015610902573d6000803e3d6000fd5b505050505050565b6000546001600160a01b03163314806109275750610927336106fc565b61093057600080fd5b6000818152600d602052604090205460ff166109805760405162461bcd60e51b815260206004820152600f60248201526e496e76616c6964205342207479706560881b604482015260640161063d565b60008181526010602090815260408083206001600160a01b038616845290915290205460ff1615156001036109ee5760405162461bcd60e51b8152602060048201526014602482015273111d5c1b1a58d85d194818dc9959195b9d1a585b60621b604482015260640161063d565b600980549060006109fe836122c5565b9190505550610a0f826009546115e9565b600980546000908152600f60209081526040808320859055848352601082528083206001600160a01b038781168086529190935292819020805460ff19166001179055600b549354905163128d663760e11b81526004810186905260248101919091526044810192909252336064830152919091169063251acc6e906084016108d4565b6106de83838360405180602001604052806000815250611005565b6000610ab982610bda565b90506001600160a01b0381163314610b1f5760405162461bcd60e51b815260206004820152602360248201527f4f6e6c7920746865206f776e65722063616e206275726e20746865697220746f60448201526235b2b760e91b606482015260840161063d565b610b2882611603565b6000828152600f602081815260408084208054808652601084528286206001600160a01b03888116808952918652848820805460ff1916905589885295909452949055600b54905163038725f760e31b81526004810187905260248101859052604481019290925233606483015290911690631c392fb890608401600060405180830381600087803b158015610bbd57600080fd5b505af1158015610bd1573d6000803e3d6000fd5b50505050505050565b6000818152600360205260408120546001600160a01b03168061050a5760405162461bcd60e51b8152602060048201526018602482015277115490cdcc8c4e881a5b9d985b1a59081d1bdad95b88125160421b604482015260640161063d565b60006001600160a01b038216610ca45760405162461bcd60e51b815260206004820152602960248201527f4552433732313a2061646472657373207a65726f206973206e6f7420612076616044820152683634b21037bbb732b960b91b606482015260840161063d565b506001600160a01b031660009081526004602052604090205490565b610cc86116a4565b610cd260006116fe565b565b6000546001600160a01b0316331480610cf15750610cf1336106fc565b610cfa57600080fd5b60005b82518110156106de57610d29838281518110610d1b57610d1b612143565b60200260200101518361090a565b600101610cfd565b6000546001600160a01b0316331480610d4e5750610d4e336106fc565b610d5757600080fd5b600c610d648284836122ec565b50600b54604051636b1ae3ff60e01b81526001600160a01b0390911690636b1ae3ff906108d490859085906004016123d5565b60606002805461051f90612109565b6000546001600160a01b0316331480610dc35750610dc3336106fc565b610dcc57600080fd5b81610e125760405162461bcd60e51b8152602060048201526016602482015275496e76616c6964206174746573746174696f6e55524960501b604482015260640161063d565b60078054906000610e22836122c5565b9091555050600754604080513060208201529081019190915260009060600160408051601f1981840301815291815281516020928301206000818152600d8452828120805460ff19166001179055600e9093529120909150610e858486836122ec565b50600b546040516318f002a560e01b81526001600160a01b03909116906318f002a590610eba908490889088906004016123e9565b600060405180830381600087803b158015610ed457600080fd5b505af1158015610ee8573d6000803e3d6000fd5b50505050811515600103610f5a576008819055600b546040516370d894cd60e01b8152600481018390526001600160a01b03909116906370d894cd90602401600060405180830381600087803b158015610f4157600080fd5b505af1158015610f55573d6000803e3d6000fd5b505050505b50505050565b61076f33838361174e565b600e6020526000908152604090208054610f8490612109565b80601f0160208091040260200160405190810160405280929190818152602001828054610fb090612109565b8015610ffd5780601f10610fd257610100808354040283529160200191610ffd565b820191906000526020600020905b815481529060010190602001808311610fe057829003601f168201915b505050505081565b61100f33836113fb565b61102b5760405162461bcd60e51b815260040161063d90612159565b610f5a8484848461181c565b6000818152600f60209081526040808320548352600e909152902080546060919061106190612109565b80601f016020809104026020016040519081016040528092919081815260200182805461108d90612109565b80156110da5780601f106110af576101008083540402835291602001916110da565b820191906000526020600020905b8154815290600101906020018083116110bd57829003601f168201915b50505050509050919050565b6110ee6116a4565b60006008819055600b546040516370d894cd60e01b815260048101929092526001600160a01b0316906370d894cd90602401600060405180830381600087803b15801561113a57600080fd5b505af1158015610f5a573d6000803e3d6000fd5b6060600c805461051f90612109565b6111656116a4565b6001600160a01b0381166111ca5760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201526564647265737360d01b606482015260840161063d565b6111d3816116fe565b600b5460405163e2f273bd60e01b81526001600160a01b0383811660048301529091169063e2f273bd906024015b600060405180830381600087803b15801561121b57600080fd5b505af115801561122f573d6000803e3d6000fd5b5050505050565b61123e6116a4565b6000818152600d602052604090205460ff166112925760405162461bcd60e51b815260206004820152601360248201527224b73b30b634b21030ba3a32b9ba30ba34b7b760691b604482015260640161063d565b6008819055600b546040516370d894cd60e01b8152600481018390526001600160a01b03909116906370d894cd90602401611201565b60006001600160e01b031982166380ac58cd60e01b14806112f957506001600160e01b03198216635b5e139f60e01b145b8061050a57506301ffc9a760e01b6001600160e01b031983161461050a565b6000818152600360205260409020546001600160a01b03166107a25760405162461bcd60e51b8152602060048201526018602482015277115490cdcc8c4e881a5b9d985b1a59081d1bdad95b88125160421b604482015260640161063d565b600081815260056020526040902080546001600160a01b0319166001600160a01b03841690811790915581906113ac82610bda565b6001600160a01b03167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92560405160405180910390a45050565b60006113f082610bda565b9050610b2882611603565b60008061140783610bda565b9050806001600160a01b0316846001600160a01b0316148061144e57506001600160a01b0380821660009081526006602090815260408083209388168352929052205460ff165b806114725750836001600160a01b0316611467846105a2565b6001600160a01b0316145b949350505050565b826001600160a01b031661148d82610bda565b6001600160a01b0316146114b35760405162461bcd60e51b815260040161063d9061240c565b6001600160a01b0382166115155760405162461bcd60e51b8152602060048201526024808201527f4552433732313a207472616e7366657220746f20746865207a65726f206164646044820152637265737360e01b606482015260840161063d565b61152083838361184f565b826001600160a01b031661153382610bda565b6001600160a01b0316146115595760405162461bcd60e51b815260040161063d9061240c565b600081815260056020908152604080832080546001600160a01b03199081169091556001600160a01b0387811680865260048552838620805460001901905590871680865283862080546001019055868652600390945282852080549092168417909155905184937fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef91a4505050565b61076f8282604051806020016040528060008152506118b8565b600061160e82610bda565b905061161c8160008461184f565b61162582610bda565b600083815260056020908152604080832080546001600160a01b03199081169091556001600160a01b0385168085526004845282852080546000190190558785526003909352818420805490911690555192935084927fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef908390a45050565b6000546001600160a01b03163314610cd25760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604482015260640161063d565b600080546001600160a01b038381166001600160a01b0319831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b816001600160a01b0316836001600160a01b0316036117af5760405162461bcd60e51b815260206004820152601960248201527f4552433732313a20617070726f766520746f2063616c6c657200000000000000604482015260640161063d565b6001600160a01b03838116600081815260066020908152604080832094871680845294825291829020805460ff191686151590811790915591519182527f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c31910160405180910390a3505050565b61182784848461147a565b611833848484846118eb565b610f5a5760405162461bcd60e51b815260040161063d90612451565b6001600160a01b038216158061186c57506001600160a01b038316155b6106de5760405162461bcd60e51b815260206004820152601d60248201527f5468697320746f6b656e2063616e206f6e6c79206265206275726e6564000000604482015260640161063d565b6118c283836119ec565b6118cf60008484846118eb565b6106de5760405162461bcd60e51b815260040161063d90612451565b60006001600160a01b0384163b156119e157604051630a85bd0160e11b81526001600160a01b0385169063150b7a029061192f9033908990889088906004016124a3565b6020604051808303816000875af192505050801561196a575060408051601f3d908101601f19168201909252611967918101906124e0565b60015b6119c7573d808015611998576040519150601f19603f3d011682016040523d82523d6000602084013e61199d565b606091505b5080516000036119bf5760405162461bcd60e51b815260040161063d90612451565b805181602001fd5b6001600160e01b031916630a85bd0160e11b149050611472565b506001949350505050565b6001600160a01b038216611a425760405162461bcd60e51b815260206004820181905260248201527f4552433732313a206d696e7420746f20746865207a65726f2061646472657373604482015260640161063d565b6000818152600360205260409020546001600160a01b031615611aa75760405162461bcd60e51b815260206004820152601c60248201527f4552433732313a20746f6b656e20616c7265616479206d696e74656400000000604482015260640161063d565b611ab36000838361184f565b6000818152600360205260409020546001600160a01b031615611b185760405162461bcd60e51b815260206004820152601c60248201527f4552433732313a20746f6b656e20616c7265616479206d696e74656400000000604482015260640161063d565b6001600160a01b038216600081815260046020908152604080832080546001019055848352600390915280822080546001600160a01b0319168417905551839291907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef908290a45050565b600060208284031215611b9557600080fd5b5035919050565b6001600160e01b0319811681146107a257600080fd5b600060208284031215611bc457600080fd5b8135611bcf81611b9c565b9392505050565b6000815180845260005b81811015611bfc57602081850181015186830182015201611be0565b506000602082860101526020601f19601f83011685010191505092915050565b602081526000611bcf6020830184611bd6565b80356001600160a01b0381168114611c4657600080fd5b919050565b60008060408385031215611c5e57600080fd5b611c6783611c2f565b946020939093013593505050565b634e487b7160e01b600052604160045260246000fd5b604051601f8201601f1916810167ffffffffffffffff81118282101715611cb457611cb4611c75565b604052919050565b600067ffffffffffffffff821115611cd657611cd6611c75565b5060051b60200190565b60006020808385031215611cf357600080fd5b823567ffffffffffffffff811115611d0a57600080fd5b8301601f81018513611d1b57600080fd5b8035611d2e611d2982611cbc565b611c8b565b81815260059190911b82018301908381019087831115611d4d57600080fd5b928401925b82841015611d6b57833582529284019290840190611d52565b979650505050505050565b600080600060608486031215611d8b57600080fd5b611d9484611c2f565b9250611da260208501611c2f565b9150604084013590509250925092565b600067ffffffffffffffff831115611dcc57611dcc611c75565b611ddf601f8401601f1916602001611c8b565b9050828152838383011115611df357600080fd5b828260208301376000602084830101529392505050565b60008060408385031215611e1d57600080fd5b82359150602083013567ffffffffffffffff811115611e3b57600080fd5b8301601f81018513611e4c57600080fd5b611e5b85823560208401611db2565b9150509250929050565b60008060408385031215611e7857600080fd5b82359150611e8860208401611c2f565b90509250929050565b600060208284031215611ea357600080fd5b611bcf82611c2f565b60008060408385031215611ebf57600080fd5b823567ffffffffffffffff811115611ed657600080fd5b8301601f81018513611ee757600080fd5b80356020611ef7611d2983611cbc565b82815260059290921b83018101918181019088841115611f1657600080fd5b938201935b83851015611f3b57611f2c85611c2f565b82529382019390820190611f1b565b98969091013596505050505050565b60008083601f840112611f5c57600080fd5b50813567ffffffffffffffff811115611f7457600080fd5b602083019150836020828501011115611f8c57600080fd5b9250929050565b60008060208385031215611fa657600080fd5b823567ffffffffffffffff811115611fbd57600080fd5b611fc985828601611f4a565b90969095509350505050565b80358015158114611c4657600080fd5b600080600060408486031215611ffa57600080fd5b833567ffffffffffffffff81111561201157600080fd5b61201d86828701611f4a565b9094509250612030905060208501611fd5565b90509250925092565b6000806040838503121561204c57600080fd5b61205583611c2f565b9150611e8860208401611fd5565b6000806000806080858703121561207957600080fd5b61208285611c2f565b935061209060208601611c2f565b925060408501359150606085013567ffffffffffffffff8111156120b357600080fd5b8501601f810187136120c457600080fd5b6120d387823560208401611db2565b91505092959194509250565b600080604083850312156120f257600080fd5b6120fb83611c2f565b9150611e8860208401611c2f565b600181811c9082168061211d57607f821691505b60208210810361213d57634e487b7160e01b600052602260045260246000fd5b50919050565b634e487b7160e01b600052603260045260246000fd5b6020808252602d908201527f4552433732313a2063616c6c6572206973206e6f7420746f6b656e206f776e6560408201526c1c881bdc88185c1c1c9bdd9959609a1b606082015260800190565b601f8211156106de57600081815260208120601f850160051c810160208610156121cd5750805b601f850160051c820191505b81811015610902578281556001016121d9565b815167ffffffffffffffff81111561220657612206611c75565b61221a816122148454612109565b846121a6565b602080601f83116001811461224f57600084156122375750858301515b600019600386901b1c1916600185901b178555610902565b600085815260208120601f198616915b8281101561227e5788860151825594840194600190910190840161225f565b508582101561229c5787850151600019600388901b60f8161c191681555b5050505050600190811b01905550565b8281526040602082015260006114726040830184611bd6565b6000600182016122e557634e487b7160e01b600052601160045260246000fd5b5060010190565b67ffffffffffffffff83111561230457612304611c75565b612318836123128354612109565b836121a6565b6000601f84116001811461234c57600085156123345750838201355b600019600387901b1c1916600186901b17835561122f565b600083815260209020601f19861690835b8281101561237d578685013582556020948501946001909201910161235d565b508682101561239a5760001960f88860031b161c19848701351681555b505060018560011b0183555050505050565b81835281816020850137506000828201602090810191909152601f909101601f19169091010190565b6020815260006114726020830184866123ac565b8381526040602082015260006124036040830184866123ac565b95945050505050565b60208082526025908201527f4552433732313a207472616e736665722066726f6d20696e636f72726563742060408201526437bbb732b960d91b606082015260800190565b60208082526032908201527f4552433732313a207472616e7366657220746f206e6f6e20455243373231526560408201527131b2b4bb32b91034b6b83632b6b2b73a32b960711b606082015260800190565b6001600160a01b03858116825284166020820152604081018390526080606082018190526000906124d690830184611bd6565b9695505050505050565b6000602082840312156124f257600080fd5b8151611bcf81611b9c56fea2646970667358221220447dc6cbfeb8ebebf3bad1f7e99fb787210fa97269757a33c13df3e16fd0a1ef64736f6c63430008110033a264697066735822122021f062a46801acd8442911ff7e7e064abc642ddd1c64ea7001dbbe30a03a6c3564736f6c63430008110033";

type FactoryConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: FactoryConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class Factory__factory extends ContractFactory {
  constructor(...args: FactoryConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    forwarder: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<Factory> {
    return super.deploy(forwarder, overrides || {}) as Promise<Factory>;
  }
  override getDeployTransaction(
    forwarder: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(forwarder, overrides || {});
  }
  override attach(address: string): Factory {
    return super.attach(address) as Factory;
  }
  override connect(signer: Signer): Factory__factory {
    return super.connect(signer) as Factory__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): FactoryInterface {
    return new utils.Interface(_abi) as FactoryInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): Factory {
    return new Contract(address, _abi, signerOrProvider) as Factory;
  }
}
