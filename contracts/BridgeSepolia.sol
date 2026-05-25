// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

interface IMintableToken is IERC20 {
    function mint(address to, uint256 amount) external;
    function burnFrom(address from, uint256 amount) external;
}

contract BridgeSepolia {
    event Minted(address indexed token, address indexed recipient, uint256 amount, bytes32 lockTxHash);
    event Burned(address indexed token, address indexed sender, uint256 amount, address recipient);

    address public relayer;
    mapping(address => bool) public supportedTokens;

    modifier onlyRelayer() {
        require(msg.sender == relayer, "BridgeSepolia: only relayer");
        _;
    }

    constructor(address _relayer) {
        relayer = _relayer;
    }

    function mint(address token, uint256 amount, address recipient, bytes32 lockTxHash) external onlyRelayer {
        require(supportedTokens[token], "BridgeSepolia: token not supported");
        IMintableToken(token).mint(recipient, amount);
        emit Minted(token, recipient, amount, lockTxHash);
    }

    function burn(address token, uint256 amount, address recipient) external {
        require(supportedTokens[token], "BridgeSepolia: token not supported");
        IERC20(token).transferFrom(msg.sender, address(this), amount);
        emit Burned(token, msg.sender, amount, recipient);
    }

    function setRelayer(address _relayer) external onlyRelayer {
        relayer = _relayer;
    }

    function addSupportedToken(address token) external onlyRelayer {
        supportedTokens[token] = true;
    }
}
