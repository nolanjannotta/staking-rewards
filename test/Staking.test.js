const assert = require('assert')

const Staking = artifacts.require("Staking");
const Rewards = artifacts.require("Rewards");
const Dbar = artifacts.require("dbar");
const xDbar = artifacts.require("xDbar");


contract("Staking", (accounts) => {
    let rewards, dbar, xdbar, staking
    before(async() => {
        rewards = await Rewards.deployed();
        dbar = await Dbar.deployed();
        xdbar = await xDbar.deployed();
        staking = await Staking.deployed();
    })
    describe("deployment", () => {
        it("sets correct owner", async() => {

            assert.equal(await rewards.owner(), accounts[0])
            assert.equal(await staking.owner(), accounts[0])
            assert.equal(await dbar.owner(), accounts[0])
            assert.equal(await xdbar.owner(), accounts[0])
        })

        it("mints tokens to account[0]", async() => {
            let accountBalance0 = await dbar.balanceOf(accounts[0])
            assert.equal(accountBalance0.toString(),web3.utils.toWei("200", "ether"))
        })

        it("funds rewards account", async() => {
            await dbar.fundRewards(rewards.address)
            let balance = await dbar.balanceOf(rewards.address)
            assert.equal(balance.toString(), web3.utils.toWei("10000000", "ether"))
        })
        it("sets up contracts", async() => {
            await staking.setUp(dbar.address, xdbar.address)
            let receipt = await rewards.setUp(xdbar.address, dbar.address, staking.address);
            await xdbar.setUp(staking.address)
            console.log("last redeemed initialized at", receipt.receipt.blockNumber)


        })

    })
    describe("staking", () => {
        
        it("accounts[0] deposits 100 dbar", async() => {

            await dbar.approve(staking.address, web3.utils.toWei("100", "ether"), {from: accounts[0]})
            
            let receipt = await staking.deposit(web3.utils.toWei("100", "ether"),{from: accounts[0]})
            // console.log("staked at", receipt.receipt.blockNumber)

        })
        it("mints xdbar to accounts[0]", async() => {
            let balance = await xdbar.balanceOf(accounts[0])
            assert.equal(balance.toString(), web3.utils.toWei("100", "ether"))

        })


        it("user1 redeems", async() => {
            let receipt = await rewards.redeem()
            let balance = await dbar.balanceOf(staking.address)
            console.log("new staking balance", balance.toString())
            console.log("redeemed at", receipt.receipt.blockNumber)
        })

        it("reward is transfered to stake contract", async() => {
            balance = await dbar.balanceOf(staking.address)

        })
        it("accounts[1] deposits", async() => {
            await dbar.transfer(accounts[1], web3.utils.toWei("100", "ether"))
            await dbar.approve(staking.address, web3.utils.toWei("100", "ether"), {from: accounts[1]})

            await staking.deposit(web3.utils.toWei("100", "ether"), {from: accounts[1]})
            
        })
        it("accounts[1] xdbar balance", async() => {
            let balance = await xdbar.balanceOf(accounts[1])
            console.log(balance.toString())
        })
        it("redeems again", async() => {
            let receipt = await rewards.redeem()
            let balance = await dbar.balanceOf(staking.address)
            console.log("new staking balance", balance.toString())
            console.log("redeemed at", receipt.receipt.blockNumber)

        })
        it("both accounts withdraw funds", async() => {
            let balance0 = await xdbar.balanceOf(accounts[0])
            console.log(balance0.toString(0))
            let balance1 = await xdbar.balanceOf(accounts[1])
            await staking.withdraw(balance0.toString(), {from: accounts[0]})
            await staking.withdraw(balance1.toString(), {from: accounts[1]})
        })
        it("check final dbar balances", async() => {
            let balance0 = await dbar.balanceOf(accounts[0])
            let balance1 = await dbar.balanceOf(accounts[1])
            console.log("accounts[0] balance: ", balance0.toString())
            console.log("accounts[1] balance: ", balance1.toString())
        })
        
      


        
    })

    
    



    















})