// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

interface IVat {
	struct Urn {
		uint256 ink;
		uint256 art;
	}

	struct Ilk {
		uint256 Art;
		uint256 rate;
		uint256 spot;
		uint256 line;
		uint256 dust;
	}

	function urns(
		bytes32 ilk,
		address urnAddr
	) external view returns (Urn memory);
	function ilks(bytes32 ilk) external view returns (Ilk memory);
}
