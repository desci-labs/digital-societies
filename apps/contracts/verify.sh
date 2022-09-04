# To load the variables in the .env file
source .env

# To deploy and verify our contract
# ** change --chain-id to network of choice
# ** change contract address to deployed contract also
forge verify-contract --chain-id <chain-id> --compiler-version v0.8.15 <contract-address> src/SBFactory.sol:SBFactory $ETHERSCAN_KEY