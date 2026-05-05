# Digital Wallet

Cross-venue stored-value wallet built on top of Pod Play's booking system, in partnership with Magpie. Users hold credits redeemable at any Pod Play facility (not facility-locked, unlike the US model) — the wallet becomes a cross-venue payment network as Pod Play scales across Asia.

**Status:** Active venture context (per `cs/monorepo/entities/projects/digital-wallet.md`).

## What's already here

- `knowledge/digital-wallet.md` — venture concept note, originally lived in `podplay-data/data/notes/digital-wallet.md`. Migrated here as part of the umbrella restructure (this is the cleanest "cross-pollinated" example: a digital-wallet note that had to live in podplay-data because there was no other home for it).
- `data/vendors/magpie.md` — Magpie partnership profile, originally in `podplay-data/data/vendors/`. Magpie is the digital-wallet partner; promoted into this venture's vendor directory.

## What this venture owns

- Wallet product economics — top-up flow, credit issuance, settlement with venues
- Magpie partnership — integration spec, contract, fee structure
- Strategic relationship to `[[pod-play]]` (booking system substrate) and `[[ping-pod]]` (potentially extending across franchises)

## Likely structure as it grows

- `knowledge/economics.md` — float, settlement, FX
- `knowledge/integration-spec.md` — Magpie API + Pod Play booking system
- `data/contracts/` — Magpie partnership agreement
- `data/projects/` — phased rollout plans

## Cross-references

- `[[pod-play]]` — the substrate booking system
- `[[ping-pod]]` — eventual cross-network reach
