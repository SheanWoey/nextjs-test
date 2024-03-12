import { Metadata, Viewport } from "next";
import { FashionTwoPageView } from "pages-sections/fashion-2/page-view";

export const metadata: Metadata = {
  title: "Bazaar - Next.js E-commerce Template",
  description: `Bazaar is a React Next.js E-commerce template. Build SEO friendly Online store, delivery app and Multi vendor store`,
  authors: [{ name: "UI-LIB", url: "https://ui-lib.com" }],
  keywords: ["e-commerce", "e-commerce template", "next.js", "react"],
};

export default function IndexPage() {
  return <FashionTwoPageView />;
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};
