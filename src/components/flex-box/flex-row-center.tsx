import Box, { BoxProps } from "@mui/material/Box";

const FlexRowCenter = ({ children, ...props }: BoxProps) => (
  <Box display="flex" justifyContent="center" alignItems="center" {...props}>
    {children}
  </Box>
);

export default FlexRowCenter;
