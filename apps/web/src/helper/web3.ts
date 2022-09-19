import { PinataPinResponse } from "@pinata/sdk";
import { MetadataValues } from "components/Transactors/types";
import { getBytesFromCIDString } from "helper";
import { Chain } from "wagmi";

export const getTransactionUrl = (hash: string, chain: Chain) => {
  return `${chain.blockExplorers?.default.url}tx/${hash}`;
};


export async function pinMetadataToIpfs(metadata: MetadataValues) {
  let imageHash: string = metadata.image.ipfsHash,
    logoHash: string = metadata.logo.ipfsHash;

  if (!metadata.image.ipfsHash) {
    const formdata = new FormData();
    formdata.append("image", metadata.image.name);
    formdata.append(metadata.image.name, metadata.image.file);

    const res = await fetch("/api/pinFileToIpfs", {
      method: "POST",
      body: formdata,
    });
    const [pinnedImageResponse] = (await res.json()) as PinataPinResponse[];
    imageHash = pinnedImageResponse.IpfsHash;
  }

  if (!metadata.logo.ipfsHash) {
    const formdata = new FormData();
    formdata.append("logo", metadata.logo.name);
    formdata.append(metadata.logo.name, metadata.logo.file);
    const res = await fetch("/api/pinFileToIpfs", {
      method: "POST",
      body: formdata,
    });
    const [pinnedImageResponse] = (await res.json()) as PinataPinResponse[];
    logoHash = pinnedImageResponse.IpfsHash;
  }

  const meta = { ...metadata, image: imageHash, logo: logoHash };
  const metaRes = await fetch("/api/pinJsonToIpfs", {
    method: "POST",
    body: JSON.stringify(meta),
  });
  const pinnedMetadataRes = (await metaRes.json()) as PinataPinResponse;
  const cid = getBytesFromCIDString(pinnedMetadataRes.IpfsHash)
  return cid;
}