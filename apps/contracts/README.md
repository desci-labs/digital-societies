## Desoc Contracts
This repository contains the core smart contracts for the DeSoc OSS collective.

### setup
Install [foundry](https://book.getfoundry.sh/getting-started/installation) locally
```bash
cd apps/contracts
yarn install
yarn remapping-transform # generates foundry import remappings
```

**Note:** duplicate the .env.example file and rename to .env, update the env variables specified
### Local deployment
```bash
# start local foundry node
Anvil

# run deploy script
yarn deploy
```
### Testing
Test both gasless and regular flows
```bash
yarn test
```

### Desoc Interfaces

1. cd into apps/contracts
2. make changes
3. forge build or forge test
4. if your VSCode paths for solidity show errors, run `npm run build` or `remap.sh` to remap the paths to the root of the monorepo
   VSCode solidity paths are handled using apps/contracts/package.json (`npm run build` inside apps/contracts folders)


# Gas report snaphots
![Gas reports](https://github.com/desci-labs/soulbound/blob/dev/gasreport.png?raw=true)