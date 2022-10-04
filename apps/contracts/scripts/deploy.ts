import { network, ethers } from "hardhat";
import localForwarder from "../build/gsn/Forwarder.json";
import deployedNetworks from "../config/gsn-networks.json";

// on localhost - use deployed values
/** get forwarder and relayer contract from config[chainId]
 on goerli - deploy factory with (forwarder), 
 deploy paymaster,  
 setTrustedForwarder on paymaster
 set relayer  on factory
 sends funds to paymaster
 */

async function main() {
  const net = await ethers.provider.getNetwork();
  const chainId = (await net).chainId;
  const signers = await ethers.getSigners();
  const deployer = signers[0];
  console.log('chainId ', chainId, 'Deployer', deployer.address);

  let forwarder;
  if (network.name !== "localhost" || !chainId.toString().match(/1337/)) {
    const deployedNetwork = (deployedNetworks[chainId] || [])[0]

    if (!deployedNetwork) {
      throw new Error(`GSN not deployed on network ${chainId}`)
    }
    forwarder = deployedNetwork.contracts &&
      deployedNetwork.contracts.Forwarder &&
      deployedNetwork.contracts.Forwarder.address
    if (!forwarder) {
      throw new Error(`No Forwarder address on network ${chainId}`)
    }
    console.log('Forwarder ', forwarder);

  } else {
    forwarder = localForwarder;
  }

  if (!deployer) throw new Error('configure accounts for deployment in your hardhat.config.ts file');
  // sanity check: the build/gsn was created on the currently running node.
  console.log('Deployer is set, running sanity check on forwarder');
  if (await ethers.provider.getCode(forwarder).then(code => code.length) === 2) {
    throw new Error('GSN is not running. You may use "yarn node:start && yarn deploy-gsn" to launch Hardhat and GSN.')
  }

  //** Deploy custom paymaster here and connect it to relayer & forwarder
  // console.log('set forwarder', forwarder.address)
  // await paymaster.setTrustedForwarder(forwarder.address)
  // console.log('set relayer', relayerHub.address)
  // await paymaster.setRelayHub(relayerHub.address)
  // console.log('relayer set')

  // return;
  const SBFactory = await ethers.getContractFactory("SBFactoryV2");
  const sbfactory = await SBFactory.deploy(forwarder);
  await sbfactory.deployed();
  console.log(`Deployed SBFactory at ${sbfactory.address} with forwarder ${forwarder}`);

  // await web3.eth.sendTransaction({ from: accounts[0], to: paymaster.address, value: 1e18 })
  // console.log(`1 ETH deposited to Paymaster(${WhitelistPaymaster.address})`)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
