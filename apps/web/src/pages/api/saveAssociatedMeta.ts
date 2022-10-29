import type { NextApiRequest, NextApiResponse } from "next";
import { AssociatedDataInsert } from "services/api/types";
import { supabase } from "services/database/superbase/superbaseClient";
export const config = {
  api: {
    bodyParser: true,
  },
};

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ status: string; message?: string; error?: string }>
) {
  let responseBody,
    status = 200;
  try {
    const body =
      typeof req.body === "string"
        ? (JSON.parse(req.body) as AssociatedDataInsert)
        : req.body;
      
    if (!body.org || !body.owner || !body.metadata) throw Error("Invalid data");
    const { error, status } = await supabase
      .from("associated_metadata")
      .upsert(body);

    if (error)
      return res
        .status(status)
        .json({ message: error.message, status: "error" });

    return res.status(status).json({ status: "success" });
  } catch (e: any) {
    console.log("e", e);
    status = 500;
    responseBody = {
      status: "error",
      message: "Error saving metadata",
      error: e.toString(),
    };

    res.status(status).json(responseBody);
  }
}

export default function queryAssociatedData(
  req: NextApiRequest,
  res: NextApiResponse
) {
  return req.method === "POST" ? handler(req, res) : res.status(404).send("");
}
