// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract GreenToken is ERC20 {
    mapping(address => uint256) public lastClaimedAt;

    uint256 public claimStartTime;
    uint256 public claimCooldown = 30 days;

    constructor() ERC20("GreenTokenCoin", "GTC") {
        claimStartTime = block.timestamp;
    }

    function claimTokens(uint256 tokensProvided) external {
        require(block.timestamp >= claimStartTime, "Claim period has not started yet");
        require(
            block.timestamp >= lastClaimedAt[msg.sender] + claimCooldown,
            "You must wait 30 days between claims"
        );
        require(tokensProvided > 0, "No tokens available for claim based on the decrease condition");

        lastClaimedAt[msg.sender] = block.timestamp;

    
        _mint(msg.sender, tokensProvided);
    }
}