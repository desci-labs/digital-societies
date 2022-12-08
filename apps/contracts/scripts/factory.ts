import { utils } from "ethers";
import { network, ethers, run } from "hardhat";

async function main() {
  const net = await ethers.provider.getNetwork();
  const chainId = (await net).chainId;
  const signers = await ethers.getSigners();
  const deployer = signers[0];

  console.log(
    "Running script on chain: ",
    chainId,
    "Deployer: ",
    deployer.address
  );

  if (!deployer)
    throw new Error(
      "configure accounts for deployment in your hardhat.config.ts file"
    );

  const FORWARDER_ADDRESS = process.env.FORWARDER;
  const Factory = await ethers.getContractFactory("Factory");
  console.log("factory:", Factory.interface);
  const factory = await Factory.deploy(FORWARDER_ADDRESS);
  console.log("contract:", factory.address);
  await factory.deployed();
  console.log("Factory deployed to: ", factory.address);

  await run(`verify:verify`, {
    address: factory.address,
    constructorArguments: [FORWARDER_ADDRESS],
  });
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
