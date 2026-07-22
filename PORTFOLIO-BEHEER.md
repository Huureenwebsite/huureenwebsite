# Portfolio-beheer

`/portfolio` rendert de component `PortfolioConceptPage`: eerst de vier
concept-showcases met de scroll-film, daarna het proces en onderaan de echte
klantcases. De inhoud komt uit twee databestanden, dus voor nieuw werk hoef je
geen React aan te raken.

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
detailvelden. De portfolio-pagina en de statische detailroute
`/portfolio/[slug]` nemen de case dan automatisch mee.

## Regels voor eerlijk bewijs

Gebruik voor een fictief merk **nooit** `echt: true`. Concepten claimen geen
omzet, conversie, reviews of klantresultaten — ze bewijzen alleen niche-inzicht,
regie, techniek en doorlooptijd. Het label "Conceptwebsite · fictieve merknaam"
en de disclaimer boven de showcases blijven altijd staan.

De achterliggende strategie en prijsopbouw staan in
`BUSINESSPLAN-CONCEPT-SHOWCASES.md`; het productiedraaiboek van de scroll-film
zelf staat in `SCRUB-SITE-CONCEPTEN.md` in de RiverFlows-werkmap.
