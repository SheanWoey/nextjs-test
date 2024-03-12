import MuiPagination, { PaginationProps } from "@mui/material/Pagination";

const Pagination = (props: PaginationProps) => (
  <MuiPagination
    sx={{ display: "flex", justifyContent: "center", mt: 5 }}
    {...props}
  />
);

export default Pagination;
