// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

import {Test, console} from "forge-std/Test.sol";
import {VaultInfoV2} from "../../contracts/VaultInfoV2.sol";

contract VaultInfoV2Test is Test {
    address immutable i_deployer;

    VaultInfoV2 vaultInfo;

    constructor() {
        i_deployer = msg.sender;
    }
    function setUp() public {
        vm.createSelectFork("https://eth.llamarpc.com"); // Will start on latest block by default

        vm.startPrank(i_deployer);

        vaultInfo = new VaultInfoV2();

        vm.stopPrank();
    }

    function test_deployment() external view {
        assertEq(
            address(vaultInfo.manager()),
            0x5ef30b9986345249bc32d8928B7ee64DE9435E39
        );
        assertEq(
            address(vaultInfo.vat()),
            0x35D1b3F3D7966A1DFe207aa4514C12a259A0492B
        );
    }

    function test_getCdpInfo() external view {
        (, , , , , , uint256 totalDebt) = vaultInfo.getCdpInfo(31214);

        console.log(totalDebt);
    }
}
