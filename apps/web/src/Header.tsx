import { ConnectButton } from '@rainbow-me/rainbowkit';
import { NavLink } from 'react-router-dom';

export default function Header() {
  return (
    <div className="container mx-auto flex items-center justify-start p-4">
      <div className="grow flex justify-start gap-3">
        <NavLink to="/">
          <span className="font-semibold text-regent-gray text-lg">Home</span>
        </NavLink>
        <NavLink to="/profile">
          <span className="font-semibold text-regent-gray text-lg">Profile</span>
        </NavLink>
      </div>
      <div className="">
        <ConnectButton />
      </div>
    </div>
  );
}
