import bs58 from "bs58";
import { Keypair } from "@solana/web3.js";

const suffix = (process.env.SUFFIX || "ORB").trim(); // default JNK

function matchesSuffix(addr: string) { return addr.endsWith(suffix); }

(async () => {
  if (!suffix) { console.error("SUFFIX cannot be empty"); process.exit(1); }
  console.log("Target suffix:", suffix);
  let tries = 0; const t0 = Date.now();
  while (true) {
    const kp = Keypair.generate();
    const addr = kp.publicKey.toBase58();
    tries++;
    if (matchesSuffix(addr)) {
      console.log("✅ Found vanity mint address:", addr);
      console.log("Secret key (base58):", bs58.encode(kp.secretKey));
      console.log("Tries:", tries, "Elapsed(s):", ((Date.now()-t0)/1000).toFixed(1));
      break;
    }
    if (tries % 10000 === 0) console.log("…tries:", tries);
  }
})();