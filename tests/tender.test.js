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
    await tender.deployed();
  });

  it("test create tender term", async function () {
    await tender.createTerm("Second", "asd", "sdaf", "asd", 123, 123, deadline);
  
    const contractTerms = await tender.contractTerms(0);
    expect(contractTerms).to.be.an('array').that.has.lengthOf(7);;
  });
  it("get all tenders", async function () {
    
    await tender.createTerm("First", "asd", "sdaf", "asd", 123, 123, deadline);
    await tender.createTerm("Second", "asd", "sdaf", "asd", 123, 123, deadline);
    await tender.createTerm("Third", "asd", "sdaf", "asd", 123, 123, deadline);

    const contracts = await tender.getContractTerms();
    expect(contracts).to.be.lengthOf(3);

  })
  it("get term by id", async function() {
    await tender.createTerm("First", "asd", "sdaf", "asd", 123, 123, deadline);
    expect(await tender.getTermById(0)).to.be.an('array');
  })
});
