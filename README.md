<div align="center">

```
      ██████╗ ██╗   ██╗███╗   ██╗██╗  ██╗███╗   ██╗███████╗███████╗████████╗
      ██╔══██╗██║   ██║████╗  ██║██║ ██╔╝████╗  ██║██╔════╝██╔════╝╚══██╔══╝
      ██║  ██║██║   ██║██╔██╗ ██║█████╔╝ ██╔██╗ ██║█████╗  ███████╗   ██║   
      ██║  ██║██║   ██║██║╚██╗██║██╔═██╗ ██║╚██╗██║██╔══╝  ╚════██║   ██║   
      ██████╔╝╚██████╔╝██║ ╚████║██║  ██╗██║ ╚████║███████╗███████║   ██║   
      ╚═════╝  ╚═════╝ ╚═╝  ╚═══╝╚═╝  ╚═╝╚═╝  ╚═══╝╚══════╝╚══════╝   ╚═╝   
```

# 🌌 JUNKNET · Virtual Oracle Explorer & Launchpad

**Playful power.** A high‑fidelity **Solana explorer** + **virtual token launchpad** for experimenting with tokenomics, trading strategies, and on‑chain mechanics — **without real financial risk**.

[![Made with Solana](https://img.shields.io/badge/Made%20with-Solana-9945FF?logo=solana&logoColor=white)]()
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)]()
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)]()

_All actions are verifiably linked to real Solana transactions, anchoring off‑chain metadata to **immutable on‑chain proof**._

</div>

---

## ✨ Core Features

- 🚀 **Virtual Token Launchpad** — Deploy custom virtual tokens in under a minute with a small SOL fee. No code required.
- 📈 **Live Trading Environment** — Buy/sell any token launched on the platform in a simulated market.
- 🔻 **Dynamic Sell Tax** — Starts at **15%**, asymptotically reduces to a **5% floor** as more SOL is raised (rewards early participation).
- 🔗 **On‑Chain Verification** — Launches and key actions are tied to real Solana transactions for auditability.
- 🔥 **$JUNK Deflationary Tokenomics** — Platform SOL fees buy back & burn **$JUNK** on a schedule.
- 🏆 **Gamification & Bounties** — Earn **JunkPoints ($JP)**, unlock achievements, and climb leaderboards.

---

## ⚙️ How It Works

### 🧪 Token Launchpad
1. **Connect Wallet** (any Solana‑compatible).
2. **Fill Details** (name, symbol, description, socials).
3. **Pay 0.005 SOL fee** (tx memo includes your token details → permanent on‑chain record).
4. **Oracle verifies** the SOL tx → your token appears instantly in JUNKNET for trading.

### 💹 Trading & Tokenomics
- **Dynamic Sell Tax**: starts 15% → for every **1 SOL raised**, tax reduces by **25% of the remaining reducible amount**, bottoms at **5%**.
- **Graduation Fee Split** (when migrating to a real AMM like Meteora):
  - 50% → **Token Deployer**
  - 50% → **JUNKNET Treasury** (funds **$JUNK** buybacks & burns)

---

## 🛠 Local Setup & Installation

### 1️⃣ Clone
```bash
git clone https://github.com/your-username/junknet.git
cd junknet
```

### 2️⃣ Install
```bash
yarn install
```

### 3️⃣ Configure `.env`
```bash
cp .env.example .env
```
Fill the values:
- `RPC_URL` — Your Solana RPC endpoint
- `LP_WALLET` — Public key receiving platform fees
- `LP_SECRET_KEY` — **Secret key** for `LP_WALLET` (base58). _Never commit_
- `JUNK_MINT` — Mint address of **$JUNK**
- `XAI_API_KEY` _(optional)_ — Grok AI features
- `SMTP_*` _(optional)_ — Email notifications for curated apps

> 🔐 **Security**: Store secrets in local `.env` only. Consider `dotenv-vault`, GitHub Environments, or cloud secret managers for deployments.

### 4️⃣ Initialize DB
```bash
node server.js --init-db
```

### 5️⃣ Run
```bash
node server.js
# http://localhost:3000
```

---

## 🧱 Tech Stack

- ⚡ **Backend**: Node.js, Express.js  
- 🗄 **DB**: better‑sqlite3 (lightweight, file‑based)  
- 🎨 **Frontend**: Vanilla HTML, CSS, JS (no frameworks)  
- ⛓ **Blockchain**: `@solana/web3.js`  
- 📊 **Charts**: Lightweight Charts™ by TradingView

---

## 🧰 Power Scripts (CLI)

A set of battle‑tested scripts you can drop into `scripts/` for power users and automation.

### 1) 🎯 Vanity Mint Address Finder (suffix matcher)

Find a mint **whose base58 ends with your suffix** (e.g., `...JNK`).

> Env: `SUFFIX` (default shown), or pass via shell: `SUFFIX=JNK ts-node scripts/vanity.ts`

```ts
// scripts/vanity.ts
import bs58 from "bs58";
import { Keypair } from "@solana/web3.js";

const suffix = (process.env.SUFFIX || "ORB").trim(); // default ORB

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
```

**Run**
```bash
# with default suffix ORB
ts-node scripts/vanity.ts

# with custom suffix (e.g., JNK)
SUFFIX=JNK ts-node scripts/vanity.ts
```

> 💡 Tip: Suffix matches are rarer than prefixes in base58 → expect exponential search time for longer suffixes.

---

### 2) 🏷️ Create/Update SPL Metadata (Metaplex Token Metadata)

Set (or update) the token **URI** and optionally **name/symbol** for a mint using **mpl‑token‑metadata** via **Umi**.

```ts
// scripts/setMetadata.ts
import 'dotenv/config';
import bs58 from 'bs58';
import { Connection, Keypair, PublicKey } from '@solana/web3.js';

import { createUmi } from '@metaplex-foundation/umi-bundle-defaults';
import { publicKey as umiPublicKey, signerIdentity, createSignerFromKeypair } from '@metaplex-foundation/umi';
import { fromWeb3JsKeypair } from '@metaplex-foundation/umi-web3js-adapters';
import { createMetadataAccountV3, updateMetadataAccountV2 } from '@metaplex-foundation/mpl-token-metadata';

const TOKEN_METADATA_PROGRAM_ID = new PublicKey('metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s');

function env(name: string, required = true): string {
  const v = process.env[name];
  if (!v && required) throw new Error(`Missing env ${name}`);
  return v || '';
}

function clamp(label: string, val: string | undefined, max: number) {
  if (!val || val.length === 0) throw new Error(`${label} cannot be empty`);
  return val.length > max ? val.slice(0, max) : val;
}
function padUri(uri: string): string {
  if (!uri) throw new Error('URI empty');
  if (uri.length > 200) throw new Error(`URI too long (${uri.length} > 200)`);
  return uri.padEnd(200, '\\0');
}

async function main() {
  // CLI: --mint <MINT> --uri <URL> [--name NAME] [--symbol SYMBOL]
  const args = process.argv.slice(2);
  const mintIdx = args.indexOf('--mint');
  const uriIdx = args.indexOf('--uri');
  if (mintIdx < 0 || uriIdx < 0) {
    console.error('Usage: ts-node scripts/setMetadata.ts --mint <MINT> --uri <HTTP-or-IPFS-URL> [--name NAME] [--symbol SYMBOL]');
    process.exit(1);
  }
  const mintStr = args[mintIdx + 1];
  const uriRaw = args[uriIdx + 1];
  const nameArg = args.includes('--name') ? args[args.indexOf('--name') + 1] : env('TOKEN_NAME', false);
  const symArg  = args.includes('--symbol') ? args[args.indexOf('--symbol') + 1] : env('TOKEN_SYMBOL', false);

  // Prefer HTTP gateway for explorers
  const uriHttp = uriRaw.startsWith('ipfs://')
    ? `https://gateway.pinata.cloud/ipfs/${uriRaw.replace('ipfs://', '')}`
    : uriRaw;

  const name = clamp('name', nameArg || 'Token', 32);
  const symbol = clamp('symbol', symArg || 'TKN', 10);
  const paddedUri = padUri(uriHttp);

  const RPC = env('SOLANA_RPC');
  const PAYER_SECRET_B58 = env('PAYER_SECRET_B58');

  const connection = new Connection(RPC, 'confirmed');
  const payer = Keypair.fromSecretKey(bs58.decode(PAYER_SECRET_B58));

  const mint = new PublicKey(mintStr);
  const mintInfo = await connection.getAccountInfo(mint);
  if (!mintInfo) throw new Error(`Mint not found on-chain: ${mint.toBase58()}`);

  // Derive metadata PDA
  const [metadataPda] = PublicKey.findProgramAddressSync(
    [Buffer.from('metadata'), TOKEN_METADATA_PROGRAM_ID.toBuffer(), mint.toBuffer()],
    TOKEN_METADATA_PROGRAM_ID
  );

  // Umi signer
  const umi = createUmi(RPC);
  const umiKeypair = fromWeb3JsKeypair(payer);
  const umiPayer = await createSignerFromKeypair(umi, umiKeypair);
  umi.use(signerIdentity(umiPayer));

  const metadataInfo = await connection.getAccountInfo(metadataPda);

  if (!metadataInfo) {
    console.log('📦 Creating metadata...');
    await createMetadataAccountV3(umi, {
      mint: umiPublicKey(mint.toBase58()),
      mintAuthority: umiPayer,
      payer: umiPayer,
      updateAuthority: umiPayer,
      data: {
        name,
        symbol,
        uri: paddedUri, // 200-byte padded
        sellerFeeBasisPoints: 0,
        creators: null,
        collection: null,
        uses: null,
      },
      isMutable: true,
      collectionDetails: null,
    }).sendAndConfirm(umi);
    console.log('✅ Metadata created.');
  } else {
    console.log('✏️  Updating metadata URI (name/symbol unchanged)…');
    await updateMetadataAccountV2(umi, {
      metadata: umiPublicKey(metadataPda.toBase58()),
      updateAuthority: umiPayer,
      data: {
        name: null,
        symbol: null,
        uri: paddedUri,
        sellerFeeBasisPoints: null,
        creators: null,
        collection: null,
        uses: null,
      },
      primarySaleHappened: null,
      isMutable: true,
    }).sendAndConfirm(umi);
    console.log('✅ Metadata URI updated.');
  }

  console.log('Mint:', mint.toBase58());
  console.log('URI stored (unpadded):', uriHttp);
}

main().catch((e) => { console.error(e); process.exit(1); });
```

**Run**
```bash
SOLANA_RPC=https://... \
PAYER_SECRET_B58=base58secret \
ts-node scripts/setMetadata.ts --mint <MINT> --uri https://your.meta/url.json --name "My Token" --symbol "MTK"
```

---

### 3) 🪙 Mint Initial Supply + Revoke Authorities (SPL Token)

Mints **1,000,000,000** tokens to a receiver, then **revokes Mint & Freeze authorities** (if present).

```ts
// scripts/mintAndLock.ts
import 'dotenv/config';
import bs58 from 'bs58';
import {
  Connection,
  Keypair,
  PublicKey,
  Transaction,
  sendAndConfirmTransaction,
} from '@solana/web3.js';
import {
  getAssociatedTokenAddress,
  createAssociatedTokenAccountInstruction,
  createMintToInstruction,
  createSetAuthorityInstruction,
  AuthorityType,
  getMint,
} from '@solana/spl-token';

function env(name: string, required = true): string {
  const v = process.env[name];
  if (!v && required) throw new Error(`Missing env ${name}`);
  return v || '';
}

function formatUnits(raw: bigint, decimals: number) {
  const s = raw.toString();
  if (decimals === 0) return s;
  const pad = decimals - Math.max(0, s.length - decimals);
  const head = pad > 0 ? '0'.repeat(pad) + s else s;
  const i = head.length - decimals;
  return `${head.slice(0, i)}.${head.slice(i)}`.replace(/^0+(?=\d)/, '');
}

async function main() {
  const RPC = env('SOLANA_RPC');
  const PAYER_SECRET_B58 = env('PAYER_SECRET_B58');
  const MINT_SECRET_B58 = env('MINT_SECRET_B58');
  const RECEIVER_WALLET = new PublicKey(env('RECEIVER_WALLET'));
  const TOKEN_DECIMALS = parseInt(env('TOKEN_DECIMALS'));

  const connection = new Connection(RPC, 'confirmed');
  const payer = Keypair.fromSecretKey(bs58.decode(PAYER_SECRET_B58));
  const mintKp = Keypair.fromSecretKey(bs58.decode(MINT_SECRET_B58));

  console.log('🪙 Mint:', mintKp.publicKey.toBase58());
  console.log('📥 Receiver:', RECEIVER_WALLET.toBase58());

  // Ensure mint exists
  const mintInfoAcc = await connection.getAccountInfo(mintKp.publicKey);
  if (!mintInfoAcc) {
    throw new Error(\`Mint account not found on-chain: \${mintKp.publicKey.toBase58()}. Run mint:create first.\`);
  }

  // On-chain mint data
  const onchainMint = await getMint(connection, mintKp.publicKey);
  const onchainDecimals = onchainMint.decimals;
  if (onchainDecimals !== TOKEN_DECIMALS) {
    console.warn(
      \`⚠️ Decimals mismatch: on-chain=\${onchainDecimals}, .env TOKEN_DECIMALS=\${TOKEN_DECIMALS}. Using on-chain \${onchainDecimals}.\`
    );
  }
  if (onchainMint.mintAuthority === null) {
    throw new Error('Mint authority is already revoked; cannot mint initial supply.');
  }

  // Receiver ATA
  const ata = await getAssociatedTokenAddress(mintKp.publicKey, RECEIVER_WALLET);
  const ataInfo = await connection.getAccountInfo(ata);

  const tx = new Transaction();
  if (!ataInfo) {
    tx.add(
      createAssociatedTokenAccountInstruction(
        payer.publicKey,
        ata,
        RECEIVER_WALLET,
        mintKp.publicKey
      )
    );
    console.log('🧰 Adding instruction: Create ATA');
  }

  // Amount: 1,000,000,000 * 10^decimals
  const ONE_BILLION = BigInt(1_000_000_000);
  const amount = ONE_BILLION * (BigInt(10) ** BigInt(onchainDecimals));

  tx.add(
    createMintToInstruction(
      mintKp.publicKey,
      ata,
      payer.publicKey,
      amount
    )
  );
  console.log(\`💸 Adding instruction: Mint \${formatUnits(amount, onchainDecimals)} tokens to receiver\`);

  // Revoke authorities
  if (onchainMint.mintAuthority !== null) {
    tx.add(
      createSetAuthorityInstruction(
        mintKp.publicKey,
        payer.publicKey,
        AuthorityType.MintTokens,
        null
      )
    );
    console.log('🔒 Adding instruction: Revoke MintAuthority');
  } else {
    console.log('🔒 MintAuthority already null; skipping revoke');
  }

  if (onchainMint.freezeAuthority !== null) {
    tx.add(
      createSetAuthorityInstruction(
        mintKp.publicKey,
        payer.publicKey,
        AuthorityType.FreezeAccount,
        null
      )
    );
    console.log('🧊 Adding instruction: Revoke FreezeAuthority');
  } else {
    console.log('🧊 FreezeAuthority already null; skipping revoke');
  }

  const sig = await sendAndConfirmTransaction(connection, tx, [payer]);
  console.log('✅ Transaction confirmed:', sig);

  const bal = await connection.getTokenAccountBalance(ata).catch(() => null);
  if (bal?.value) {
    console.log(\`📊 Receiver balance: \${bal.value.uiAmountString} (\${bal.value.amount} raw, decimals=\${bal.value.decimals})\`);
  }

  console.log('✅ Done: minted 1B and locked authorities (where applicable).');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
```

**Run**
```bash
SOLANA_RPC=https://... \
PAYER_SECRET_B58=base58_payer \
MINT_SECRET_B58=base58_mint \
RECEIVER_WALLET=YourPubkey \
TOKEN_DECIMALS=9 \
ts-node scripts/mintAndLock.ts
```

> 🧯 **Safety**: Double‑check the receiver and authority revocation steps. Once revoked, you **cannot** mint more without a multisig or a new mint.

---

## 🔒 Operational Notes

- Keep `.env` out of version control. Use `.gitignore` (already included).
- Prefer dedicated fee wallets with **limited balances**.
- For production: rotate keys, restrict RPC access, monitor tx logs, and enable alerting.

---

## 📜 License
MIT © 2025 JUNKNET

<div align="center">
<br/>
Made with 🪐 on <b>Solana</b> • Powered by <b>$JUNK</b>
</div>
