import desocLogo from "assets/desocLogo.svg";
import Image from "next/image";

export default function DesocLogo() {
  return (
    <div className={`w-4 h-4 relative`}>
      <Image
        src={desocLogo}
        layout="fill"
        objectFit="contain"
        objectPosition="center"
        alt="Desoc Logo"
      />
    </div>
  );
}
