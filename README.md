# 🌌 JUNKNET · Virtual Oracle Explorer & Launchpad

**JUNKNET** is a playful yet powerful **Solana explorer** and **virtual token launchpad**.  
It provides a high-fidelity sandbox for developers, traders, and crypto-enthusiasts to experiment with tokenomics, trading strategies, and on-chain mechanics — all in a **simulated environment without financial risk**.  

All actions — from token creation to trading — are verified on the Solana blockchain for **ultimate transparency**, linking off-chain metadata to an immutable on-chain proof.

---

## ✨ Core Features

- 🚀 **Virtual Token Launchpad**  
  Deploy custom virtual tokens in under a minute with a small SOL fee. No coding required.

- 📈 **Live Trading Environment**  
  Buy and sell any token launched on the platform in a simulated market.

- 🔻 **Dynamic Sell Tax**  
  Starts at **15%**, decreases to a **5% floor** as more SOL is raised — rewarding early participants.

- 🔗 **On-Chain Verification**  
  Every token launch and major action is tied to a real Solana transaction for verifiability.

- 🔥 **$JUNK Deflationary Tokenomics**  
  All platform fees are used to buy back and burn $JUNK, creating deflationary pressure.

- 🏆 **Gamification & Bounties**  
  Earn **JunkPoints ($JP)** for trading and launching tokens, unlock achievements, and climb leaderboards.

---

## ⚙️ How It Works

### 🧪 Token Launchpad
1. **Connect Wallet** – Any Solana-compatible wallet.  
2. **Fill Details** – Name, symbol, description, and socials.  
3. **Pay Fee** – 0.005 SOL (includes on-chain memo with your token details).  
4. **Verify & Create** – The oracle validates your tx, and your token is instantly live on JUNKNET.

### 💹 Trading & Tokenomics
- **Dynamic Sell Tax** – Starts at 15%, reduces by 25% of the reducible amount per 1 SOL raised, until fixed at 5%.  
- **Fee Distribution on Graduation**  
  - 50% → Token Deployer  
  - 50% → JUNKNET Treasury (for $JUNK buybacks & burns)

This creates aligned incentives for **token creators** and **ecosystem health**.

---

## 🛠 Local Setup & Installation

### 1️⃣ Clone the repository
```bash
git clone https://github.com/your-username/junknet.git
cd junknet
```

### 2️⃣ Install dependencies
```bash
yarn install
```

### 3️⃣ Configure environment variables
Create a `.env` file:
```bash
cp .env.example .env
```
Fill in the required values:
- `RPC_URL` → Solana RPC endpoint  
- `LP_WALLET` → Wallet public key (receives platform fees)  
- `LP_SECRET_KEY` → Wallet secret key (**keep private!**)  
- `JUNK_MINT` → Mint address of $JUNK  
- `XAI_API_KEY` (optional) → Grok AI features  
- `SMTP_*` (optional) → Email notifications

### 4️⃣ Initialize the database
```bash
node server.js --init-db
```

### 5️⃣ Start the server
```bash
node server.js
```

App will run at 👉 [http://localhost:3000](http://localhost:3000)

---

## 🧱 Tech Stack

- ⚡ **Backend:** Node.js, Express.js  
- 🗄 **Database:** better-sqlite3 (lightweight, file-based)  
- 🎨 **Frontend:** Vanilla HTML, CSS, JS (no frameworks)  
- ⛓ **Blockchain:** [@solana/web3.js](https://github.com/solana-labs/solana-web3.js)  
- 📊 **Charts:** [Lightweight Charts™ by TradingView](https://www.tradingview.com/lightweight-charts/)

---

## 🔥 Tokenomics

- **Platform Fee:** 0.005 SOL  
- **Dynamic Sell Tax:** 15% → 5% floor  
- **Fee Split (on AMM migration):**  
  - 50% → Token Deployer  
  - 50% → $JUNK Treasury (buybacks & burns)  

---

## 🎮 Gamification

- 💰 Earn **JunkPoints ($JP)** for trading and launching tokens.  
- 🏅 Unlock **achievements** and climb the **leaderboards**.  
- 🔮 Compete in **bounties** for rewards.  

---

## 📜 License
[MIT](./LICENSE) © 2025 JUNKNET

---

<p align="center">  
  Made with 🪐 on <b>Solana</b> • Powered by $JUNK  
</p>
