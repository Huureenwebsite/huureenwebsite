/** @type {import('next').NextConfig} */

// De vier concept-showcases (scroll-film demo's) draaien als losse statische
// sites op riverflowsbv.com/<niche>. We serveren ze onder huureenwebsite.nl via
// een proxy-rewrite, zodat bezoekers het hele project onder ons eigen merk zien.
// De live HTML gebruikt geprefixte paden (/zwembaden/assets/…), dus één regel per
// demo dekt de pagina én al z'n assets. Friendly namen (bv. /zwembadmaker) leiden
// door naar het werkende pad.
const DEMOS = [
  { pad: "zwembaden", live: "https://riverflowsbv.com/zwembaden", alias: "zwembadmaker" },
  { pad: "veranda", live: "https://riverflowsbv.com/veranda", alias: "verandameester" },
  { pad: "carwrap", live: "https://riverflowsbv.com/carwrap", alias: "studiofolie" },
  { pad: "houvenier", live: "https://riverflowsbv.com/houvenier", alias: "arbor-stone" },
];

const nextConfig = {
  reactStrictMode: true,

  async rewrites() {
    const demoRules = DEMOS.flatMap((d) => [
      { source: `/${d.pad}`, destination: d.live },
      { source: `/${d.pad}/:path*`, destination: `${d.live}/:path*` },
    ]);
    return [
      ...demoRules,
      // Gedeelde root-endpoints waar de demo-pagina's naar verwijzen.
      { source: "/api/lead", destination: "https://riverflowsbv.com/api/lead" },
      { source: "/clarity.js", destination: "https://riverflowsbv.com/clarity.js" },
    ];
  },

  async redirects() {
    // Merkbare namen → het werkende demo-pad.
    return DEMOS.map((d) => ({
      source: `/${d.alias}`,
      destination: `/${d.pad}`,
      permanent: false,
    }));
  },
};

export default nextConfig;
