import { CID } from "multiformats/cid";
import { base16 } from "multiformats/bases/base16";
import { FileObject } from "components/FileDropzone/types";
import { PINATA_IPFS_GATEWAY, W3S_IPFS_GATEWAY } from "pages/api/constants";

export const resolveIpfsURL = (hash: string) => `${PINATA_IPFS_GATEWAY}${hash}`;

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
  console.log('image', image);
  const url =
    typeof image === "string"
      ? resolveIpfsURL(image)
      : image.ipfsHash
      ? resolveIpfsURL(image.ipfsHash)
      : image.file && image.file.size
      ? window.URL.createObjectURL(image.file)
      : "";
  return url;
};
