import { CID } from "multiformats/cid";
import { base16 } from "multiformats/bases/base16";
import { FileObject } from "components/FileDropzone/types";
import { W3S_IPFS_GATEWAY } from "pages/api/constants";
import { MetadataValues } from "components/Transactors/types";
import fallbackImg from "assets/fallback.png";

export const resolveIpfsURL = (hash: string) => `${W3S_IPFS_GATEWAY}${hash}`;

export const getBytesFromCIDString = (input: string) => {
  const cid = CID.parse(input);
  const base16Str = base16.encode(cid.bytes);
  const hexEncoded =
    "0x" + (base16Str.length % 2 === 0 ? base16Str : "0" + base16Str);
  return hexEncoded;
};

export const getCIDStringFromBytes = async (hex: string) => {
  hex = hex.substring(2); // remove 0x
  hex = hex.length % 2 === 0 ? hex.substring(1) : hex;

  const bytes = base16.decode(hex);
  const cid = CID.decode(bytes);
  return cid.toString();
};

export async function asyncMap<T, E>(arr: E[], predicate: any): Promise<T[]> {
  const results = await Promise.all(arr.map(predicate));

  return results as T[];
}

export const shortenText = (text: string, charCount: number = 100) =>
  text.length > charCount ? `${text.substring(0, charCount)}...` : text;

export function maskAddress(addr?: string) {
  const nChars = 6;
  if (!addr) {
    return "";
  } else {
    const len = addr.length;
    const middle = addr.substring(nChars, len - nChars);
    return addr.replace(middle, "...");
  }
}

export const getImageURL = (image: string | FileObject) => {
  const url =
    typeof image === "string"
      ? resolveIpfsURL(image)
      : image.ipfsHash
      ? resolveIpfsURL(image.ipfsHash)
      : image.file && image.file.size > 0
      ? window.URL.createObjectURL(image.file)
      : fallbackImg;
  return url;
};

export const flattenMetadata = async (metadata: MetadataValues): Promise<MetadataValues> => {
  const meta = { ...metadata };

  try {
    if (metadata.image.file) {
      const image = await toBase64(metadata.image.file)
      meta.image.base64 = image;
    }

    if (metadata.logo.file) {
      const logo = await toBase64(metadata.image.file)
      meta.logo.base64 = logo;
    }

    return meta;
  } catch (e) {
    return metadata;
  }
}

const toBase64 = (file: File): Promise<string> => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => resolve(reader.result as string);
  reader.onerror = error => reject(error);
});
