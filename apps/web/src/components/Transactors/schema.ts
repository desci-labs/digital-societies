import { FileObject } from "components/FileDropzone/types";
import { isAddress } from "ethers/lib/utils";
import { AssociatedDataUpdate } from "services/api/types";
import * as Yup from "yup";
import Lazy from "yup/lib/Lazy";
import {
  AttestationMetadataValues,
  DelegaterValues,
  IssuerValues,
  MetadataValues,
} from "./types";

const VALID_MIME_TYPES = ["image/jpeg", "image/png", "image/webp"];
export const TWENTY_FIVE_MB = 25e6;

type SchemaShape<S> = {
  [K in keyof S]: Yup.AnySchema | Lazy<Yup.AnySchema>;
};

const FILE_SCHEMA = Yup.mixed<FileObject>()
  .test({
    name: "Ipfs hash",
    message: "Invalid ipfs hash",
    test: (data) => (data?.ipfsURL ? data.ipfsURL.length > 20 : true),
  })
  .test({
    name: "size",
    message: "File size must be smaller than 10MB",
    test: (data) =>
      data?.file ? (data?.file?.size || 0) <= TWENTY_FIVE_MB : true,
  })
  .test({
    name: "fileType",
    message: "Valid file types are JPG, PNG and WEBP",
    test: (data) =>
      data?.file ? VALID_MIME_TYPES.includes(data.file.type) : true,
  })
  .test({
    name: "invalidState",
    message:
      "Invalid input: (File size must be less than 25MB) and of types jpeg, png or webp",
    // check file is valid, has name and size is greater than zero
    test: (data) =>
      data?.file
        ? !!data && !!data?.file && !!data?.file?.name && !!data?.file?.size
        : data?.ipfsURL
        ? true
        : false,
  });

const ADDRES_SCHEMA = Yup.mixed<string>().test({
  name: "Address validation",
  message: "Invalid address format",
  test: (data) => {
    return isAddress(data ?? "");
  },
});

const metadataShape: SchemaShape<MetadataValues> = {
  name: Yup.string().required(),
  symbol: Yup.string().optional(),
  description: Yup.string().required(),
  external_link: Yup.string().url("Invalid url").required("Field is required"),
  banner: FILE_SCHEMA.required(),
  image: FILE_SCHEMA.required(),
};
export const metadataSchema = Yup.object(metadataShape);

const attestationMetadataShape: SchemaShape<AttestationMetadataValues> = {
  name: Yup.string().required(),
  description: Yup.string().required(),
  attestationType: Yup.string().required(),
  external_link: Yup.string().url("Invalid url").required("Field is required"),
  image: FILE_SCHEMA.required(),
};
export const sbtMetadataSchema = Yup.object(attestationMetadataShape);

const issuerShape: SchemaShape<IssuerValues> = {
  address: ADDRES_SCHEMA.required(),
  attestation: Yup.number().required(),
  org: Yup.number().required(),
};
export const issuerSchema = Yup.object(issuerShape);

const delegaterShape: SchemaShape<DelegaterValues> = {
  delegate: ADDRES_SCHEMA.required(),
  org: Yup.string().required(),
};
export const delegaterSchema = Yup.object(delegaterShape);

const OptionalUrlSchema = Yup.string().url().optional();
const socialMetaShape: SchemaShape<AssociatedDataUpdate["metadata"]> = {
  notes: Yup.string().optional(),
  Github: OptionalUrlSchema,
  Twitter: OptionalUrlSchema,
  Discord: OptionalUrlSchema,
  Facebook: OptionalUrlSchema,
  Linkedin: OptionalUrlSchema,
};

const associatedDetailsShape: SchemaShape<
  Omit<AssociatedDataUpdate, "created_at">
> = {
  org: ADDRES_SCHEMA.required(),
  owner: ADDRES_SCHEMA.required(),
  id: Yup.number().optional(),
  metadata: Yup.object(socialMetaShape),
};

export const offchainMetaSchema = Yup.object(associatedDetailsShape);
