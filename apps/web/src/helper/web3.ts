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
    logoHash: string = metadata.logo.ipfsHash;

  if (metadata.banner.file && metadata.banner.file.size > 0) {
    const formdata = new FormData();
    formdata.append("image", metadata.banner.name);
    formdata.append(metadata.banner.name, metadata.banner.file);

    const res = await pinFile(formdata);
    imageHash = res[0];
  }

  if (metadata.logo?.file && metadata.logo?.file.size > 0) {
    const formdata = new FormData();
    formdata.append("logo", metadata.logo.name);
    formdata.append(metadata.logo.name, metadata.logo.file);
   
    const res = await pinFile(formdata);
    logoHash = res[0];
  }

  // TODO: Validate to check valid CIDString
  if (typeof imageHash !== "string" || typeof logoHash !== "string") {
    throw Error("Error pinning uploading files");
  }

  const meta: Metadata = { ...metadata, banner: imageHash, logo: logoHash };
  const metaRes = await fetch("/api/pinJsonToIpfs", {
    method: "POST",
    body: JSON.stringify(meta),
  });
  const CIDString = (await metaRes.json()) as CIDString;
  const CIDBytes = getBytesFromCIDString(CIDString)
  return { CIDBytes, CIDString };
}
