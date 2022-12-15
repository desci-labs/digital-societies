import { GSNConfig } from "@opengsn/provider";
import { wrapContract } from "@opengsn/provider/dist/WrapContract";
import { GsnTestEnvironment } from "@opengsn/dev";
import { expect } from "chai";
import { ethers } from "hardhat";
import { Signer, utils, Wallet, ethers as ethersLibrary } from "ethers";
import { DesocPaymaster } from "../typechain-types/src/DesocPaymaster";
import { DesocManager } from "../typechain-types/src/DesocManager";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import DesocMangerInterface from '../out/DesocManager.sol/DesocManager.json'
import { expectRevert } from '@openzeppelin/test-helpers'

// const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";

/**
 * DesocPaymster Test checklist
 * - Paymaster (forwarder and relayHub is set)
 * - Target contract (Desoc Manager) has forwarder set
 * - Paymaster has not set target
 */

describe("DesocPaymaster GSN Integration", async () => {
  async function deployContracts() {
    const DesocPaymaster = await ethers.getContractFactory("DesocPaymaster");
    const desocPaymaster = (await DesocPaymaster.deploy()) as DesocPaymaster;
    await desocPaymaster.setRelayHub(relayHubAddress!);
    await desocPaymaster.setTrustedForwarder(forwarderAddress!);

    // Fund paymaster
    const tx = await deployer.sendTransaction({
      to: desocPaymaster.address,
      value: utils.parseEther("1"),
    });
    await tx.wait();

    const DesocManager = await ethers.getContractFactory("DesocManager");
    let target = (await DesocManager.deploy(
      forwarderAddress
    )) as DesocManager;

    gnsConfig.paymasterAddress = desocPaymaster.address;
    target = (await wrapContract(target, gnsConfig)) as DesocManager;

    let target2 = (await DesocManager.deploy(
      forwarderAddress
    )) as DesocManager;

    gnsConfig.paymasterAddress = desocPaymaster.address;
    target2 = (await wrapContract(target2, gnsConfig)) as DesocManager;

    return { deployer, accounts, target2, target, pm: desocPaymaster, };
  }

  let user: Signer, deployer: Signer, accounts: Signer[], forwarderAddress, relayHubAddress, gnsConfig: Partial<GSNConfig>;
  let pm: DesocPaymaster, target: DesocManager, target2: DesocManager;

  before(async () => {
    const deployment =
      GsnTestEnvironment.loadDeployment();
    forwarderAddress = deployment.forwarderAddress;
    relayHubAddress = deployment.relayHubAddress;
    const [signer, ...signers] = await ethers.getSigners();
    accounts = signers
    deployer = signer;
    user = await Wallet.createRandom();
    user = user.connect(ethers.provider);

    gnsConfig = {
      paymasterAddress: '',
      performDryRunViewRelayCall: false,
      jsonStringifyRequest: false,
      loggerConfiguration: {
        logLevel: "debug",
      },
    };

    const DesocPaymaster = await ethers.getContractFactory("DesocPaymaster");
    const desocPaymaster = (await DesocPaymaster.deploy()) as DesocPaymaster;
    await desocPaymaster.setRelayHub(relayHubAddress!);
    await desocPaymaster.setTrustedForwarder(forwarderAddress!);
    pm = desocPaymaster;

    // Fund paymaster
    const tx = await deployer.sendTransaction({
      to: desocPaymaster.address,
      value: utils.parseEther("1"),
    });
    await tx.wait();

    const DesocManager = await ethers.getContractFactory("DesocManager");
    target = (await DesocManager.deploy(
      forwarderAddress
    )) as DesocManager;

    gnsConfig.paymasterAddress = desocPaymaster.address;
    target = (await wrapContract(target, gnsConfig)) as DesocManager;

    target2 = (await DesocManager.deploy(
      forwarderAddress
    )) as DesocManager;

    gnsConfig.paymasterAddress = desocPaymaster.address;
    target2 = (await wrapContract(target2, gnsConfig)) as DesocManager;
  });

  describe("Validations", () => {
    it("should check successful gsn deployment", async () => {
      // console.log('target ', target)
      expect(await pm.getRelayHub()).to.equal(relayHubAddress, "Paymaster relayhub is not to equal gsn relayHub");
      expect(await pm.getTrustedForwarder()).to.equal(forwarderAddress, "Paymaster forwarder is not to equal gsn forwarder");
      expect(await pm.targets(target.address)).to.equal(false, "Paymaster Target is set");
    })
  });

  describe("with whitelisted target", () => {
    let contract: DesocManager;
    before(async () => {
      await pm.addTargets([target.address]);
      contract = (await new ethersLibrary.Contract(target.address, DesocMangerInterface.abi, user)) as DesocManager;
      contract = (await wrapContract(target, gnsConfig)) as DesocManager;
    });

    it("should allow whitelisted target", async () => {
      await expect(contract.deployToken("Desoc", "DSC", "0x00"))
        .to.emit(contract, "TokenCreated")
        .withArgs(anyValue, await deployer.getAddress());

    });
   
    it("should not allow unknown target", async () => {
      await expectRevert(target2.deployToken("Desoc", "DSC", "0x00"), "UnAuthorized target");
    });
  })
});
