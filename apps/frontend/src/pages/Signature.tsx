import { utils } from 'ethers';
import { ChangeEvent, HTMLProps, useReducer } from 'react';
import { useSignMessage } from 'wagmi';

interface State {
  message: string;
  signature: string;
  address: string;
  verified: boolean;
  messageToVerifiy: string;
}

type ActionArgs =
  | { type: 'RESET' }
  | { type: 'SET_VERIFICATION', verified: boolean }
  | { type: 'SET_MESSAGE', message: string }
  | { type: 'SET_ADDRESS', address: string }
  | { type: 'SET_MESSAGE_TO_VERIFY', messageToVerify: string }
  | { type: 'SET_SIGNATURE', signature: string };


const initialState: State = {
  message: '',
  signature: '',
  address: '',
  verified: false,
  messageToVerifiy: '',
};

function stateReducer(state: State, action: ActionArgs): State {
  switch (action.type) {
    case 'SET_MESSAGE':
      return { ...state, message: action.message };
    case 'RESET':
      return initialState
    case 'SET_VERIFICATION':
      return { ...state, verified: action.verified };
    case 'SET_SIGNATURE':
      return { ...state, signature: action.signature };
    case 'SET_ADDRESS':
      return { ...state, address: action.address }
    case 'SET_MESSAGE_TO_VERIFY':
      return { ...state, messageToVerifiy: action.messageToVerify }
    default:
      return state;
  }
}

export default function Signature() {
  const { signMessageAsync } = useSignMessage();
  const [state, dispatch] = useReducer(stateReducer, initialState);

  const { message, signature, messageToVerifiy, address, verified } = state;

  async function onSignMessage() {
    const signature = await signMessageAsync({ message });
    dispatch({ type: 'SET_SIGNATURE', signature });
  }

  async function onVerify() {
    if (!address || !messageToVerifiy) return;
    dispatch({ type: 'SET_VERIFICATION', verified: false })
    const result = utils.verifyMessage(messageToVerifiy, signature);
    if (result === address) return dispatch({ type: 'SET_VERIFICATION', verified: true });
    dispatch({ type: 'SET_VERIFICATION', verified: false })
  }

  return (
    <div className="container mx-auto flex flex-col gap-5">
      <h1 className="text-3xl font-bold my-5">Signature Demo</h1>
      <label className="block flex flex-col gap-4 items-start" htmlFor="messageToSign">
        <Input
          id="messageToSign"
          placeholder="Message to sign"
          value={message}
          onChange={(e: ChangeEvent<HTMLInputElement>) => dispatch({ type: 'SET_MESSAGE', message: (e.target as HTMLInputElement).value })}
        />
        <Button
          onClick={onSignMessage}
        >
          Sign
        </Button>
      </label>
      {signature && <p className="font-bold">Signature: <small>{signature}</small></p>}
      <div className="flex flex-col gap-4 mt-5">
        <h2 className="font-bold text-xl">Verify your signed messaged</h2>
        <label className="block flex flex-col gap-1 items-start" htmlFor="address">
          <span>Address:</span>
          <Input
            id="address"
            placeholder="Address to verify"
            value={address}
            onChange={(e: ChangeEvent<HTMLInputElement>) => dispatch({ type: 'SET_ADDRESS', address: e.target.value })}
          />
        </label>
        <label className="block flex flex-col gap-1 items-start" htmlFor="signature">
          <span>Signature:</span>
          <Input
            id="signature"
            placeholder="Signature"
            value={signature}
            onChange={(e: ChangeEvent<HTMLInputElement>) => dispatch({ type: 'SET_SIGNATURE', signature: e.target.value })}
          />
        </label>
        <label className="block flex flex-col gap-1 items-start" htmlFor="messageToVerify">
          <span>Message to verify:</span>
          <Input
            id="messageToVerify"
            placeholder="Message to verify"
            value={messageToVerifiy}
            onChange={(e: ChangeEvent<HTMLInputElement>) => dispatch({ type: 'SET_MESSAGE_TO_VERIFY', messageToVerify: e.target.value })}
          />
        </label>
        <div className="flex gap-4">
          <Button onClick={onVerify}>Verify</Button>
          {verified && <Button onClick={() => dispatch({ type: 'RESET' })}>Reset</Button>}
        </div>
      </div>
    </div>
  );
}


function Button(props: HTMLProps<HTMLButtonElement>) {
  return (
    <button onClick={props.onClick} className="tracking-wide text-lg text-white rounded-lg w-32 py-1.5 px-4 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 outline-none hover:bg-400p hover:animate-gradient">
      {props.children}
    </button>
  );
}

function Input(props: HTMLProps<HTMLInputElement>) {
  return <input
    type="text"
    className="py-1.5 px-4 w-72 rounded-xl border-2 focus:border-cornflower-blue my-1 outline-none"
    {...props}
  />
}