import { FileObject } from "components/FileDropzone/types";
import { isAddress } from "ethers/lib/utils";
import * as Yup from "yup";

const VALID_MIME_TYPES = ["image/jpeg", "image/png", "image/webp"];

const uriPattern =
  /^((ftp|http|https):\/\/)?(www.)?(?!.*(ftp|http|https|www.))[a-zA-Z0-9_-]+(\.[a-zA-Z]+)+((\/)[\w#]+)*(\/\w+\?[a-zA-Z0-9_]+=\w+(&[a-zA-Z0-9_]+=\w+)*)?$/gm;

const FILE_SCHEMA = Yup.mixed<FileObject>()
  .test({
    name: "Ipfs hash",
    message: "Invalid ipfs hash",
    test: (data) => (data?.ipfsURL ? data.ipfsURL.length > 20 : true),
  })
  .test({
    name: "size",
    message: "File size must be smaller than 10MB",
    test: (data) => (data?.file ? (data?.file?.size || 0) <= 1e7 : true),
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
        : data?.ipfsURL
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

const ADDRES_SCHEMA = Yup.mixed<string>()
  .test({
    name: "Address validation",
    message: "Invalid address format",
    test: (data) => {
      return isAddress(data ?? '')
    }
  })

export const metadataSchema = Yup.object().shape({
  name: Yup.string().required(),
  acronym: Yup.string(),
  description: Yup.string().required(),
  external_link: Yup.string().matches(uriPattern, "Invalid url"),
  banner: FILE_SCHEMA.required(),
  image: FILE_SCHEMA.required(),
});

export const issuerSchema = Yup.object().shape({
  addresses: ADDRESSES_SCHEMA.required(),
  attestation: Yup.number().required()
});

export const delegaterSchema = Yup.object().shape({
  delegate: ADDRES_SCHEMA.required(),
  org: Yup.string().required()
});
