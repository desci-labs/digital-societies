#!/bin/bash

network=$1

echo "Running script on $network network"

npx hardhat run --network $network scripts/deploy.ts