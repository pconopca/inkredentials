# INKredentials

> Your on-chain identity card on the Ink network.

Paste a wallet address → get a shareable visual card with stats, score (0–100), rank tier, and badges. Built as a pure static site (no backend, no build step) using public Ink Blockscout APIs.

**Live demo:** _add your GitHub Pages URL here after deploy_

---

## Features

- **Wallet card** with address, ENS, balance, tx count, gas, tokens, NFTs
- **Ink Score (0–100)** — weighted index across activity dimensions
- **Rank tier** — Mythic / Diamond / Platinum / Gold / Silver / Bronze / Explorer
- **Badges** — Power User, NFT Collector, Gas Burner, DeFi Mover, etc.
- **Download as PNG** — perfect to post on X
- **Share on X** — opens a tweet pre-filled with your score
- **Shareable per-wallet URL** — `?addr=0x…` auto-loads the card

## Stack

- HTML + CSS + vanilla JavaScript (no framework, no Node.js)
- [html2canvas](https://html2canvas.hertzen.com/) via CDN for PNG export
- [Ink Blockscout API](https://explorer.inkonchain.com) (public, no API key)

## How the score works

The Ink Score is a weighted sum of normalized, log-scaled dimensions. Two key NFTs (Templars of the Storm and Eye of the Seeker) get dedicated weight as airdrop-eligibility signals. Caps for points are calibrated against real emission data.

| Dimension                       | Weight | Cap / Threshold                              |
|---------------------------------|--------|----------------------------------------------|
| 🌪️ **Nado points**              | **20** | 10,000 points (log scale) OR 50 tx           |
| 💧 **Tydro points**             | **10** | 500 points (log) OR 5 positions OR 20 tx     |
| Transactions                    | 12     | 1,000 tx (log)                               |
| 🛠️ Contracts deployed           | 4      | 1=50%, 2=75%, 3+=100%                        |
| 👋 GM Ink                       | 6      | 30+ daily check-ins (log)                    |
| 🛡️ **Templars of the Storm**    | **6**  | 1 NFT = 70%, 2 NFT = 85%, 3+ NFT = 100%     |
| ⏳ Wallet age                   | 5      | Linear, maxes at 365 days on Ink             |
| 💰 Portfolio value               | 5      | Log scale, ~$1,000 USD = max                 |
| 👁️ **Eye of the Seeker**        | **4**  | 1+ NFT held                                  |
| ERC-20 tokens                   | 4      | 20 tokens                                    |
| NFTs held (generic)             | 4      | 50 NFTs (log)                                |
| 🔄 InkSwap                      | 3      | 10+ swaps (log)                              |
| Token transfers                 | 3      | 500 transfers (log)                          |
| Gas used                        | 3      | 50M gas units (log)                          |
| 🔤 .ink domain (ZNS Connect)    | 3      | ERC-721 from `0xFb2Cd41a8aeC89EFBb19575C6c48d872cE97A0A5` |

Nado active-protocol weight is **exactly 2× Tydro** (20 vs 10). NFT holding totals 14 pts (14% of max). Activity + eligibility signals dominate. Weights sum to **~100** for a wallet that maxes every dimension.

### Calibration sources

- **Nado emission**: pulled live from Nado's archive indexer. Weekly emission is **~950K–1.1M points/week** (`Week 1`–`Week 16` recorded), with **~15M cumulative** across `Private Alpha` + `Break it Program` + `Off Season` + numbered weeks. Top wallets hold 10K+ → that's our max signal.
- **Tydro distribution**: TydroInkPoints via Merkl. Active users hold 1–10, heavy users 100–500. Cap at 500.
- **Methodology cross-referenced** with [inkscore.xyz/how-it-works](https://www.inkscore.xyz/how-it-works) — they weight Templars NFT as their #1 single item (2,700 / 20,000 = 13.5%) and Nado / Tydro / OpenSea tied for second (~12.5% each). We mirror that ranking inside our 0–100 scale and add the on-chain `ink_airdrop` allocation signal that they don't track.

### Detection sources (100% real data)

| Signal | Source | Method |
|---|---|---|
| Nado points | `archive.prod.nado.xyz/v1` | `POST {"nado_points":{"address":"0x…"}}` (Vertex-style indexer) |
| Ink airdrop allocation | `archive.prod.nado.xyz/v1` | `POST {"ink_airdrop":{"address":"0x…"}}` |
| Tydro points | `api.merkl.xyz/v4/users/{addr}/rewards?chainId=57073` | Filter rewards by symbol `TydroInkPoints` |
| Templars of the Storm | Ink Blockscout | ERC-721 holdings at `0x46625E7d…4E99` (Nado-deployed real collection) |
| Eye of the Seeker | Ink Blockscout | ERC-721 holdings at `0x9234d821…1006` (~28K holders on Ink) |
| Tydro on-chain (fallback) | Ink Blockscout | aToken holdings (`aInkWl*`) + Tydro Pool tx scan |
| Nado on-chain (fallback) | Ink Blockscout | Tx scan against 46 verified Nado contracts |
| GM Ink | Ink Blockscout | Tx scan: `DailyGM` + `DailyGMPlus` + `OnChainGMV2` |
| InkSwap | Ink Blockscout | Tx scan against InkSwap router |

### Not currently detectable (and why)

- **Kraken Pro × Ink wallet linkage**: Kraken Pro tracks "user X has linked wallet Y" entirely off-chain in their backend. There is no public on-chain marker and no public API exposing this link, so no client-side script can verify it. The `🟣 Kraken Pro` badge is wired but inactive — it'll light up automatically if/when Kraken publishes a verifier contract or public endpoint.

**Tiers** (threshold-based, no live leaderboard):

| Score   | Tier         | Estimated rank      |
|---------|--------------|---------------------|
| 85–100  | INK_LEGEND   | Top 1%              |
| 70–84   | OG_MEMBER    | Top 5%              |
| 55–69   | POWER_USER   | Top 15%             |
| 40–54   | ACTIVE_USER  | Top 30%             |
| 25–39   | REGULAR      | Top 50%             |
| 10–24   | NEWBIE       | Top 80%             |
| 0–9     | LURKER       | Just getting started |

## Local preview

Just open `index.html` in your browser. That's it.

## Disclaimer

Not affiliated with Ink, Kraken, or Blockscout. Data fetched live from the public Ink explorer.

---

# Como publicar no GitHub Pages (passo a passo em PT-BR)

Não precisa instalar nada além do GitHub. Tudo pelo navegador.

### 1. Criar o repositório no GitHub
1. Acesse https://github.com/new
2. **Repository name**: `inkredentials` (ou outro nome)
3. **Public** (precisa ser público pra usar GitHub Pages grátis)
4. Não marque nada de README/gitignore
5. Clique **Create repository**

### 2. Subir os arquivos
Na tela do repositório vazio, clique em **"uploading an existing file"**.

Arraste estes 4 arquivos da pasta `Projeto Ink`:
- `index.html`
- `style.css`
- `app.js`
- `README.md`

Clique em **Commit changes**.

### 3. Ativar o GitHub Pages
1. No repositório, vá em **Settings** (engrenagem no topo)
2. Menu lateral esquerdo → **Pages**
3. Em **Source**, selecione **Deploy from a branch**
4. **Branch**: `main` · **Folder**: `/ (root)` → **Save**
5. Espere ~1 minuto. Aparecerá um link tipo:
   `https://seuusuario.github.io/inkredentials/`

Pronto. Compartilhe esse link no X.

### 4. Atualizando depois
Pra mudar algo: edite o arquivo direto no GitHub (clique no arquivo → ícone de lápis) ou faça novo upload. O site atualiza em ~30 segundos.

---

## Roadmap (next ideas)

- ENS resolution
- "First seen on Ink" date (oldest tx lookup)
- More badges (early adopter cutoff dates, protocol-specific tags)
- OG image generation for richer Twitter cards
- Leaderboard page (requires a tiny serverless backend)
