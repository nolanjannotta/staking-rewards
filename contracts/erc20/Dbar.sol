// SPDX-License-Identifier: MIT
pragma solidity 0.8.7;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Dbar is Ownable, ERC20 {
    constructor() ERC20("dbar", "DBR") {
        _mint(msg.sender, 200 * 10 ** decimals());
    }

    function fundRewards(address rewardsContract) public onlyOwner {
        _mint(rewardsContract, 10000000 * 10 ** decimals());

    }
}