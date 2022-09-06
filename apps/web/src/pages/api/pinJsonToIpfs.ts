import type { NextApiRequest, NextApiResponse } from "next";
import pinataSDK, { PinataPinResponse } from "@pinata/sdk";
import { Metadata } from "components/Launch/types";

const pinata = pinataSDK(
  process.env.PINATA_API_KEY!,
  process.env.PINATA_SECRET_KEY!
);

type IResponse = PinataPinResponse | { status: string; message: string };

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
  } catch (e) {
    status = 500;
    responseBody = {
      status: "error",
      message: "Error pinning metadata to ipfs",
    };
    res.status(status).json(responseBody);
  }
}

export default (req: NextApiRequest, res: NextApiResponse) => {
  req.method === "POST" ? handler(req, res) : res.status(404).send("");
};
