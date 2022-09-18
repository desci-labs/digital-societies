import type { NextApiRequest, NextApiResponse } from "next";
import formidable, { Fields, File, Files } from "formidable";
import fs from "fs";
import { asyncMap } from "helper";
import { Web3Storage, getFilesFromPath } from 'web3.storage';

// Construct with token and endpoint
const client = new Web3Storage({ token: process.env.WEB3_STORAGE_TOKEN! });

type IResponse = string[] | { status: string; message: string };

export const config = {
  api: {
    bodyParser: false,
  },
};

async function handler(req: NextApiRequest, res: NextApiResponse<IResponse>) {
  let responseBody: IResponse = [],
    status = 200;

  const result = await new Promise<
    { files: Files; fields: Fields } | undefined
  >((resolve, reject) => {
    const form = new formidable.IncomingForm({
      multiples: false,
      uploadDir: "./",
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
      const files = await getFilesFromPath(filepath)
      const cid = await client.put(files)
      await fs.unlinkSync(filepath);
      return cid
    });
    res.status(status).json(uploads);
  } catch (e) {
    console.log('e', e);
    status = 500;
    responseBody = {
      status: "error",
      message: "Error pinning file to ipfs",
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
