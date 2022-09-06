import { PinataPinResponse } from "@pinata/sdk";
import { MetadataValues } from "./types";

export default function useLaunch() {

  async function launch(metadata: MetadataValues) {
    const formdata = new FormData();
    formdata.append('name', metadata.image.name);
    formdata.append(metadata.image.name, metadata.image.file);

    const res = await fetch("/api/pinFileToIpfs", { method: 'POST', body: formdata });
    const pinnedImageResponse = (await res.json()) as PinataPinResponse;

    const meta = { ...metadata, image: pinnedImageResponse.IpfsHash };
    const metaRes = await fetch("/api/pinJsonToIpfs", { method: 'POST', body: JSON.stringify(meta) });
    const pinnedMetadataRes = await metaRes.json() as PinataPinResponse;
  }

  return launch;
}