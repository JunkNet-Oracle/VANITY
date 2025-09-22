import 'dotenv/config';
import { Connection, PublicKey } from "@solana/web3.js";
import { getMint } from "@solana/spl-token";

async function main() {
  const RPC = process.env.SOLANA_RPC || "https://api.devnet.solana.com";
  const mintStr = process.argv[2];
  if (!mintStr) { console.error("Usage: ts-node scripts/verifyMint.ts <MINT_ADDRESS>"); process.exit(1); }
  const connection = new Connection(RPC, "confirmed");
  const mintPk = new PublicKey(mintStr);
  const mintInfo = await getMint(connection, mintPk);
  console.log("mintAuthority:", mintInfo.mintAuthority ? mintInfo.mintAuthority.toBase58() : null);
  console.log("freezeAuthority:", mintInfo.freezeAuthority ? mintInfo.freezeAuthority.toBase58() : null);
}
main().catch(e => { console.error(e); process.exit(1); });
