import { FileObject } from "components/FileDropzone/types";
import { isAddress } from "ethers/lib/utils";
import * as Yup from "yup";

const VALID_MIME_TYPES = ["image/jpeg", "image/png", "image/webp"];
export const TWENTY_FIVE_MB = 25e6;

const FILE_SCHEMA = Yup.mixed<FileObject>()
  .test({
    name: "Ipfs hash",
    message: "Invalid ipfs hash",
    test: (data) => (data?.ipfsURL ? data.ipfsURL.length > 20 : true),
  })
  .test({
    name: "size",
    message: "File size must be smaller than 10MB",
    test: (data) => (data?.file ? (data?.file?.size || 0) <= TWENTY_FIVE_MB : true),
  })
  .test({
    name: "fileType",
    message: "Valid file types are JPG, PNG and WEBP",
    test: (data) =>
      data?.file ? VALID_MIME_TYPES.includes(data.file.type) : true,
  })
  .test({
    name: "invalidState",
    message: "Invalid input: (File size must be less than 25MB) and of types jpeg, png or webp",
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
  description: Yup.string().required(),
  external_link: Yup.string().url("Invalid url").required("Field is required"),
  banner: FILE_SCHEMA.required(),
  image: FILE_SCHEMA.required(),
});

// const tokenIssuerShape = {
//   addresses: ADDRES_SCHEMA.required(),
//   attestation: Yup.number().required(),
//   org: Yup.number().required()
// }

export const issuerSchema = Yup.object().shape({
  address: ADDRES_SCHEMA.required(),
  attestation: Yup.number().required(),
  org: Yup.number().required()
})

export const delegaterSchema = Yup.object().shape({
  delegate: ADDRES_SCHEMA.required(),
  org: Yup.string().required()
});
