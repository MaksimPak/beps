/* eslint-disable no-undef */
// Right click on the script name and hit "Run" to execute
const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Tender", function () {
  const deadline =  Math.floor(new Date().getTime() / 1000) + 3600;
  let tender;

  beforeEach(async function () {
    const Tender = await ethers.getContractFactory("BepsTender");
    tender = await Tender.deploy();
    await tender.waitForDeployment();

    await tender.createContract("First", "asd", "sdaf", "asd", 123, 123, deadline);
    await tender.createContract("Second", "asd", "sdaf", "asd", 123, 123, deadline);
    await tender.createContract("Third", "asd", "sdaf", "asd", 123, 123, deadline);
  });

  it("test create tender term", async function () {
    const contractTerms = await tender.contractTerms(0);
    expect(contractTerms).to.be.an('array').that.has.lengthOf(7);;
  });
  it("get all tenders", async function () {
    const contracts = await tender.getContracts();
    expect(contracts).to.be.lengthOf(3);
  })
  it("get term by id", async function() {
    expect(await tender.getContractById(0)).to.be.an('array');
  })
  it("apply for contract", async function() {
    await tender.applyForContract(0);
    expect(await tender.termSuppliers(0, 0)).to.be.a('string');
  })
    it("should allow contract owner to select a supplier", async function () {
    const [owner] = await ethers.getSigners();

    await tender.createContract(
      "Contract Title",
      "Contract Description",
      "Contract Specifications",
      "Material Type",
      1000,
      10,
      Math.floor(new Date().getTime() / 1000) + 3600
    );
    const contractTermId = 0;
    await tender.applyForContract(contractTermId);
    await tender.selectSupplier(contractTermId);
    const selectedSupplier = await tender.termWinner(contractTermId);
    expect(selectedSupplier).to.equal(owner.address);
  });
});
