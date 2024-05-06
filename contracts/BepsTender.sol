// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.8.2 <0.9.0;

import "hardhat/console.sol";

contract BepsTender {

    struct ContractTerm {
        string title;
        string description;
        string specifications;
        string materialType;
        uint budget;
        uint quantity;
        uint deadline;
    }

    event NewTerm(
        uint indexed termId, 
        string title, 
        string description, 
        string specifications, 
        string materialType, 
        uint budget, 
        uint quantity, 
        uint deadline
    );


    mapping (uint => address) public termsToOwner;
    mapping (uint => address[]) public termSuppliers;
    mapping (uint => address) public termWinner;

    ContractTerm[] public contractTerms;

    function getContracts() public view returns (ContractTerm[] memory) {
        return contractTerms;
    }

    function getContractById(uint _id) public view returns (ContractTerm memory) {
        require(_id < contractTerms.length, "Invalid id");
        return contractTerms[_id];
    }


    function createContract(
        string memory _title, 
        string memory _description, 
        string memory _specifications,
        string memory _materialType,
        uint _budget,
        uint _quantity,
        uint _deadline
    ) external {
        require(_deadline > block.timestamp, "Deadline must be greater than current date");
        contractTerms.push(ContractTerm(_title, _description, _specifications, _materialType,_budget, _quantity, _deadline));
        uint id = contractTerms.length;
        termsToOwner[id] = msg.sender;

        emit NewTerm(id, _title, _description, _specifications, _materialType, _budget, _quantity, _deadline);
    }

    function applyForContract(uint _id) external {
        require(_id < contractTerms.length, "Invalid id");
        termSuppliers[_id].push(msg.sender);
    }

    function selectSupplier(uint _id) external {
        require(_id < contractTerms.length, "Invalid id");
        termWinner[_id] = msg.sender;
    }
}