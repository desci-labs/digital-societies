import { Metadata, MetadataValues } from "components/Transactors/types";
import { getBytesFromCIDString } from "helper";
import { Chain } from "wagmi";
import { CIDString } from "web3.storage";

export const getTransactionUrl = (hash: string, chain: Chain) => {
  return `${chain.blockExplorers?.default.url}tx/${hash}`;
};

async function pinFile(form: FormData): Promise<CIDString[]> {
  const res = await fetch("/api/pinFileToIpfs", {
    method: "POST",
    body: form,
  });
  const result = (await res.json()) as CIDString[];
  return result;
}

export async function pinMetadataToIpfs(metadata: MetadataValues) {
  let imageHash: string = metadata.banner.ipfsHash,
    logoHash: string = metadata.badge.ipfsHash;

  if (metadata.banner.file && metadata.banner.file.size > 0) {
    const formdata = new FormData();
    formdata.append("image", metadata.banner.name);
    formdata.append(metadata.banner.name, metadata.banner.file);

    const res = await pinFile(formdata);
    imageHash = res[0];
  }

  if (metadata.badge?.file && metadata.badge?.file.size > 0) {
    const formdata = new FormData();
    formdata.append("logo", metadata.badge.name);
    formdata.append(metadata.badge.name, metadata.badge.file);
   
    const res = await pinFile(formdata);
    logoHash = res[0];
  }

  if (typeof imageHash !== "string" || typeof logoHash !== "string") {
    throw Error("Error pinning uploading files");
  }

  const meta: Metadata = { ...metadata, banner: imageHash, badge: logoHash };
  const metaRes = await fetch("/api/pinJsonToIpfs", {
    method: "POST",
    body: JSON.stringify(meta),
  });
  const result = (await metaRes.json()) as CIDString;
  const cid = getBytesFromCIDString(result)
  console.log('pin metadata result ', result, cid);
  return cid;
}