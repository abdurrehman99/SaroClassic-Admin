import React, { useState } from "react";
import { makeStyles, withStyles, useTheme } from "@material-ui/core/styles";
import {
  Typography,
  Button,
  Grid,
  TextField,
  InputAdornment,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableFooter,
  TablePagination,
  Avatar,
  Breadcrumbs,
  IconButton,
  ButtonGroup,
  ButtonBase,
  Container,
} from "@material-ui/core";
import Circle from "../CommonComponents/Circle";
import DeleteIcon from "@material-ui/icons/Delete";
import SearchIcon from "@material-ui/icons/Search";
import Add from "@material-ui/icons/Add";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import lockOpen from "../../assets/icons/lock-open.svg";
import saveIcon from "../../assets/icons/save.svg";
import callIcon from "../../assets/icons/call.svg";
import rightArrow from "../../assets/icons/rightArrow.svg";

import IBMLogo from "../../assets/icons/IBM.svg";
import arrowUp from "../../assets/icons/arrowUp.svg";
import delteIcon from "../../assets/icons/delete.svg";
import PlusIcon from "../../assets/icons/plus.svg";
import RefreshIcon from "../../assets/icons/refresh.svg";
import Line from "../CommonComponents/Line";

import {
  ExpandLess,
  ExpandMore,
  ChevronLeft,
  ChevronRight,
  NavigateNextIcon,
} from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  bodyPadding: {
    // paddingBottom: theme.spacing(1),
    fontWeight: "bold",
  },
  actionButtons: {
    marginRight: 20,
    width: 158.5,
    height: 40.7,
    fontSize: "13px",
    fontWeight: "bold",
    textTransform: "none",
  },
  filterButton: {
    marginRight: 20,
    width: 133.4,
    height: 44.5,
    fontSize: "16px",
    fontWeight: "bold",
    textTransform: "none",
  },
  link: {
    display: "flex",
  },
  table: {
    border: 0,
  },
  tableContianer: {
    paddingTop: 20,
    marginLeft: 24.5,
    maxWidth: "100vw",
  },
  iconButton: {
    paddingTop: 0,
    paddingButtom: 0,
  },
  searchBar: {
    width: 255.4,
    marginRight: 20,
  },
  avatar: {
    width: 95,
    height: 95,
  },
  breadcrumbs: {
    paddingTop: 15,
    paddingBottom: 10,
  },
  navLink: {
    fontSize: 14,
    fontWeight: "600",
  },
  navLinkActive: {
    fontSize: 14,
    fontWeight: "600",
    color: "#0582ff",
  },
  searchRow: {
    marginTop: theme.spacing(3),
    marginLeft: 40.1,
    verticalAlign: "center",
  },
  inlineFlex: {
    display: "inline-flex",
    verticalAlign: "center",
    width: "100%",
  },
  para: {
    fontWeight: "light",
    paddingBottom: 0,
  },
  box: {
    marginLeft: 40.1,
    // marginTop: 20,
  },
  footerRow: {
    width: "100%",
    margin: "auto",
    textAlign: "center",
    marginTop: 30,
    marginBottom: 30,
  },
  footerButton: {
    fontWeight: "bold",

    border: "1px solid #E0E0E0",
    marginLeft: 8,
    borderRadius: 4,
    width: 38,
    height: 39,
  },
}));

const Index = () => {
  const classes = useStyles();

  return (
    <Container style={{ padding: 0, margin: 0 }} maxWidth="xl">
      <Grid
        container
        direction="row"
        justify="space-between"
        alignItems="center"
        // spacing={2}
      >
        <Grid item xs={12} sm={4}>
          <Grid container direction="row" alignItems="center">
            <Avatar alt="SalesFoo" src={IBMLogo} className={classes.avatar} />
            <div>
              <Typography className={classes.bodyPadding} variant="h5">
                IBM
              </Typography>
              <Typography className={classes.para} variant="body1">
                Account
              </Typography>
            </div>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={8}>
          <Button
            className={classes.actionButtons}
            startIcon={<img src={saveIcon} alt="" width={14} height={14} />}
            variant="outlined"
          >
            Save
          </Button>
          <Button
            className={classes.actionButtons}
            startIcon={<img src={delteIcon} alt="" width={12} height={13} />}
            variant="outlined"
          >
            Delete
          </Button>
          <Button
            className={classes.actionButtons}
            startIcon={<img src={lockOpen} alt="" width={12} height={13} />}
            variant="outlined"
          >
            Activate
          </Button>
          <Button
            className={classes.actionButtons}
            startIcon={<img src={callIcon} alt="" width={12} height={13} />}
            variant="outlined"
          >
            New Contact
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Index;
