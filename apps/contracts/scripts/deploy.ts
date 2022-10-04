import { utils } from "ethers";
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

  if (!deployer) throw new Error('configure accounts for deployment in your hardhat.config.ts file');

  let forwarder, relayerHub;
  const deployedNetwork = (deployedNetworks[chainId] || [])[0];

  if (network.name !== "localhost" || !chainId.toString().match(/1337/)) {

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

    // sanity check: the build/gsn was created on the currently running node.
    console.log('Deployer is set, running sanity check on forwarder');
    if (await ethers.provider.getCode(forwarder).then(code => code.length) === 2) {
      throw new Error('GSN is not running. You may use "yarn node:start && yarn deploy-gsn" to launch Hardhat and GSN.')
    }


    // validate relayerhub
    relayerHub = deployedNetwork.contracts &&
      deployedNetwork.contracts.RelayHub &&
      deployedNetwork.contracts.RelayHub.address;

    if (!relayerHub) {
      throw new Error(`No RelayHub address on network ${chainId}`)
    }

    //** Deploy custom paymaster here and connect it to relayer & forwarder
    const Paymaster = await ethers.getContractFactory("AcceptEverythingPaymaster");
    let paymaster = await Paymaster.deploy();
    console.log("Deploying paymaster at: ", paymaster.address);
    await paymaster.deployed();
    console.log("Paymaster deployed at: ", paymaster.address);

    console.log('set forwarder', forwarder);
    await paymaster.setTrustedForwarder(forwarder);

    console.log('set relayer', relayerHub);
    await paymaster.setRelayHub(relayerHub);

    const tx = await paymaster.deposit({ from: deployer, value: utils.parseEther('0.5')});
    console.log('deposit 0.5 ')
    // console.log('relayer set')
  } else {
    forwarder = localForwarder;
  }


  // const SBFactory = await ethers.getContractFactory("SBFactoryV2");
  // const sbfactory = await SBFactory.deploy(forwarder);
  // await sbfactory.deployed();
  // console.log(`Deployed SBFactory at ${sbfactory.address} with forwarder ${forwarder}`);

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
