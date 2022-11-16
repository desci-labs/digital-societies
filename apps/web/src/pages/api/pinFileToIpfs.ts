import type { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import { Web3Storage, getFilesFromPath, Filelike } from "web3.storage";
import busboy from "busboy";
import path from "path";
import { WEB3_STORAGE_TOKEN } from "config/Index";
import { PinDataRes } from "api/type";

export const config = {
  api: {
    bodyParser: false,
  },
};

async function handler(req: NextApiRequest, res: NextApiResponse<PinDataRes>) {
  let responseBody: PinDataRes = [],
    status = 200;

  try {
    const client = new Web3Storage({ token: WEB3_STORAGE_TOKEN });

    const bb = busboy({ headers: req.headers });
    const fileList: string[] = [];
    bb.on("file", async (name, file) => {
      const filepath = path.join("/tmp", `${name}`);
      fs.writeFileSync(filepath, "");
      file.pipe(fs.createWriteStream(filepath));
      fileList.push(filepath);
    });

    bb.on("error", (err: unknown) => {
      res.status(400).send({
        status: "error",
        message: "Error pinning file to ipfs",
        error: err,
      });
    });

    bb.on("close", async () => {
      const uploads = [];
      for (const filepath of fileList) {
        const files = (await getFilesFromPath(filepath)) as Iterable<Filelike>;
        const cid = await client.put(files, { wrapWithDirectory: false });
        fs.unlink(filepath, () => {});
        uploads.push(cid);
      }

      res.status(200).send(uploads);
    });
    req.pipe(bb);
  } catch (e: unknown) {
    console.log("pining file Error", e);
    status = 500;
    responseBody = {
      status: "error",
      message: "Error pinning file to ipfs",
      error: e?.toString(),
    };
    res.status(status).json(responseBody);
  }
}

export default function pinFileToIPFS(
  req: NextApiRequest,
  res: NextApiResponse
) {
  return req.method === "POST" ? handler(req, res) : res.status(404).send("");
}
