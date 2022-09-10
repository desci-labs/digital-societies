import { CID } from "multiformats/cid";
import { base16 } from "multiformats/bases/base16";

const IPFS_GATEWAY = 'https://ipfs.io/ipfs/';
const PINATA_GATEWAY = 'https://gateway.pinata.cloud/ipfs/';

export const resolveIpfsURL = (hash: string) => `${PINATA_GATEWAY}${hash}`

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
}

export async function asyncMap<T, E>(arr: E[], predicate: any): Promise<T[]> {
  const results = await Promise.all(arr.map(predicate));

  return results as T[];
}

export const shortenText = (text: string, charCount: number = 100) => text.length > (charCount) ? `${text.substring(0, charCount)}...` : text;
