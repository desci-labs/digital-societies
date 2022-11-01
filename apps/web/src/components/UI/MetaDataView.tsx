import { VerifiedBadgeIcon } from "assets/svg";
import {
  AttestationMetadata,
  AttestationMetadataValues,
  Metadata,
  MetadataValues,
} from "components/Transactors/types";
import { getImageURL } from "helper";
import { useRouter } from "next/router";
import { PropsWithChildren } from "react";
import { FiEdit } from "react-icons/fi";
import { IoChevronBackCircleOutline } from "react-icons/io5";
import Button from "./Button/Index";
import { ImageBanner, RoundedLogo } from "./Index";

type MetaViewProps = {
  address: string;
  verified: boolean;
  showUpdater?: boolean;
  onUpdateClick?: () => void;
  metadata:
    | Metadata
    | MetadataValues
    | AttestationMetadata
    | AttestationMetadataValues;
};

export default function MetaDataView(props: MetaViewProps) {
  return (
    <div className="w-full">
      <div className="w-full h-88 relative group">
        <OverlayWrapper>
          <div className="container mx-auto">
            <BackButton />
          </div>
        </OverlayWrapper>
        <ImageBanner
          src={getImageURL(props.metadata.banner)}
          alt={props.metadata.name}
        />
        <RoundedLogo
          src={getImageURL(props.metadata.image)}
          alt={props.metadata.name}
        />
      </div>
      <div className="container mx-auto mt-12 px-2 lg:px-0">
        <div className="flex gap-2 items-center mb-2">
          <span className="heading-1 text-left">{props.metadata.name}</span>
          {props.verified && <VerifiedBadgeIcon width="25" heigth="25" />}
          {props.showUpdater && (
            <EditButton
              desoc={props.address}
              onClick={() => props.onUpdateClick?.()}
            />
          )}
        </div>
        <span className="text-lg block mb-2 text-left text-neutrals-gray-5">
          {props.metadata.description}
        </span>
      </div>
    </div>
  );
}

function EditButton(props: { desoc: string; onClick: () => void }) {
  return (
    <Button
      onClick={props.onClick}
      className="flex items-center justify-evenly focus:outline-white bg-transparent px-2 p-1 font-bold"
    >
      <FiEdit className="text-darker" />
    </Button>
  );
}

function OverlayWrapper(props: PropsWithChildren<{}>) {
  return (
    <div className="bg-black bg-opacity-50 opacity-0 w-full py-2 absolute top-0 left-0 z-10 group-hover:opacity-100 transition duration-200">
      {props.children}
    </div>
  );
}

function BackButton() {
  const router = useRouter();
  return (
    <Button title="back" className="flex items-center gap-3" onClick={() => router.back()}>
      <IoChevronBackCircleOutline size={40} color="white" />
      <span className="text-lg text-white">Back</span>
    </Button>
  );
}
