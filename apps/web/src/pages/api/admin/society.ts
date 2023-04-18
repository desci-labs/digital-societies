import {
  PostgrestResponse,
  PostgrestSingleResponse,
} from "@supabase/supabase-js";
import type { NextApiRequest, NextApiResponse } from "next";
import {
  CustomDataError,
  SocietyDataInsert,
  SocietyDataRow,
  SocietyDataUpdate,
} from "services/api/types";
import { supabase } from "services/database/superbase/superbaseClient";

export const config = {
  api: {
    bodyParser: true,
  },
};

type ApiResponse = { status: string; message?: string; error?: string };

function errorHandler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse>,
  error: unknown
) {
  const e = error as CustomDataError;
  const status = 500;
  const data = {
    status: "error",
    message: "Error updating data",
    error: e.toString(),
  };

  res.status(status).json(data);
}

async function postHandler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse>
) {
  try {
    const body =
      typeof req.body === "string"
        ? (JSON.parse(req.body) as SocietyDataInsert)
        : (req.body as SocietyDataInsert);

    if (!body.address || !body.disabled) throw Error("Invalid data");
    const { error, status } = await supabase
      .from("societies_manager")
      .insert(body);

    if (error)
      return res
        .status(status)
        .json({ message: error.message, status: "error" });

    return res.status(200).json({ status: "success" });
  } catch (err: unknown) {
    errorHandler(req, res, err);
  }
}

async function putHandler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse>
) {
  try {
    const body =
      typeof req.body === "string"
        ? (JSON.parse(req.body) as SocietyDataUpdate)
        : (req.body as SocietyDataUpdate);

    if (!body.id) throw Error("Invalid input data");
    const { error, status } = await supabase
      .from("societies_manager")
      .update(body)
      .eq("id", body.id);

    if (error)
      return res
        .status(status)
        .json({ message: error.message, status: "error" });

    return res.status(200).json({ status: "success" });
  } catch (err: unknown) {
    errorHandler(req, res, err);
  }
}

async function getHandler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse | SocietyDataRow | SocietyDataRow[]>
) {
  try {
    const query = req.query;

    let result:
      | PostgrestResponse<SocietyDataRow>
      | PostgrestSingleResponse<SocietyDataRow>
      | undefined = undefined;

    if (query.address) {
      result = await supabase
        .from("societies_manager")
        .select("id, address, disabled, created_at, updated_at")
        .eq("address", query.address)
        .single();
    } else {
      result = await supabase
        .from("societies_manager")
        .select("id, address, disabled, created_at, updated_at");
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
    errorHandler(req, res, error);
  }
}

export default function societiesManager(
  req: NextApiRequest,
  res: NextApiResponse
) {
  return req.method === "POST"
    ? postHandler(req, res)
    : req.method === "PUT"
    ? putHandler(req, res)
    : req.method === "GET"
    ? getHandler(req, res)
    : res.status(404).send("Unsupported method");
}
