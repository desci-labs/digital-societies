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

Foundry Docs: https://book.getfoundry.sh/forge/writing-tests
