import type { Metadata } from "next";
import PortfolioCurrentPage from "@/components/PortfolioCurrentPage";

export const metadata: Metadata = {
  title: "Portfolio: websites die wij bouwden",
  description:
    "Bekijk ons eerdere werk: maatwerk websites en webshops voor ondernemers door heel Nederland, met een echte live preview.",
  alternates: { canonical: "/portfolio" },
};

export default function Portfolio() {
  return <PortfolioCurrentPage />;
}
