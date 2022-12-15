import type { CodegenConfig } from "@graphql-codegen/cli";
import { config as dotenvConfig } from "dotenv";
dotenvConfig({ path: ".env.local" });

const productionApi = "";
const config: CodegenConfig = {
  schema: process.env.THEGRAPH_API_ENDPOINT ?? productionApi,
  documents: ["src/**/*.{graphql,ts,tsx}"],
  ignoreNoDocuments: true, // for better experience with the watcher
  generates: {
    "./src/thegraph/desoc/": {
      preset: "client",
      plugins: ["typescript-react-query"],
      config: {
        fetcher: {
          endpoint: process.env.THEGRAPH_API_ENDPOINT ?? productionApi,
        },
      },
    },
  },
};
export default config;
