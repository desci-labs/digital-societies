# we copy the remappings inside apps/contracts and put them in the root so VSCode solidity extension plays nice
# ONLY MODIFY remappings.txt, do not modify the remappings.txt in the root
# ONLY USE npm run build instead of forge build
sed 's/=/=apps\/contracts\//g' remappings.txt > ../../remappings.txt