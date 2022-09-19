import { PinataPinResponse } from "@pinata/sdk";
import { MetadataValues } from "components/Transactors/types";
import { getBytesFromCIDString } from "helper";
import { Chain } from "wagmi";

export const getTransactionUrl = (hash: string, chain: Chain) => {
  return `${chain.blockExplorers?.default.url}tx/${hash}`;
};

async function pinFile(form: FormData): Promise<PinataPinResponse[]> {
  const res = await fetch("/api/pinFileToIpfs", {
    method: "POST",
    body: form,
  });
  const result = (await res.json()) as PinataPinResponse[];
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
    imageHash = res[0].IpfsHash;
  }

  if (metadata.logo?.file && metadata.logo?.file.size > 0) {
    const formdata = new FormData();
    formdata.append("logo", metadata.logo.name);
    formdata.append(metadata.logo.name, metadata.logo.file);
   
    const res = await pinFile(formdata);
    console.log('pin badge result', res[0]);
    logoHash = res[0].IpfsHash;
  }

  const meta = { ...metadata, image: imageHash, logo: logoHash };
  const metaRes = await fetch("/api/pinJsonToIpfs", {
    method: "POST",
    body: JSON.stringify(meta),
  });
  const result = (await metaRes.json()) as PinataPinResponse;
  console.log('pin metadata result ', result);
  const cid = getBytesFromCIDString(result.IpfsHash)
  return cid;
}