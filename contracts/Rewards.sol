pragma solidity 0.8.7;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./interfaces/IxDbar.sol";



contract Rewards is Ownable {

    uint lastRedeemed;

    address public stakingContract;

    IERC20 public dbar;
    IxDbar public xdbar;




    constructor() {
        
        

    }

    function setUp(address xDbar, address _dbar, address _stakingContract) public onlyOwner {
        dbar = IERC20(_dbar);
        xdbar = IxDbar(xDbar);
        stakingContract = _stakingContract;
        lastRedeemed = block.number;
    }

    function redeem() public returns (uint) {
        require(xdbar.balanceOf(msg.sender) > 0, "cant redeem");
        
        
        uint passedBlocks = block.number - lastRedeemed;
        uint transferAmount = (10 * 1 ether) * passedBlocks;
        require(dbar.balanceOf(address(this)) >= transferAmount);
        require(dbar.transfer(stakingContract, transferAmount));
        lastRedeemed = block.number;
        return transferAmount;

    }

}