/* ============================================================
 * INKredentials — On-chain identity card for the Ink network
 * Pure client-side. No build step. No backend.
 * ============================================================ */

const INK_API  = "https://explorer.inkonchain.com/api/v2";
const INK_RPC  = "https://rpc-gel.inkonchain.com";
const NADO_API = "https://archive.prod.nado.xyz/v1";
const MERKL_API = "https://api.merkl.xyz/v4";
const INK_CHAIN_ID = 57073;

/* Key NFTs — weighted separately from the generic ERC-721 count because they
 * mark specific early-phase eligibility (high airdrop priority signal).
 *  - Templars of the Storm : Nado early-phase NFT (~950 holders)
 *  - Eye of the Seeker     : Ink early-phase NFT (~28K holders) */
const KEY_NFTS = {
  templars: {
    label: "Templars of the Storm",
    icon: "🛡️",
    address: "0x46625E7de9894D83fca49E79cB53B5C25550cE99", // TONADO (real, by Nado deployer)
  },
  eyeOfSeeker: {
    label: "Eye of the Seeker",
    icon: "👁️",
    address: "0x9234d821C10B72E09C594f882f1d5dACF2621006",
  },
};

/* Protocols tracked. All contract addresses verified via the Ink Blockscout
 * explorer. Nado contracts derived from the team's deployer wallet
 * (0x79D17E2e9eeAe59B3fd2aC401D62162675722b38).
 *
 * Detection:
 *  - Nado / Tydro / InkSwap / GM : scan recent tx and match `to`.
 *  - Tydro positions also detected via aToken holdings (aInkWl* / TydroInk*). */
const PROTOCOLS = {
  nado: {
    label: "Nado",
    // Nado is a Vertex Protocol fork (Endpoint + Clearinghouse + SpotEngine +
    // PerpEngine + OffchainExchange). All addresses below are deployed by one
    // of Nado's two known team deployers:
    //  - 0x79D17E2e9eeAe59B3fd2aC401D62162675722b38 (vault / v1)
    //  - 0xC1cC56caB60e832665E6c3780BfEBe3C1C971603 (Vertex-fork core)
    // User-facing entry: Endpoint proxy 0x05ec92D78ED421f3D3Ada77FFdE167106565974E
    addresses: [
      // Vault deployer
      "0x6dFE8B26F8d75BBfd1d6585adB32075d9a986b32", // NadoVaultProxy
      "0xFa264E9faD1e08f6A0DC5dE6a5D0af4e40798CE1",
      "0x40Ea7c9102D16D4CB209A9b4f5b17e3a524B54bf",
      "0xBA6F12eD66F8108877673162791d3b8d4b2e015b",
      "0xcAfe68E87F1e753C2b6f71e19E160bEd545ce36F",
      "0x6ceC7423910071d73FF7fc506c3AA959Fd53E9c0",
      "0x554ff10A03110876dcf3bA4f20EcCeeB2e74e8F1",
      "0x0C71148dd2baBa6dD194b9ECA7eB098A3cA66016",
      // Vertex-fork core deployer — user-facing entry points first
      "0x05ec92D78ED421f3D3Ada77FFdE167106565974E", // Endpoint (PROXY — main user entry)
      "0xD218103918C19D0A10cf35300E4CfAfbD444c5fE", // Clearinghouse (PROXY)
      "0x98D5C1d39d7C6BA3f49364AB0545dF7D1a2A521A", // WithdrawPool
      "0x9854Caad81B5979837041289342Fa60D87Cf84Da", // Nado LP
      "0x46625E7de9894D83fca49E79cB53B5C25550cE99", // TransparentUpgradeableProxy
      "0xFeb7D8b6D8294Ee57F62709AEb1c46DC72db6c9D", // TransparentUpgradeableProxy
      // Implementation + admin contracts (users may interact via proxies above)
      "0x02745A27a53c84E552C8f2EfD8Be8b7FC29F4152",
      "0x085ebd8e410Fc304a9E6FB2284e17f88D9E10C53", // PerpEngine
      "0x09C28b318b2679533EeA9fE7fA9A9d2D2673aBED",
      "0x0E8Eb051C42BA4F32E90E5642D698C3375b23EAf",
      "0x1455CcE930F38B8B6997B581707F91AB0B2E3c1D", // Clearinghouse
      "0x187756D59d5208Cb069a69e69501834a4c1E0E45", // SpotEngine
      "0x253cEe58633AF8AAB5e64669Ef197fB7742F9ba7", // Clearinghouse
      "0x29735d5141820D56f27a54FA0ABadF12809cDF56",
      "0x2F91BcF4eeDD0427044eca235F4E675097b51Ec8", // Endpoint impl
      "0x34338F6eb29db9E9Ab6b798E3F9287e6a1A061E7", // Verifier
      "0x34D3369421070e52EB881527eD23A934486427Dc", // Endpoint impl
      "0x44c7D2559EB0e9727acaA7D2a4df0C26900d5d79", // Clearinghouse impl
      "0x4f580D97c903d367Fd96C80Ba6f70a842f2269aE",
      "0x79Efbd6CfD3aE4Fc629AD575A1d2532c4138643b",
      "0x89b00a5Fa6CE35F43BfC17c4d5d4371a3584D165",
      "0x9393942Ab026E452b9346017993a08b3889824c8", // Endpoint impl
      "0x976e71cA36dF4b9D71631BA6856090829499BAEe",
      "0xA953ca6F59c23966EaA0d7919F5303677614aBB5", // OffchainExchange
      "0xB11dd5DDaB66755217c13D04d134C2B4De1A869a", // Endpoint impl
      "0xC2efF9D7153E9AfEF5E23c7DdFCed1714d9b8aE3", // OffchainExchange
      "0xF93F24F4a3E31a029c6d0DEEa499b8801E5D747c", // Endpoint impl
      "0xb4b68EF490eDd05E48C6AAA2AA5Fb3e67E8cDC19",
      "0xbA5299c33F240e6D534Dc99c9E4c845200EF9310",
      "0xd0d380c33330a5463EAB9Af1edabBfc0e7f7d386", // FQuerier
      "0xeC71846f6806b713AA33C12A03ec53CB6b82CFD9", // OffchainExchange
      "0xf43340D51D8b9AA0fFd655499970C7E060C17D7C",
      "0xf865B6E4BFd02c6040fA69E5772DF17c9D5bAA02", // PerpEngine
    ],
  },
  tydro: {
    label: "Tydro",
    addresses: [
      "0x2816cf15F6d2A220E789aA011D5EE4eB6c47FEbA", // Pool (supply/borrow/withdraw/repay)
      "0x2aB3580a805fB10CbAd567212C70e26C1B6769eC", // L2PoolInstance
      "0xDe090EfCD6ef4b86792e2D84E55a5fa8d49D25D2", // WETHGateway
      "0x988B5d3863bdEE83339Be41cD31344Dfd9FD197c", // L2Encoder
    ],
  },
  gm: {
    label: "GM Ink",
    addresses: [
      "0x9F500d075118272B3564ac6Ef2c70a9067Fd2d3F", // DailyGM (basic)
      "0x3fb6088d7bda27211dd9403dcc280b22249b73b3", // DailyGMPlus (premium)
      "0xa052a8fb70cf657a4712f8ff1d2f32d2c9b36a9a", // OnChainGMV2 / GMCards
    ],
  },
};

// DailyGMPlus address used to split premium GMs from basic within the gm count.
const GM_PLUS_ADDR  = "0x3fb6088d7bda27211dd9403dcc280b22249b73b3";
// OnChainGMV2 mints a GMCard NFT to whoever receives a premium GM.
const GM_CARD_ADDR  = "0xa052a8fb70cf657a4712f8ff1d2f32d2c9b36a9a";

// Flat set of all known contracts (lowercase) → protocol key.
const CONTRACT_TO_PROTOCOL = (() => {
  const m = new Map();
  for (const [key, p] of Object.entries(PROTOCOLS)) {
    for (const a of p.addresses) m.set(a.toLowerCase(), key);
  }
  return m;
})();

const TX_SCAN_PAGES = 5; // 5 pages × 50 tx = 250 outgoing txs (filter=from keeps all slots relevant)

// ZNS Connect — the .ink domain registry on Ink chain.
// Confirmed on Ink Blockscout: ERC-721, symbol ".ink", verified contract.
// ZNS Pass is a companion product (premium pass holders also count).
const INK_DOMAIN_REGISTRY = "0xFb2Cd41a8aeC89EFBb19575C6c48d872cE97A0A5"; // ZNS Connect (.ink)
const ZNS_PASS            = "0xFdd4FAB233d9aaA78Be2f799DED2DE449d3e7333"; // ZNS Pass (ZNSP)

// Factory contracts whose "deploy" calls create a contract on behalf of the caller.
// We detect these in the tx list and resolve created contracts via per-tx internal-txs
// (fast, ~100ms) rather than the address-level internal-txs endpoint (slow/timeout).
const KNOWN_DEPLOY_FACTORIES = new Set([
  "0x63c489d31a2c3de0638360931f47ff066282473f", // ZNS DeployFactory (verified on Ink Explorer)
]);

// ---------- DOM ----------
const form        = document.getElementById("addr-form");
const input       = document.getElementById("addr-input");
const submitBtn   = document.getElementById("submit-btn");
const errorMsg    = document.getElementById("error-msg");
const cardSection = document.getElementById("card-section");
const loading     = document.getElementById("loading");
const card        = document.getElementById("card");
const actions     = document.getElementById("actions");

// ---------- Helpers ----------
const isAddress = (s) => /^0x[a-fA-F0-9]{40}$/.test(s);

function shortAddr(a) {
  return a.slice(0, 6) + "…" + a.slice(-4);
}

function formatNum(n) {
  n = Number(n) || 0;
  if (n >= 1e9) return (n / 1e9).toFixed(2) + "B";
  if (n >= 1e6) return (n / 1e6).toFixed(2) + "M";
  if (n >= 1e3) return (n / 1e3).toFixed(2) + "K";
  return n.toLocaleString("en-US");
}

function weiToEth(wei) {
  if (!wei) return "0";
  const s = String(wei).padStart(19, "0");
  const intPart = s.slice(0, -18) || "0";
  const decPart = s.slice(-18, -14);
  return `${intPart}.${decPart}`;
}

// Generate a deterministic gradient avatar from the address
function setAvatar(addr) {
  const avatar = document.getElementById("avatar");
  const h1 = parseInt(addr.slice(2, 8), 16) % 360;
  const h2 = parseInt(addr.slice(8, 14), 16) % 360;
  avatar.style.background =
    `linear-gradient(135deg, hsl(${h1}, 70%, 55%) 0%, hsl(${h2}, 80%, 50%) 100%)`;
}

function showError(msg) {
  errorMsg.textContent = msg;
  errorMsg.hidden = false;
}

function hideError() {
  errorMsg.hidden = true;
}

// Reset all loading steps back to pending (called before each new fetch)
function resetSteps() {
  document.querySelectorAll(".loading-step").forEach((el) => {
    el.classList.remove("loading-step--done");
    el.classList.add("loading-step--pending");
  });
}

// Mark one loading step as complete (green dot + bright text)
function markStep(id) {
  const el = document.getElementById(id);
  if (!el) return;
  el.classList.remove("loading-step--pending");
  el.classList.add("loading-step--done");
}

function setLoading(state) {
  submitBtn.disabled = state;
  submitBtn.textContent = state ? "Reading…" : "Generate";
  cardSection.hidden = false;
  loading.hidden = !state;
  if (state) {
    card.hidden = true;
    actions.hidden = true;
    document.getElementById("new-search-bar").hidden = true;
    resetSteps();
  }
}

// Race a promise against a timeout; returns null if the timeout wins (never rejects).
async function withTimeout(promise, ms) {
  let timer;
  const timeout = new Promise((resolve) => { timer = setTimeout(() => resolve(null), ms); });
  try {
    const result = await Promise.race([promise, timeout]);
    clearTimeout(timer);
    return result;
  } catch {
    clearTimeout(timer);
    return null;
  }
}

// ---------- Domain resolution ----------
// Resolves .eth (ENS on Ethereum mainnet) and .ink (ZNS on Ink) names to 0x addresses.
// Returns a checksummed 0x address, or throws a user-friendly Error.
async function resolveInput(raw) {
  const v = raw.trim();
  if (isAddress(v)) return v;

  const name = v.toLowerCase();

  // ── .eth  ──────────────────────────────────────────────────────────────────
  if (name.endsWith(".eth")) {
    const res = await withTimeout(
      fetch(`https://api.ensideas.com/ens/resolve/${encodeURIComponent(name)}`),
      8000
    );
    if (res?.ok) {
      try {
        const d = await res.json();
        if (d?.address && isAddress(d.address)) return d.address;
      } catch {}
    }
    throw new Error(`"${v}" not found on ENS — check the name and try again.`);
  }

  // ── .ink  ──────────────────────────────────────────────────────────────────
  if (name.endsWith(".ink")) {
    // 1. Blockscout may natively resolve ZNS names via the address endpoint
    const direct = await withTimeout(
      fetch(`${INK_API}/addresses/${encodeURIComponent(name)}`).then((r) =>
        r.ok ? r.json() : null
      ),
      6000
    );
    if (direct?.hash && isAddress(direct.hash)) return direct.hash;

    // 2. Fallback: Blockscout full-text search
    const search = await withTimeout(
      fetch(`${INK_API}/search?q=${encodeURIComponent(name)}`).then((r) =>
        r.ok ? r.json() : null
      ),
      6000
    );
    for (const item of search?.items || []) {
      const addr = item?.address_hash || item?.address?.hash;
      if (addr && isAddress(addr)) return addr;
    }

    throw new Error(`"${v}" not found — make sure the .ink domain is registered.`);
  }

  throw new Error("Enter a 0x address, a .eth name, or a .ink domain.");
}

// ---------- API calls ----------
// safeFetch with a default 8 s timeout so no single endpoint ever stalls the UI.
async function safeFetch(url, timeoutMs = 8000) {
  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs);
    const r = await fetch(url, { signal: controller.signal });
    clearTimeout(timer);
    if (!r.ok) return null;
    return await r.json();
  } catch {
    return null;
  }
}

// Scan outgoing txs (filter=from): count protocol interactions, direct contract deployments,
// and oldest tx seen. Using filter=from is critical — without it the endpoint returns ALL
// transactions (sent + received), so incoming airdrops/transfers fill the pages and push
// the user's actual GMs and contract deploys beyond the scan window.
// Returns { nado, tydro, gm, gmPlus, directContracts (Set), oldestTxTimestamp }.
async function countProtocolInteractions(addr) {
  const counts = Object.fromEntries(Object.keys(PROTOCOLS).map((k) => [k, 0]));
  counts.gmPlus = 0;
  const directContracts = new Set();
  const factoryDeployTxHashes = []; // txs to known factories — resolved via per-tx internal-txs
  let oldestTxTimestamp = null;

  // filter=from → only transactions sent BY this address
  let url = `${INK_API}/addresses/${addr}/transactions?filter=from`;
  for (let page = 0; page < TX_SCAN_PAGES; page++) {
    const r = await safeFetch(url);
    if (!r || !Array.isArray(r.items)) break;
    for (const tx of r.items) {
      const to = tx?.to?.hash?.toLowerCase();
      if (to) {
        const proto = CONTRACT_TO_PROTOCOL.get(to);
        if (proto) counts[proto]++;
        if (to === GM_PLUS_ADDR) counts.gmPlus++;
        // Factory deploy: calling a known factory's deploy/create function
        if (KNOWN_DEPLOY_FACTORIES.has(to) && tx.hash) {
          factoryDeployTxHashes.push(tx.hash);
        }
      }
      // Direct deploy: `to` is null, `created_contract` is set
      if (tx?.created_contract?.hash) {
        directContracts.add(tx.created_contract.hash.toLowerCase());
      }
      if (tx?.timestamp) {
        const ts = Math.floor(new Date(tx.timestamp).getTime() / 1000);
        if (!oldestTxTimestamp || ts < oldestTxTimestamp) oldestTxTimestamp = ts;
      }
    }
    const np = r.next_page_params;
    if (!np) break;
    // Preserve filter=from across cursor pages
    const qs = new URLSearchParams({ ...np, filter: "from" }).toString();
    url = `${INK_API}/addresses/${addr}/transactions?${qs}`;
  }

  // Resolve factory deploys: fetch per-tx internal-txs (fast, ~100ms each)
  // rather than the address-level endpoint which consistently times out.
  const factoryContracts = new Set();
  await Promise.all(factoryDeployTxHashes.map(async (hash) => {
    const r = await safeFetch(`${INK_API}/transactions/${hash}/internal-transactions`, 6000);
    for (const itx of r?.items || []) {
      if (itx.type === "create" && itx.created_contract?.hash) {
        factoryContracts.add(itx.created_contract.hash.toLowerCase());
      }
    }
  }));

  return { ...counts, directContracts, factoryContracts, oldestTxTimestamp };
}


// Count GMCard NFTs received (minted by OnChainGMV2 when someone sends a premium GM to you).
function countGmReceived(erc721Items) {
  if (!Array.isArray(erc721Items)) return 0;
  const card = GM_CARD_ADDR.toLowerCase();
  return erc721Items
    .filter(it => (it?.token?.address_hash || "").toLowerCase() === card)
    .reduce((sum, it) => sum + (Number(it.value) || 1), 0);
}

// Fetch real Nado points from their public indexer.
// Returns { points, rank, tier, activeEpochs, bestEpoch } or null on failure.
// Points are 18-decimal precision in the API; we normalize to a plain number.
async function fetchNadoPoints(addr) {
  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 7000); // 7 s cap
    const r = await fetch(NADO_API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nado_points: { address: addr } }),
      signal: controller.signal,
    });
    clearTimeout(timer);
    if (!r.ok) return null;
    const d = await r.json();
    const all = d.all_time_points || {};
    const points = Number(BigInt(all.points || "0")) / 1e18;
    const rank   = Number(all.rank || 0);
    const tier   = Number(all.tier || 1);
    const epochs = (d.points_per_epoch || []).filter(
      (e) => Number(e.points) > 0 && Number(e.rank) > 0
    );
    const bestEpoch = epochs.reduce((best, e) => {
      const eRank = Number(e.rank);
      return !best || eRank < Number(best.rank) ? e : best;
    }, null);
    return {
      points,
      rank,
      tier,
      activeEpochs: epochs.length,
      bestEpoch: bestEpoch
        ? { description: bestEpoch.description, rank: Number(bestEpoch.rank), tier: Number(bestEpoch.tier) }
        : null,
    };
  } catch {
    return null;
  }
}

// Count holdings of each key NFT in the wallet's ERC-721 list.
function countKeyNfts(erc721Items) {
  const out = { templars: 0, eyeOfSeeker: 0 };
  if (!Array.isArray(erc721Items)) return out;
  const targets = Object.fromEntries(
    Object.entries(KEY_NFTS).map(([k, v]) => [v.address.toLowerCase(), k])
  );
  for (const it of erc721Items) {
    const addr = (it?.token?.address_hash || "").toLowerCase();
    const key = targets[addr];
    if (key) out[key] += Number(it.value || 1);
  }
  return out;
}

// (Phase 1 removed — it was an inkscore.xyz internal program, not detectable on-chain.)

// Sum total portfolio value in USD: ETH balance + ERC-20 tokens + ERC-721 NFTs with known prices.
function computeTokenValueUSD(erc20Items, erc721Items, balanceWei, ethPrice) {
  if (!ethPrice || ethPrice <= 0) return 0;
  let total = parseFloat(weiToEth(balanceWei) || "0") * ethPrice;
  if (Array.isArray(erc20Items)) {
    for (const it of erc20Items) {
      const rate = parseFloat(it?.token?.exchange_rate || 0);
      const decimals = parseInt(it?.token?.decimals ?? 18);
      const rawVal = it?.value;
      if (rate > 0 && rawVal) {
        try {
          total += (Number(BigInt(rawVal)) / Math.pow(10, decimals)) * rate;
        } catch {}
      }
    }
  }
  // ERC-721: value = quantity held, exchange_rate = floor price in USD
  if (Array.isArray(erc721Items)) {
    for (const it of erc721Items) {
      const rate = parseFloat(it?.token?.exchange_rate || 0);
      const qty  = Number(it?.value || 1);
      if (rate > 0) total += qty * rate;
    }
  }
  return total;
}

// Detect .ink domain ownership via ZNS Connect (confirmed contract on Ink Blockscout).
// ZNS Connect ERC-721: 0xFb2Cd41a8aeC89EFBb19575C6c48d872cE97A0A5 (symbol: ".ink")
// ZNS Pass ERC-721:    0xFdd4FAB233d9aaA78Be2f799DED2DE449d3e7333 (symbol: "ZNSP")
function detectInkDomain(erc721Items, ensName) {
  if (ensName && ensName.toLowerCase().endsWith(".ink")) return true;
  if (!Array.isArray(erc721Items)) return false;
  const targets = new Set([
    INK_DOMAIN_REGISTRY.toLowerCase(),
    ZNS_PASS.toLowerCase(),
  ]);
  for (const it of erc721Items) {
    const addr = (it?.token?.address_hash || "").toLowerCase();
    if (targets.has(addr) && Number(it.value || 0) > 0) return true;
  }
  return false;
}

// Fetch Tydro points (the "TydroInkPoints" ERC-20 reward, distributed by Merkl).
// Returns { points, pending, claimed, campaigns } or null on failure.
// All numeric fields are normalized from 18-decimal precision to plain numbers.
async function fetchTydroPoints(addr) {
  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 7000); // 7 s cap
    const r = await fetch(`${MERKL_API}/users/${addr}/rewards?chainId=${INK_CHAIN_ID}`, {
      signal: controller.signal,
    });
    clearTimeout(timer);
    if (!r.ok) return null;
    const data = await r.json();
    if (!Array.isArray(data) || data.length === 0) return null;

    let totalAmount = 0n, totalPending = 0n, totalClaimed = 0n;
    let campaigns = 0;

    for (const chainBlock of data) {
      for (const rew of (chainBlock.rewards || [])) {
        const symbol = (rew.token?.symbol || "").toLowerCase();
        if (!symbol.includes("tydro")) continue;
        totalAmount  += BigInt(rew.amount  || "0");
        totalPending += BigInt(rew.pending || "0");
        totalClaimed += BigInt(rew.claimed || "0");
        campaigns += (rew.breakdowns || []).length;
      }
    }

    if (totalAmount === 0n) return null;
    const norm = (x) => Number(x) / 1e18;
    return {
      points:   norm(totalAmount),
      pending:  norm(totalPending),
      claimed:  norm(totalClaimed),
      campaigns,
    };
  } catch {
    return null;
  }
}

// Count Tydro positions: any aToken / debt-token held against the Tydro
// (Aave InkWhitelabel) market. Each one = one supplied or borrowed asset.
function countTydroPositions(erc20Items) {
  if (!Array.isArray(erc20Items)) return 0;
  return erc20Items.filter((it) => {
    const name   = (it?.token?.name   || "").toLowerCase();
    const symbol = (it?.token?.symbol || "").toLowerCase();
    return (
      symbol.startsWith("ainkwl")            // aInkWlUSDT, aInkWlKBTC…
      || symbol.startsWith("variabledebtinkwl")
      || symbol.startsWith("stableinkwl")
      || name.startsWith("tydro")            // older Tydro v1 naming
      || name.includes("ink whitelabel")
      || name.includes("inkwhitelabel")
    );
  }).length;
}

// Fetch Kraken verified status and GM counts from gm.ink.
// Returns { verified, rank, score, sent, premiumSent, received } or null on failure.
// Endpoint confirmed via network capture: GET /api/user-leaderboard?address={addr}
async function fetchGmInkStatus(addr) {
  const d = await safeFetch(
    `https://www.gm.ink/api/user-leaderboard?address=${addr.toLowerCase()}`,
    6000
  );
  if (!d?.user) return null;
  return {
    verified:     !!d.user.verified,
    rank:         d.user.rank  || null,
    score:        d.user.score || null,
    sent:         Number(d.user.sent         || 0),
    premiumSent:  Number(d.user.premiumSent  || 0),
    received:     Number(d.user.received     || 0),
  };
}

// Known bridge relay/receiver contracts on Ink.
// Only contracts confirmed to send tokens TO users as part of bridging.
const BRIDGE_RELAY_CONTRACTS = new Set([
  // OP Stack L2StandardBridge — Superbridge & native ETH bridge
  "0x4200000000000000000000000000000000000010",

  // Across Protocol — MulticallHandler (confirmed: sends USDC, WETH to users)
  "0x0f7ae28de1c8532170ad4ee566b5801485c13a0e",
  "0x924a9f036260ddd5808007e1aa95f08ed08aa569",

  // Bungee (Socket) — BungeeGateway
  "0x6379442fb03f78060e8746aea425ef6420e19f41",
  "0xd26410401cc61a24205a01cc620a73c010fba290",

  // Superbridge — SuperbridgeProxy (one per token bridge)
  "0x6a175be445b2b28af4087d6bf557f0da46eb3bd1",
  "0x13642ae652efc043355aa74076328ca930a8c746",
  "0x4ea45762521f116381b2dd3a695f6f76fcc13fda",
  "0xe222e4401ce9ffe5d0edee6a6e59730b95b55ef8",
  "0x999bc4de00cf01aacd7ba8be8ec98d223ecc0a6f",
  "0xddb5ba3552ecabfc1893cdab9e46e5c5f86723f3",
  "0x8835f65e24b3dd97815d360e97c408077deb4f9a",
  "0xc3bc4eab2f4edfd3c8b4b6537cc3fa764d6fe215",
  "0x1af6f993da43a4d2bf45a0667ae067efb6a14fc6",
  "0xe77d636c6c7cc5f85fec6ef67d06d31a4001e9a0",
  "0x89e425726ac6a791bb17c5d77d69c41033eb5aeb",
  "0x13850cf32640d520f78dfc554267355956363a26",
  "0xa1d59734e9d287b2cb4358a410fe046fe52b43ac",
  "0xdf3061204bae081d8c0adb39ff4730a042d6a001",

  // Stargate — confirmed sends USDC.E to users
  "0xe9abcc538da92b5e966fda887615b80a488d8ab0", // StargateGateway
  "0x2f6f07cdcf3588944bf4c42ac74ff24bf56e7590", // StargateOFTUSDC

  // Wormhole — TokenBridge confirmed sends tokens (completeTransfer)
  "0x3ff72741fd67d6ad0668d93b41a09248f4700560", // TokenBridge
  "0xa7287a56c01ac8baaf8e7b662bdb41b10889c7a6", // TokenBridge

  // Relay (Reservoir) — RelayRouterV3 confirmed sends USD₮0, USDC to users
  "0xb92fe925dc43a0ecde6c8b1a2709c170ec4fff4f", // RelayRouterV3

  // LI.FI aggregator — confirmed bridge routing (startBridgeTokensVia*)
  "0x864b314d4c5a0399368609581d3e8933a63b9232", // LiFiDiamond

  // OrbiterX — fast withdrawal bridge, confirmed sends USD₮0 to users
  "0x09fb495aa7859635f755e827d64c4c9a2e5b9651", // fast withdrawal handler
  "0xd9d74a29307cc6fc8bf424ee4217f1a587fbc8dc", // OrbiterXRouterV3
]);

// Detect assets bridged to Ink.
// Two signals:
//   1. OP Stack type-126 deposit txs with ETH value (native ETH bridge).
//   2. Incoming ERC-20 token transfers from known bridge relay contracts.
// Returns { ethWei: BigInt, tokenUSD: number }.
async function fetchBridgeVolume(addr) {
  const lowerAddr = addr.toLowerCase();
  let ethWei = 0n;
  let tokenUSD = 0;

  // Signal 1: type-126 ETH deposits (paginated incoming txs).
  let url = `${INK_API}/addresses/${addr}/transactions?filter=to`;
  for (let page = 0; page < 10; page++) {
    const r = await safeFetch(url, 6000);
    if (!r?.items) break;
    for (const tx of r.items) {
      if (tx.type !== 126 && tx.type !== "deposit") continue;
      const valueWei = BigInt(tx?.value || "0");
      if (valueWei > 0n) ethWei += valueWei;
    }
    const np = r.next_page_params;
    if (!np) break;
    url = `${INK_API}/addresses/${addr}/transactions?${new URLSearchParams({ ...np, filter: "to" })}`;
  }

  // Signal 2: ERC-20 token transfers from known bridge relay contracts.
  url = `${INK_API}/addresses/${addr}/token-transfers?filter=to&type=ERC-20`;
  for (let page = 0; page < 5; page++) {
    const r = await safeFetch(url, 6000);
    if (!r?.items) break;
    for (const tf of r.items) {
      const from = (tf?.from?.hash || "").toLowerCase();
      if (!BRIDGE_RELAY_CONTRACTS.has(from)) continue;
      const rate = parseFloat(tf?.token?.exchange_rate || 0);
      const decimals = parseInt(tf?.token?.decimals ?? 18);
      const rawVal = tf?.total?.value || tf?.value;
      if (rate > 0 && rawVal) {
        try { tokenUSD += (Number(BigInt(rawVal)) / Math.pow(10, decimals)) * rate; } catch {}
      }
    }
    const np = r.next_page_params;
    if (!np) break;
    url = `${INK_API}/addresses/${addr}/token-transfers?${new URLSearchParams({ ...np, filter: "to", type: "ERC-20" })}`;
  }

  return { ethWei, tokenUSD };
}

// onStep(id) is called the moment each data source resolves — used to animate the checklist.
async function fetchWallet(addr, onStep = () => {}) {
  // Helper: resolve promise, then immediately notify the caller which step finished.
  const s = (id, promise) => promise.then((r) => { onStep(id); return r; });

  const [info, counters, erc20, erc721, protoCounts, nadoPoints, tydroPoints, gmInkStatus, bridgeResult] =
    await Promise.all([
      s("step-wallet",  safeFetch(`${INK_API}/addresses/${addr}`)),
      safeFetch(`${INK_API}/addresses/${addr}/counters`),
      s("step-nfts",    safeFetch(`${INK_API}/addresses/${addr}/tokens?type=ERC-20`)),
      safeFetch(`${INK_API}/addresses/${addr}/tokens?type=ERC-721`),
      // countProtocolInteractions now handles both direct and factory deploys internally;
      // mark step-contracts immediately after step-txs since they resolve together.
      s("step-txs", countProtocolInteractions(addr)).then((r) => { onStep("step-contracts"); return r; }),
      s("step-nado",    fetchNadoPoints(addr)),
      s("step-tydro",   fetchTydroPoints(addr)),
      s("step-kraken",  fetchGmInkStatus(addr)),
      fetchBridgeVolume(addr),
    ]);

  const ensName = info?.ens_domain_name || null;
  const ethPrice = parseFloat(info?.exchange_rate || 0);
  const nowTs = Math.floor(Date.now() / 1000);
  const oldestTs = protoCounts.oldestTxTimestamp;
  const walletAgeDays = oldestTs ? Math.floor((nowTs - oldestTs) / 86400) : 0;

  // Merge direct deploys + factory deploys (ZNS etc.) resolved via per-tx internal-txs.
  const allContracts = new Set([...protoCounts.directContracts, ...protoCounts.factoryContracts]);
  const contractsDeployed = allContracts.size;

  return {
    address: addr,
    ens: ensName,
    balanceWei: info?.coin_balance || "0",
    txCount: Number(counters?.transactions_count || 0),
    transfersCount: Number(counters?.token_transfers_count || 0),
    gasUsed: Number(counters?.gas_usage_count || 0),
    tokenCount: erc20?.items?.length || 0,
    nftCount: erc721?.items?.reduce((sum, it) => sum + (Number(it.value) || 1), 0) || 0,
    isContract: !!info?.is_contract,
    ethPrice,
    tokenValueUSD: computeTokenValueUSD(erc20?.items, erc721?.items, info?.coin_balance || "0", ethPrice),
    walletAgeDays,
    proto: {
      ...protoCounts,
      // Override blockchain-scanned GM counts with gm.ink API values when available
      // (blockchain scan misses GMs for high-activity wallets due to page limit)
      gm:     gmInkStatus?.sent        ?? protoCounts.gm,
      gmPlus: gmInkStatus?.premiumSent ?? protoCounts.gmPlus,
    },
    contractsDeployed,
    tydroPositions: countTydroPositions(erc20?.items),
    nadoPoints,
    tydroPoints,
    keyNfts: countKeyNfts(erc721?.items),
    gmReceived: gmInkStatus?.received ?? countGmReceived(erc721?.items),
    inkDomain: detectInkDomain(erc721?.items, ensName),
    krakenStatus: gmInkStatus,
    bridgeVolumeUSD: (Number(bridgeResult.ethWei) / 1e18) * ethPrice + bridgeResult.tokenUSD,
  };
}

// ---------- Score & Rank ----------
/*
 * Score 0-100. Calibrated against real on-chain emission data and expanded
 * to cover on-chain identity signals (age, value, builder activity, .ink domain).
 *
 * Weight summary (sum = 100 for a "perfect" wallet):
 *   Protocol activity : Nado(20) + Tydro(10) = 30  — Nado exactly 2× Tydro
 *   Base activity     : Tx(12) + GM(6) + InkSwap(3) + Transfer(3) + Gas(3)
 *   Eligibility       : Phase 1(8) — strongest binary signal
 *   Identity signals  : Wallet Age(5) + Token Value(5) + Contracts(3) + .ink(2)
 *   NFT signals       : Templars(6) + Eye of Seeker(4) + NFTs(4) + Tokens(4)
 *   Log scale everywhere — activity distributions are heavy-tailed.
 */
function computeScore(d) {
  const log = (n) => Math.log10(Math.max(1, n + 1));
  const cap = (v, max) => Math.min(v, max);

  // Key NFTs: Templars (any=100%), Eye of Seeker (any=100%)
  const templars    = d.keyNfts.templars    > 0 ? 1 : 0;
  const eyeOfSeeker = d.keyNfts.eyeOfSeeker > 0 ? 1 : 0;

  // Nado — primary protocol, points-only (no tx fallback).
  const nadoPts = d.nadoPoints?.points || 0;
  const nado    = cap(log(nadoPts) / log(10000), 1);  // 10K pts → max

  // Tydro — second protocol, points-only (no positions/tx fallback).
  const tydroPts = d.tydroPoints?.points || 0;
  const tydro    = cap(log(tydroPts) / log(500), 1);  // 500 pts → max

  // Base on-chain activity.
  const tx       = cap(log(d.txCount)        / log(1000), 1);
  const transfer = cap(log(d.transfersCount) / log(500),  1);
  const gas      = cap(log(d.gasUsed)        / log(5e7),  1);
  const tokens   = cap(d.tokenCount / 10, 1);
  const nfts     = cap(log(d.nftCount)       / log(50),   1);

  // Ecosystem.
  const gm = cap(log(d.proto.gm) / log(100), 1);

  // Wallet age: linear, max at 365 days on Ink.
  const walletAge = cap(d.walletAgeDays / 365, 1);

  // Portfolio value: log scale, ~$1000 → max.
  const tokenVal = cap(log(d.tokenValueUSD) / log(1001), 1);

  // Contracts: 1=0.5, 2=0.75, 3+=1.0.
  const contracts =
    d.contractsDeployed >= 3 ? 1.0 :
    d.contractsDeployed === 2 ? 0.75 :
    d.contractsDeployed === 1 ? 0.50 : 0;

  // .ink domain — binary.
  const inkDomain = d.inkDomain ? 1 : 0;

  // Bridge: log scale, $10K → max.
  const bridge = cap(log(d.bridgeVolumeUSD || 0) / log(10001), 1);

  const raw =
      nado         * 25 +   // #1 primary protocol (points only)
      tydro        * 12 +   // #2 primary protocol (points only, ~half of Nado)
      tx           * 12 +   // Base on-chain activity
      bridge       *  8 +   // Chain commitment (max $10K)
      templars     *  6 +   // Key NFT (Nado genesis)
      gm           *  5 +   // Ecosystem participation
      tokenVal     *  5 +   // Portfolio value
      contracts    *  5 +   // Builder signal
      eyeOfSeeker  *  4 +   // Key NFT (Ink early)
      tokens       *  4 +
      nfts         *  4 +
      walletAge    *  4 +   // Time on Ink (max 365 days)
      inkDomain    *  3 +   // .ink domain
      transfer     *  3 +
      gas          *  2;    // ← total max = 108, capped at 100

  return Math.round(Math.min(108, raw));
}

function rankFromScore(score) {
  // Score thresholds → tier + estimated percentile.
  // Threshold-based (no live leaderboard — no backend).
  if (score >= 100) return { tier: "INK_GOD",    pct: "Top 0.1%" };
  if (score >= 85)  return { tier: "INK_LEGEND", pct: "Top 1%"   };
  if (score >= 70)  return { tier: "OG_MEMBER",  pct: "Top 5%"   };
  if (score >= 55)  return { tier: "POWER_USER", pct: "Top 15%"  };
  if (score >= 40)  return { tier: "ACTIVE_USER",pct: "Top 30%"  };
  if (score >= 25)  return { tier: "REGULAR",    pct: "Top 50%"  };
  if (score >= 10)  return { tier: "NEWBIE",     pct: "Top 80%"  };
  return                   { tier: "LURKER",     pct: "Just getting started" };
}

// ---------- Badges ----------
function computeBadges(d) {
  const out = [];
  const p = d.proto;

  // Key NFTs first — these are the most prized signals.
  if (d.keyNfts.templars >= 3)      out.push({ icon: "🛡️", label: "Templars Commander", priority: true });
  else if (d.keyNfts.templars === 2) out.push({ icon: "🛡️", label: "Templars Knight",    priority: true });
  else if (d.keyNfts.templars === 1) out.push({ icon: "🛡️", label: "Templars Holder",    priority: true });

  if (d.keyNfts.eyeOfSeeker > 0)    out.push({ icon: "👁️", label: "Seeker",              priority: true });

  // Ink airdrop allocation present.
  if (d.inkDomain)                  out.push({ icon: "🔤", label: ".ink Domain",         priority: true });
  if (d.contractsDeployed > 0)      out.push({ icon: "🛠️", label: `Builder (${d.contractsDeployed})`, priority: true });

  // Airdrop-priority badges first (most prominent).
  // Use real points data if available; otherwise fall back to on-chain tx count.
  const np = d.nadoPoints?.points || 0;
  const hasPoints = d.nadoPoints && np > 0;
  // Calibrated against real emission: ~1M pts/week, ~15M cumulative.
  if (hasPoints) {
    if (np >= 10000)           out.push({ icon: "🌪️", label: "Nado Whale",      priority: true });
    else if (np >= 1000)       out.push({ icon: "🌪️", label: "Nado Trader",     priority: true });
    else if (np >= 100)        out.push({ icon: "🌪️", label: "Nado Active",     priority: true });
    else                       out.push({ icon: "🌪️", label: "Nado User",       priority: true });
  } else if (p.nado >= 20)     out.push({ icon: "🌪️", label: "Nado Whale",      priority: true });
  else if (p.nado >= 5)        out.push({ icon: "🌪️", label: "Nado Trader",     priority: true });
  else if (p.nado >= 1)        out.push({ icon: "🌪️", label: "Nado User",       priority: true });

  // Calibrated against typical Merkl TydroInkPoints distribution.
  const tp = d.tydroPoints?.points || 0;
  if (tp >= 100)               out.push({ icon: "💧", label: "Tydro Whale",     priority: true });
  else if (tp >= 10)           out.push({ icon: "💧", label: "Tydro Trader",    priority: true });
  else if (tp >= 0.5)          out.push({ icon: "💧", label: "Tydro Earner",    priority: true });
  else if (d.tydroPositions >= 3)   out.push({ icon: "💧", label: "Tydro Whale",     priority: true });
  else if (d.tydroPositions >= 1) out.push({ icon: "💧", label: "Tydro Supplier", priority: true });

  // Ecosystem badges.
  if (p.gmPlus >= 10)          out.push({ icon: "👋", label: "GM Premium ×" + p.gmPlus });
  else if (p.gm >= 30)         out.push({ icon: "👋", label: "GM Streak" });
  else if (p.gm >= 5)          out.push({ icon: "👋", label: "GM Regular" });
  else if (p.gm >= 1)          out.push({ icon: "👋", label: "Said GM" });

  // General activity badges.
  if (d.txCount >= 500)        out.push({ icon: "⚡", label: "Power User" });
  if (d.txCount >= 50 && d.txCount < 500) out.push({ icon: "🚀", label: "Active" });
  if (d.txCount > 0 && d.txCount < 5)     out.push({ icon: "🌱", label: "Newcomer" });
  if (d.tokenCount >= 10)      out.push({ icon: "💎", label: "Token Collector" });
  if (d.nftCount >= 5)         out.push({ icon: "🎨", label: "NFT Collector" });
  if (d.gasUsed >= 1e7)        out.push({ icon: "🔥", label: "Gas Burner" });
  if (d.transfersCount >= 100) out.push({ icon: "🔁", label: "DeFi Mover" });
  if (d.isContract)            out.push({ icon: "🤖", label: "Contract" });
  if (out.length === 0)        out.push({ icon: "👀", label: "Lurker" });
  return out;
}

// ---------- Render ----------
let _lastRenderState = null; // used by share modal

function renderCard(addr, data) {
  loading.hidden = true;
  setAvatar(addr);
  document.getElementById("addr-display").textContent = shortAddr(addr);
  document.getElementById("ens").textContent = data.ens || "";

  // Nado: points-only display.
  const nadoPtsEl = document.getElementById("stat-nado-points");
  const nadoSubEl = document.getElementById("stat-nado-sub");
  if (data.nadoPoints && data.nadoPoints.points > 0) {
    nadoPtsEl.textContent = data.nadoPoints.points.toFixed(2);
    const rank = data.nadoPoints.rank;
    nadoSubEl.textContent = rank ? `rank #${formatNum(rank)} · tier ${data.nadoPoints.tier}` : "all-time";
  } else {
    nadoPtsEl.textContent = "0";
    nadoSubEl.innerHTML = `<a class="stat-link" href="https://app.nado.xyz/perpetuals" target="_blank" rel="noopener">Start trading ↗</a>`;
  }
  // Tydro: points-only display.
  const tydroEl    = document.getElementById("stat-tydro-points");
  const tydroSubEl = document.getElementById("stat-tydro-sub");
  if (data.tydroPoints && data.tydroPoints.points > 0) {
    tydroEl.textContent = data.tydroPoints.points.toFixed(2);
    const pend = data.tydroPoints.pending;
    tydroSubEl.textContent = pend > 0
      ? `+${pend.toFixed(4)} pending · ${data.tydroPoints.campaigns} campaign${data.tydroPoints.campaigns === 1 ? "" : "s"}`
      : `${data.tydroPoints.campaigns} campaign${data.tydroPoints.campaigns === 1 ? "" : "s"}`;
  } else {
    tydroEl.textContent = "0";
    tydroSubEl.innerHTML = `<a class="stat-link" href="https://app.tydro.com/" target="_blank" rel="noopener">Start lending ↗</a>`;
  }
  // Key NFTs (Templars, Eye of the Seeker).
  const tplEl = document.getElementById("stat-templars");
  const seekEl = document.getElementById("stat-seeker");
  tplEl.textContent  = formatNum(data.keyNfts.templars);
  seekEl.textContent = formatNum(data.keyNfts.eyeOfSeeker);
  document.getElementById("key-templars").classList.toggle("stat--owned", data.keyNfts.templars > 0);
  document.getElementById("key-seeker").classList.toggle("stat--owned", data.keyNfts.eyeOfSeeker > 0);
  const tplSubEl  = document.getElementById("stat-templars-sub");
  const seekSubEl = document.getElementById("stat-seeker-sub");
  tplSubEl.innerHTML  = data.keyNfts.templars  > 0 ? "Nado early phase" : `<a class="stat-link" href="https://opensea.io/collection/templars-of-the-storm" target="_blank" rel="noopener">Get on OpenSea ↗</a>`;
  seekSubEl.innerHTML = data.keyNfts.eyeOfSeeker > 0 ? "Ink early phase"  : `<a class="stat-link" href="https://opensea.io/collection/eye-of-the-seeker" target="_blank" rel="noopener">Get on OpenSea ↗</a>`;

  // Contracts deployed.
  document.getElementById("stat-contracts").textContent = formatNum(data.contractsDeployed);
  document.getElementById("stat-contracts-sub").innerHTML = data.contractsDeployed > 0
    ? "deployed on Ink"
    : `<a class="stat-link" href="https://zns.bio?ref=NzExMjM1Yj" target="_blank" rel="noopener">Deploy a contract ↗</a>`;

  // .ink domain.
  const domEl  = document.getElementById("stat-inkdomain");
  const domSub = document.getElementById("stat-inkdomain-sub");
  const domKey = document.getElementById("key-inkdomain");
  if (data.inkDomain) {
    domEl.textContent = data.ens?.endsWith(".ink") ? data.ens : "✓";
    domSub.innerHTML  = "ZNS Connect";
    domKey.classList.add("stat--owned");
  } else {
    domEl.textContent = "—";
    domSub.innerHTML  = `<a class="stat-link" href="https://zns.bio?ref=NzExMjM1Yj" target="_blank" rel="noopener">Get yours ↗</a>`;
    domKey.classList.remove("stat--owned");
  }

  // GM Ink: total sent highlighted, premium + received as separate sub-lines below.
  document.getElementById("stat-gm").textContent = formatNum(data.proto.gm);
  const gmSubEl = document.getElementById("stat-gm-sub");
  if (data.proto.gm === 0) {
    gmSubEl.innerHTML = `<a class="stat-link" href="https://www.gm.ink/" target="_blank" rel="noopener">Send a GM ↗</a>`;
  } else {
    const gmLines = [];
    if (data.proto.gmPlus > 0) gmLines.push(`${formatNum(data.proto.gmPlus)} premium sent`);
    if (data.gmReceived  > 0)  gmLines.push(`${formatNum(data.gmReceived)} received`);
    if (gmLines.length) {
      gmSubEl.innerHTML = gmLines.map(l => `<span class="gm-line">${l}</span>`).join("");
    } else {
      gmSubEl.textContent = "basic only";
    }
  }
  document.getElementById("stat-tx").textContent      = formatNum(data.txCount);
  document.getElementById("stat-balance").textContent = Number(weiToEth(data.balanceWei)).toFixed(4);
  document.getElementById("stat-tokens").textContent  = formatNum(data.tokenCount);
  document.getElementById("stat-nfts").textContent    = formatNum(data.nftCount);
  document.getElementById("stat-nfts-sub").innerHTML  = data.nftCount === 0
    ? `<a class="stat-link" href="https://opensea.io/discover/chain/ink" target="_blank" rel="noopener">View on OpenSea ↗</a>`
    : "";

  // Gas used.
  const gas = data.gasUsed || 0;
  document.getElementById("stat-gas").textContent =
    gas >= 1e9  ? (gas / 1e9).toFixed(1) + "B" :
    gas >= 1e6  ? (gas / 1e6).toFixed(1) + "M" :
    gas >= 1e3  ? (gas / 1e3).toFixed(1) + "K" :
    gas > 0     ? formatNum(gas) : "—";
  document.getElementById("stat-gas-sub").textContent = "on Ink";

  // Bridge volume (USD).
  const bv = data.bridgeVolumeUSD || 0;
  document.getElementById("stat-bridge").textContent =
    bv >= 10000 ? "$10K+" :
    bv >= 1000  ? "$" + (bv / 1000).toFixed(1) + "K" :
    bv >= 1     ? "$" + bv.toFixed(0) :
    bv > 0      ? "<$1" : "—";
  document.getElementById("stat-bridge-sub").innerHTML = bv > 0
    ? "via official bridges"
    : `<a class="stat-link" href="https://inkonchain.com/bridge" target="_blank" rel="noopener">Bridge to Ink ↗</a>`;

  // Token value (USD).
  const tv = data.tokenValueUSD || 0;
  document.getElementById("stat-tokenvalue").textContent =
    tv >= 1000 ? "$" + (tv / 1000).toFixed(1) + "K" :
    tv >= 1    ? "$" + tv.toFixed(0) :
    tv > 0     ? "<$1" : "$0";

  // Wallet age — always in days.
  const days = data.walletAgeDays || 0;
  document.getElementById("stat-walletage").textContent = days > 0 ? days + " days" : "—";
  document.getElementById("stat-walletage-sub").textContent =
    days > 0 ? "on Ink" : "first tx not found";

  const score = computeScore(data);
  const rank  = rankFromScore(score);
  _lastRenderState = { addr, data, score, rank };

  // Animate score ring (circumference = 2 * π * 52 ≈ 326.7); scale to 108 max
  const C = 2 * Math.PI * 52;
  const ring = document.getElementById("ring-fg");
  ring.style.strokeDasharray = C;
  ring.style.strokeDashoffset = C;
  requestAnimationFrame(() => {
    ring.style.strokeDashoffset = C * (1 - score / 108);
  });
  animateNumber(document.getElementById("score-num"), 0, score, 900);

  document.getElementById("rank-tier").textContent = rank.tier.replace(/_/g, " ");
  document.getElementById("rank-pct").textContent  = rank.pct;

  // Kraken verified status (eligibility signal — no points, no badge)
  const krakenEl = document.getElementById("kraken-status");
  const ks = data.krakenStatus;
  if (ks) {
    krakenEl.hidden = false;
    krakenEl.className = "kraken-status " + (ks.verified ? "kraken-status--verified" : "kraken-status--unverified");
    if (ks.verified) {
      krakenEl.innerHTML =
        `<span class="kraken-icon">✓</span>` +
        `<span class="kraken-text"><span class="kraken-label">Kraken Verified</span>` +
        `<span class="kraken-sub">eligible for Ink airdrop filter</span></span>` +
        `<span class="kraken-badge">KYC</span>`;
    } else {
      krakenEl.innerHTML =
        `<span class="kraken-icon">✗</span>` +
        `<span class="kraken-text"><span class="kraken-label">Not Kraken Verified</span>` +
        `<span class="kraken-sub">verify at gm.ink to qualify</span></span>`;
    }
  } else {
    krakenEl.hidden = true;
  }

  // Badges
  const badgesEl = document.getElementById("badges");
  badgesEl.innerHTML = "";
  computeBadges(data).forEach((b) => {
    const el = document.createElement("span");
    el.className = "badge" + (b.priority ? " badge--priority" : "");
    el.innerHTML = `<span>${b.icon}</span><span>${b.label}</span>`;
    badgesEl.appendChild(el);
  });

  card.hidden = false;
  actions.hidden = false;
}

function animateNumber(el, from, to, duration) {
  const start = performance.now();
  function step(now) {
    const t = Math.min(1, (now - start) / duration);
    const eased = 1 - Math.pow(1 - t, 3);
    el.textContent = Math.round(from + (to - from) * eased);
    if (t < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

// ---------- Flow ----------
async function generate(addr) {
  hideError();
  setLoading(true);

  try {
    // markStep is called by fetchWallet the instant each data source resolves
    const data = await fetchWallet(addr, markStep);
    setLoading(false);
    renderCard(addr, data);
    document.getElementById("new-search-bar").hidden = false;

    const url = new URL(window.location.href);
    url.searchParams.set("addr", addr);
    window.history.replaceState({}, "", url);
  } catch (e) {
    setLoading(false);
    showError("Could not read this wallet. Try again in a moment.");
  }
}

// ---------- Form handler ----------
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  hideError();
  const raw = input.value.trim();
  if (!raw) return;

  // If already a 0x address, skip resolution entirely
  if (isAddress(raw)) {
    generate(raw);
    return;
  }

  // Resolve .eth / .ink domain names
  submitBtn.disabled = true;
  submitBtn.textContent = "Resolving…";
  let addr;
  try {
    addr = await resolveInput(raw);
  } catch (err) {
    submitBtn.disabled = false;
    submitBtn.textContent = "Generate";
    showError(err.message);
    return;
  }

  // Show resolved address in the input for clarity
  input.value = addr;
  generate(addr);
});

// ---------- New search ----------
document.getElementById("btn-new-search").addEventListener("click", () => {
  cardSection.hidden = true;
  document.getElementById("new-search-bar").hidden = true;
  input.value = "";
  hideError();
  window.history.replaceState({}, "", window.location.pathname);
  window.scrollTo({ top: 0, behavior: "smooth" });
  setTimeout(() => input.focus(), 400);
});

// ---------- Share Modal ----------
let _shareData = null; // cached { addr, score, tier } for modal actions

function openShareModal(addr, data, score, rank) {
  _shareData = { addr, score, tier: rank.tier };

  // Populate mini card
  const shareCard = document.getElementById("share-card");

  // Avatar
  const shareAvatar = document.getElementById("share-avatar");
  const h1 = parseInt(addr.slice(2, 8), 16) % 360;
  const h2 = parseInt(addr.slice(8, 14), 16) % 360;
  shareAvatar.style.background =
    `linear-gradient(135deg, hsl(${h1}, 70%, 55%) 0%, hsl(${h2}, 80%, 50%) 100%)`;

  // Identity
  document.getElementById("share-ens").textContent  = data.ens || "";
  document.getElementById("share-addr").textContent = shortAddr(addr);

  // Score ring (C = 2 * π * 42 ≈ 263.9)
  const C = 2 * Math.PI * 42;
  const ring = document.getElementById("share-ring-fg");
  ring.style.strokeDasharray  = C;
  ring.style.strokeDashoffset = C; // reset first
  document.getElementById("share-score-num").textContent = score;
  requestAnimationFrame(() => {
    ring.style.strokeDashoffset = C * (1 - score / 108);
  });

  // Rank
  document.getElementById("share-rank-tier").textContent = rank.tier.replace(/_/g, " ");
  document.getElementById("share-rank-pct").textContent  = rank.pct;

  // Badges — priority ones only, max 5
  const badgesEl = document.getElementById("share-badges");
  badgesEl.innerHTML = "";
  const allBadges = computeBadges(data);
  const shown = allBadges.filter(b => b.priority).slice(0, 5);
  if (shown.length === 0) shown.push(...allBadges.slice(0, 3)); // fallback
  shown.forEach((b) => {
    const el = document.createElement("span");
    el.className = "badge" + (b.priority ? " badge--priority" : "");
    el.innerHTML = `<span>${b.icon}</span><span>${b.label}</span>`;
    badgesEl.appendChild(el);
  });

  // Show modal
  const modal = document.getElementById("share-modal");
  modal.hidden = false;
  document.body.style.overflow = "hidden";
}

function closeShareModal() {
  document.getElementById("share-modal").hidden = true;
  document.body.style.overflow = "";
}

// Open share modal
document.getElementById("btn-open-share").addEventListener("click", () => {
  if (!_lastRenderState) return;
  const { addr, data, score, rank } = _lastRenderState;
  openShareModal(addr, data, score, rank);
});

// Close via X button or backdrop
document.getElementById("share-close").addEventListener("click", closeShareModal);
document.getElementById("share-backdrop").addEventListener("click", closeShareModal);
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeShareModal();
});

// Save PNG of the mini share card
document.getElementById("share-btn-save").addEventListener("click", async () => {
  if (typeof html2canvas === "undefined") return;
  const shareCard = document.getElementById("share-card");
  const canvas = await html2canvas(shareCard, {
    backgroundColor: "#100820",
    scale: 3,
    useCORS: true,
    logging: false,
  });
  const link = document.createElement("a");
  const addr = _shareData?.addr || "card";
  link.download = `inkredentials-${shortAddr(addr)}.png`;
  link.href = canvas.toDataURL("image/png");
  link.click();
});

// Post on X
document.getElementById("share-btn-tweet").addEventListener("click", () => {
  if (!_shareData) return;
  const { score, tier } = _shareData;
  const url = window.location.href;
  const text = `My INKredentials score: ${score}/100 — ${tier} 🟣\n\nCheck yours: ${url}`;
  window.open(
    `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`,
    "_blank", "noopener"
  );
});

// Copy image
document.getElementById("share-btn-copy").addEventListener("click", async (e) => {
  const btn = e.currentTarget;
  if (typeof html2canvas === "undefined") return;
  const orig = btn.textContent;
  btn.textContent = "⏳ Copying…";
  btn.disabled = true;
  try {
    const shareCard = document.getElementById("share-card");
    const canvas = await html2canvas(shareCard, {
      backgroundColor: "#100820",
      scale: 3,
      useCORS: true,
      logging: false,
    });
    canvas.toBlob(async (blob) => {
      try {
        await navigator.clipboard.write([new ClipboardItem({ "image/png": blob })]);
        btn.textContent = "✓ Copied!";
      } catch {
        btn.textContent = "✗ Not supported";
      }
      btn.disabled = false;
      setTimeout(() => (btn.textContent = orig), 1800);
    }, "image/png");
  } catch {
    btn.textContent = "✗ Error";
    btn.disabled = false;
    setTimeout(() => (btn.textContent = orig), 1800);
  }
});

// ---------- Auto-load from URL ----------
window.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const addr = params.get("addr");
  if (addr && isAddress(addr)) {
    input.value = addr;
    generate(addr);
  }
});
