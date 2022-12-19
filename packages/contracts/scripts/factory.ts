import { utils } from "ethers";
import { network, ethers, run } from "hardhat";
import { Factory } from "../typechain-types/src/Factory";
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

  // const FORWARDER_ADDRESS = process.env.FORWARDER;
  const Factory = await ethers.getContractFactory("Factory");
  const factory: Factory = (await Factory.deploy()) as Factory;
  await factory.deployed();

  console.log("Factory deployed to: ", factory.address);

  const MetaHolder = await ethers.getContractFactory("MetadataHolder");
  const meta = await MetaHolder.deploy(factory.address);
  await meta.deployed();
  console.log("MetaHolder deployed to: ", meta.address);

  const tx = await factory.setMetaAddress(meta.address);
  await tx.wait();
  console.log("Set meta address in Factory: ", factory.address, meta.address);
  // await run(`verify:verify`, {
  //   address: factory.address,
  //   constructorArguments: [FORWARDER_ADDRESS],
  // });
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
