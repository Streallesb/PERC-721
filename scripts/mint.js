const hre = require("hardhat");
const utils = require("../utils/utils.js")

async function main() {
  const contractAddress = "0xaf78B367B8c94758CB0c6a43c8DBFb9DF17fcdbC";
  const [signer] = await hre.ethers.getSigners();

  const contractFactory = await hre.ethers.getContractFactory("STPErc721");
  const contract = contractFactory.attach(contractAddress);

  const mint = await utils.sendShieldedTransaction(
    signer,
    contractAddress,
    contract.interface.encodeFunctionData("safeMint",[signer.address,"111111"]),
    0
  );

  await mint.wait();

  console.log("Transaction Receipt: ", mint.hash);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});