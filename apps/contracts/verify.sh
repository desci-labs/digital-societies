# To load the variables in the .env file
source .env

# To deploy and verify our contract
# ** change --chain-id to network of choice
# ** change contract address to deployed contract also

forge verify-contract --watch --chain-id 5 --compiler-version "0.8.17+commit.8df45f5f" --optimizer-runs 200 0x69301853f23a924258Db97A955454ac71d07e528 src/Factory.sol:Factory $ETHERSCAN_KEY --constructor-args $(cast abi-encode "constructor(address)" "0x7A95fA73250dc53556d264522150A940d4C50238")
