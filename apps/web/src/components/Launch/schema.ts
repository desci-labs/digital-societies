import * as Yup from "yup";

const uriPattern = /^((ftp|http|https):\/\/)?(www.)?(?!.*(ftp|http|https|www.))[a-zA-Z0-9_-]+(\.[a-zA-Z]+)+((\/)[\w#]+)*(\/\w+\?[a-zA-Z0-9_]+=\w+(&[a-zA-Z0-9_]+=\w+)*)?$/gm

export const metadataSchema = Yup.object().shape({
  name: Yup.string().required(),
  description: Yup.string().required(),
  external_link: Yup.string().matches(uriPattern, "Invalid external link"),
  image: Yup.string().required(),
});

