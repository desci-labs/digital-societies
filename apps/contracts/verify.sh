# To load the variables in the .env file
source .env

# To deploy and verify our contract
# ** change --chain-id to network of choice
# ** change contract address to deployed contract also

# forge verify-contract --chain-id <chain-id> --compiler-version v0.8.15 <contract-address> src/SBFactory.sol:SBFactory $ETHERSCAN_KEY
forge verify-contract --chain-id 5 --compiler-version v0.8.15 0x4275862b287fbfb4c47785ae90f01afdf386c043 src/SBFactory.sol:SBFactory $ETHERSCAN_KEY