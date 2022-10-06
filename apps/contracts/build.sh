#!/bin/bash

forge_out = $(which forge)
echo "forge --- $forge_out"
if [[ $forge_out == "" ]]; then
    echo "installing forge"
    curl -L https://foundry.paradigm.xyz | bash
    brew install libusb

    if [[ -f "$HOME/.bash_profile" ]]; then
        echo "sourcing bash_profile"
        source ~/.bash_profile
    fi
    if [[ -f "$HOME/.zshrc" ]]; then
        echo "sourcing zshrc"
        source ~/.zshrc
    fi
    if [[ -f "$HOME/.bashrc" ]]; then
        echo "sourcing bashrc"
        source ~/.bashrc
    fi

    foundryup
fi

# yarn install

# Run the build script
yarn remapping-transform && forge build --force

if [ -f "apps/contracts" ]; then
    cd apps/contracts
fi

# copy the required abis to the web/constants/abis
cp ./out/DesocManager.sol/DesocManager.json ../web/src/constants/abis/
cp ./out/Desoc.sol/Desoc.json ../web/src/constants/abis/

# generate typescript bindings for contracts
typechain --target ethers-v5 --out-dir '../web/src/constants/types' './out/DesocManager.sol/DesocManager.json'
typechain --target ethers-v5 --out-dir '../web/src/constants/types' './out/Desoc.sol/Desoc.json'