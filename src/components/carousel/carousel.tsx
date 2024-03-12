import { FC, PropsWithChildren } from "react";
import { SxProps, Theme, useTheme } from "@mui/material/styles";
import SlickCarousel, { Settings } from "react-slick";
// LOCAL CUSTOM COMPONENTS
import CarouselDots from "./carousel-dots";
import CarouselArrows from "./carousel-arrows";
// SLICK CAROUSEL CSS
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// STYLED COMPONENT
import { RootStyle } from "./styles";

// ==============================================================
interface Props extends PropsWithChildren, Settings {
  dotColor?: string;
  spaceBetween?: number;
  dotStyles?: SxProps<Theme>;
  arrowStyles?: SxProps<Theme>;
}
// ==============================================================

const Carousel: FC<Props> = ({
  dotColor,
  children,
  arrowStyles,
  dots = false,
  arrows = true,
  slidesToShow = 4,
  spaceBetween = 10,
  dotStyles = { mt: 4 },
  ...props
}) => {
  const theme = useTheme();

  const settings: Settings = {
    dots,
    arrows,
    slidesToShow,
    rtl: theme.direction === "rtl",
    ...CarouselArrows(arrowStyles),
    ...CarouselDots({ dotColor, sx: dotStyles }),
    ...props,
  };

  return (
    <RootStyle space={spaceBetween}>
      <SlickCarousel {...settings}>{children}</SlickCarousel>
    </RootStyle>
  );
};

export default Carousel;
