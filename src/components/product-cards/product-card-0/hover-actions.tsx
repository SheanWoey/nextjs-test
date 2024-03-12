import { FC } from "react";
import IconButton from "@mui/material/IconButton";
// MUI ICON COMPONENTS
import Favorite from "@mui/icons-material/Favorite";
import RemoveRedEye from "@mui/icons-material/RemoveRedEye";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
// STYLED COMPONENTS
import { HoverIconWrapper } from "./styles";

// ==============================================================
interface Props {
  isFavorite: boolean;
  toggleView: () => void;
  toggleFavorite: () => void;
}
// ==============================================================

const HoverActions: FC<Props> = ({
  isFavorite,
  toggleFavorite,
  toggleView,
}) => {
  return (
    <HoverIconWrapper className="hover-box">
      <IconButton onClick={toggleView}>
        <RemoveRedEye color="disabled" fontSize="small" />
      </IconButton>

      <IconButton onClick={toggleFavorite}>
        {isFavorite ? (
          <Favorite color="primary" fontSize="small" />
        ) : (
          <FavoriteBorder fontSize="small" color="disabled" />
        )}
      </IconButton>
    </HoverIconWrapper>
  );
};

export default HoverActions;
