import type { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import { PinDataRes } from "./type";
import busboy from 'busboy';
import path from "path";
import pinataSDK from "@pinata/sdk";

export const config = {
  api: {
    bodyParser: false,
  },
};

async function handler(req: NextApiRequest, res: NextApiResponse<PinDataRes>) {
  let responseBody: PinDataRes = [],
    status = 200;

  try {
    const pinata = pinataSDK(
      process.env.PINATA_API_KEY!,
      process.env.PINATA_SECRET_KEY!
    );

    const bb = busboy({ headers: req.headers });
    const fileList: string[] = [];
    bb.on('file', async (name, file, info) => {
      const filepath = path.join('/tmp', `${name}`);
      fs.writeFileSync(filepath, "");
      file.pipe(fs.createWriteStream(filepath));
      fileList.push(filepath);
    });

    bb.on("error", (err: any) => {
      res.status(400).send({
        status: "error",
        message: "Error pinning file to ipfs",
        error: err
      })
    })
    
    bb.on('close', async () => {
      const uploads = [];
      for (let filepath of fileList) {
        const result = await pinata.pinFromFS(filepath, {});
        console.log('cid', result);
        fs.unlink(filepath, (err) => {
        });
        uploads.push(result.IpfsHash);
      }

      res.status(200).send(uploads);
    });
    req.pipe(bb);

  } catch (e: any) {
    console.log('pining file Error', e);
    status = 500;
    responseBody = {
      status: "error",
      message: "Error pinning file to ipfs",
      error: e.toString()
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
