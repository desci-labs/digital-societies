import type { NextApiRequest, NextApiResponse } from "next";
import pinataSDK from "@pinata/sdk";
import { Metadata } from "components/Transactors/types";
import { PinDataRes } from "./type";

const pinata = pinataSDK(
  process.env.PINATA_API_KEY!,
  process.env.PINATA_SECRET_KEY!
);

export const config = {
  api: {
    bodyParser: true,
  },
};

async function handler(req: NextApiRequest, res: NextApiResponse<PinDataRes>) {
  let responseBody: PinDataRes = { IpfsHash: "", PinSize: 0, Timestamp: "" },
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
