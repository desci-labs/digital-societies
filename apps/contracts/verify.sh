# To load the variables in the .env file
source .env

# To deploy and verify our contract
# ** change --chain-id to network of choice
# ** change contract address to deployed contract also

# forge verify-contract --chain-id <chain-id> --compiler-version v0.8.15 <contract-address> src/SBFactory.sol:SBFactory $ETHERSCAN_KEY
# forge verify-contract --chain-id 5 --compiler-version v0.8.13 0xb0D06b9636FA56CE7E4508FAFBf60D43dd3F27BD src/DesocManager.sol:DesocManager $ETHERSCAN_KEY

# code to verify DesocPaymaster.sol
# npx hardhat verify --network goerli 0x16A1900eF832cfD84a3584cC63ddE30BA5fd3086
# forge verify-contract --chain-id 5 --compiler-version v0.8.15 0xda497347D894Fdb9D2DB43192e65A99371747c5C src/DesocPaymaster.sol:DesocPaymaster $ETHERSCAN_KEY

# code to verify SBFactory
# forge verify-contract --chain-id 5 --compiler-version v0.8.13 --constructor-args "0000000000000000000000007a95fa73250dc53556d264522150a940d4c50238" 0xfEa9425A4566c9FecC81271fD48eFA57c92faA34 src/SBFactoryV2.sol:SBFactoryV2 $ETHERSCAN_KEY

# check verification
# forge verify-check hxtctu17dqawwfjjvlwzr9i5imrnbc3ywysxgttlhwtmnyatin $ETHERSCAN_KEY