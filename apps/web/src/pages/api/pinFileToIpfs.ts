import type { NextApiRequest, NextApiResponse } from "next";
import formidable, { Fields, File, Files } from "formidable";
import fs from "fs";
import { asyncMap } from "helper";
import { Web3Storage, getFilesFromPath } from 'web3.storage';
import { PinDataRes } from "./type";
import path from "path";

// Construct with token and endpoint
const client = new Web3Storage({ token: process.env.WEB3_STORAGE_TOKEN! });

export const config = {
  api: {
    bodyParser: false,
  },
};

async function handler(req: NextApiRequest, res: NextApiResponse<PinDataRes>) {
  let responseBody: PinDataRes = [],
    status = 200;

  let tmpDir: string;
  if (process.env.DEV && process.env.DEV === 'Yes') {
    tmpDir = path.join(__dirname, `../../tmp/`);
  } else {
    tmpDir = '/tmp/';
  }

  const result = await new Promise<
    { files: Files; fields: Fields } | undefined
  >((resolve, reject) => {
    const form = new formidable.IncomingForm({
      multiples: false,
      uploadDir: tmpDir,
      keepExtensions: true,
    });

    form.parse(req, (err, fields, files) => {
      if (err) reject(err);
      if (files) resolve({ fields, files });
    });
  }).catch((e) => {
    status = 500;
    responseBody = {
      status: "error",
      message: "Upload error",
      error: e.toString(),
    };
  });

  try {
    const files = Object.values(result?.fields ?? {}).map(
      (key) => result?.files[key as string]
    );
    const uploads = await asyncMap<
      string,
      File | File[] | undefined
    >(files, async (data: File) => {
      const filepath = data.filepath;
      console.log('image path', filepath)
      const files = await getFilesFromPath(filepath)
      const cid = await client.put(files, { wrapWithDirectory: false })
      fs.unlink(filepath, (err) => {
        console.log('unlink err', err)
      });
      return cid
    });
    res.status(status).json(uploads);
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
