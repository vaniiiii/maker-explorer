// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

import "./interfaces/IManager.sol";
import "./interfaces/IVat.sol";
import "./interfaces/IDSProxy.sol";

contract VaultInfoV2 {
	IManager public constant manager =
		IManager(0x5ef30b9986345249bc32d8928B7ee64DE9435E39);
	IVat public constant vat = IVat(0x35D1b3F3D7966A1DFe207aa4514C12a259A0492B);

	function _getProxyOwner(
		address owner
	) external view returns (address userAddr) {
		IDSProxy proxy = IDSProxy(owner);
		userAddr = proxy.owner();
	}

	function getCdpInfo(
		uint256 _cdpId
	)
		external
		view
		returns (
			address urnAddr,
			address ownerAddr,
			address userAddr,
			bytes32 ilk,
			uint256 collateral,
			uint256 debt,
			uint256 totalDebt
		)
	{
		ilk = manager.ilks(_cdpId);
		urnAddr = manager.urns(_cdpId);
		ownerAddr = manager.owns(_cdpId);
		userAddr = address(0);

		try this._getProxyOwner(ownerAddr) returns (address user) {
			userAddr = user;
		} catch {}

		IVat.Urn memory urn = vat.urns(ilk, urnAddr);
		collateral = urn.ink;
		debt = urn.art;

		IVat.Ilk memory ilkInfo = vat.ilks(ilk);
		uint256 rate = ilkInfo.rate;

		totalDebt = debt * rate; // @dev this value needs to be scaled down by rate factor(10^27) and art factor(10^18)
	}
}
