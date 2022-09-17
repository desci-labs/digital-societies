import { ConnectButton } from '@rainbow-me/rainbowkit';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';

// Todo: implement a ActiveLink component to wrap <Link /> with activeClassName props

export default function Header() {
  const { isConnected } = useAccount();
  const [hide, setHidden] = useState(true);

  useEffect(() => {
    setHidden(!isConnected);
  }, [isConnected])
  
  return (
    <div className="container mx-auto flex items-center justify-start p-4">
      <div className="grow flex justify-start gap-10">
        <Link href="/">
          <a className="font-semibold text-regent-gray text-lg hover:text-dark">Explore</a>
        </Link>
        {!hide && <Link href="/launch">
          <a className="font-semibold text-regent-gray text-lg hover:text-dark capitalize">Launch an organisation</a>
        </Link>}
      </div>
      <div>
        <ConnectButton showBalance={false} />
      </div>
    </div>
  );
}
