/* eslint-disable */
import { FC } from "react";
import MegaMenu3 from "./mega-menu-3";
import StyledMegaMenu from "./StyledMegaMenu";
// GLOBAL CUSTOM COMPONENTS
import BazaarCard from "components/BazaarCard";
import CategoryMenuItem from "../category-menu-item";

// =======================================================================
type Data = { icon: string; href: string; title: string; menuData?: any };
export type MegaMenu2Props = { data: Data[] };
// =======================================================================

const MegaMenu2: FC<MegaMenu2Props> = ({ data }) => {
  return (
    <StyledMegaMenu>
      <BazaarCard elevation={2} sx={{ ml: "1rem", py: "0.5rem" }}>
        {data?.map((item) => (
          <CategoryMenuItem
            href={item.href}
            icon={item.icon}
            key={item.title}
            title={item.title}
            caret={!!item.menuData}
          >
            {item.menuData && (
              <MegaMenu3 minWidth="560px" data={item.menuData} />
            )}
          </CategoryMenuItem>
        ))}
      </BazaarCard>
    </StyledMegaMenu>
  );
};

export default MegaMenu2;
