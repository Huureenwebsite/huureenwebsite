import type { Metadata } from "next";
import PortfolioFilmPage from "@/components/PortfolioFilmPage";

export const metadata: Metadata = {
  title: "Portfolio: echte klanten & signature scroll-film",
  description:
    "Live websites die we voor echte ondernemers bouwden, plus onze signature scroll-film concept-showcases. Bekijk het werk en ontdek onze aanpak.",
  alternates: { canonical: "/portfolio" },
};

export default function Portfolio() {
  return <PortfolioFilmPage />;
}
