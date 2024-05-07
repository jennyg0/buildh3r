// SPDX-License-Identifier: MIT
pragma solidity 0.8.22;

import "@api3/contracts/api3-server-v1/proxies/interfaces/IProxy.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract PriceFeed is Ownable {
    error PriceFeedNotFound();

    mapping(string => address) public priceFeeds;

    constructor() Ownable(msg.sender) {}

    function setupFeed(string calldata _feedName, address _priceFeed) external onlyOwner {
        priceFeeds[_feedName] = _priceFeed;
    }

    function readDataFeed(string calldata _feedName) public view returns (uint256, uint256) {
        if (priceFeeds[_feedName] == address(0)) revert PriceFeedNotFound();

        (int224 value, uint256 timestamp) = IProxy(priceFeeds[_feedName]).read();
        uint256 price = (uint224(value));
        return (price, timestamp);
    }
}
