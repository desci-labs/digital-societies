import type { CodegenConfig } from "@graphql-codegen/cli";
import { config as dotenvConfig } from "dotenv";
dotenvConfig({ path: ".env.local" });

const productionApi = "";
const config: CodegenConfig = {
  schema: process.env.THEGRAPH_API_ENDPOINT ?? productionApi,
  documents: ["src/**/*.tsx"],
  ignoreNoDocuments: true, // for better experience with the watcher
  generates: {
    "./src/thegraph/desoc/": {
      preset: "client",
      plugins: [],
    },
  },
};
export default config;
