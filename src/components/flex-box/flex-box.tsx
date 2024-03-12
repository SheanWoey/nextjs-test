import Box, { BoxProps } from "@mui/material/Box";

const FlexBox = ({ children, ...props }: BoxProps) => (
  <Box display="flex" {...props}>
    {children}
  </Box>
);

export default FlexBox;
