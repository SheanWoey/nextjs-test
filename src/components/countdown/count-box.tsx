import { H3, Span } from "components/Typography";

// ==============================================================
type Props = { digit: number; title: string };
// ==============================================================

const CountBox = ({ digit = 365, title = "DAYS" }: Props) => (
  <H3>
    {digit}{" "}
    <Span color="grey.600" fontSize={14} fontWeight={600}>
      {title}
    </Span>
  </H3>
);

export default CountBox;
