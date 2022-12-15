#!/bin/bash

# forge_out = $(which forge)
# echo "forge --- $forge_out"
# if [[ $forge_out == "" ]]; then
#     echo "installing forge"
#     curl -L https://foundry.paradigm.xyz | bash
#     brew install libusb

#     if [[ -f "$HOME/.bash_profile" ]]; then
#         echo "sourcing bash_profile"
#         source ~/.bash_profile
#     fi
#     if [[ -f "$HOME/.zshrc" ]]; then
#         echo "sourcing zshrc"
#         source ~/.zshrc
#     fi
#     if [[ -f "$HOME/.bashrc" ]]; then
#         echo "sourcing bashrc"
#         source ~/.bashrc
#     fi

#     foundryup
# fi

# yarn install

# Run the build script
yarn remapping-transform && forge build --force

if [ -f "apps/contracts" ]; then
    cd apps/contracts
fi

# copy the required abis to the web/constants/abis
cp ./out/Factory.sol/Factory.json ./src/abis/
cp ./out/MetadataHolder.sol/MetadataHolder.json ./src/abis/
cp ./out/Desoc.sol/Desoc.json ./src/abis/

# generate typescript bindings for contracts
typechain --target ethers-v5 --out-dir './typechain-types' './out/Factory.sol/Factory.json' './out/Desoc.sol/Desoc.json' './out/MetadataHolder.sol/MetadataHolder.json'