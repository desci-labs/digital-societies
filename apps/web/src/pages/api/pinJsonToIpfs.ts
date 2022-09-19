import type { NextApiRequest, NextApiResponse } from "next";
import pinataSDK, { PinataPinResponse } from "@pinata/sdk";
import { Metadata } from "components/Transactors/types";

const pinata = pinataSDK(
  process.env.PINATA_API_KEY!,
  process.env.PINATA_SECRET_KEY!
);

type IResponse = PinataPinResponse | { status: string; message: string, error?: string };

export const config = {
  api: {
    bodyParser: true,
  },
};

async function handler(req: NextApiRequest, res: NextApiResponse<IResponse>) {
  let responseBody: IResponse = { IpfsHash: "", PinSize: 0, Timestamp: "" },
    status = 200;

  try {
    const body = JSON.parse(req.body) as Metadata;
    const pinned = await pinata.pinJSONToIPFS(body, {
      pinataMetadata: { name: body.name },
    });
    return res.status(status).json(pinned);
  } catch (e: any) {
    console.log('error pining metadata: ', e)
    status = 500;
    responseBody = {
      status: "error",
      message: "Error pinning metadata to ipfs",
      error: e.toString()
    };
    res.status(status).json(responseBody);
  }
}

export default function pinJSONToIPFS (req: NextApiRequest, res: NextApiResponse) {
  return req.method === "POST" ? handler(req, res) : res.status(404).send("");
};
