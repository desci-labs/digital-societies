import { PinataPinResponse } from "@pinata/sdk";
import { MetadataValues } from "components/Transactors/types";
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
  let imageHash: string = metadata.image.ipfsHash,
    logoHash: string = metadata.logo.ipfsHash;

  if (metadata.image.file && metadata.image.file.size > 0) {
    const formdata = new FormData();
    formdata.append("image", metadata.image.name);
    formdata.append(metadata.image.name, metadata.image.file);

    const res = await pinFile(formdata);
    console.log('pin banner', res[0]);
    imageHash = res[0];
  }

  if (metadata.logo?.file && metadata.logo?.file.size > 0) {
    const formdata = new FormData();
    formdata.append("logo", metadata.logo.name);
    formdata.append(metadata.logo.name, metadata.logo.file);
   
    const res = await pinFile(formdata);
    console.log('pin badge result', res[0]);
    logoHash = res[0];
  }

  const meta = { ...metadata, image: imageHash, logo: logoHash };
  const metaRes = await fetch("/api/pinJsonToIpfs", {
    method: "POST",
    body: JSON.stringify(meta),
  });
  const result = (await metaRes.json()) as CIDString;
  const cid = getBytesFromCIDString(result)
  console.log('pin metadata result ', result, cid);
  return cid;
}