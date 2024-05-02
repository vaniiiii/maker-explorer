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

    function test_getCdpInfo() external {
        uint256 blockNumber = 19785378;
        vm.roll(blockNumber);

        uint256 DIVIDING_FACTOR = 10 ** 27 * 10 ** 18;

        uint256 VAULT_31214_DEBT = 127277617;
        uint256 VAULT_31039_DEBT = 68007766;
        uint256 VAULT_1985_DEBT = 64319592;
        uint256 VAULT_22025_DEBT = 56082800;
        uint256 VAULT_19102_DEBT = 33753886;
        uint256 VAULT_30142_DEBT = 559412;

        (, , , , , , uint256 totalDebt31214) = vaultInfo.getCdpInfo(31214);
        (, , , , , , uint256 totalDebt31039) = vaultInfo.getCdpInfo(31039);
        (, , , , , , uint256 totalDebt1985) = vaultInfo.getCdpInfo(1985);
        (, , , , , , uint256 totalDebt22025) = vaultInfo.getCdpInfo(22025);
        (, , , , , , uint256 totalDebt19102) = vaultInfo.getCdpInfo(19102);
        (, , , , , , uint256 totalDebt30142) = vaultInfo.getCdpInfo(30142);

        assertEq(VAULT_31214_DEBT, totalDebt31214 / DIVIDING_FACTOR);
        assertEq(VAULT_31039_DEBT, totalDebt31039 / DIVIDING_FACTOR);
        assertEq(VAULT_1985_DEBT, totalDebt1985 / DIVIDING_FACTOR);
        assertEq(VAULT_22025_DEBT, totalDebt22025 / DIVIDING_FACTOR);
        assertEq(VAULT_19102_DEBT, totalDebt19102 / DIVIDING_FACTOR);
        assertEq(VAULT_30142_DEBT, totalDebt30142 / DIVIDING_FACTOR);
    }
}
