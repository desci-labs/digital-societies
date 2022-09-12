import type { NextApiRequest, NextApiResponse } from "next";

const PINATA_GATEWAY = 'https://gateway.pinata.cloud/ipfs/';
const IPFS_GATEWAY = 'https://ipfs.io/ipfs/';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  let status = 200;
  try {
    const result = await fetch(`${IPFS_GATEWAY}${req.query.cid}`);
    const data = await result.json();
    return res.status(status).json(data);
  } catch (e) {
    status = 500;
    res.status(status).json(null);
  }
}

export default function queryIpfsHash(req: NextApiRequest, res: NextApiResponse) {
  return req.method === "GET" ? handler(req, res) : res.status(404).send("");
};
