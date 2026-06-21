// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract AccessControl {
    address public admin;
    mapping(address => bool) public authorized;

    event AccessGranted(address indexed account);
    event AccessRevoked(address indexed account);

    constructor() {
        admin = msg.sender; // el que despliega es admin
    }

    modifier onlyAdmin() {
        require(msg.sender == admin, "Solo el admin puede ejecutar");
        _;
    }

    function grantAccess(address account) external onlyAdmin {
        authorized[account] = true;
        emit AccessGranted(account);
    }

    function revokeAccess(address account) external onlyAdmin {
        authorized[account] = false;
        emit AccessRevoked(account);
    }

    function hasAccess(address account) external view returns (bool) {
        return authorized[account];
    }
}
