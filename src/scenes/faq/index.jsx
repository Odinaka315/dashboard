import { Box, Typography, useTheme } from "@mui/material";
import Header from "../../components/Header";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { tokens } from "../../theme";

import React from "react";

const FAQ = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box m={"20px"}>
      <Header title={"FAQ"} subtitle={"Frequently Asked Questions Page"} />
      <Box mt={"20px"}>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography color={colors.greenAccent[500]} variant="h5">
              An Important question
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque,
              assumenda aperiam, aliquid autem ea necessitatibus odit voluptatum
              fugiat, placeat eligendi aliquam dolorem. Eum ea incidunt officia
              laborum molestias atque aperiam.
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography color={colors.greenAccent[500]} variant="h5">
              Question 2
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque,
              assumenda aperiam, aliquid autem ea necessitatibus odit voluptatum
              fugiat, placeat eligendi aliquam dolorem. Eum ea incidunt officia
              laborum molestias atque aperiam.
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography color={colors.greenAccent[500]} variant="h5">
              Question 3
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque,
              assumenda aperiam, aliquid autem ea necessitatibus odit voluptatum
              fugiat, placeat eligendi aliquam dolorem. Eum ea incidunt officia
              laborum molestias atque aperiam.
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography color={colors.greenAccent[500]} variant="h5">
              Question 4
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque,
              assumenda aperiam, aliquid autem ea necessitatibus odit voluptatum
              fugiat, placeat eligendi aliquam dolorem. Eum ea incidunt officia
              laborum molestias atque aperiam.
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography color={colors.greenAccent[500]} variant="h5">
              Question 5
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque,
              assumenda aperiam, aliquid autem ea necessitatibus odit voluptatum
              fugiat, placeat eligendi aliquam dolorem. Eum ea incidunt officia
              laborum molestias atque aperiam.
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography color={colors.greenAccent[500]} variant="h5">
              Question 6
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque,
              assumenda aperiam, aliquid autem ea necessitatibus odit voluptatum
              fugiat, placeat eligendi aliquam dolorem. Eum ea incidunt officia
              laborum molestias atque aperiam.
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography color={colors.greenAccent[500]} variant="h5">
              Question 7
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque,
              assumenda aperiam, aliquid autem ea necessitatibus odit voluptatum
              fugiat, placeat eligendi aliquam dolorem. Eum ea incidunt officia
              laborum molestias atque aperiam.
            </Typography>
          </AccordionDetails>
        </Accordion>
      </Box>
    </Box>
  );
};

export default FAQ;
