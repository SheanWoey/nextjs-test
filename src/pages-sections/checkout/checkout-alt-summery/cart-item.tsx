import { FC } from "react";
// GLOBAL CUSTOM COMPONENTS
import { FlexBetween } from "components/flex-box";
import { Paragraph, Span } from "components/Typography";
// CUSTOM UTILS LIBRARY FUNCTION
import { currency } from "lib";

// ==============================================================
interface Props {
  name: string;
  qty: number;
  price: number;
}
// ==============================================================

const CartItem: FC<Props> = ({ name, price, qty }) => (
  <FlexBetween mb={1.5}>
    <Paragraph>
      <Span fontWeight="700">{qty}</Span> x {name}
    </Paragraph>

    <Paragraph>{currency(price)}</Paragraph>
  </FlexBetween>
);

export default CartItem;
