pragma solidity 0.8.7;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./interfaces/IxDbar.sol";
import "@openzeppelin/contracts/access/Ownable.sol";




contract Staking is Ownable {

    address public dbarAddress;
    address public xDbarAddress;
    IxDbar public xDbar;
    IERC20 public dbar;

    

    constructor() {
    }

    function setUp(address _dbar, address _xDbar) public onlyOwner {
        dbar = IERC20(_dbar);
        xDbar = IxDbar(_xDbar);
    }





    function deposit(uint amount) public {
        
        uint dbarBalance = dbar.balanceOf(address(this));
        uint totalxDbar = xDbar.totalSupply();

        dbarBalance == 0 || totalxDbar == 0 
        ? 
        xDbar.mint(msg.sender, amount) 
        :
        xDbar.mint(msg.sender, (amount * totalxDbar) / dbarBalance);
        require(dbar.transferFrom(msg.sender, address(this), amount),"transferFrom failed");

        
        

    }

    function withdraw(uint amount) public {
        require(xDbar.balanceOf(msg.sender) >= amount, "amount exceeds balance");
        uint totalxDbar = xDbar.totalSupply();
        uint dbarBalance = dbar.balanceOf(address(this));
        uint withdrawAmount = (amount * dbarBalance) / totalxDbar;
        xDbar.burn(msg.sender, amount);
        require(dbar.transfer(msg.sender,withdrawAmount), "dbar transfer failed");

    }

}