# To load the variables in the .env file
source .env

# To deploy and verify our contract
rpc=$1
network=$2
privateKey=$PRIVATE_KEY
testKey=$TEST_KEY
echo "Running on $network $rpc"
if [[ $network ]]; then
  privateKey=$testKey
  PRIVATE_KEY=$testKey
  npx hardhat run --network $network scripts/factory.ts
  echo "Running on $rpc $network"
else 
  # npx hardhat run --network goerli scripts/factory.ts
  forge script script/DeployFactory.s.sol:FactoryScript --rpc-url $GOERLI_RPC_URL  --private-key $PRIVATE_KEY --broadcast --verify --etherscan-api-key $ETHERSCAN_API_KEY -vvvv
  # forge script script/DeployFactory.s.sol:MetadataScript --rpc-url $GOERLI_RPC_URL  --private-key $privateKey --broadcast --verify --etherscan-api-key $ETHERSCAN_API_KEY -vvvv
fi

# forge flatten --output src/flattened/MetadataHolder.sol src/MetadataHolder.sol
