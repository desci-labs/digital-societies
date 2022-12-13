# To load the variables in the .env file
source .env

# To deploy and verify our contract
rpc=$1
network=$2
privateKey=$PRIVATE_KEY
testKey=$TEST_KEY
if [[ $network ]]; then
  privateKey=$testKey
  PRIVATE_KEY=$testKey
  npx hardhat run --network $network scripts/factory.ts
  echo "Running on $rpc $network"
else 
  echo "Running on Goerli $rpc $network $HARDHAT_RPC_URL"
  # forge script script/DeployFactory.s.sol:FactoryScript --rpc-url $rpc  --private-key $PRIVATE_KEY --broadcast --verify --etherscan-api-key $ETHERSCAN_API_KEY -vvvv
  # forge script script/DeployFactory.s.sol:MetadataScript --rpc-url $rpc  --private-key $privateKey --broadcast --verify --etherscan-api-key $ETHERSCAN_API_KEY -vvvv
fi

# forge flatten --output src/flattened/MetadataHolder.sol src/MetadataHolder.sol