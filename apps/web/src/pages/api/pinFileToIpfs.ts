import type { NextApiRequest, NextApiResponse } from "next";
// import formidable, { Fields, File, Files } from "formidable";
import fs from "fs";
// import { asyncMap } from "helper";
import { Web3Storage, getFilesFromPath } from 'web3.storage';
import { PinDataRes } from "./type";
import busboy from 'busboy';
import path from "path";
import os from 'os'

export const config = {
  api: {
    bodyParser: false,
  },
};

async function handler(req: NextApiRequest, res: NextApiResponse<PinDataRes>) {
  let responseBody: PinDataRes = [],
    status = 200;

  // const result = await new Promise<
  //   { files: Files; fields: Fields } | undefined
  // >((resolve, reject) => {
  //   const form = new formidable.IncomingForm({
  //     multiples: true,
  //     uploadDir: '/tmp/',
  //     keepExtensions: true,
  //   });

  //   form.parse(req, (err, fields, files) => {
  //     if (err) reject(err);
  //     if (files) resolve({ fields, files });
  //   });
  // }).catch((e) => {
  //   status = 500;
  //   responseBody = {
  //     status: "error",
  //     message: "Upload error",
  //     error: e.toString(),
  //   };
  // });

  console.log('upload ');
  try {
    // const files = Object.values(result?.fields ?? {}).map(
    //   (key) => result?.files[key as string]
    // );
    const client = new Web3Storage({ token: process.env.WEB3_STORAGE_TOKEN! });

    const bb = busboy({ headers: req.headers });
    const fileList: string[] = [];
    bb.on('file', async (name, file, info) => {
      const filepath = path.join('/tmp', `${name}`);
      fs.writeFileSync(filepath, "");
      console.log('file found ', name, info, filepath);
      file.pipe(fs.createWriteStream(filepath));
      fileList.push(filepath);
      // return cid
    });

    bb.on('field', (name, val, info) => {
      console.log(`Field [${name}]: value: %j`, val, info);
    });

    bb.on('close', async () => {
      const uploads = [];
      console.log('filelist ', fileList);
      for (let filepath of fileList) {
        const files = await getFilesFromPath(filepath);
        const cid = await client.put(files, { wrapWithDirectory: false })
        console.log('cid', cid);
        // fs.unlink(filepath, (err) => {
        //   console.log('unlink err', err, filepath)
        // });
        uploads.push(cid);
      }

      console.log('uploads')
      console.log('connection closed');
      res.status(200).send(uploads);
    });
    req.pipe(bb);
    // if (fileList.length === 0) {
    //   return res.status(404).send({
    //     status: "error",
    //     message: "couldn't find files",
    //     // error: JSON.stringify({ fields: result?.fields, files: result?.files }),
    //   })
    // }

    // const uploads = await asyncMap<
    //   string,
    //   File | File[] | undefined
    // >(files, async (data: File) => {
    //   const filepath = data.filepath;
    //   console.log('image path', filepath)
    //   const files = await getFilesFromPath(filepath)
    //   const cid = await client.put(files, { wrapWithDirectory: false })
    //   fs.unlink(filepath, (err) => {
    //     console.log('unlink err', err)
    //   });
    //   return cid
    // });
    // res.status(status).json(uploads);
  } catch (e: any) {
    console.log('pining file Error', e);
    status = 500;
    responseBody = {
      status: "error",
      message: "Error pinning file to ipfs",
      error: e.toString()
    };
    res.status(status).json(responseBody);
  }
}

export default function pinFileToIPFS(
  req: NextApiRequest,
  res: NextApiResponse
) {
  return req.method === "POST" ? handler(req, res) : res.status(404).send("");
}
