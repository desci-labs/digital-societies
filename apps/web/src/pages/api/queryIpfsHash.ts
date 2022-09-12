import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  let status = 200;

  try {
    const result = await fetch(`https://ipfs.io/ipfs/${cid}`);
    const data = result.json();
    return res.status(status).json(data);
  } catch (e) {
    status = 500;
    res.status(status).json(null);
  }
}
