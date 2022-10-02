import { ethers } from "hardhat";
import forwarder from "../build/gsn/Forwarder.json";
import relayerHub from "../build/gsn/RelayHub.json";

async function main() {
  console.log('Forwarder ', forwarder.address);
  const SBFactory = await ethers.getContractFactory("SBFactoryV2");
  const sbfactory = await SBFactory.deploy(forwarder.address);
  await sbfactory.deployed();

  console.log(`Deployed CTF at ${sbfactory.address} with forwarder ${forwarder}`)
  const Paymaster = await ethers.getContractFactory("WhitelistPaymaster");
  const paymaster = await Paymaster.deploy();
  await paymaster.deployed();

  await paymaster.setRelayHub(relayerHub.address)
  await paymaster.setTrustedForwarder(forwarder)

  const signer = await ethers.getSigners();
  console.log('signers ', signer);
  // await web3.eth.sendTransaction({ from: accounts[0], to: paymaster.address, value: 1e18 })
  // console.log(`1 ETH deposited to Paymaster(${WhitelistPaymaster.address})`)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
