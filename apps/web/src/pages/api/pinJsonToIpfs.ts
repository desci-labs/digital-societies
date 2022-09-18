import type { NextApiRequest, NextApiResponse } from "next";
import { Web3Storage, getFilesFromPath } from 'web3.storage';
import path from "path";
import fs from "fs";

const client = new Web3Storage({ token: process.env.WEB3_STORAGE_TOKEN! });

type IResponse = string | { status: string; message: string };

export const config = {
  api: {
    bodyParser: true,
  },
};

async function handler(req: NextApiRequest, res: NextApiResponse<IResponse>) {
  let responseBody: IResponse, status = 200;

  try {
    const filePath = path.join(process.cwd(), 'metadata.json');
    fs.writeFileSync(filePath, req.body);
    const files = await getFilesFromPath(filePath);
    const cid = await client.put(files);
    await fs.unlinkSync(filePath);
    return res.status(status).json(cid);
  } catch (e) {
    console.log('e', e);
    status = 500;
    responseBody = {
      status: "error",
      message: "Error pinning metadata to ipfs",
    };

    res.status(status).json(responseBody);
  }
}

export default function pinJSONToIPFS (req: NextApiRequest, res: NextApiResponse) {
  return req.method === "POST" ? handler(req, res) : res.status(404).send("");
};
