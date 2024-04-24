// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

interface IManager {
	function ilks(uint256 id) external view returns (bytes32);
	function owns(uint256 id) external view returns (address);
	function urns(uint256 id) external view returns (address);
}
