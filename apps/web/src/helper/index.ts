import { CID } from "multiformats/cid";
import { FileObject } from "components/FileDropzone/types";
import { W3S_IPFS_GATEWAY } from "api/constants";
import {
  AttestationMetadata,
  AttestationMetadataValues,
  Metadata,
  MetadataValues,
} from "components/Transactors/types";

export const resolveIpfsURL = (hash: string) =>
  `${W3S_IPFS_GATEWAY.trim()}${hash}`;

export async function asyncMap<T, E>(
  arr: E[],
  predicate: (value: E, index?: number, array?: E[]) => Promise<T>
): Promise<T[]> {
  const results = await Promise.all(arr.map(predicate));
  return results as T[];
}

export const shortenText = (text: string, charCount = 150) =>
  text.length > charCount ? `${text.substring(0, charCount)}...` : text;

export const shortenAddress = (address: string) => shortenText(address, 10);

export function maskAddress(addr?: string) {
  const nChars = 4;
  if (!addr) {
    return "";
  } else {
    const len = addr.length;
    const middle = addr.substring(nChars, len - nChars);
    return addr.replace(middle, "...");
  }
}

export const getImageURL = (image: string | FileObject) => {
  if (!image) return "";
  if (typeof image === "string") {
    if (image.startsWith(W3S_IPFS_GATEWAY.trim())) return image;
    const cid = CID.parse(image);
    if (cid) return resolveIpfsURL(cid.toString());
    return "";
  }

  const url = image.ipfsURL
    ? image.ipfsURL
    : image.file && image.file.size > 0
    ? window.URL.createObjectURL(image.file)
    : "";
  return url;
};

export const compareMetadata = <M extends Metadata | MetadataValues>(
  old: M,
  meta: M
): boolean => {
  if (
    old.name !== meta.name ||
    old.description !== meta.description ||
    old.external_link !== meta.external_link
  )
    return true;
  if (typeof old.image !== typeof meta.image) return true;
  if (typeof old.banner !== typeof meta.banner) return true;

  if (typeof old.image === "string" && old.image !== meta.image) return true;
  if (typeof old.banner === "string" && old.banner !== meta.banner) return true;

  if (typeof old.image == "object" || typeof meta.image === "object")
    return true;

  return false;
};

export const compareAttestationMetadata = <
  M extends AttestationMetadata | AttestationMetadataValues
>(
  old: M,
  meta: M
): boolean => {
  if (
    old.name !== meta.name ||
    old.description !== meta.description ||
    old.external_link !== meta.external_link
  )
    return true;

  if (typeof old.image !== typeof meta.image) return true;

  if (typeof old.image === "string" && old.image !== meta.image) return true;

  if (typeof old.image == "object" || typeof meta.image === "object")
    return true;

  return false;
};
