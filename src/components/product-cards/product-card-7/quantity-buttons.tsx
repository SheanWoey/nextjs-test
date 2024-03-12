import { FC, Fragment } from "react";
// MUI ICON COMPONENTS
import Add from "@mui/icons-material/Add";
import Remove from "@mui/icons-material/Remove";
// GLOBAL CUSTOM COMPONENT
import { FlexBox } from "components/flex-box";
import { Paragraph } from "components/Typography";
// STYLED COMPONENT
import { StyledButton } from "./styles";

// ==============================================================
interface Props {
  quantity: number;
  handleDecrement: () => void;
  handleIncrement: () => void;
}
// ==============================================================

const QuantityButtons: FC<Props> = ({
  quantity,
  handleDecrement,
  handleIncrement,
}) => {
  return (
    <FlexBox
      width="30px"
      alignItems="center"
      className="add-cart"
      flexDirection="column-reverse"
      justifyContent={quantity ? "space-between" : "flex-start"}
    >
      <StyledButton variant="outlined" onClick={handleIncrement}>
        <Add fontSize="small" />
      </StyledButton>

      {quantity ? (
        <Fragment>
          <Paragraph fontWeight={600}>{quantity}</Paragraph>

          <StyledButton variant="outlined" onClick={handleDecrement}>
            <Remove fontSize="small" />
          </StyledButton>
        </Fragment>
      ) : null}
    </FlexBox>
  );
};

export default QuantityButtons;
