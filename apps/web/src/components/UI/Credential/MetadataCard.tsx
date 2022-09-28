import { Metadata, MetadataValues } from "components/Transactors/types";
import { getImageURL, shortenText } from "helper";
import { useRouter } from "next/router";
import { ExternalLink, ImageBanner, RoundedLogo } from "../Index";

export function MetadataCard({
  metadata,
  link,
}: {
  link: string;
  metadata: Metadata | MetadataValues;
}) {
  const router = useRouter();

  if (!metadata) return null;

  return (
    <a
      tabIndex={0}
      onClick={() => router.push(link)}
      className="bg-transparent text-white min-w-80 w-80 pb-4 shadow-md cursor-pointer transition-shadow duration-200 hover:shadow-xl overflow-hidden border border-neutrals-gray-3 focus:outline-white"
    >
      <div className="w-80 h-32 relative">
        <ImageBanner src={getImageURL(metadata?.banner ?? "")} />
        <RoundedLogo
          src={getImageURL(metadata?.badge ?? "")}
          className="w-12 h-12 left-3 -bottom-5"
        />
      </div>
      <div className="px-2 mt-6 flex flex-col justify-between gap-1 h-32">
        <div>
          <span className="text-md block font-bold mb-1 truncate">
            {metadata.name}
          </span>
          <span className="text-[13px] text-neutrals-gray-4 block">
            {shortenText(metadata.description)}
          </span>
        </div>
        {metadata.external_link && (
          <div className="flex justify-center">
            <ExternalLink href={metadata.external_link} />
          </div>
        )}
      </div>
    </a>
  );
}

