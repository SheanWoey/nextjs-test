/* eslint-disable */
import { FC, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import { FormikErrors, FormikTouched } from "formik";
import format from "date-fns/format";
import Heading from "./heading";
import { InitialValues } from "./_types";

// ==============================================================
interface Props {
  values: InitialValues;
  errors: FormikErrors<InitialValues>;
  touched: FormikTouched<InitialValues>;
  handleChange: any;
}
// ==============================================================

const DeliveryDate: FC<Props> = ({ errors, handleChange, touched, values }) => {
  const [dateList, setDateList] = useState<{ label: string; value: string }[]>(
    [],
  );

  useEffect(() => {
    const list = [] as { label: string; value: string; }[];
    const today = new Date();
    const dateCount = today.getDate();

    list.push({
      label: format(today, "dd MMMM"),
      value: today.toISOString(),
    });

    for (let i = 1; i < 10; i++) {
      today.setDate(dateCount + i);
      list.push({
        label: format(today, "dd MMMM"),
        value: today.toISOString(),
      });
    }

    setDateList(list);
  }, []);

  const timeList = [
    { label: "9AM - 11AM", value: "9AM - 11AM" },
    { label: "11AM - 1PM", value: "11AM - 1PM" },
    { label: "3PM - 5PM", value: "3PM - 5PM" },
    { label: "5PM - 7PM", value: "5PM - 7PM" },
  ];

  return (
    <Card sx={{ p: 3, mb: 3 }}>
      <Heading number={1} title="Delivery Date and Time" />

      <Box mb={3.5}>
        <Grid container spacing={3}>
          <Grid item sm={6} xs={12}>
            <TextField
              select
              fullWidth
              type="text"
              name="date"
              label="Delivery Date"
              value={values.date}
              onChange={(e) => handleChange(e)}
              error={!!touched.date && !!errors.date}
              helperText={(touched.date && errors.date) as string}
            >
              {dateList.map((item) => (
                <MenuItem value={item.value} key={item.label}>
                  {item.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item sm={6} xs={12}>
            <TextField
              select
              fullWidth
              type="text"
              name="time"
              value={values.time}
              label="Delivery Time"
              onChange={handleChange}
              error={!!touched.time && !!errors.time}
              helperText={(touched.time && errors.time) as string}
            >
              {timeList.map((item) => (
                <MenuItem value={item.value} key={item.value}>
                  {item.value}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
        </Grid>
      </Box>
    </Card>
  );
};

export default DeliveryDate;
