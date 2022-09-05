import { FileObject } from "components/FileDropzone/types";
import * as Yup from "yup";

export interface MetadataValues {
  name: string;
  description: string;
  external_link: string;
  image: string;
}


const VALID_MIME_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
];

const uriPattern = /^((ftp|http|https):\/\/)?(www.)?(?!.*(ftp|http|https|www.))[a-zA-Z0-9_-]+(\.[a-zA-Z]+)+((\/)[\w#]+)*(\/\w+\?[a-zA-Z0-9_]+=\w+(&[a-zA-Z0-9_]+=\w+)*)?$/gm

const FILE_SCHEMA = Yup.mixed<FileObject>()
  .test({
    name: 'size',
    message: 'File size must be smaller than 2MB',
    test: (data) => (data?.file?.size || 0) <= 1e6,
  })
  .test({
    name: "fileType",
    message: "Valid file types are PDF, JPG, PNG and WEBP",
    test: (data) =>
      data?.file
        ? VALID_MIME_TYPES.includes(data.file.type)
        : true,
  })
  .test({
    name: "invalidState",
    message: "Invalid state",
    // check file is valid, has name and size is greater than zero
    test: (data) => !!data && !!data?.file && !!data?.file?.name && !!data?.file?.size
  })

export const metadataSchema = Yup.object().shape({
  name: Yup.string().required(),
  description: Yup.string().required(),
  external_link: Yup.string().matches(uriPattern, "Invalid external link"),
  image: FILE_SCHEMA
});

