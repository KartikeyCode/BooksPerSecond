// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";


contract Layer is ERC20 {
    constructor() ERC20("Time", "TYM") {
        _mint(msg.sender,1000*10**18);
    }
}
