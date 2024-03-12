import { FC, ReactNode } from "react";
import Container from "@mui/material/Container";
import Box, { BoxProps } from "@mui/material/Box";
import SectionHeader from "./section-header";

// ==============================================================
interface Props extends BoxProps {
  title?: string;
  icon?: ReactNode;
  seeMoreLink?: string;
}
// ==============================================================

const SectionCreator: FC<Props> = (props) => {
  const { icon, title, children, seeMoreLink, ...others } = props;

  return (
    <Box mb={7.5} {...others}>
      <Container sx={{ pb: "1rem" }}>
        {title ? (
          <SectionHeader title={title} seeMoreLink={seeMoreLink} icon={icon} />
        ) : null}

        {children}
      </Container>
    </Box>
  );
};

export default SectionCreator;
