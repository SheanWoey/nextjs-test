import { FC } from "react";
// GLOBAL CUSTOM COMPONENTS
import { Span } from "components/Typography";
import { NavLink } from "components/nav-link";

// ==============================================================
type Props = { href: string; title: string; ml: number };
// ==============================================================

const LinkItem: FC<Props> = ({ href, title, ml = 4 }) => (
  <NavLink href={href} color="grey.700">
    <Span display="block" ml={ml} py={1}>
      {title}
    </Span>
  </NavLink>
);

export default LinkItem;
