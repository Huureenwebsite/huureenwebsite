# Portfolio-beheer

De nieuwe opzet staat los op `/portfolio-voorbeeld`. De bestaande pagina blijft
op `/portfolio`, zodat beide versies naast elkaar beoordeeld kunnen worden.
De voorbeeldroute staat op `noindex` en rendert de herbruikbare component
`PortfolioConceptPage`.

## Een concept-showcase toevoegen

1. Plaats een voor- en nabeeld met **hetzelfde camerastandpunt** in
   `public/showcases/` (WebP, ±1024px breed). Het ankerframe en het "af"-frame
   uit de scroll-film werken het beste — die zijn per definitie camera-locked.
2. Voeg één object toe aan `conceptShowcases` in `lib/concept-showcases.ts`.
3. Vul niche, transformatieverhaal, techniek, indicatieve doorlooptijd en de
   live demo-URL in.

De studio maakt automatisch een extra tab aan en de hero-tekst telt het aantal
concepten zelf ("Bekijk 5 concepten").

## Een echte klantcase toevoegen

Voeg de case toe aan `projecten` in `lib/projecten.ts` met `echt: true` en de
detailvelden. De actieve portfolio, het losse voorbeeld en de statische
detailroute `/portfolio/[slug]` nemen de case dan automatisch mee.

## De voorbeeldversie later activeren

Laat `app/portfolio/page.tsx` na goedkeuring `PortfolioConceptPage` renderen in
plaats van `PortfolioCurrentPage`. Verwijder daarna `/portfolio-voorbeeld` of
laat die route op `noindex` staan. De inhoud hoeft niet te worden gekopieerd.

## Regels voor eerlijk bewijs

Gebruik voor een fictief merk **nooit** `echt: true`. Concepten claimen geen
omzet, conversie, reviews of klantresultaten — ze bewijzen alleen niche-inzicht,
regie, techniek en doorlooptijd. Het label "Conceptwebsite · fictieve merknaam"
en de disclaimer boven de showcases blijven altijd staan.

De achterliggende strategie en prijsopbouw staan in
`BUSINESSPLAN-CONCEPT-SHOWCASES.md`; het productiedraaiboek van de scroll-film
zelf staat in `SCRUB-SITE-CONCEPTEN.md` in de RiverFlows-werkmap.
