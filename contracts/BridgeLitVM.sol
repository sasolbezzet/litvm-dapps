// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract BridgeLitVM {
    event Locked(address indexed token, address indexed sender, uint256 amount, address recipient);
    event Released(address indexed token, address indexed recipient, uint256 amount);

    address public relayer;

    modifier onlyRelayer() {
        require(msg.sender == relayer, "BridgeLitVM: only relayer");
        _;
    }

    constructor(address _relayer) {
        relayer = _relayer;
    }

    function lock(address token, uint256 amount, address recipient) external {
        IERC20(token).transferFrom(msg.sender, address(this), amount);
        emit Locked(token, msg.sender, amount, recipient);
    }

    function release(address token, uint256 amount, address recipient) external onlyRelayer {
        IERC20(token).transfer(recipient, amount);
        emit Released(token, recipient, amount);
    }

    function setRelayer(address _relayer) external onlyRelayer {
        relayer = _relayer;
    }
}
