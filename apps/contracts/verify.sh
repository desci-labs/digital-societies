# To load the variables in the .env file
source .env

# To deploy and verify our contract
# ** change --chain-id to network of choice
# ** change contract address to deployed contract also

# forge verify-contract --chain-id <chain-id> --compiler-version v0.8.15 <contract-address> src/SBFactory.sol:SBFactory $ETHERSCAN_KEY
forge verify-contract --chain-id 5 --compiler-version v0.8.15 0x0e3c9450774cb1dad9f577967ee9f9e8444d97eb src/SBFactory.sol:SBFactory $ETHERSCAN_KEY