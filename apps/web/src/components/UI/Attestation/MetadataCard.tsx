import { VerifiedBadgeIcon } from "assets/svg";
import ContentLoader, {
  CircularLoader,
} from "components/ContentLoader/ContentLoader";
import { FileObject } from "components/FileDropzone/types";
import {
  AttestationMetadata,
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
  banner: string | FileObject;
};

export function MetadataCard<
  M extends
    | AttestationMetadataValues
    | AttestationMetadata
    | Metadata
    | MetadataValues
>(props: MetaCardProps<M>) {
  const router = useRouter();

  if (!props.metadata) return null;
  return (
    <div
      tabIndex={0}
      onClick={() => router.push(props.link)}
      id="metacard"
      className={`bg-transparent dark:text-white min-w-80 w-80 pb-4 cursor-pointer overflow-hidden transition-shadow duration-200 hover:shadow-xl outline-none border border-neutrals-gray-7 hover:border-neutrals-gray-3 dark:hover:border-neutrals-gray-7 dark:border-neutrals-gray-3 focus:border-neutrals-gray-1 dark:focus:border-neutrals-gray-7 ${
        props.containerClass ?? ""
      }`}
    >
      <div className={`relative ${props.bannerClass || "h-32"}`}>
        <ImageBanner src={getImageURL(props.banner)} />
        <RoundedLogo
          src={getImageURL(props.metadata?.image || props.banner)}
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

export function MetadataCardPlaceholder() {
  return (
    <div className="bg-transparent dark:text-white min-w-80 w-80 pb-4 cursor-pointer overflow-hidden transition-shadow duration-200 hover:shadow-xl outline-none border border-neutrals-gray-7 hover:border-neutrals-gray-3 dark:hover:border-neutrals-gray-7 dark:border-neutrals-gray-3 focus:border-neutrals-gray-1 dark:focus:border-neutrals-gray-7">
      <div className="relative h-32">
        <ContentLoader className="h-32 w-full" />
        <div className="w-12 h-12 absolute left-3 -bottom-5">
          <CircularLoader className="w-12 h-12" />
        </div>
      </div>
      <div className="px-2 mt-6 flex flex-col justify-between gap-1 h-32">
        <ContentLoader className="w-32 h-4 mt-4" />
        <ContentLoader className="w-80 h-6 mt-4" />
        <div className="flex items-center justify-center">
          <ContentLoader className="w-36 h-10 mt-4 rounded-md" />
        </div>
      </div>
    </div>
  );
}
