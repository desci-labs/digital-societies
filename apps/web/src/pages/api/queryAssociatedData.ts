import {
  PostgrestResponse,
  PostgrestSingleResponse,
} from "@supabase/supabase-js";
import type { NextApiRequest, NextApiResponse } from "next";
import { AssociatedDataRow } from "services/api/types";
import { supabase } from "services/database/superbase/superbaseClient";
export const config = {
  api: {
    bodyParser: true,
  },
};

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<
    | { status: string; message?: string; error?: string }
    | AssociatedDataRow
    | AssociatedDataRow[]
  >
) {
  let responseBody,
    status = 200;
  try {
    const query = req.query;
    if (!query.org && !query.owner) throw new Error("Invalid query");

    let result:
      | PostgrestResponse<AssociatedDataRow>
      | PostgrestSingleResponse<AssociatedDataRow>
      | undefined = undefined;
    if (query.org) {
      result = await supabase
        .from("associated_metadata")
        .select("id, org, owner, metadata, created_at, updated_at")
        .eq("org", query.org);
    } else if (query.owner) {
      result = await supabase
        .from("associated_metadata")
        .select("id, org, owner, metadata, created_at, updated_at")
        .eq("owner", query.owner)
        .single();
    }

    if (!result)
      return res.status(400).json({
        message: "No result returned from the query!",
        status: "error",
      });
    const { error, data, status } = result;
    if (error)
      return res
        .status(status)
        .json({ message: error.message, status: "error" });

    return res.status(status).json(data);
  } catch (error: unknown) {
    const e = error as Error;
    status = 500;
    responseBody = {
      status: "error",
      message: e.message ?? "Unknown error occured",
      error: e.toString(),
    };

    res.status(status).json(responseBody);
  }
}

export default function queryAssociatedData(
  req: NextApiRequest,
  res: NextApiResponse
) {
  return req.method === "GET" ? handler(req, res) : res.status(404).send("");
}
