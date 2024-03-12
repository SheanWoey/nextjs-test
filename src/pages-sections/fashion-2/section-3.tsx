"use client";

import { FC } from "react";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
// GLOBAL CUSTOM COMPONENTS
import { H2 } from "components/Typography";
import { CategoryCard1 } from "components/category-cards";
// CUSTOM DATA MODEL
import Category from "models/Category.model";

// ===========================================================
type Props = { categories: Category[] };
// ===========================================================

const Section3: FC<Props> = ({ categories }) => {
  return (
    <Container sx={{ mt: 8 }}>
      <H2 textAlign="center" mb={4}>
        Best selling Categories
      </H2>

      <Grid container spacing={3}>
        {categories.map((item) => (
          <Grid item md={3} sm={6} xs={12} key={item.id}>
            <CategoryCard1 image={item.image!} title={item.name} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Section3;
