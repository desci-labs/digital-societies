import type { NextApiRequest, NextApiResponse } from "next";
import formidable, { Fields, File, Files } from "formidable";
import pinataSDK, { PinataPinResponse } from "@pinata/sdk";
import fs from "fs";

const pinata = pinataSDK(
  process.env.PINATA_API_KEY!,
  process.env.PINATA_SECRET_KEY!
);

type IResponse = PinataPinResponse | { status: string; message: string };

export const config = {
  api: {
    bodyParser: false,
  },
};

async function handler(req: NextApiRequest, res: NextApiResponse<IResponse>) {
  let responseBody: IResponse = { IpfsHash: "", PinSize: 0, Timestamp: "" },
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

  let filepath: string = "";

  try {
    const filename = result?.fields.name;
    filepath = (result?.files?.[`${filename}`] as File).filepath;
    const readableStreamForFile = fs.createReadStream(filepath!);
    const pinned = await pinata.pinFileToIPFS(readableStreamForFile, {});
    return res.status(status).json(pinned);
  } catch (e) {
    status = 500;
    responseBody = {
      status: "error",
      message: "Error pinning file to ipfs",
    };
    res.status(status).json(responseBody);
  } finally {
    await fs.unlinkSync(filepath);
  }
}

export default function pinFileToIPFS (req: NextApiRequest, res: NextApiResponse) {
  return req.method === "POST" ? handler(req, res) : res.status(404).send("");
};
