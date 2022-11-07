import Image, { StaticImageData } from "next/image";

export default function MetaLogo(props: {
  src: string | StaticImageData;
  alt?: string;
}) {
  return (
    <div className="w-10 h-10 relative bg-gradient rounded-full">
      <Image
        src={props.src}
        layout="fill"
        objectFit="cover"
        objectPosition="center"
        alt={props.alt}
        className="rounded-full block"
      />
    </div>
  );
}
