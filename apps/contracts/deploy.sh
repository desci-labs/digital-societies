# To load the variables in the .env file
source .env

# To deploy and verify our contract
# network=$1 || "goerli"

# npx hardhat run --network "goerli" scripts/factory.ts
# forge script script/DeployFactory.s.sol:FactoryScript --rpc-url $GOERLI_RPC_URL  --private-key $PRIVATE_KEY --broadcast --verify --etherscan-api-key $ETHERSCAN_API_KEY -vvvv
forge script script/DeployFactory.s.sol:MetadataScript --rpc-url $GOERLI_RPC_URL  --private-key $PRIVATE_KEY --broadcast --verify --etherscan-api-key $ETHERSCAN_API_KEY -vvvv

# --output src/Factory.flattened.sol src/Factory.sol
# --output src/MetadataHolder.flattened.sol src/MetadataHolder.sol
# forge flatten --output src/flattened/MetadataHolder.sol src/MetadataHolder.sol