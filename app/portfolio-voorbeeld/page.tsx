import type { Metadata } from "next";
import Link from "next/link";
import PortfolioConceptPage from "@/components/PortfolioConceptPage";
import { ArrowRight } from "@/components/icons";

export const metadata: Metadata = {
  title: "Voorbeeld concept-showcases",
  description:
    "Los voorbeeld van een procesgerichte portfolio-pagina met concept-showcases en echte klantcases.",
  robots: { index: false, follow: false },
};

export default function PortfolioVoorbeeld() {
  return (
    <>
      <aside className="portfolio-preview-bar">
        <div className="container">
          <span>Los voorbeeld</span>
          <p>Deze pagina vervangt je huidige portfolio niet.</p>
          <Link href="/portfolio">
            Bekijk huidige portfolio <ArrowRight size={15} />
          </Link>
        </div>
      </aside>
      <PortfolioConceptPage />
    </>
  );
}
