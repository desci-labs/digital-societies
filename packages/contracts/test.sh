#!/bin/bash

forge test -vvvv --gas-report

wait 

# (trap 'kill 0' SIGINT; npx hardhat node --network hardhat --no-deploy &)

# sleep 2

# npx gsn start &

# sleep 5

# npx hardhat test --network localhost

# killall node

echo "Done 🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥"