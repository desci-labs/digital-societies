import { VerifiedBadgeIcon } from "assets/svg";
import {
  AttestationMetadataValues,
  Metadata,
  MetadataValues,
} from "components/Transactors/types";
import { getImageURL, shortenText } from "helper";
import { useRouter } from "next/router";
import { ExternalLink, ImageBanner, RoundedLogo } from "../Index";

export type MetaCardProps<M> = {
  link: string;
  metadata: M;
  containerClass?: string;
  bannerClass?: string;
  verified?: boolean;
};

export function MetadataCard<
  M extends AttestationMetadataValues | Metadata | MetadataValues
>(props: MetaCardProps<M>) {
  const router = useRouter();

  if (!props.metadata) return null;
  return (
    <div
      tabIndex={0}
      onClick={() => router.push(props.link)}
      className={`bg-transparent dark:text-white min-w-80 w-80 pb-4 cursor-pointer overflow-hidden transition-shadow duration-200 hover:shadow-xl outline-none border border-neutrals-gray-7 hover:border-neutrals-gray-3 dark:hover:border-neutrals-gray-7 dark:border-neutrals-gray-3 focus:border-neutrals-gray-1 dark:focus:border-neutrals-gray-7 ${
        props.containerClass ?? ""
      }`}
    >
      <div className={`relative ${props.bannerClass || "h-32"}`}>
        <ImageBanner src={getImageURL(props.metadata?.banner)} />
        <RoundedLogo
          src={getImageURL(props.metadata?.image || props.metadata?.banner)}
          className="w-12 h-12 left-3 -bottom-5"
        />
      </div>
      <div className="px-2 mt-6 flex flex-col justify-between gap-1 h-32">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-md block font-bold mb-1 truncate">
              {props.metadata.name}
            </span>
            {props.verified && <VerifiedBadgeIcon />}
          </div>
          <span className="text-[13px] text-neutrals-gray-4 block">
            {shortenText(props.metadata.description)}
          </span>
        </div>
        {props.metadata.external_link && (
          <div className="flex justify-center">
            <ExternalLink href={props.metadata.external_link} />
          </div>
        )}
      </div>
    </div>
  );
}
