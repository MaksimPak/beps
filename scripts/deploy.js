async function main() {
  const BepsTender = await ethers.getContractFactory("BepsTender");
  const contract = await BepsTender.deploy();

  await contract.waitForDeployment();
  console.log("BepsTender deployed to:", await contract.getAddress());
}
main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });