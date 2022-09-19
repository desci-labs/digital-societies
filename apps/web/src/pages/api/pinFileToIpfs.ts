import type { NextApiRequest, NextApiResponse } from "next";
import formidable, { Fields, File, Files } from "formidable";
import pinataSDK, { PinataPinResponse } from "@pinata/sdk";
import fs from "fs";
import { asyncMap } from "helper";
import { PinDataRes } from "./type";

const pinata = pinataSDK(
  process.env.PINATA_API_KEY!,
  process.env.PINATA_SECRET_KEY!
);

export const config = {
  api: {
    bodyParser: false,
  },
};

async function handler(req: NextApiRequest, res: NextApiResponse<PinDataRes>) {
  let responseBody: PinDataRes = [],
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
      PinataPinResponse,
      File | File[] | undefined
    >(files, async (data: File) => {
      const filepath = data.filepath;
      console.log('path ', filepath);
      // const readableStreamForFile = fs.createReadStream(filepath!);
      const pinned = await pinata.pinFromFS(filepath, {});
      fs.unlink(filepath, (err) => {
        console.log('unlink err', err)
      });
      return pinned;
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
