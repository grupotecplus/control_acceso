import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const AccessControlModule = buildModule("AccessControlModule", (m) => {
  const accessControl = m.contract("AccessControl");
  return { accessControl };
});

export default AccessControlModule;
