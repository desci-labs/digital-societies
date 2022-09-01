import { useAccount } from 'wagmi';

export default function Profile() {
  const { address, isConnected } = useAccount();

  return (
    <div className="flex flex-col">
      <h1 className="text-xl font-bold my-5">Demo Profile</h1>
      {isConnected && <p className="my-5 font-bold">{address}</p>}
    </div>
  );
}
