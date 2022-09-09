# Run the build script
npm run remapping-transform && forge build --force


# copy the required abis to the web/constants/abis
cp -rv ./out/SBFactory.sol ../web/src/constants/abis/
cp -rv ./out/SBToken.sol ../web/src/constants/abis/