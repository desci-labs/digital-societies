import { ConnectButton } from '@rainbow-me/rainbowkit';
import Link from 'next/link';

export default function Header() {
  return (
    <div className="container mx-auto flex items-center justify-start p-4">
      <div className="grow flex justify-start gap-3">
        <Link href="/">
          <a className="font-semibold text-regent-gray text-lg hover:text-dark">Home</a>
        </Link>
        <Link href="/profile">
          <a className="font-semibold text-regent-gray text-lg hover:text-dark">Profile</a>
        </Link>
      </div>
      <div>
        <ConnectButton />
      </div>
    </div>
  );
}