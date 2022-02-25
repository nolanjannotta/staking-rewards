// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract XDbar is ERC20, Ownable {

    address public stakingContract;

    modifier onlyStaking {
        require(msg.sender == stakingContract);
        _;

    }
    
    constructor() ERC20("xDbar", "XDBR") {
        
    }
    function setUp(address _stakingContract) public onlyOwner {
        stakingContract = _stakingContract;
    }

    function mint(address to, uint256 amount) public onlyStaking {
        _mint(to, amount);
    }
    function burn(address account, uint amount) public onlyStaking {
        _burn(account, amount);
    }
}