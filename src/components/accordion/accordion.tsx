/* eslint-disable */
import {
  Children,
  cloneElement,
  FC,
  memo,
  ReactElement,
  useEffect,
  useRef,
  useState,
} from "react";
import styled from "@mui/material/styles/styled";

// STYLED COMPONENT PROPS
type WrapperProps = {
  open: boolean;
  parent_height: number;
  header_height: number;
};

// STYLED COMPONENT
const Wrapper = styled("div", {
  shouldForwardProp: (prop) =>
    prop !== "open" && prop !== "parent_height" && prop !== "header_height",
})<WrapperProps>((props) => ({
  cursor: "pointer",
  overflow: "hidden",
  transition: "height 250ms ease-in-out",
  height: props.open ? props.parent_height : props.header_height,
}));

// ==============================================================
type Props = {
  expanded?: boolean;
  children: ReactElement[] | any;
};
// ==============================================================

const Accordion: FC<Props> = ({ expanded = false, children }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(expanded);
  const [headerHeight, setHeaderHeight] = useState(0);
  const [parentHeight, setParentHeight] = useState(0);

  const toggle = () => setOpen(!open);

  useEffect(() => {
    const parent = ref.current;
    if (parent) {
      setHeaderHeight(parent.children[0].scrollHeight);
      setParentHeight(parent.scrollHeight);
    }
  }, []);

  const modifiedChildren = Children.map(children, (child, ind) => {
    if (ind === 0) return cloneElement(child, { open, onClick: toggle });
    else return child;
  });

  return (
    <Wrapper
      ref={ref}
      open={open}
      header_height={headerHeight}
      parent_height={parentHeight}
    >
      {modifiedChildren}
    </Wrapper>
  );
};

export default memo(Accordion);
