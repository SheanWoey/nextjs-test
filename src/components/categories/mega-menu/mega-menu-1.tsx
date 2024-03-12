import { FC } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
// GLOBAL CUSTOM COMPONENTS
import { FlexBox } from "components/flex-box";
import { NavLink } from "components/nav-link";
// STYLED COMPONENTS
import StyledMegaMenu from "./StyledMegaMenu";
import { ProductCategoryWithChildren } from "types/global";


type MegaMenuProps = {
  data: ProductCategoryWithChildren[];
  minWidth?: string;
};
// =========================================================

const MegaMenu1: FC<MegaMenuProps> = ({ data, minWidth = "760px" }) => {

  return data ? (
    <StyledMegaMenu>
      <Card elevation={2} sx={{ ml: "1rem", minWidth }}>
        <FlexBox px={2.5} py={1.75} alignItems="unset">
          <Box flex="1 1 0">
            <Grid container spacing={4}>
              {data.map((item, ind) => (
                <Grid item md={3} key={ind}>
                  {item.handle ? (
                    <NavLink className="title-link" href={`/products/categories/${item.handle}`}>
                      {item.name}
                    </NavLink>
                  ) : (
                    <div className="title-link">{item.name}</div>
                  )}

                  {item.category_children?.map((sub, ind) => (
                    <NavLink className="child-link" href={`/products/categories/${sub?.handle}`} key={ind}>
                      {sub.name}
                    </NavLink>
                  ))}
                </Grid>
              ))}
            </Grid>
          </Box>

          {/* {rightImage ? (
            <Box mt={1.5}>
              <Link href={rightImage.href}>
                <LazyImage
                  src={rightImage.imgUrl}
                  width={137}
                  height={318}
                  alt="banner"
                />
              </Link>
            </Box>
          ) : null} */}
        </FlexBox>

        {/* {bottomImage ? (
          <Link href={bottomImage.href}>
            <Box position="relative" height={150} width="100%">
              <LazyImage
                fill
                alt="banner"
                src={bottomImage.imgUrl}
                sx={{ objectFit: "cover", objectPosition: "center center" }}
              />
            </Box>
          </Link>
        ) : null} */}
      </Card>
    </StyledMegaMenu>
  ) : null;
};

export default MegaMenu1;
