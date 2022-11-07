import Image, { StaticImageData } from "next/image";
import { HTMLProps, PropsWithChildren } from "react";

export type ImgProps = {
  alt?: string;
  className?: string;
  src: string | StaticImageData;
};

export function ExternalLink(props: HTMLProps<HTMLAnchorElement>) {
  return (
    <a
      href={props.href}
      onClick={(e) => e.stopPropagation()}
      target="_blank"
      rel="noreferrer"
      className="inline-block text-md text-tint-primary dark:border-none border-tint-primary hover:text-tint-primary-hover dark:bg-dark-gray focus:outline-tint-primary dark:focus:outline-neutrals-gray-7 text-center duration-200 rounded-md px-6 py-1.5"
    >
      Visit website
    </a>
  );
}

export function ImageBanner(props: ImgProps) {
  return (
    <div
      className={`w-full h-full relative bg-gradient ${props.className ?? ""}`}
    >
      <Image
        src={props.src}
        layout="fill"
        objectFit="cover"
        objectPosition="center"
        alt={props.alt}
      />
    </div>
  );
}

export function RoundedLogo(props: ImgProps) {
  return (
    <div
      className={`w-32 h-32 z-20 absolute left-10 -bottom-11 rounded-full border border-dark dark:border-white bg-gradient ${
        props.className ?? ""
      }`}
    >
      <Image
        src={props.src}
        layout="fill"
        objectFit="cover"
        objectPosition="center"
        alt={props.alt}
        className="rounded-full"
      />
    </div>
  );
}

export function CardContainer(
  props: PropsWithChildren<{ className?: string }>
) {
  return (
    <div
      className={`container mx-auto pb-5 pt-2 px-2 lg:px-0 mt-10 shadow-md dark:shadow-dark hover:shadow-2xl duration-100 ${props.className}`}
    >
      {props.children}
    </div>
  );
}
export function ContentGrid(props: PropsWithChildren<{ className?: string }>) {
  return (
    <div
      className={`w-full grid grid-cols-1 content-start gap-y-5 place-items-center mb-10 ${props.className}`}
    >
      {props.children}
    </div>
  );
}
