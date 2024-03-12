/* eslint-disable */
import { Fragment, useState } from "react";
import Collapse from "@mui/material/Collapse";
// GLOBAL CUSTOM COMPONENTS
import { Span } from "components/Typography";
import { FlexBox } from "components/flex-box";
import { AccordionHeader } from "components/accordion";
// LOCAL CUSTOM COMPONENT
import { renderChild } from "./render-child";

// ==============================================================
interface Props {
  Icon: any;
  title: string;
  handleSelect?: (category: string) => void ;
  child?: { title?: string; href?: string }[];
}
// ==============================================================

const Accordion = ({ title, Icon, child, handleSelect }: Props) => {
  const [open, setOpen] = useState(false);

  return (
    <Fragment>
      {/* ACCORDION / COLLAPSE HEADER */}
      <AccordionHeader
        px={0}
        py={0.75}
        open={open}
        className="linkList"
        onClick={() => setOpen((state) => !state)}
        sx={{ cursor: "pointer", ":hover": { color: "primary.main" } }}
      >
        <FlexBox gap={1.5} alignItems="center">
          <Icon fontSize="small" />
          <Span fontWeight="600">{title}</Span>
        </FlexBox>
      </AccordionHeader>

      {/* RENDER NESTED NAV ITEMS */}
      {child && handleSelect ? (
        <Collapse in={open}>{renderChild(child, handleSelect)}</Collapse>
      ) : null}
    </Fragment>
  );
};

export default Accordion;
