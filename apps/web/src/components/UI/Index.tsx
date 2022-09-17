import { resolveIpfsURL } from "helper";
import Image from "next/image";
import { HTMLProps, PropsWithChildren } from "react";

export function ExternalLink(props: HTMLProps<HTMLAnchorElement>) {
  return (
    <a
      href={props.href}
      onClick={e => e.stopPropagation()}
      target="_blank"
      rel="noreferrer"
      className="w-full inline-block text-md border border-cornflower-blue hover:bg-cornflower-blue hover:text-white duration-200 text-center rounded-3xl px-3 py-1.5"
    >
      Visit website
    </a>
  );
}

export function ImageBanner(props: HTMLProps<HTMLImageElement> & { src: string }) {
  return (
    <div className={`w-full h-full relative ${props.className ?? ''}`}>
      <Image
        src={props.src}
        layout="fill"
        objectFit="cover"
        objectPosition="center"
        alt={props.alt}
      />
    </div>
  )
}

export function RoundedLogo(props: HTMLProps<HTMLImageElement> & { src: string }) {
  return (
    <div className={`w-32 h-32 absolute left-10 -bottom-11 rounded-full border-2 border-white ${props.className ?? ''}`}>
      <Image
        src={props.src}
        layout="fill"
        objectFit="cover"
        objectPosition="center"
        alt={props.alt}
        className="rounded-full"
      />
    </div>
  )
}

export function CardContainer(props: PropsWithChildren<{ className?: string }>) {
  return (
    <div className={`container mx-auto pb-5 pt-2 mt-10 shadow-lg hover:shadow-2xl duration-100 ${props.className}`}>{props.children}</div>
  )
}