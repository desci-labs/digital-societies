#!/bin/bash

forge_out = $(which forge)
echo "forge --- $forge_out"
if [[ $forge_out == "" ]]; then
    echo "installing forge"
    curl -L https://foundry.paradigm.xyz | bash

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

npm i

# Run the build script
npm run remapping-transform && forge build --force

if [ -f "apps/contracts" ]; then
    cd apps/contracts
fi

# copy the required abis to the web/constants/abis
cp -rv ./out/SBFactory.sol ../web/src/constants/abis/
cp -rv ./out/SBToken.sol ../web/src/constants/abis/