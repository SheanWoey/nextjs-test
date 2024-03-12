import { FC, ReactNode } from "react";
import { BoxProps } from "@mui/material/Box";
import { styled, SxProps } from "@mui/material/styles";
// MUI ICON COMPONENTS
import ChevronRight from "@mui/icons-material/ChevronRight";
// GLOBAL CUSTOM COMPONENT
import { FlexBox } from "components/flex-box";

// STYLED COMPONENT
const RootContainer = styled(FlexBox, {
  shouldForwardProp: (prop) => prop !== "open",
})<{ open: number }>(({ open, theme }) => ({
  alignItems: "center",
  padding: ".5rem 1rem",
  justifyContent: "space-between",
  ".caret": {
    transition: "transform 250ms ease-in-out",
    transform: `rotate(${open ? "90deg" : "0deg"})`,
    ...(theme.direction === "rtl" && {
      transform: `rotate(${open ? "90deg" : "180deg"})`,
    }),
  },
}));

// =================================================================
interface Props extends BoxProps {
  sx?: SxProps;
  open?: boolean;
  showIcon?: boolean;
  children: ReactNode;
}
// =================================================================

const AccordionHeader: FC<Props> = (props) => {
  const { open, children, showIcon = true, ...others } = props;

  return (
    <RootContainer open={open ? 1 : 0} {...others}>
      {children}
      {showIcon ? <ChevronRight className="caret" fontSize="small" /> : null}
    </RootContainer>
  );
};

export default AccordionHeader;
