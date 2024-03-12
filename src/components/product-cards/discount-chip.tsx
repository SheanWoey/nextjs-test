import { FC } from "react";
import Chip, { ChipProps } from "@mui/material/Chip";
import styled from "@mui/material/styles/styled";

// STYLED COMPONENT
const StyledChip = styled(Chip)(({ theme }) => ({
  zIndex: 1,
  top: "10px",
  left: "10px",
  paddingLeft: 3,
  paddingRight: 3,
  fontWeight: 600,
  fontSize: "10px",
  position: "absolute",
  color: theme.palette.common.white,
  background: theme.palette.primary.main,
}));

// ==============================================================
interface Props extends ChipProps {
  discount: number;
}
// ==============================================================

const DiscountChip: FC<Props> = ({ discount = 0, ...props }) => {
  return discount > 0 ? (
    <StyledChip size="small" label={`${discount}% off`} {...props} />
  ) : null;
};

export default DiscountChip;
