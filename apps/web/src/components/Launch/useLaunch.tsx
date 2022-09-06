import { PinataPinResponse } from "@pinata/sdk";
import { useFactoryContract } from "hooks/useContract";
import { useContractWrite } from "wagmi";
import { MetadataValues } from "./types";

export default function useLaunch() {
  const factoryContract = useFactoryContract();
  const { data, isLoading, isSuccess, writeAsync } = useContractWrite({
    mode: "recklesslyUnprepared",
    addressOrName: factoryContract.address!,
    contractInterface: factoryContract.interface!,
    functionName: "deployToken",
  });

  async function launch(metadata: MetadataValues) {
    const formdata = new FormData();
    formdata.append("name", metadata.image.name);
    formdata.append(metadata.image.name, metadata.image.file);

    const res = await fetch("/api/pinFileToIpfs", {
      method: "POST",
      body: formdata,
    });
    const pinnedImageResponse = (await res.json()) as PinataPinResponse;

    const meta = { ...metadata, image: pinnedImageResponse.IpfsHash };
    const metaRes = await fetch("/api/pinJsonToIpfs", {
      method: "POST",
      body: JSON.stringify(meta),
    });
    const pinnedMetadataRes = (await metaRes.json()) as PinataPinResponse;
    console.log(pinnedMetadataRes);
    const tx = await writeAsync({
      recklesslySetUnpreparedArgs: [metadata.name, metadata],
    });
    await tx.wait();
  }
  console.log(data, isLoading, isSuccess);
  return launch;
}
