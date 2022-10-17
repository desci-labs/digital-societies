Install Foundry:

```
curl -L https://foundry.paradigm.xyz | bash && foundryup
source /home/USERNAME/.bashrc
foundryup
```

Build

```
forge build
```

Note: you may get warnings for unused variables, but these are safe to ignore

Test

```
# run all tests
forge test

# run specific test (match pattern)
forge test -m testMint
```

Flatten contract
```
forge flatten src/DesocManager.sol --output flatten.sol
```

Send Transaction with **cast**
```
 cast send [to]  "verify(address)" "0xa5a83de9294eafc131fEf448c3ea7b11282379C0" --private-key=[PRIVATE_KEY] --rpc-url=[RPC_URL] --chain=goerli
```