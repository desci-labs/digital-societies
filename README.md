Monorepo containing

contracts: apps/contracts

frontend: apps/web

# Workflow

## Contracts

1. cd into apps/contracts
2. make changes
3. forge build or forge test
4. if your VSCode paths for solidity show errors, run `npm run build` or `remap.sh` to remap the paths to the root of the monorepo
   VSCode solidity paths are handled using apps/contracts/package.json (`npm run build` inside apps/contracts folders)

# Gas report snaphots
![Gas reports](https://github.com/desci-labs/soulbound/blob/monorepo/gasreport.png?raw=true)