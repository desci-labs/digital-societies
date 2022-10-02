#!/bin/bash

network=$1
script=$2

echo "Running script $script on network $network"

npx hardhat run --network $network scripts/$script