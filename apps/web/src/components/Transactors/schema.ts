import { FileObject } from "components/FileDropzone/types";
import { isAddress } from "ethers/lib/utils";
import * as Yup from "yup";
import { IssuerValues } from "./types";

const VALID_MIME_TYPES = ["image/jpeg", "image/png", "image/webp"];

const uriPattern =
  /^((ftp|http|https):\/\/)?(www.)?(?!.*(ftp|http|https|www.))[a-zA-Z0-9_-]+(\.[a-zA-Z]+)+((\/)[\w#]+)*(\/\w+\?[a-zA-Z0-9_]+=\w+(&[a-zA-Z0-9_]+=\w+)*)?$/gm;

const FILE_SCHEMA = Yup.mixed<FileObject>()
  .test({
    name: "Ipfs hash",
    message: "Invalid ipfs hash",
    test: (data) => (data?.ipfsHash ? data.ipfsHash.length > 20 : true),
  })
  .test({
    name: "size",
    message: "File size must be smaller than 2MB",
    test: (data) => (data?.file ? (data?.file?.size || 0) <= 1e6 : true),
  })
  .test({
    name: "fileType",
    message: "Valid file types are JPG, PNG and WEBP",
    test: (data) =>
      data?.file ? VALID_MIME_TYPES.includes(data.file.type) : true,
  })
  .test({
    name: "invalidState",
    message: "Invalid state",
    // check file is valid, has name and size is greater than zero
    test: (data) =>
      data?.file
        ? !!data && !!data?.file && !!data?.file?.name && !!data?.file?.size
        : data?.ipfsHash
          ? true
          : false,
  });

const ADDRESSES_SCHEMA = Yup.mixed<string>()
  .test({
    name: "Address validation",
    message: "A wallet address is required",
    test: (data) => (data?.split(",").map(Boolean).length ?? []) != 0 && true
  })
  .test({
    name: "Address validation",
    message: "Invalid address format",
    test: (data) => {
      const inputs = data?.split(",") ?? [];
      const validTypes = inputs?.map(addr => isAddress(addr.trim())).map(Boolean)
      return validTypes?.length === inputs?.length && validTypes.every(val => val === true) && true;
    }
  })

export const metadataSchema = Yup.object().shape({
  name: Yup.string().required(),
  description: Yup.string().required(),
  external_link: Yup.string().matches(uriPattern, "Invalid url"),
  image: FILE_SCHEMA.required(),
});

export const issuerSchema = Yup.object().shape({
  addresses: ADDRESSES_SCHEMA.required(),
  credential: Yup.number().required()
});
