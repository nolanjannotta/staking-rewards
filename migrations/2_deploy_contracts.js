const Migrations = artifacts.require("Migrations");
const Staking = artifacts.require("Staking");
const Rewards = artifacts.require("Rewards");
const Dbar = artifacts.require("dbar");
const xDbar = artifacts.require("xDbar");


module.exports = async (deployer) => {
  
  deployer.deploy(Migrations);
  deployer.deploy(Dbar);
  deployer.deploy(xDbar);
  deployer.deploy(Staking);
  deployer.deploy(Rewards);


 

  
};
