import { permanentRedirect } from "next/navigation";

// De film-portfolio is nu de hoofd-/portfolio. Deze oude voorbeeldroute
// verwijst permanent door zodat er geen dubbele content bestaat.
export default function PortfolioFilm() {
  permanentRedirect("/portfolio");
}
