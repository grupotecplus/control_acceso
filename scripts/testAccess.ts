import hre from "hardhat";

async function main() {
  // Dirección del contrato desplegado
  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

  // Conectar al contrato
  const accessControl = await hre.viem.getContractAt("AccessControl", contractAddress);

  // Cuenta de prueba
  const [admin, user] = await hre.viem.getWalletClients();

  // Dar acceso
  await accessControl.write.grantAccess([user.account.address], { account: admin.account });

  // Verificar acceso
  const hasAccess = await accessControl.read.hasAccess([user.account.address]);
  console.log("¿El usuario tiene acceso?", hasAccess);
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
