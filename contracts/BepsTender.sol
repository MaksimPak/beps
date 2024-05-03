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
    event NewTerm(uint termId, string title, string description, string specifications, string materialType, uint budget, uint _quantity, uint deadline);


    mapping (uint => address) public termsToOwner;
    ContractTerm[] public contractTerms;

    function getContractTerms() public view returns (ContractTerm[] memory) {
        return contractTerms;
    }
    
    function getTermById(uint id) public view returns (ContractTerm memory) {
        return contractTerms[id];
    }


    function createTerm(
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
        console.log("New tender created with id:", id);

        emit NewTerm(id, _title, _description, _specifications, _materialType, _budget, _quantity, _deadline);
    }
}