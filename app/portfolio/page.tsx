import type { Metadata } from "next";
import PortfolioConceptPage from "@/components/PortfolioConceptPage";

export const metadata: Metadata = {
  title: "Concept-showcases & klantcases",
  description:
    "Bekijk vier eerlijk gelabelde conceptwebsites met interactieve scroll-film en ontdek hoe wij van intake en storyboard naar een snelle, opvallende website gaan.",
  alternates: { canonical: "/portfolio" },
};

export default function Portfolio() {
  return <PortfolioConceptPage />;
}
