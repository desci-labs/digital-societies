import { network, ethers } from "hardhat";
import forwarder from "../build/gsn/Forwarder.json";
import relayerHub from "../build/gsn/RelayHub.json";
import paymasterHub from "../build/gsn/Paymaster.json";

// on localhost - use deployed values
/** get forwarder and relayer contract from config[chainId]
 on goerli - deploy factory with (forwarder), 
 deploy paymaster,  
 setTrustedForwarder on paymaster
 set relayer  on factory
 sends funds to paymaster
 */

async function main() {
  const net = ethers.provider.getNetwork();
  const accts = await ethers.getSigners();
  console.log('values ', (await net).chainId, accts[0].address);
  return;
  console.log('Forwarder ', forwarder.address);
  const SBFactory = await ethers.getContractFactory("SBFactoryV2");
  const sbfactory = await SBFactory.deploy(forwarder.address);
  await sbfactory.deployed();

  console.log(`Deployed SBFactory at ${sbfactory.address} with forwarder ${forwarder.address}`)
  const Paymaster = await ethers.getContractFactory("AcceptEverythingPaymaster");
  // const paymaster = await Paymaster.deploy();
  // await paymaster.deployed();
  const paymaster = new ethers.Contract(paymasterHub.address, Paymaster.interface)
  console.log(`Deployed Paymaster at ${paymaster.address}`)

  // console.log('set forwarder', forwarder.address)
  // await paymaster.setTrustedForwarder(forwarder.address)
  // console.log('set relayer', relayerHub.address)
  // await paymaster.setRelayHub(relayerHub.address)
  // console.log('relayer set')

  const [signer] = await ethers.getSigners();
  console.log('signers ', signer.address);

  // await web3.eth.sendTransaction({ from: accounts[0], to: paymaster.address, value: 1e18 })
  // console.log(`1 ETH deposited to Paymaster(${WhitelistPaymaster.address})`)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
