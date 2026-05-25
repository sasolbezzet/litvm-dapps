// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract Staking {
    IERC20 public stakingToken;
    IERC20 public rewardToken;
    uint256 public rewardRate = 1 ether; // 1 USDC per second per total stake (scaled to 1e18)
    uint256 public lastUpdateTime;
    uint256 public rewardPerTokenStored;

    mapping(address => uint256) public stakes;
    mapping(address => uint256) public rewardPerTokenPaid;
    mapping(address => uint256) public rewards;

    event Staked(address indexed user, uint256 amount);
    event Withdrawn(address indexed user, uint256 amount);
    event RewardClaimed(address indexed user, uint256 amount);

    constructor(address _stakingToken, address _rewardToken) {
        stakingToken = IERC20(_stakingToken);
        rewardToken = IERC20(_rewardToken);
    }

    modifier updateReward(address account) {
        rewardPerTokenStored = rewardPerToken();
        lastUpdateTime = block.timestamp;
        if (account != address(0)) {
            rewards[account] = earned(account);
            rewardPerTokenPaid[account] = rewardPerTokenStored;
        }
        _;
    }

    function totalStaked() public view returns (uint256) {
        return stakingToken.balanceOf(address(this));
    }

    function rewardPerToken() public view returns (uint256) {
        uint256 _totalStaked = totalStaked();
        if (_totalStaked == 0) return rewardPerTokenStored;
        return rewardPerTokenStored + rewardRate * (block.timestamp - lastUpdateTime) * 1e18 / _totalStaked;
    }

    function earned(address account) public view returns (uint256) {
        return stakes[account] * (rewardPerToken() - rewardPerTokenPaid[account]) / 1e18 + rewards[account];
    }

    function stake(uint256 amount) external updateReward(msg.sender) {
        require(amount > 0, "Cannot stake 0");
        stakingToken.transferFrom(msg.sender, address(this), amount);
        stakes[msg.sender] += amount;
        emit Staked(msg.sender, amount);
    }

    function withdraw(uint256 amount) external updateReward(msg.sender) {
        require(amount > 0, "Cannot withdraw 0");
        require(stakes[msg.sender] >= amount, "Insufficient stake");
        stakes[msg.sender] -= amount;
        stakingToken.transfer(msg.sender, amount);
        emit Withdrawn(msg.sender, amount);
    }

    function claimReward() external updateReward(msg.sender) {
        uint256 reward = rewards[msg.sender];
        require(reward > 0, "No rewards");
        rewards[msg.sender] = 0;
        rewardToken.transfer(msg.sender, reward);
        emit RewardClaimed(msg.sender, reward);
    }

    function setRewardRate(uint256 _rewardRate) external {
        rewardRate = _rewardRate;
    }
}
