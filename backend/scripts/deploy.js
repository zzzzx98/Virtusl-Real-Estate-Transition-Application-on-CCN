const hre = require("hardhat");

async function main() {
  // We get the contract to deploy
  const Hotel = await hre.ethers.getContractFactory("Hotel");
  const hotel = await Hotel.deploy();

  await hotel.deployed();

  console.log("Greeter deployed to:", hotel.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });