# To load the variables in the .env file
source .env

# To deploy and verify our contract
forge script script/DeployFactory.s.sol:FactoryScript --rpc-url $RINKEBY_RPC_URL  --private-key $PRIVATE_KEY --broadcast --verify --etherscan-api-key $ETHERSCAN_KEY -vvvv
