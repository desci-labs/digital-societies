import { W3S_IPFS_GATEWAY } from "api/constants";
import type { NextApiRequest, NextApiResponse } from "next";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  let status = 200;
  try {
    const result = await fetch(`${W3S_IPFS_GATEWAY}${req.query.cid}`);
    const data = await result.json();
    return res.status(status).json(data);
  } catch (e) {
    console.log("queryError: ", req.query.cid, e);
    status = 500;
    res.status(status).json(null);
  }
}

export default function queryIpfsHash(
  req: NextApiRequest,
  res: NextApiResponse
) {
  return req.method === "GET" ? handler(req, res) : res.status(404).send("");
}
