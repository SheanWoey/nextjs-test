import { FC, useContext } from "react";
import Box from "@mui/material/Box";
import styled from "@mui/material/styles/styled";
// LOCAL CUSTOM COMPONENTS
import MegaMenu1 from "./mega-menu/mega-menu-1";
import MegaMenu2 from "./mega-menu/mega-menu-2";
import CategoryMenuItem from "./category-menu-item";
// NAVIGATION DATA
import { ProductCategoryContext } from "contexts/ProductCategoryContext";
import { MenuItem } from "@mui/material";
import { NavLink } from "components/nav-link";

// styled component
const Wrapper = styled(Box, {
  shouldForwardProp: (prop) => prop !== "position" && prop !== "open",
})<Props>(({ theme, position, open }) => ({
  left: 0,
  zIndex: 98,
  right: "auto",
  borderRadius: 4,
  padding: "0.5rem 0px",
  transformOrigin: "top",
  boxShadow: theme.shadows[2],
  position: position || "unset",
  transition: "all 250ms ease-in-out",
  transform: open ? "scaleY(1)" : "scaleY(0)",
  backgroundColor: theme.palette.background.paper,
  top: position === "absolute" ? "calc(100% + 0.7rem)" : "0.5rem",
}));

// ===============================================================
interface Props {
  open?: boolean;
  position?: "absolute" | "relative";
}
// ===============================================================

const CategoryMenuCard: FC<Props> = (props) => {
  const productCategories = useContext(ProductCategoryContext);

  const { open, position = "absolute" } = props;

  const megaMenu = { MegaMenu1, MegaMenu2 };

  return (
    <Wrapper open={open} position={position}>
      {productCategories?.map((item) => {
        const MegaMenu = megaMenu["MegaMenu1"];

        return item.category_children.length > 0 ? (
          <CategoryMenuItem
            key={item.handle}
            href={item.handle}
            title={item.name}
            caret={!!item}
          >
            <MegaMenu data={item.category_children || {}} />
          </CategoryMenuItem>
        ) : (
          <NavLink href={`/products/categories/${item.handle}`}>
            <MenuItem className="category-dropdown-link">
              <span className="title" style={{paddingLeft: "0.75rem"}}>{item.name}</span>
            </MenuItem>
          </NavLink>
        );
      })}
    </Wrapper>
  );
};

export default CategoryMenuCard;
