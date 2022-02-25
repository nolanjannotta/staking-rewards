pragma solidity 0.8.7;

interface IxDbar {

    function mint(address to, uint256 amount) external;

    function burn(address account, uint amount) external;

    function totalSupply() external view returns (uint);

    function balanceOf(address account) external view returns (uint256);
}