import 'dotenv/config';
import bs58 from 'bs58';
import { Connection, Keypair, PublicKey, SystemProgram, Transaction, sendAndConfirmTransaction } from '@solana/web3.js';
import {
  MINT_SIZE, TOKEN_PROGRAM_ID,
  createInitializeMintInstruction,
  getMinimumBalanceForRentExemptMint,
} from '@solana/spl-token';

function env(name: string, required = true): string {
  const v = process.env[name];
  if (!v && required) throw new Error(`Missing env ${name}`);
  return v || '';
}

async function main() {
  const RPC = env('SOLANA_RPC');
  const PAYER_SECRET_B58 = env('PAYER_SECRET_B58');
  const MINT_SECRET_B58 = env('MINT_SECRET_B58');
  const TOKEN_DECIMALS = parseInt(env('TOKEN_DECIMALS'));

  const connection = new Connection(RPC, 'confirmed');
  const payer = Keypair.fromSecretKey(bs58.decode(PAYER_SECRET_B58));
  const mintKp = Keypair.fromSecretKey(bs58.decode(MINT_SECRET_B58));

  // If mint already exists, skip creation
  const existing = await connection.getAccountInfo(mintKp.publicKey);
  if (existing) {
    console.log('⚠️ Mint already exists, skipping creation:', mintKp.publicKey.toBase58());
    return;
  }

  const lamports = await getMinimumBalanceForRentExemptMint(connection);
  const tx = new Transaction().add(
    SystemProgram.createAccount({
      fromPubkey: payer.publicKey,
      newAccountPubkey: mintKp.publicKey,
      space: MINT_SIZE,
      lamports,
      programId: TOKEN_PROGRAM_ID,
    }),
    createInitializeMintInstruction(
      mintKp.publicKey,
      TOKEN_DECIMALS,
      payer.publicKey, // temp mint authority
      payer.publicKey  // temp freeze authority
    )
  );

  await sendAndConfirmTransaction(connection, tx, [payer, mintKp]);
  console.log('✅ Mint created:', mintKp.publicKey.toBase58());
}

main().catch((e) => { console.error(e); process.exit(1); });
