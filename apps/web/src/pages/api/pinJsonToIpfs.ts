import type { NextApiRequest, NextApiResponse } from "next";
import { Web3Storage, getFilesFromPath, Filelike } from "web3.storage";
import path from "path";
import fs from "fs";
import { PinDataRes } from "api/type";

export const config = {
  api: {
    bodyParser: true,
  },
};

async function handler(req: NextApiRequest, res: NextApiResponse<PinDataRes>) {
  let responseBody: PinDataRes,
    status = 200;

  const tmpDir = "/tmp/";
  try {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const client = new Web3Storage({ token: process.env.WEB3_STORAGE_TOKEN! });

    const filePath = path.join(tmpDir, "metadata.json");
    fs.writeFileSync(filePath, req.body);
    const files = (await getFilesFromPath(filePath)) as Iterable<Filelike>;
    const cid = await client.put(files, { wrapWithDirectory: false });
    await fs.unlinkSync(filePath);
    return res.status(status).json(cid);
  } catch (error: unknown) {
    const e = error as Error;
    status = 500;
    responseBody = {
      status: "error",
      message: "Error pinning metadata to ipfs",
      error: e.toString(),
    };

    res.status(status).json(responseBody);
  }
}

export default function pinJSONToIPFS(
  req: NextApiRequest,
  res: NextApiResponse
) {
  return req.method === "POST" ? handler(req, res) : res.status(404).send("");
}
