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
  MenuItem,
  Breadcrumbs,
  IconButton,
  ButtonGroup,
  ButtonBase,
  Container,
} from "@material-ui/core";
import Circle from "../CommonComponents/Circle";
import { Link } from "react-router-dom";

import DeleteIcon from "@material-ui/icons/Delete";
import SearchIcon from "@material-ui/icons/Search";
import Add from "@material-ui/icons/Add";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import Filter from "../../assets/icons/Filter.svg";
import navArrow from "../../assets/icons/navarrow.svg";
import leftArrow from "../../assets/icons/leftArrow.svg";
import rightArrow from "../../assets/icons/rightArrow.svg";

import arrowDown from "../../assets/icons/arrowDown.svg";
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

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: "#EDF6FF",
    color: "#66757F",
    height: 45,
    paddingTop: 0,
    paddingBottom: 0,
    paddingLeft: 62,
  },
  body: {
    fontSize: 14,
    // paddingLeft: theme.spacing(6),
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    height: 65,
    "&:hover": {
      backgroundColor: "#EDF6FF",
    },
    // "&:nth-of-type(odd)": {
    // },
  },
}))(TableRow);

const useStyles = makeStyles((theme) => ({
  bodyPadding: {
    // paddingBottom: theme.spacing(1),
    fontWeight: "bold",
  },
  actionButtons: {
    marginRight: 20,
    width: 122,
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
    marginRight: 10,
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

const rows = [
  {
    id: 1,
    account: { name: "IBM", description: "Information Technology", image: "" },
    companySize: "1-18",
    URL: "https://www.google.com/",
    status: "Active",
    contactSize: 9,
  },
  {
    id: 1,
    account: { name: "IBM", description: "Information Technology", image: "" },
    companySize: "1-18",
    URL: "https://www.google.com/",
    status: "Active",
    contactSize: 9,
  },
  {
    id: 1,
    account: { name: "IBM", description: "Information Technology", image: "" },
    companySize: "1-18",
    URL: "https://www.google.com/",
    status: "Active",
    contactSize: 9,
  },
  {
    id: 1,
    account: { name: "IBM", description: "Information Technology", image: "" },
    companySize: "1-18",
    URL: "https://www.google.com/",
    status: "Active",
    contactSize: 9,
  },
  {
    id: 1,
    account: { name: "IBM", description: "Information Technology", image: "" },
    companySize: "1-18",
    URL: "https://www.google.com/",
    status: "Active",
    contactSize: 9,
  },
  {
    id: 1,
    account: { name: "IBM", description: "Information Technology", image: "" },
    companySize: "1-18",
    URL: "https://www.google.com/",
    status: "Active",
    contactSize: 9,
  },
];

const Index = () => {
  const classes = useStyles();
  const [toggle, setToggle] = useState([false, false, false, false, false]);

  return (
    <div>
      <div className={classes.box}>
        <Breadcrumbs
          separator={<img src={navArrow} width={12} height={12} alt="" />}
          className={classes.breadcrumbs}
        >
          <Typography className={classes.navLink} color="textPrimary">
            Customer
          </Typography>
          <Typography className={classes.navLinkActive} color="textPrimary">
            Account
          </Typography>
        </Breadcrumbs>
        <Typography className={classes.bodyPadding} variant="h5">
          ACCOUNT
        </Typography>
        <Typography className={classes.para} variant="body1">
          Account represents and induvial customer account, organization or
          partner involved with business
        </Typography>
      </div>
      <Line />
      <div className={classes.box}>
        <Button
          className={classes.actionButtons}
          startIcon={<img src={PlusIcon} alt="" width={14} height={14} />}
          variant="outlined"
        >
          New
        </Button>
        <Button
          className={classes.actionButtons}
          startIcon={<img src={RefreshIcon} alt="" width={15} height={14} />}
          variant="outlined"
        >
          Refresh
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
          startIcon={<img src={arrowUp} alt="" width={9} height={17} />}
          variant="outlined"
        >
          Export
        </Button>
        <Button
          className={classes.actionButtons}
          startIcon={<img src={arrowDown} alt="" width={8} />}
          variant="outlined"
        >
          Import
        </Button>
      </div>
      <div className={classes.searchRow}>
        <TextField
          className={classes.searchBar}
          size="small"
          // margin="dense"
          variant="outlined"
          placeholder="Search"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
        <Button
          className={classes.filterButton}
          size="large"
          startIcon={<img src={Filter} alt="" width={15} />}
          variant="outlined"
        >
          Filters
        </Button>
      </div>
      <div className={classes.tableContianer}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">
                <div className={classes.inlineFlex}>
                  <p>SELECT</p>
                  <Circle active={true} />
                </div>
              </StyledTableCell>
              <StyledTableCell align="center">
                <div className={classes.inlineFlex}>
                  <p>ACCOUNT</p>
                  <IconButton
                    onClick={() =>
                      setToggle([!toggle[0], false, false, false, false])
                    }
                  >
                    {toggle[0] ? <ExpandLess /> : <ExpandMore />}
                  </IconButton>
                </div>
              </StyledTableCell>
              <StyledTableCell align="center">
                <div className={classes.inlineFlex}>
                  <p>COMPANY SIZE</p>
                  <IconButton
                    onClick={() =>
                      setToggle([false, !toggle[1], false, false, false])
                    }
                  >
                    {toggle[1] ? <ExpandLess /> : <ExpandMore />}
                  </IconButton>
                </div>
              </StyledTableCell>
              <StyledTableCell align="center">
                <div className={classes.inlineFlex}>
                  <p>URL</p>
                  <IconButton
                    onClick={() =>
                      setToggle([false, false, !toggle[2], false, false])
                    }
                  >
                    {toggle[2] ? <ExpandLess /> : <ExpandMore />}
                  </IconButton>
                </div>
              </StyledTableCell>
              <StyledTableCell align="center">
                <div className={classes.inlineFlex}>
                  <p>STATUS</p>
                  <IconButton
                    onClick={() =>
                      setToggle([false, false, false, !toggle[3], false])
                    }
                  >
                    {toggle[3] ? <ExpandLess /> : <ExpandMore />}
                  </IconButton>
                </div>
              </StyledTableCell>
              <StyledTableCell align="center">
                <div className={classes.inlineFlex}>
                  <p>CONTACT SIZE</p>
                  <IconButton
                    onClick={() =>
                      setToggle([false, false, false, false, !toggle[4]])
                    }
                  >
                    {toggle[4] ? <ExpandLess /> : <ExpandMore />}
                  </IconButton>
                </div>
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <StyledTableRow key={index}>
                <StyledTableCell align="center">
                  <Link to={"/account-details"}>
                    <Circle active={false} />
                  </Link>
                </StyledTableCell>
                <StyledTableCell align="left">
                  <div className={classes.inlineFlex}>
                    <Avatar alt="Salesfoo" src="" className={classes.avatar} />
                    {row.account.name}
                    <br />
                    {row.account.description}
                  </div>
                </StyledTableCell>
                <StyledTableCell align="center">
                  {row.companySize}
                </StyledTableCell>
                <StyledTableCell align="center">{row.URL}</StyledTableCell>
                <StyledTableCell align="center">{row.status}</StyledTableCell>
                <StyledTableCell align="center">
                  {row.contactSize}
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
        <div className={classes.footerRow}>
          <ButtonBase
            size="small"
            className={classes.footerButton}
            variant="outlined"
            color="primary"
          >
            <img src={leftArrow} width={15} height={15} alt="" />
          </ButtonBase>
          <ButtonBase
            // size="small"
            className={classes.footerButton}
            variant="outlined"
            color="primary"
          >
            1
          </ButtonBase>
          <ButtonBase
            // size="small"
            className={classes.footerButton}
            variant="outlined"
            color="primary"
          >
            2
          </ButtonBase>
          <ButtonBase
            // size="small"
            className={classes.footerButton}
            variant="outlined"
            color="primary"
          >
            3
          </ButtonBase>

          <ButtonBase
            size="small"
            className={classes.footerButton}
            variant="outlined"
            color="primary"
          >
            <img src={rightArrow} width={15} height={15} alt="" />
          </ButtonBase>
        </div>
      </div>
    </div>
  );
};

export default Index;
