import Box, { BoxProps } from "@mui/material/Box";

// ==============================================================
interface Props extends BoxProps {
  src?: string;
  alt: string;
}
// ==============================================================

const BazaarImage = (props: Props) => <Box component="img" {...props} />;

export default BazaarImage;
