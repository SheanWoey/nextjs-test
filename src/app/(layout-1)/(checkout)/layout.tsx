import { PropsWithChildren } from "react";
import { PageStepper } from "components/layouts/shop-layout-1";

export default function Layout({ children }: PropsWithChildren) {
  return <PageStepper>{children}</PageStepper>;
}
