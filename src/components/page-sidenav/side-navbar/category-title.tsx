import Box from "@mui/material/Box";
import { H5 } from "components/Typography";
import { BorderBox, ColorBorder } from "./styles";

// ==============================================================
type Props = { title: string; line: "dash" | "solid" };
// ==============================================================

const CategoryTitle = ({ title, line }: Props) => (
  <Box padding="16px 20px 5px 20px">
    <H5>{title}</H5>

    <BorderBox line={line}>
      <ColorBorder />
      <ColorBorder grey={1} />
    </BorderBox>
  </Box>
);

export default CategoryTitle;
