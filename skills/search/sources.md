# Sources

Rules every searcher applies to every source, in the main session and in each subagent.

## Tiers

1. **Official**: manufacturer pages, datasheets, manuals, specifications, standards, government and regulator data, project documentation. The only source for specs and facts, because retailer listings and articles copy specs with errors.
2. **Organic**: first-hand reports from people with no stake: Reddit threads, forums (Clube do Hardware, Adrenaline, Hardmob, Stack Exchange), long-term owner reviews, comment sections, Pelando discussions. The main source for which option is best, real-world problems, and tips. Weight a report by detail and ownership time; a consensus across independent threads outweighs any single post.
3. **Editorial**: independent outlets with measured testing and disclosed methodology. Use to corroborate, not to decide.

Prefer reports from the last 12 months; cite older ones only when nothing newer exists, and flag their age, because products get revised and prices and availability shift.

## Discard signals

Drop a source when any of these holds, and log it with the signal:

- **Sponsored**: `#publi`, "recebemos o produto", "parceria", "patrocinado", brand-provided review units without disclosure of independence.
- **Affiliate listicle**: "top 10 melhores" pages built around affiliate links, with no hands-on testing.
- **AI-generated**: generic prose with no first-hand detail, no author, interchangeable across products, or content farms that publish hundreds of near-identical comparisons.
- **Dropshipping**: unbranded or rebranded marketplace goods, single-product stores, countdown timers, long international shipping sold as local, prices with no brand presence.
- **Scam**: price far below market, no CNPJ, a new domain, a poor Reclame Aqui record, payment only by Pix to an individual.
- **Interested party**: brand-run forums or reviews, competitor attacks, review-only accounts.

## Brazil branch

Applies to physical products.

- **Availability**: sold in Brazil by a reputable seller: the brand's official store, a retailer selling directly (Amazon, Kabum, Magazine Luiza, Mercado Livre official stores), not a third-party seller with no history. Record the price in BRL and the date you checked it.
- **Amazon BR**: read prices from the search page (`https://www.amazon.com.br/s?k=<termos>`), which returns titles, prices, and ratings; product pages hide the price from fetches but show the seller. Skip results marked "Patrocinado".
- **Price history**: check Pelando, Zoom, or Buscapé to tell a real deal from a normal price.
- **Reputation**: check the brand and the seller on Reclame Aqui.
- **Warranty and compliance**: confirm Brazilian warranty and support; for radio devices (Wi-Fi, Bluetooth, phones, routers), confirm Anatel homologation, because unhomologated units can be seized and lack local warranty; check Inmetro certification where the category requires it.
